const transporter = require("../config/mailer");

class EmailService {
  async sendDonationConfirmation({ email, name, amount, reference }) {
    if (!process.env.SMTP_USER) {
      console.log("⚠️  Email not configured, skipping donation confirmation");
      return;
    }

    const mailOptions = {
      from: `"Sunnyside Therapy Center" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Donation!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #32cd32, #1ba397); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Thank You!</h1>
            <p style="margin: 10px 0 0 0;">Your donation makes a difference</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
            <p>Dear ${name},</p>
            
            <p>Thank you for your generous donation of <strong>K${amount}</strong> to Sunnyside Therapy Center!</p>
            
            <div style="background: rgba(50, 205, 50, 0.1); border: 2px solid #32cd32; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 12px; color: #666;">Reference Number</p>
              <p style="margin: 5px 0; font-size: 24px; font-weight: bold; color: #32cd32; font-family: monospace;">${reference}</p>
            </div>
            
            <p>Your support helps us provide quality therapy and education to children with learning challenges in Zambia.</p>
            
            <p>If you have any questions, feel free to contact us:</p>
            <p>📞 0978501101 / 0973902247<br>
            📧 ${process.env.ADMIN_EMAIL || "[email protected]"}</p>
            
            <p style="margin-top: 30px;">Warm regards,<br><strong>The Sunnyside Team</strong></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✉️  Donation confirmation sent to:", email);
  }

  async sendEnrollmentConfirmation({ enrollmentData, referenceNumber }) {
    if (!process.env.SMTP_USER) {
      console.log("⚠️  Email not configured, skipping enrollment confirmation");
      return;
    }

    const { parent1FirstName, parent1Email, childFirstName, childLastName } =
      enrollmentData;

    const mailOptions = {
      from: `"Sunnyside Therapy Center" <${process.env.SMTP_USER}>`,
      to: parent1Email,
      subject: "Enrollment Confirmed - Sunnyside Therapy Center",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #32cd32, #1ba397); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">🎉 Enrollment Confirmed!</h1>
            <p style="margin: 10px 0 0 0;">Welcome to Sunnyside</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
            <p>Dear ${parent1FirstName},</p>
            
            <p>Thank you for enrolling <strong>${childFirstName} ${childLastName}</strong> at Sunnyside Therapy Center!</p>
            
            <div style="background: rgba(50, 205, 50, 0.1); border: 2px solid #32cd32; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 12px; color: #666;">Reference Number</p>
              <p style="margin: 5px 0; font-size: 24px; font-weight: bold; color: #32cd32; font-family: monospace;">${referenceNumber}</p>
            </div>
            
            <h3 style="color: #32cd32;">What Happens Next?</h3>
            <ol style="line-height: 1.8;">
              <li>Our team will contact you within 24 hours</li>
              <li>We'll schedule an initial assessment</li>
              <li>Create a customized therapy plan</li>
              <li>Begin your child's journey to success!</li>
            </ol>
            
            <p>Contact us: 📞 0978501101 | 📧 ${
              process.env.ADMIN_EMAIL || "[email protected]"
            }</p>
            
            <p style="margin-top: 30px;">Warm regards,<br><strong>The Sunnyside Team</strong></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✉️  Enrollment confirmation sent to:", parent1Email);
  }

  async sendAdminNotification({ type, data, reference }) {
    if (!process.env.ADMIN_EMAIL || !process.env.SMTP_USER) {
      console.log("⚠️  Admin email not configured");
      return;
    }

    // ✅ FIX: Handle all donation notification types
    const subjects = {
      // Donations
      donation_initiated: `💰 Donation Initiated: K${data.amount} (${data.paymentMethod})`,
      donation_successful: `✅ Donation Successful: K${data.amount}`,
      donation_failed: `❌ Donation Failed: K${data.amount}`,
      // Legacy support
      donation: `💰 New Donation: K${data.amount}`,
      // Enrollment
      enrollment: `🎯 New Enrollment: ${data.childFirstName} ${data.childLastName}`,
    };

    const mailOptions = {
      from: `"Sunnyside System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subjects[type] || `🔔 New Notification: ${type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #32cd32; color: white; padding: 20px;">
            <h2 style="margin: 0;">${subjects[type] || type}</h2>
            <p style="margin: 5px 0;">Reference: ${reference}</p>
          </div>
          <div style="background: #f9f9f9; padding: 20px;">
            <pre style="background: white; padding: 15px; border-radius: 6px; overflow-x: auto;">${JSON.stringify(
              data,
              null,
              2
            )}</pre>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✉️  Admin notification sent: ${type}`);
  }
}

module.exports = new EmailService();
