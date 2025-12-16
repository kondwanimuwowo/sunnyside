// In-memory store for subscriptions (replace with DB later)
class SubscriptionsStore {
  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * Create new subscription
   */
  create(subscription) {
    const timestamp = new Date().toISOString();
    const newSubscription = {
      ...subscription,
      createdAt: subscription.createdAt || Date.now(),
      createdAtISO: timestamp,
      updatedAt: timestamp,
      status: subscription.status || "active", // active, paused, cancelled
      nextBillingDate: this.calculateNextBilling(
        subscription.frequency,
        subscription.startDate
      ),
      totalCollected: 0,
      successfulPayments: 0,
      failedPayments: 0,
      paymentHistory: [],
    };

    this.subscriptions.set(subscription.reference, newSubscription);
    console.log(`✅ Subscription created: ${subscription.reference}`);
    return newSubscription;
  }

  /**
   * Find subscription by reference
   */
  findByReference(reference) {
    return this.subscriptions.get(reference);
  }

  /**
   * Find subscription by Lenco subscription ID
   */
  findByLencoId(lencoId) {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.lencoSubscriptionId === lencoId
    );
  }

  /**
   * Find all subscriptions by donor email
   */
  findByDonorEmail(email) {
    return Array.from(this.subscriptions.values()).filter(
      (sub) => sub.donorEmail?.toLowerCase() === email.toLowerCase()
    );
  }

  /**
   * Update subscription
   */
  update(reference, updates) {
    const subscription = this.subscriptions.get(reference);
    if (!subscription) {
      console.warn(`⚠️  Subscription not found: ${reference}`);
      return null;
    }

    const updated = {
      ...subscription,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.subscriptions.set(reference, updated);
    console.log(`📝 Subscription updated: ${reference}`);
    return updated;
  }

  /**
   * Record payment for subscription
   */
  recordPayment(reference, paymentData) {
    const subscription = this.subscriptions.get(reference);
    if (!subscription) return null;

    const payment = {
      date: new Date().toISOString(),
      amount: paymentData.amount,
      status: paymentData.status, // successful, failed
      lencoTransactionId: paymentData.lencoTransactionId,
      reasonForFailure: paymentData.reasonForFailure || null,
    };

    const paymentHistory = [...(subscription.paymentHistory || []), payment];

    const updates = {
      paymentHistory,
      totalCollected:
        paymentData.status === "successful"
          ? subscription.totalCollected + parseFloat(paymentData.amount)
          : subscription.totalCollected,
      successfulPayments:
        paymentData.status === "successful"
          ? subscription.successfulPayments + 1
          : subscription.successfulPayments,
      failedPayments:
        paymentData.status === "failed"
          ? subscription.failedPayments + 1
          : subscription.failedPayments,
      lastPaymentDate: new Date().toISOString(),
      nextBillingDate:
        paymentData.status === "successful"
          ? this.calculateNextBilling(subscription.frequency, new Date())
          : subscription.nextBillingDate,
    };

    return this.update(reference, updates);
  }

  /**
   * Cancel subscription
   */
  cancel(reference, reason = "user_requested") {
    return this.update(reference, {
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
      cancellationReason: reason,
    });
  }

  /**
   * Pause subscription
   */
  pause(reference) {
    return this.update(reference, {
      status: "paused",
      pausedAt: new Date().toISOString(),
    });
  }

  /**
   * Resume subscription
   */
  resume(reference) {
    const subscription = this.subscriptions.get(reference);
    if (!subscription || subscription.status !== "paused") return null;

    return this.update(reference, {
      status: "active",
      pausedAt: null,
      nextBillingDate: this.calculateNextBilling(
        subscription.frequency,
        new Date()
      ),
    });
  }

  /**
   * List all subscriptions with filters
   */
  list(filters = {}) {
    let subscriptions = Array.from(this.subscriptions.values());

    // Filter by status
    if (filters.status) {
      subscriptions = subscriptions.filter(
        (sub) => sub.status === filters.status
      );
    }

    // Filter by donor
    if (filters.donorEmail) {
      subscriptions = subscriptions.filter(
        (sub) =>
          sub.donorEmail?.toLowerCase() === filters.donorEmail.toLowerCase()
      );
    }

    // Filter by operator
    if (filters.operator) {
      subscriptions = subscriptions.filter(
        (sub) => sub.operator === filters.operator
      );
    }

    // Sort by creation date (newest first)
    return subscriptions.sort(
      (a, b) => new Date(b.createdAtISO) - new Date(a.createdAtISO)
    );
  }

  /**
   * Get active subscriptions
   */
  getActive() {
    return this.list({ status: "active" });
  }

  /**
   * Get subscriptions due for billing
   */
  getDueForBilling() {
    const now = new Date();
    return this.getActive().filter((sub) => {
      const billingDate = new Date(sub.nextBillingDate);
      return billingDate <= now;
    });
  }

  /**
   * Count subscriptions
   */
  count(filters = {}) {
    return this.list(filters).length;
  }

  /**
   * Get subscription statistics
   */
  getStats() {
    const all = Array.from(this.subscriptions.values());
    const active = all.filter((sub) => sub.status === "active");

    const totalRevenue = all.reduce(
      (sum, sub) => sum + (sub.totalCollected || 0),
      0
    );

    const monthlyRecurringRevenue = active.reduce((sum, sub) => {
      const amount = parseFloat(sub.amount);
      if (sub.frequency === "monthly") return sum + amount;
      if (sub.frequency === "quarterly") return sum + amount / 3;
      if (sub.frequency === "annually") return sum + amount / 12;
      return sum;
    }, 0);

    return {
      total: all.length,
      active: active.length,
      paused: all.filter((sub) => sub.status === "paused").length,
      cancelled: all.filter((sub) => sub.status === "cancelled").length,
      totalRevenue: totalRevenue.toFixed(2),
      monthlyRecurringRevenue: monthlyRecurringRevenue.toFixed(2),
      averageAmount:
        active.length > 0
          ? (
              active.reduce((sum, sub) => sum + parseFloat(sub.amount), 0) /
              active.length
            ).toFixed(2)
          : 0,
    };
  }

  /**
   * Calculate next billing date based on frequency
   */
  calculateNextBilling(frequency, startDate) {
    const date = new Date(startDate);

    switch (frequency) {
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "quarterly":
        date.setMonth(date.getMonth() + 3);
        break;
      case "annually":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        date.setMonth(date.getMonth() + 1); // Default to monthly
    }

    return date.toISOString();
  }

  /**
   * Clean up old cancelled subscriptions (optional - for memory management)
   */
  cleanup(olderThanMonths = 12) {
    const cutoff = Date.now() - olderThanMonths * 30 * 24 * 60 * 60 * 1000;
    let cleaned = 0;

    for (const [ref, sub] of this.subscriptions.entries()) {
      if (
        sub.status === "cancelled" &&
        new Date(sub.cancelledAt).getTime() < cutoff
      ) {
        this.subscriptions.delete(ref);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old cancelled subscriptions`);
    }

    return cleaned;
  }

  /**
   * Export all subscriptions (for backup/migration)
   */
  exportAll() {
    return Array.from(this.subscriptions.values());
  }

  /**
   * Import subscriptions (from backup/migration)
   */
  importAll(subscriptions) {
    subscriptions.forEach((sub) => {
      this.subscriptions.set(sub.reference, sub);
    });
    console.log(`📥 Imported ${subscriptions.length} subscriptions`);
  }
}

module.exports = new SubscriptionsStore();
