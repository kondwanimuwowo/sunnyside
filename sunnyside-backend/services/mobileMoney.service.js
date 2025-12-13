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
    console.log("📱 Initiating mobile money payment:");
    console.log(" Phone:", formattedPhone);
    console.log(" Operator:", operator);
    console.log(" Amount:", amount);
    const payload = {
      amount: parseFloat(amount).toFixed(2),
      currency: "ZMW",
      reference,
      phone: formattedPhone,
      operator: operator.toLowerCase(),
      country: "ZM",
      metadata: {
        donorName,
        donorEmail: donorEmail || "N/A",
        purpose: "Sunnyside Therapy Center Donation",
        paymentMethod: "mobile-money",
      },
    };
    const response = await lencoClient.post(
      "/collections/mobile-money",
      payload
    );
    // Important: return full data so controller can extract id
    return response.data;
  }
}

module.exports = new MobileMoneyService();
