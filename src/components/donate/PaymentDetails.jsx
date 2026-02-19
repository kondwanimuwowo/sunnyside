import React, { useEffect, useState } from "react";
import Input from "@components/common/Input";
import { User, Mail, Phone } from "lucide-react";

const PaymentDetails = ({ donorInfo, setDonorInfo, error }) => {
  const [fieldErrors, setFieldErrors] = useState({});

  const validatePhone = (phone) => {
    if (!phone) return null;
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length < 9) {
      return "Phone number too short";
    }
    if (cleaned.length > 12) {
      return "Phone number too long";
    }

    // Check Zambian format
    const validPrefixes = ["097", "077", "096", "076", "095", "075", "260"];
    const prefix = cleaned.startsWith("260")
      ? cleaned.substring(3, 6)
      : cleaned.substring(0, 3);

    if (!validPrefixes.includes(prefix) && !cleaned.startsWith("260")) {
      return "Invalid Zambian number";
    }

    return null;
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : "Invalid email format";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const errors = {};

      const phoneError = validatePhone(donorInfo.phone);
      if (phoneError) errors.phone = phoneError;

      const emailError = validateEmail(donorInfo.email);
      if (emailError) errors.email = emailError;

      setFieldErrors(errors);
    }, 500);

    return () => clearTimeout(timer);
  }, [donorInfo]);

  const handleChange = (field, value) => {
    setDonorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          Donor Details
        </h3>
        <p className="text-sm text-gray-600">
          You will complete payment securely on Lenco's checkout page
        </p>
      </div>

      <Input
        label="Full Name"
        type="text"
        name="name"
        value={donorInfo.name}
        onChange={handleChange}
        placeholder="John Doe"
        error={error && !donorInfo.name ? "Name is required" : ""}
        required
        icon={User}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={donorInfo.email}
        onChange={handleChange}
        placeholder="johndoe@email.com"
        error={fieldErrors.email || ""}
        required
        icon={Mail}
      />

      <Input
        label="Phone Number (Optional)"
        type="tel"
        name="phone"
        value={donorInfo.phone}
        onChange={handleChange}
        placeholder="0971234567"
        error={fieldErrors.phone || ""}
        icon={Phone}
      />
    </div>
  );
};

export default PaymentDetails;
