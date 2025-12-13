/**
 * Format phone number for Zambian mobile money
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone (260XXXXXXXXX)
 */
function formatPhone(phone) {
  if (!phone) return "";

  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, "");

  // Add country code if missing
  if (cleaned.startsWith("0")) {
    cleaned = "260" + cleaned.substring(1);
  } else if (!cleaned.startsWith("260")) {
    cleaned = "260" + cleaned;
  }

  return cleaned;
}

/**
 * Validate Zambian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
function isValidZambianPhone(phone) {
  const formatted = formatPhone(phone);
  // Zambian mobile: 260 + 9/7 + 8 digits
  return /^260[97]\d{8}$/.test(formatted);
}

module.exports = { formatPhone, isValidZambianPhone };
