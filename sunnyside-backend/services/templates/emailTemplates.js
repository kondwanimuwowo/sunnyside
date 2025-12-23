const styles = {
  container: `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    color: #333333;
    line-height: 1.6;
  `,
  header: `
    background: linear-gradient(135deg, #32cd32 0%, #28a428 100%);
    padding: 40px 20px;
    text-align: center;
    border-radius: 12px 12px 0 0;
  `,
  headerTitle: `
    color: #ffffff;
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
  `,
  headerSubtitle: `
    color: rgba(255, 255, 255, 0.9);
    margin: 10px 0 0 0;
    font-size: 16px;
  `,
  content: `
    padding: 40px 30px;
    background-color: #ffffff;
    border: 1px solid #f0f0f0;
    border-top: none;
  `,
  greeting: `
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #111111;
  `,
  paragraph: `
    margin-bottom: 20px;
    color: #555555;
    font-size: 16px;
  `,
  highlightBox: `
    background-color: #f8fff8;
    border: 1px solid #32cd32;
    border-radius: 8px;
    padding: 25px;
    margin: 30px 0;
    text-align: center;
  `,
  highlightLabel: `
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666666;
    margin-bottom: 10px;
    display: block;
  `,
  highlightValue: `
    font-size: 32px;
    font-weight: 700;
    color: #32cd32;
    margin: 0;
    display: block;
  `,
  detailsTable: `
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
  `,
  detailsRow: `
    border-bottom: 1px solid #eeeeee;
  `,
  detailsLabel: `
    padding: 12px 0;
    color: #666666;
    font-weight: 500;
  `,
  detailsValue: `
    padding: 12px 0;
    text-align: right;
    color: #111111;
    font-weight: 600;
  `,
  footer: `
    text-align: center;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 0 0 12px 12px;
    color: #888888;
    font-size: 13px;
    border: 1px solid #f0f0f0;
    border-top: none;
  `,
  button: `
    display: inline-block;
    padding: 14px 28px;
    background-color: #32cd32;
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
  `,
};

const getBaseLayout = (title, subtitle, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
  <div style="${styles.container}">
    <!-- Header -->
    <div style="${styles.header}">
      <h1 style="${styles.headerTitle}">${title}</h1>
      <p style="${styles.headerSubtitle}">${subtitle}</p>
    </div>

    <!-- Content -->
    <div style="${styles.content}">
      ${content}
    </div>

    <!-- Footer -->
    <div style="${styles.footer}">
      <p style="margin: 0 0 10px 0;">Sunnyside Therapy Center</p>
      <p style="margin: 0 0 10px 0;">Specialized Care for Special Children</p>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eeeeee;">
        <p style="margin: 0;">📞 0978501101  |  📧 support@sunnyside.zm</p>
        <p style="margin: 10px 0 0 0;">Lusaka, Zambia</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const templates = {
  donationConfirmation: (data) => {
    const content = `
      <p style="${styles.greeting}">Dear ${data.name},</p>
      
      <p style="${styles.paragraph}">
        Verify your transaction below. We are incredibly grateful for your generous donation of <strong>K${data.amount}</strong> to Sunnyside Therapy Center.
      </p>

      <div style="${styles.highlightBox}">
        <span style="${styles.highlightLabel}">Donation Reference</span>
        <span style="${styles.highlightValue}">${data.reference}</span>
      </div>

      <p style="${styles.paragraph}">
        Your support directly empowers us to provide specialized therapy, educational resources, and a nurturing environment for children with developmental challenges. You are making a real difference in their lives.
      </p>

      <table style="${styles.detailsTable}">
        <tr style="${styles.detailsRow}">
          <td style="${styles.detailsLabel}">Amount</td>
          <td style="${styles.detailsValue}">K${data.amount}</td>
        </tr>
        <tr style="${styles.detailsRow}">
          <td style="${styles.detailsLabel}">Date</td>
          <td style="${styles.detailsValue}">${new Date().toLocaleDateString()}</td>
        </tr>
      </table>

      <p style="${styles.paragraph}" style="margin-top: 30px;">
        Warm regards,<br>
        <strong>The Sunnyside Team</strong>
      </p>
    `;
    return getBaseLayout("Thank You!", "Your donation makes a difference", content);
  },

  enrollmentConfirmation: (data) => {
    const content = `
      <p style="${styles.greeting}">Dear ${data.parentName},</p>
      
      <p style="${styles.paragraph}">
        We are thrilled to welcome <strong>${data.childName}</strong> to the Sunnyside family! We have successfully received your enrollment application.
      </p>

      <div style="${styles.highlightBox}">
        <span style="${styles.highlightLabel}">Application Reference</span>
        <span style="${styles.highlightValue}">${data.reference}</span>
      </div>

      <h3 style="color: #333; font-size: 18px; margin-top: 30px; margin-bottom: 15px;">What Happens Next?</h3>
      
      <div style="margin-bottom: 30px;">
        <div style="display: table; width: 100%; margin-bottom: 15px;">
          <div style="display: table-cell; vertical-align: top; width: 40px;">
            <div style="background: #32cd32; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 14px;">1</div>
          </div>
          <div style="display: table-cell; vertical-align: top;">
            <strong style="display: block; margin-bottom: 4px; color: #111;">Application Review</strong>
            <span style="color: #666; font-size: 14px;">Our clinical team will review your application within 24 hours.</span>
          </div>
        </div>

        <div style="display: table; width: 100%; margin-bottom: 15px;">
          <div style="display: table-cell; vertical-align: top; width: 40px;">
            <div style="background: #32cd32; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 14px;">2</div>
          </div>
          <div style="display: table-cell; vertical-align: top;">
            <strong style="display: block; margin-bottom: 4px; color: #111;">Initial Consultation</strong>
            <span style="color: #666; font-size: 14px;">We will contact you to schedule an initial assessment meeting.</span>
          </div>
        </div>

        <div style="display: table; width: 100%;">
          <div style="display: table-cell; vertical-align: top; width: 40px;">
            <div style="background: #32cd32; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 14px;">3</div>
          </div>
          <div style="display: table-cell; vertical-align: top;">
            <strong style="display: block; margin-bottom: 4px; color: #111;">Welcome Aboard</strong>
            <span style="color: #666; font-size: 14px;">We'll begin the journey to unlock your child's full potential!</span>
          </div>
        </div>
      </div>

      <p style="${styles.paragraph}">
        If you have any urgent questions, please don't hesitate to reply to this email or call us directly.
      </p>

      <p style="${styles.paragraph}">
        Warm regards,<br>
        <strong>The Sunnyside Team</strong>
      </p>
    `;
    return getBaseLayout("Enrollment Received", "Welcome to Sunnyside Therapy Center", content);
  },

  adminNotification: (type, data, reference) => {
    let title = "New Notification";
    let subtitle = "System Alert";
    let detailsHtml = "";

    // Format data into a readable table
    const formatData = (obj) => {
      let html = `<table style="${styles.detailsTable}">`;
      for (const [key, value] of Object.entries(obj)) {
        // Skip complex objects or large arrays
        if (typeof value === 'object' && value !== null) continue;
        
        // Format key
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        html += `
          <tr style="${styles.detailsRow}">
            <td style="${styles.detailsLabel}">${label}</td>
            <td style="${styles.detailsValue}">${value}</td>
          </tr>
        `;
      }
      html += "</table>";
      return html;
    };

    if (type === "donation_successful" || type === "donation_initiated") {
      title = "💰 New Donation";
      subtitle = `Amount: K${data.amount}`;
      detailsHtml = formatData({
        Amount: `K${data.amount}`,
        Donor: data.donorName,
        Email: data.donorEmail,
        "Payment Method": data.paymentMethod,
        Status: data.status || type.split('_')[1]
      });
    } else if (type === "donation_failed") {
      title = "❌ Donation Failed";
      subtitle = `Amount: K${data.amount}`;
      detailsHtml = formatData(data);
    } else if (type === "enrollment") {
      title = "🎯 New Enrollment";
      subtitle = `${data.childFirstName} ${data.childLastName}`;
      detailsHtml = formatData({
        "Child Name": `${data.childFirstName} ${data.childLastName}`,
        "Parent Name": `${data.parent1FirstName} ${data.parent1LastName}`,
        "Parent Email": data.parent1Email,
        "Parent Phone": data.parent1Phone,
        Diagnosis: data.diagnosis,
        "Preferred Time": data.preferredTime
      });
      
      // Add a note that full details are in the system (since we aren't showing everything)
      detailsHtml += `
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
          Full enrollment details are available in the JSON payload or Admin Dashboard.
        </div>
      `;
    }

    const content = `
      <p style="${styles.greeting}">Hello Admin,</p>
      
      <p style="${styles.paragraph}">
        A new activity has been recorded in the system.
      </p>

      <div style="${styles.highlightBox}">
        <span style="${styles.highlightLabel}">Reference ID</span>
        <span style="${styles.highlightValue}" style="font-size: 24px;">${reference}</span>
      </div>

      ${detailsHtml}

      <div style="margin-top: 30px; background: #222; color: #0f0; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; overflow-x: auto;">
        ${JSON.stringify(data, null, 2)}
      </div>

      <p style="${styles.paragraph}" style="margin-top: 20px; font-size: 12px; color: #999;">
        This is an automated system notification.
      </p>
    `;
    return getBaseLayout(title, subtitle, content);
  }
};

module.exports = templates;
