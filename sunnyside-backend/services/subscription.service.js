const lencoClient = require("../config/lenco");
const { formatPhone } = require("../utils/formatPhone");

class SubscriptionService {
  /**
   * Create recurring subscription
   * @param {Object} params - Subscription details
   * @returns {Promise} Lenco subscription response
   */
  async createSubscription({
    amount,
    phone,
    operator,
    donorName,
    donorEmail,
    frequency = "monthly", // monthly, weekly, quarterly
    startDate,
  }) {
    const formattedPhone = formatPhone(phone);

    console.log("🔄 Creating recurring subscription:");
    console.log("   Amount:", amount);
    console.log("   Frequency:", frequency);
    console.log("   Phone:", formattedPhone);

    const payload = {
      amount: parseFloat(amount).toFixed(2),
      currency: "ZMW",
      phone: formattedPhone,
      operator: operator.toLowerCase(),
      country: "ZM",
      frequency: frequency,
      startDate: startDate || new Date().toISOString(),
      metadata: {
        donorName,
        donorEmail: donorEmail || "N/A",
        purpose: "Sunnyside Therapy Center - Monthly Donation",
        type: "recurring",
      },
    };

    const response = await lencoClient.post("/subscriptions", payload);

    console.log("✅ Subscription created:", response.data?.data?.id);
    return response.data;
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId) {
    console.log(`❌ Cancelling subscription: ${subscriptionId}`);
    const response = await lencoClient.delete(
      `/subscriptions/${subscriptionId}`
    );
    return response.data;
  }

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId) {
    const response = await lencoClient.get(`/subscriptions/${subscriptionId}`);
    return response.data;
  }
}

module.exports = new SubscriptionService();
