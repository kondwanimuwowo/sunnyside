import { sendAdminNotification } from "../_lib/email.js";

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
    const {
      amount,
      donorName,
      donorEmail,
      donorPhone,
      isRecurring,
      frequency,
    } = req.body || {};

    if (!amount || !donorName || !donorEmail) {
      return json(res, 400, {
        success: false,
        message: "Missing required fields",
      });
    }

    const reference = `DON-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)
      .toUpperCase()}`;

    await sendAdminNotification({
      type: "donation_initiated",
      data: {
        amount,
        donorName,
        donorEmail,
        donorPhone,
        isRecurring: !!isRecurring,
        frequency: isRecurring ? frequency : undefined,
        status: "initiated",
      },
      reference,
    });

    return json(res, 200, {
      success: true,
      reference,
      message: "Donation initiated",
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message: "Failed to initiate donation",
    });
  }
}
