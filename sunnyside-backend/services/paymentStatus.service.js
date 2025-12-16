const lencoClient = require("../config/lenco");

class PaymentStatusService {
  async checkByTransactionId(transactionId) {
    if (!transactionId) {
      throw new Error("No Lenco transaction ID available");
    }

    console.log(
      `🔍 Checking Lenco status for transaction ID: ${transactionId}`
    );

    try {
      const response = await lencoClient.get(
        `/collections/status/${transactionId}`
      );

      const status = response.data?.data?.status;
      console.log(`✅ Status retrieved: ${status}`);

      return response.data;
    } catch (error) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      console.error("⚠️  Lenco API Error:");
      console.error("   Transaction ID:", transactionId);
      console.error("   Status Code:", statusCode);
      console.error("   Message:", errorMessage);

      // ✅ Handle 404/400 - "Collection not found"
      // This is a LENCO BUG with MTN - transaction exists but status endpoint fails
      if (statusCode === 400 || statusCode === 404) {
        console.log("   → Transaction not found (Lenco API issue)");

        // Return a special error object that controller can handle
        return {
          data: {
            id: transactionId,
            status: "lookup-failed", // Special status
            reasonForFailure: errorMessage,
            lencoError: true,
          },
        };
      }

      // For other errors, throw
      throw error;
    }
  }
}

module.exports = new PaymentStatusService();
