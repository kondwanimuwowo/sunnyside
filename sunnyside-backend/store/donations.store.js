// In-memory store for donations (replace with DB later)
class DonationsStore {
  constructor() {
    this.donations = new Map();
  }
  create(donation) {
    this.donations.set(donation.reference, {
      ...donation,
      createdAt: new Date().toISOString(),
    });
    return donation;
  }
  findByReference(reference) {
    return this.donations.get(reference);
  }
  update(reference, updates) {
    const donation = this.donations.get(reference);
    if (!donation) return null;

    const updated = { ...donation, ...updates };
    this.donations.set(reference, updated);
    return updated;
  }
  list() {
    return Array.from(this.donations.values());
  }
  count() {
    return this.donations.size;
  }
}
module.exports = new DonationsStore();
