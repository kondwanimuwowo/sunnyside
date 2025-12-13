const mobileMoneyService = require("../services/mobileMoney.service");
const cardPaymentService = require("../services/cardPayment.service");
const paymentStatusService = require("../services/paymentStatus.service");
const emailService = require("../services/email.service");
const donationsStore = require("../store/donations.store");

class DonationsController {
  async initiate(req, res) {
    try {
      const {
        amount,
        paymentMethod,
        donorName,
        donorEmail,
        phone,
        operator,
        cardNumber,
        expiryDate,
        cvv,
      } = req.body;
      // Validate
      if (!amount || !paymentMethod || !donorName) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }
      // Generate reference
      const reference = `DON-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}`;
      console.log(`\n💰 New ${paymentMethod} donation: K${amount}`);
      let response;
      if (paymentMethod === "mobile-money") {
        if (!phone || !operator) {
          return res
            .status(400)
            .json({ success: false, message: "Phone and operator required" });
        }
        response = await mobileMoneyService.initiate({
          amount,
          phone,
          operator,
          donorName,
          donorEmail,
          reference,
        });
      } else if (paymentMethod === "card") {
        if (!cardNumber || !expiryDate || !cvv) {
          return res
            .status(400)
            .json({ success: false, message: "Card details required" });
        }
        response = await cardPaymentService.initiate({
          amount,
          cardNumber,
          expiryDate,
          cvv,
          donorName,
          donorEmail,
          reference,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid payment method" });
      }

      // Extract Lenco transaction ID (critical for status checks!)
      const lencoTransactionId = response.data?.id;
      if (!lencoTransactionId) {
        console.error("⚠️ No transaction ID returned from Lenco");
      }

      // Store donation with Lenco ID
      donationsStore.create({
        reference,
        amount,
        paymentMethod,
        donorName,
        donorEmail,
        status: response.data?.status || "pending",
        lencoData: response.data,
        lencoTransactionId, // <-- NEW: store this
      });

      // Send emails (non-blocking)
      if (donorEmail) {
        emailService
          .sendDonationConfirmation({
            email: donorEmail,
            name: donorName,
            amount,
            reference,
          })
          .catch(console.error);
      }
      emailService
        .sendAdminNotification({
          type: "donation",
          data: { amount, donorName, paymentMethod },
          reference,
        })
        .catch(console.error);

      res.json({
        success: true,
        reference,
        data: response.data,
        message: "Payment initiated successfully",
      });
    } catch (error) {
      console.error("❌ Donation error:", error.message);
      res.status(500).json({
        success: false,
        message: error.response?.data?.message || "Payment failed",
      });
    }
  }

  async checkStatus(req, res) {
    try {
      const { reference } = req.params;

      const donation = donationsStore.findByReference(reference);
      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation reference not found",
        });
      }

      const response = await paymentStatusService.checkByTransactionId(
        donation.lencoTransactionId
      );

      // Update store with latest status
      if (response.data) {
        donationsStore.update(reference, {
          status: response.data.status || "unknown",
          lencoData: response.data,
        });
      }

      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      console.error("❌ Status check error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to check status",
      });
    }
  }

  async list(req, res) {
    res.json({
      success: true,
      count: donationsStore.count(),
      donations: donationsStore.list(),
    });
  }
}

module.exports = new DonationsController();
