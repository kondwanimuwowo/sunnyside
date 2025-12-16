const crypto = require("crypto");
const donationsStore = require("../store/donations.store");
const emailService = require("../services/email.service");

class WebhooksController {
  /**
   * Verify Lenco webhook signature
   */
  verifySignature(payload, signature) {
    const secret = process.env.LENCO_WEBHOOK_SIGNATURE;
    if (!secret) {
      console.warn("⚠️  Webhook signature not configured");
      return true; // Dev mode
    }

    const hash = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex");

    return hash === signature;
  }

  /**
   * Handle Lenco webhook
   */
  async handleLencoWebhook(req, res) {
    try {
      const signature = req.headers["x-lenco-signature"];
      const payload = req.body;

      console.log("\n🪝 Webhook received:");
      console.log("   Event:", payload.event);
      console.log("   Reference:", payload.data?.reference);

      // ✅ Verify signature
      if (!this.verifySignature(payload, signature)) {
        console.error("❌ Invalid webhook signature");
        return res.status(401).json({ error: "Invalid signature" });
      }

      const { event, data } = payload;

      // Handle different events
      switch (event) {
        case "collection.successful":
          await this.handleSuccessfulPayment(data);
          break;

        case "collection.failed":
          await this.handleFailedPayment(data);
          break;

        case "collection.pending":
          await this.handlePendingPayment(data);
          break;

        default:
          console.log(`ℹ️  Unhandled event: ${event}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error("❌ Webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  }

  async handleSuccessfulPayment(data) {
    const { reference, amount, id } = data;

    console.log(`🎉 Payment successful via webhook: ${reference}`);

    const donation = donationsStore.findByReference(reference);
    if (!donation) {
      console.warn(`⚠️  Donation not found: ${reference}`);
      return;
    }

    // Update status
    donationsStore.update(reference, {
      status: "successful",
      lencoData: data,
    });

    // Send confirmation email
    if (donation.donorEmail) {
      await emailService.sendDonationConfirmation({
        email: donation.donorEmail,
        name: donation.donorName,
        amount: donation.amount,
        reference: donation.reference,
      });
    }

    // Notify admin
    await emailService.sendAdminNotification({
      type: "donation_successful",
      data: {
        amount: donation.amount,
        donorName: donation.donorName,
        paymentMethod: donation.paymentMethod,
      },
      reference,
    });
  }

  async handleFailedPayment(data) {
    const { reference, reasonForFailure } = data;

    console.log(`❌ Payment failed via webhook: ${reference}`);

    const donation = donationsStore.findByReference(reference);
    if (!donation) return;

    donationsStore.update(reference, {
      status: "failed",
      lencoData: data,
    });

    await emailService.sendAdminNotification({
      type: "donation_failed",
      data: {
        amount: donation.amount,
        donorName: donation.donorName,
        reason: reasonForFailure || "Payment failed",
      },
      reference,
    });
  }

  async handlePendingPayment(data) {
    console.log(`⏳ Payment pending via webhook: ${data.reference}`);
    // Just update status, don't send emails yet
    const donation = donationsStore.findByReference(data.reference);
    if (donation) {
      donationsStore.update(data.reference, {
        status: data.status,
        lencoData: data,
      });
    }
  }
}

module.exports = new WebhooksController();
