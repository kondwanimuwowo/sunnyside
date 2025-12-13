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

      // Generate reference
      const referenceNumber = `ENR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      // TODO: Save to database

      // Send confirmation email
      if (enrollmentData.parent1Email) {
        emailService
          .sendEnrollmentConfirmation({ enrollmentData, referenceNumber })
          .catch(console.error);
      }

      // Send admin notification
      emailService
        .sendAdminNotification({
          type: "enrollment",
          data: enrollmentData,
          reference: referenceNumber,
        })
        .catch(console.error);

      res.json({
        success: true,
        referenceNumber,
        message: "Enrollment submitted successfully",
      });
    } catch (error) {
      console.error("❌ Enrollment error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to submit enrollment",
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
