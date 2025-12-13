import { useState, useCallback } from "react";
import { donationValidators } from "@utils/validators";

export const useDonationForm = () => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((field, value) => {
    const validator = donationValidators[field];
    if (!validator) return null;

    const error = validator(value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error;
  }, []);

  const validateAll = useCallback((data) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(donationValidators).forEach((field) => {
      const error = donationValidators[field](data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    clearFieldError,
  };
};
