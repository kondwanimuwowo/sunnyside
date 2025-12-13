import { useState, useCallback } from "react";

export const useForm = (initialValues = {}, validators = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate on blur
      if (validators[name]) {
        const error = validators[name](values[name]);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            [name]: error,
          }));
        }
      }
    },
    [values, validators]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validators).forEach((field) => {
      const error = validators[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validators]);

  const handleSubmit = useCallback(
    async (onSubmit) => {
      const isValid = validateAll();

      if (!isValid) {
        // Mark all fields as touched to show errors
        const allTouched = {};
        Object.keys(validators).forEach((key) => {
          allTouched[key] = true;
        });
        setTouched(allTouched);
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validators, validateAll]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
};
