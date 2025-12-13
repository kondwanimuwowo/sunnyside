export const donationValidators = {
  amount: (value) => {
    if (!value) return "Amount is required";
    if (isNaN(value)) return "Amount must be a number";
    if (parseFloat(value) < 10) return "Minimum donation is K10";
    return null;
  },

  name: (value) => {
    if (!value || value.trim().length === 0) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return null;
  },

  email: (value) => {
    if (!value) return null; // Email is optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Invalid email format";
    return null;
  },

  phone: (value) => {
    if (!value || value.trim().length === 0) return "Phone number is required";
    const cleaned = value.replace(/[\s\-+]/g, "");
    if (cleaned.length < 9 || cleaned.length > 12)
      return "Invalid phone number";
    return null;
  },

  operator: (value) => {
    if (!value) return "Please select a mobile money operator";
    return null;
  },
};

export const contactValidators = {
  name: (value) => {
    if (!value || value.trim().length === 0) return "Name is required";
    return null;
  },

  email: (value) => {
    if (!value || value.trim().length === 0) return "Email is required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Invalid email format";
    return null;
  },

  phone: (value) => {
    if (!value) return null; // Phone is optional
    const cleaned = value.replace(/[\s\-+]/g, "");
    if (cleaned.length < 9 || cleaned.length > 12)
      return "Invalid phone number";
    return null;
  },

  subject: (value) => {
    if (!value) return "Please select a subject";
    return null;
  },

  message: (value) => {
    if (!value || value.trim().length === 0) return "Message is required";
    if (value.trim().length < 10)
      return "Message must be at least 10 characters";
    return null;
  },
};
