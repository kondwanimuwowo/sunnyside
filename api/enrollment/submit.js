import { sendEnrollmentConfirmation, sendAdminNotification } from "../_lib/email.js";

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  try {
    const enrollmentData = req.body || {};

    const requiredFields = [
      "childFirstName",
      "childLastName",
      "parent1FirstName",
      "parent1LastName",
      "parent1Email",
      "parent1Phone",
    ];

    const missing = requiredFields.filter((field) => !enrollmentData[field]);
    if (missing.length > 0) {
      return json(res, 400, {
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const referenceNumber = `ENR-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)
      .toUpperCase()}`;

    await sendEnrollmentConfirmation({ enrollmentData, referenceNumber });
    await sendAdminNotification({
      type: "enrollment",
      data: enrollmentData,
      reference: referenceNumber,
    });

    return json(res, 200, {
      success: true,
      referenceNumber,
      message: "Enrollment submitted successfully",
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message: "Failed to submit enrollment",
    });
  }
}
