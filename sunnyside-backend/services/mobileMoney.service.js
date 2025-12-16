const lencoClient = require("../config/lenco");
const { formatPhone } = require("../utils/formatPhone");

class MobileMoneyService {
  async initiate({
    amount,
    phone,
    operator,
    donorName,
    donorEmail,
    reference,
  }) {
    const formattedPhone = formatPhone(phone);
    const normalizedOperator = operator.toLowerCase().trim();

    const validOperators = ["airtel", "mtn", "zamtel"];
    if (!validOperators.includes(normalizedOperator)) {
      throw new Error(
        `Invalid operator: ${operator}. Must be one of: ${validOperators.join(
          ", "
        )}`
      );
    }

    console.log("📱 Initiating mobile money payment:");
    console.log("   Phone (original):", phone);
    console.log("   Phone (formatted):", formattedPhone);
    console.log("   Operator:", normalizedOperator);
    console.log("   Amount:", amount);
    console.log("   Reference:", reference);

    // ✅ FIX: Add warning for MTN
    if (normalizedOperator === "mtn") {
      console.log(
        "⚠️  WARNING: MTN integration has known issues with Lenco API"
      );
      console.log(
        "   If prompt doesn't arrive, this is a Lenco API limitation"
      );
    }

    const payload = {
      amount: parseFloat(amount).toFixed(2),
      currency: "ZMW",
      reference,
      phone: formattedPhone,
      operator: normalizedOperator,
      country: "ZM",
      metadata: {
        donorName,
        donorEmail: donorEmail || "N/A",
        purpose: "Sunnyside Therapy Center Donation",
        paymentMethod: "mobile-money",
      },
    };

    console.log("🚀 Lenco API Payload:");
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await lencoClient.post(
        "/collections/mobile-money",
        payload
      );

      console.log("✅ Lenco API Response:");
      console.log("   Status Code:", response.status);
      console.log("   Transaction ID:", response.data?.data?.id);
      console.log("   Status:", response.data?.data?.status);
      console.log("   Full Response:", JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.error("❌ Lenco API Error:");
      console.error("   Status:", error.response?.status);
      console.error(
        "   Message:",
        error.response?.data?.message || error.message
      );
      console.error(
        "   Full Response:",
        JSON.stringify(error.response?.data, null, 2)
      );
      throw error;
    }
  }
}

module.exports = new MobileMoneyService();
