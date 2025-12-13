// Unified payment status service (works for both mobile money and card collections)
const lencoClient = require("../config/lenco");

class PaymentStatusService {
  async checkByTransactionId(transactionId) {
    if (!transactionId) {
      throw new Error("No Lenco transaction ID available");
    }
    console.log(
      `🔍 Checking Lenco status for transaction ID: ${transactionId}`
    );
    const response = await lencoClient.get(
      `/collections/status/${transactionId}`
    );
    return response.data;
  }
}

module.exports = new PaymentStatusService();
