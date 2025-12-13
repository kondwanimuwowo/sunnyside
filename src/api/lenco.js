import axios from "axios";
import { formatPhoneNumber, generateReference } from "@utils/helpers";

const LENCO_API_URL =
  import.meta.env.VITE_LENCO_API_URL || "https://api.lenco.co/v2";
const LENCO_PUBLIC_KEY = import.meta.env.VITE_LENCO_PUBLIC_KEY;
const LENCO_SANDBOX = import.meta.env.VITE_LENCO_SANDBOX === "true";

const lencoClient = axios.create({
  baseURL: LENCO_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LENCO_PUBLIC_KEY}`,
  },
});

export const initiateMobileMoneyPayment = async (paymentData) => {
  try {
    const { amount, phone, operator, donorName, donorEmail } = paymentData;

    const formattedPhone = formatPhoneNumber(phone);
    const reference = generateReference("DONATION");

    const payload = {
      amount: parseFloat(amount).toFixed(2),
      currency: "ZMW",
      reference,
      phone: formattedPhone,
      operator,
      country: "ZM",
      callbackUrl: `${window.location.origin}/donation-callback`,
      metadata: {
        donorName,
        donorEmail: donorEmail || "N/A",
        purpose: "Sunnyside Therapy Center Donation",
        timestamp: new Date().toISOString(),
      },
    };

    const response = await lencoClient.post(
      "/collections/mobile-money",
      payload
    );

    return {
      success: true,
      data: response.data,
      reference,
    };
  } catch (error) {
    console.error("Lenco payment error:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "Payment initiation failed",
      error: error.response?.data || error.message,
    };
  }
};

export const verifyPayment = async (reference) => {
  try {
    const response = await lencoClient.get(`/collections/verify/${reference}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    throw {
      success: false,
      message: "Payment verification failed",
      error: error.response?.data || error.message,
    };
  }
};

export const getPaymentStatus = async (reference) => {
  try {
    const response = await lencoClient.get(`/collections/status/${reference}`);
    return response.data;
  } catch (error) {
    console.error("Get payment status error:", error);
    throw error;
  }
};
