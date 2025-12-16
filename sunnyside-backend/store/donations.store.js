// In-memory store for donations (replace with DB later)
class DonationsStore {
  constructor() {
    this.donations = new Map();
  }

  create(donation) {
    const timestamp = new Date().toISOString();
    const newDonation = {
      ...donation,
      createdAt: donation.createdAt || Date.now(), // Track timestamp for timeout
      lookupFailCount: donation.lookupFailCount || 0, // Track Lenco lookup failures
      updatedAt: timestamp,
      createdAtISO: timestamp,
    };

    this.donations.set(donation.reference, newDonation);
    return newDonation;
  }

  findByReference(reference) {
    return this.donations.get(reference);
  }

  update(reference, updates) {
    const donation = this.donations.get(reference);
    if (!donation) return null;

    const updated = {
      ...donation,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.donations.set(reference, updated);
    return updated;
  }

  list() {
    return Array.from(this.donations.values()).sort(
      (a, b) => new Date(b.createdAtISO) - new Date(a.createdAtISO)
    );
  }

  count() {
    return this.donations.size;
  }

  // ✅ NEW: Clean up old donations (optional - for memory management)
  cleanup(olderThanHours = 24) {
    const cutoff = Date.now() - olderThanHours * 60 * 60 * 1000;
    let cleaned = 0;

    for (const [ref, donation] of this.donations.entries()) {
      if (donation.createdAt < cutoff) {
        this.donations.delete(ref);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old donations`);
    }

    return cleaned;
  }
}

module.exports = new DonationsStore();
