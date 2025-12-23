const transporter = require("../config/mailer");
const templates = require("./templates/emailTemplates");

class EmailService {
  async sendDonationConfirmation({ email, name, amount, reference }) {
    if (!process.env.SMTP_USER) {
      console.log("⚠️  Email not configured, skipping donation confirmation");
      return;
    }

    const mailOptions = {
      from: `"Sunnyside Therapy Center" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Donation! - Sunnyside Therapy Center",
      html: templates.donationConfirmation({
        name,
        amount,
        reference,
      }),
    };

    await transporter.sendMail(mailOptions);
    console.log("✉️  Donation confirmation sent to:", email);
  }

  async sendEnrollmentConfirmation({ enrollmentData, referenceNumber }) {
    if (!process.env.SMTP_USER) {
      console.log("⚠️  Email not configured, skipping enrollment confirmation");
      return;
    }

    const { parent1FirstName, parent1LastName, parent1Email, childFirstName, childLastName } =
      enrollmentData;

    const mailOptions = {
      from: `"Sunnyside Therapy Center" <${process.env.SMTP_USER}>`,
      to: parent1Email,
      subject: "Enrollment Application Received - Sunnyside Therapy Center",
      html: templates.enrollmentConfirmation({
        parentName: `${parent1FirstName} ${parent1LastName}`,
        childName: `${childFirstName} ${childLastName}`,
        reference: referenceNumber,
      }),
    };

    await transporter.sendMail(mailOptions);
    console.log("✉️  Enrollment confirmation sent to:", parent1Email);
  }

  async sendAdminNotification({ type, data, reference }) {
    if (!process.env.ADMIN_EMAIL || !process.env.SMTP_USER) {
      console.log("⚠️  Admin email not configured");
      return;
    }

    const subjects = {
      donation_initiated: `💰 New Donation Initiated: K${data.amount}`,
      donation_successful: `✅ Donation Received: K${data.amount}`,
      donation_failed: `❌ Donation Failed: K${data.amount}`,
      enrollment: `🎯 New Student Enrollment: ${data.childFirstName} ${data.childLastName}`,
    };

    const mailOptions = {
      from: `"Sunnyside System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subjects[type] || `🔔 Notification: ${type}`,
      html: templates.adminNotification(type, data, reference),
    };

    await transporter.sendMail(mailOptions);
    console.log(`✉️  Admin notification sent: ${type}`);
  }
}

module.exports = new EmailService();
