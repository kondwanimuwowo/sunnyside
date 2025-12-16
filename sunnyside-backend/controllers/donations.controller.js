const mobileMoneyService = require("../services/mobileMoney.service");
const cardPaymentService = require("../services/cardPayment.service");
const paymentStatusService = require("../services/paymentStatus.service");
const otpHandlerService = require("../services/otpHandler.service");
const emailService = require("../services/email.service");
const donationsStore = require("../store/donations.store");
const subscriptionService = require("../services/subscription.service");

class DonationsController {
  async createRecurring(req, res) {
    try {
      const { amount, donorName, donorEmail, phone, operator, frequency } =
        req.body;

      if (!amount || !donorName || !phone || !operator) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const reference = `SUB-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      console.log(`\n🔄 New recurring donation: K${amount}/${frequency}`);

      const response = await subscriptionService.createSubscription({
        amount,
        phone,
        operator,
        donorName,
        donorEmail,
        frequency: frequency || "monthly",
      });

      // Store subscription (you can create subscriptions.store.js)
      // For now, just return success

      emailService
        .sendAdminNotification({
          type: "recurring_donation_created",
          data: { amount, donorName, frequency, phone },
          reference,
        })
        .catch(console.error);

      res.json({
        success: true,
        reference,
        subscriptionId: response.data?.id,
        data: response.data,
        message: "Recurring donation set up successfully",
      });
    } catch (error) {
      console.error("❌ Recurring donation error:", error.message);
      res.status(500).json({
        success: false,
        message:
          error.response?.data?.message || "Failed to create subscription",
      });
    }
  }

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

      if (!amount || !paymentMethod || !donorName) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const reference = `DON-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      console.log(`\n💰 New ${paymentMethod} donation: K${amount}`);
      console.log(`📝 Reference: ${reference}`);

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

      const lencoTransactionId = response.data?.id;
      if (!lencoTransactionId) {
        console.error("⚠️ No transaction ID returned from Lenco");
        return res.status(500).json({
          success: false,
          message: "Payment provider did not return a transaction ID",
        });
      }

      const status = response.data?.status?.toLowerCase() || "pending";
      console.log(`✅ Lenco Transaction ID: ${lencoTransactionId}`);
      console.log(`📊 Initial Status: ${status}`);

      // ✅ Track creation timestamp and lookup failures
      donationsStore.create({
        reference,
        amount,
        paymentMethod,
        donorName,
        donorEmail,
        phone: paymentMethod === "mobile-money" ? phone : null,
        operator: paymentMethod === "mobile-money" ? operator : null,
        status,
        lencoData: response.data,
        lencoTransactionId,
        createdAt: Date.now(),
        lookupFailCount: 0,
      });

      emailService
        .sendAdminNotification({
          type: "donation_initiated",
          data: { amount, donorName, paymentMethod, phone, operator, status },
          reference,
        })
        .catch(console.error);

      res.json({
        success: true,
        reference,
        lencoTransactionId,
        data: response.data,
        message: "Payment initiated successfully",
      });
    } catch (error) {
      console.error("❌ Donation error:", error.message);
      console.error("Full error:", error.response?.data || error);
      res.status(500).json({
        success: false,
        message:
          error.response?.data?.message || error.message || "Payment failed",
      });
    }
  }

  // ✅ OTP SUBMISSION METHOD (FOR MTN)
  async submitOTP(req, res) {
    try {
      const { reference } = req.params;
      const { otp } = req.body;

      if (!otp) {
        return res.status(400).json({
          success: false,
          message: "OTP is required",
        });
      }

      const donation = donationsStore.findByReference(reference);
      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found",
        });
      }

      console.log(`\n🔐 Submitting OTP for donation ${reference}`);

      const response = await otpHandlerService.submitOTP(
        donation.lencoTransactionId,
        otp
      );

      const newStatus = response.data?.status?.toLowerCase() || "unknown";
      console.log(`📊 New status after OTP: ${newStatus}`);

      // Update donation with new status
      donationsStore.update(reference, {
        status: newStatus,
        lencoData: response.data,
      });

      res.json({
        success: true,
        data: response.data,
        message: "OTP submitted successfully",
      });
    } catch (error) {
      console.error("❌ OTP submission error:", error.message);
      res.status(500).json({
        success: false,
        message:
          error.response?.data?.message || "Invalid OTP. Please try again.",
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

      const currentStatus = donation.status?.toLowerCase();

      // ✅ Return cached status if already final
      if (
        ["successful", "failed", "cancelled", "timeout"].includes(currentStatus)
      ) {
        console.log(`ℹ️ ${reference} already finalized: ${currentStatus}`);
        return res.json({
          success: true,
          data: {
            status: currentStatus,
            ...donation.lencoData,
          },
        });
      }

      // ✅ Check if payment has timed out
      const elapsed = Date.now() - donation.createdAt;
      const timeout =
        donation.paymentMethod === "mobile-money" ? 120000 : 300000; // 2min mobile, 5min card

      if (elapsed > timeout && currentStatus === "pay-offline") {
        console.log(`⏱️ Payment timeout for ${reference} (${elapsed}ms)`);

        donationsStore.update(reference, {
          status: "timeout",
          lencoData: {
            ...donation.lencoData,
            status: "timeout",
            reasonForFailure: "Payment not approved within time limit",
          },
        });

        emailService
          .sendAdminNotification({
            type: "donation_failed",
            data: {
              amount: donation.amount,
              donorName: donation.donorName,
              paymentMethod: donation.paymentMethod,
              reason: "Timeout - user did not approve payment",
            },
            reference,
          })
          .catch(console.error);

        return res.json({
          success: true,
          data: {
            status: "timeout",
            reasonForFailure: "Payment not approved within time limit",
          },
        });
      }

      // Query Lenco for latest status
      const response = await paymentStatusService.checkByTransactionId(
        donation.lencoTransactionId
      );

      const newStatus = response.data?.status?.toLowerCase() || "unknown";
      console.log(`📊 Status for ${reference}: ${newStatus}`);

      // ✅ Handle "lookup-failed" (Lenco API bug with MTN)
      if (newStatus === "lookup-failed") {
        const failCount = (donation.lookupFailCount || 0) + 1;

        donationsStore.update(reference, {
          lookupFailCount: failCount,
        });

        // After 5 consecutive lookup failures, mark as failed
        if (failCount >= 5) {
          console.log(
            `❌ ${reference} - Too many lookup failures (Lenco API issue)`
          );

          donationsStore.update(reference, {
            status: "failed",
            lencoData: {
              ...donation.lencoData,
              status: "failed",
              reasonForFailure:
                "Payment provider error. Please try Airtel or Zamtel instead.",
            },
          });

          emailService
            .sendAdminNotification({
              type: "donation_failed",
              data: {
                amount: donation.amount,
                donorName: donation.donorName,
                paymentMethod: donation.paymentMethod,
                reason: "Lenco API lookup failed (MTN integration issue)",
              },
              reference,
            })
            .catch(console.error);

          return res.json({
            success: true,
            data: {
              status: "failed",
              reasonForFailure:
                "Payment provider error. Please try Airtel or Zamtel instead.",
            },
          });
        }

        // Return pending with fail count to continue polling
        return res.json({
          success: true,
          data: {
            status: "pending",
            lookupFailCount: failCount,
          },
        });
      }

      // Reset lookup fail count on successful status check
      if (newStatus !== "lookup-failed") {
        donationsStore.update(reference, {
          status: newStatus,
          lencoData: response.data,
          lookupFailCount: 0,
        });
      }

      // ✅ Send success email ONLY when status becomes "successful"
      if (newStatus === "successful" && currentStatus !== "successful") {
        console.log(`🎉 Payment successful!`);

        if (donation.donorEmail) {
          emailService
            .sendDonationConfirmation({
              email: donation.donorEmail,
              name: donation.donorName,
              amount: donation.amount,
              reference: donation.reference,
            })
            .catch((err) => console.error("Email error:", err));
        }

        emailService
          .sendAdminNotification({
            type: "donation_successful",
            data: {
              amount: donation.amount,
              donorName: donation.donorName,
              donorEmail: donation.donorEmail,
              paymentMethod: donation.paymentMethod,
            },
            reference: donation.reference,
          })
          .catch(console.error);
      }

      // ✅ Handle failed/cancelled
      if (
        ["failed", "cancelled"].includes(newStatus) &&
        !["failed", "cancelled"].includes(currentStatus)
      ) {
        console.log(`❌ Payment ${newStatus}: ${reference}`);

        emailService
          .sendAdminNotification({
            type: "donation_failed",
            data: {
              amount: donation.amount,
              donorName: donation.donorName,
              paymentMethod: donation.paymentMethod,
              reason: response.data?.reasonForFailure || newStatus,
            },
            reference: donation.reference,
          })
          .catch(console.error);
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
