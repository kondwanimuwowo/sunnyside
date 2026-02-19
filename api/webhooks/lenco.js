import crypto from "crypto";
import { sendAdminNotification, sendDonationConfirmation } from "../_lib/email.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const getRawBody = async (req) =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(Buffer.from(data)));
    req.on("error", reject);
  });

const verifySignature = (rawBody, signature) => {
  const secret = process.env.LENCO_WEBHOOK_SIGNATURE;
  if (!secret) return true;
  if (!signature) return false;

  const hash = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return hash === signature;
};

const isValidEmail = (value) =>
  typeof value === "string" && /.+@.+\..+/.test(value.trim());

const pickFirstString = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
};

const pickNumber = (...values) => {
  for (const value of values) {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }
  return null;
};

const pickEmail = (data, meta) => {
  const email = pickFirstString(
    data?.customer?.email,
    data?.customerEmail,
    data?.email,
    data?.payer?.email,
    meta?.donorEmail,
    meta?.email
  );
  return isValidEmail(email) ? email : null;
};

const pickName = (data, meta) => {
  const fullName = pickFirstString(
    data?.customer?.name,
    data?.customerName,
    data?.payer?.name,
    data?.name,
    meta?.donorName
  );
  if (fullName) return fullName;

  const firstName = pickFirstString(data?.firstName, meta?.firstName);
  const lastName = pickFirstString(data?.lastName, meta?.lastName);
  if (firstName || lastName) {
    return [firstName, lastName].filter(Boolean).join(" ");
  }
  return "Donor";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature =
      req.headers["x-lenco-signature"] ||
      req.headers["x-lenco-webhook-signature"];

    if (!verifySignature(rawBody, signature)) {
      return json(res, 401, { success: false, message: "Invalid signature" });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody.toString("utf8"));
    } catch (parseError) {
      return json(res, 400, { success: false, message: "Invalid JSON body" });
    }

    const event = pickFirstString(payload?.event, payload?.type)?.toLowerCase();
    const data = payload?.data || payload?.payload || {};
    const meta = data?.metadata || payload?.metadata || {};
    const status = pickFirstString(
      data?.status,
      data?.paymentStatus,
      payload?.status
    );
    const normalizedStatus = status ? status.toLowerCase() : "";

    const reference =
      pickFirstString(data?.reference, payload?.reference, meta?.reference) ||
      "UNKNOWN";
    const amount = pickNumber(
      data?.amount,
      data?.amountPaid,
      data?.amountCollected,
      meta?.amount
    );
    const currency =
      pickFirstString(data?.currency, data?.currencyCode, meta?.currency) ||
      "ZMW";

    const hasEvent = Boolean(event);
    const isSuccess =
      event === "collection.successful" ||
      (!hasEvent && normalizedStatus === "successful") ||
      normalizedStatus === "success";
    const isFailed =
      event === "collection.failed" ||
      (!hasEvent && normalizedStatus === "failed") ||
      normalizedStatus === "failure";

    if (isSuccess) {
      const donorEmail = pickEmail(data, meta);
      const donorName = pickName(data, meta);

      await sendDonationConfirmation({
        email: donorEmail,
        name: donorName,
        amount: amount || "N/A",
        reference,
      });

      await sendAdminNotification({
        type: "donation_successful",
        data: {
          amount: amount || "N/A",
          currency,
          donorName,
          donorEmail: donorEmail || "unknown",
          status: status || "successful",
        },
        reference,
      });
    }

    if (isFailed) {
      await sendAdminNotification({
        type: "donation_failed",
        data: {
          amount: amount || "N/A",
          currency,
          reason: data?.reasonForFailure || "Payment failed",
          status: status || "failed",
        },
        reference,
      });
    }

    return json(res, 200, { received: true });
  } catch (error) {
    return json(res, 500, { success: false, message: "Webhook failed" });
  }
}
