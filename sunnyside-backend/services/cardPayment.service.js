const lencoClient = require("../config/lenco");

class CardPaymentService {
  async initiate({
    amount,
    cardNumber,
    expiryDate,
    cvv,
    donorName,
    donorEmail,
    reference,
  }) {
    console.log("💳 Initiating card payment:");
    console.log(" Card:", cardNumber?.substring(0, 4) + "****" || "****");
    console.log(" Amount:", amount);

    // Parse expiry date (assumes MM/YY format)
    const [month, year] = expiryDate.split("/");
    if (!month || !year) {
      throw new Error("Invalid expiry date format");
    }

    const fullYear = `20${year.trim()}`;

    const payload = {
      amount: parseFloat(amount).toFixed(2),
      currency: "ZMW",
      reference,
      card: {
        number: cardNumber.replace(/\s/g, ""),
        expiryMonth: month.trim(),
        expiryYear: fullYear,
        cvv: cvv.trim(),
      },
      customer: {
        name: donorName,
        email: donorEmail || "donor@sunnysidetherapy.zm",
      },
      metadata: {
        donorName,
        donorEmail: donorEmail || "N/A",
        purpose: "Sunnyside Therapy Center Donation",
        paymentMethod: "card",
      },
    };

    const response = await lencoClient.post("/collections/card", payload);
    return response.data; // Important: contains the Lenco transaction ID
  }
}

module.exports = new CardPaymentService();
