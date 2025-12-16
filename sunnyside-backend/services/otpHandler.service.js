const lencoClient = require("../config/lenco");

class OTPHandlerService {
  /**
   * Submit OTP for mobile money collection
   * @param {string} collectionId - Lenco collection ID
   * @param {string} otp - OTP code from user
   */
  async submitOTP(collectionId, otp) {
    console.log(`📱 Submitting OTP for collection: ${collectionId}`);
    console.log(`   OTP Code: ${"*".repeat(otp.length)}`); // Don't log actual OTP

    try {
      const response = await lencoClient.post(
        `/collections/${collectionId}/otp`,
        { otp: otp.trim() }
      );

      console.log(`✅ OTP submitted successfully`);
      console.log(`   New Status: ${response.data?.data?.status}`);

      return response.data;
    } catch (error) {
      console.error(`❌ OTP submission failed:`);
      console.error(`   Status: ${error.response?.status}`);
      console.error(
        `   Message: ${error.response?.data?.message || error.message}`
      );

      throw error;
    }
  }
}

module.exports = new OTPHandlerService();
