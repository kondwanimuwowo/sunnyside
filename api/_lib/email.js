import nodemailer from "nodemailer";
import templates from "./emailTemplates.js";

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

const getFromAddress = () =>
  process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@sunnyside.zm";

export const sendDonationConfirmation = async ({
  email,
  name,
  amount,
  reference,
}) => {
  const transporter = getTransporter();
  if (!transporter || !email) return;

  await transporter.sendMail({
    from: `"Sunnyside Therapy Center" <${getFromAddress()}>`,
    to: email,
    subject: "Thank You for Your Donation!",
    html: templates.donationConfirmation({ name, amount, reference }),
  });
};

export const sendEnrollmentConfirmation = async ({
  enrollmentData,
  referenceNumber,
}) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const { parent1FirstName, parent1LastName, parent1Email, childFirstName, childLastName } =
    enrollmentData;
  if (!parent1Email) return;

  await transporter.sendMail({
    from: `"Sunnyside Therapy Center" <${getFromAddress()}>`,
    to: parent1Email,
    subject: "Enrollment Application Received",
    html: templates.enrollmentConfirmation({
      parentName: `${parent1FirstName} ${parent1LastName}`,
      childName: `${childFirstName} ${childLastName}`,
      reference: referenceNumber,
    }),
  });
};

export const sendAdminNotification = async ({ type, data, reference }) => {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!transporter || !adminEmail) return;

  const subjects = {
    donation_initiated: `New Donation Initiated: K${data.amount}`,
    donation_successful: `Donation Received: K${data.amount}`,
    donation_failed: `Donation Failed: K${data.amount}`,
    enrollment: `New Enrollment: ${data.childFirstName} ${data.childLastName}`,
  };

  await transporter.sendMail({
    from: `"Sunnyside System" <${getFromAddress()}>`,
    to: adminEmail,
    subject: subjects[type] || `Notification: ${type}`,
    html: templates.adminNotification(type, data, reference),
  });
};
