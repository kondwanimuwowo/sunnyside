export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/[\s\-+]/g, "");

  if (cleaned.startsWith("0")) {
    return "260" + cleaned.substring(1);
  } else if (!cleaned.startsWith("260")) {
    return "260" + cleaned;
  }

  return cleaned;
};

export const formatCurrency = (amount, currency = "ZMW") => {
  return `${currency} ${parseFloat(amount).toFixed(2)}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const cleaned = phone.replace(/[\s\-+]/g, "");
  return cleaned.length >= 9 && cleaned.length <= 12;
};

export const generateReference = (prefix = "REF") => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};
