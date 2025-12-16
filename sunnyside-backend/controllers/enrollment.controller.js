const emailService = require("../services/email.service");

class EnrollmentController {
  async submit(req, res) {
    try {
      const enrollmentData = req.body;

      console.log("\n📝 New Enrollment:");
      console.log(
        "   Child:",
        enrollmentData.childFirstName,
        enrollmentData.childLastName
      );
      console.log(
        "   Parent:",
        enrollmentData.parent1FirstName,
        enrollmentData.parent1LastName
      );
      console.log("   Email:", enrollmentData.parent1Email);

      // Generate reference
      const referenceNumber = `ENR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      // TODO: Save to database

      // ✅ FIX: Await email sends and handle errors properly
      const emailResults = {
        parentEmail: null,
        adminEmail: null,
      };

      // Send parent confirmation email
      if (enrollmentData.parent1Email) {
        try {
          await emailService.sendEnrollmentConfirmation({
            enrollmentData,
            referenceNumber,
          });
          emailResults.parentEmail = "sent";
          console.log("✅ Parent confirmation email sent");
        } catch (error) {
          console.error("❌ Failed to send parent email:", error.message);
          console.error("   SMTP Config Check:");
          console.error(
            "   - SMTP_USER:",
            process.env.SMTP_USER ? "✓ Set" : "✗ Not set"
          );
          console.error(
            "   - SMTP_PASS:",
            process.env.SMTP_PASS ? "✓ Set" : "✗ Not set"
          );
          console.error("   - SMTP_HOST:", process.env.SMTP_HOST || "Not set");
          console.error("   - SMTP_PORT:", process.env.SMTP_PORT || "Not set");
          emailResults.parentEmail = `failed: ${error.message}`;
        }
      } else {
        console.log("⚠️  No parent email provided");
        emailResults.parentEmail = "no_email_provided";
      }

      // Send admin notification
      try {
        await emailService.sendAdminNotification({
          type: "enrollment",
          data: enrollmentData,
          reference: referenceNumber,
        });
        emailResults.adminEmail = "sent";
        console.log("✅ Admin notification email sent");
      } catch (error) {
        console.error("❌ Failed to send admin email:", error.message);
        emailResults.adminEmail = `failed: ${error.message}`;
      }

      res.json({
        success: true,
        referenceNumber,
        message: "Enrollment submitted successfully",
        emailStatus: emailResults,
      });
    } catch (error) {
      console.error("❌ Enrollment error:", error.message);
      console.error("Full error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit enrollment",
        error: error.message,
      });
    }
  }

  async getStatus(req, res) {
    try {
      const { referenceNumber } = req.params;

      // TODO: Fetch from database

      res.json({
        success: true,
        data: {
          referenceNumber,
          status: "pending",
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get status",
      });
    }
  }
}

module.exports = new EnrollmentController();
