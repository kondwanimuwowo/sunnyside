import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOBILE_MONEY_OPERATORS } from "@utils/constants";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Smartphone,
  CheckCircle,
} from "lucide-react";

const PaymentDetails = ({ donorInfo, setDonorInfo, error }) => {
  const [paymentMethod, setPaymentMethod] = useState("mobile-money");
  const [autoDetected, setAutoDetected] = useState(false);

  // ✅ Auto-detect operator from phone prefix
  const detectOperator = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    const prefix = cleaned.startsWith("260")
      ? cleaned.substring(3, 6)
      : cleaned.substring(0, 3);

    // Zambian mobile prefixes
    const operatorMap = {
      "097": "airtel",
      "077": "airtel",
      "096": "mtn",
      "076": "mtn",
      "095": "zamtel",
      "075": "zamtel",
    };

    return operatorMap[prefix] || null;
  };

  // ✅ REAL-TIME VALIDATION FUNCTIONS
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
    if (!email) return null; // Email is optional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : "Invalid email format";
  };

  const validateCardNumber = (cardNumber) => {
    if (!cardNumber) return null;
    const cleaned = cardNumber.replace(/\s/g, "");

    if (cleaned.length < 13 || cleaned.length > 19) {
      return "Invalid card number length";
    }

    // Luhn algorithm for card validation
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0 ? null : "Invalid card number";
  };

  const validateExpiryDate = (expiry) => {
    if (!expiry) return null;
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);

    if (!match) {
      return "Use MM/YY format";
    }

    const month = parseInt(match[1]);
    const year = parseInt("20" + match[2]);

    if (month < 1 || month > 12) {
      return "Invalid month";
    }

    const now = new Date();
    const expDate = new Date(year, month - 1);

    if (expDate < now) {
      return "Card expired";
    }

    return null;
  };

  const validateCVV = (cvv) => {
    if (!cvv) return null;
    return cvv.length === 3 || cvv.length === 4 ? null : "Invalid CVV";
  };

  // ✅ DEBOUNCED VALIDATION
  useEffect(() => {
    const timer = setTimeout(() => {
      const errors = {};

      if (paymentMethod === "mobile-money") {
        const phoneError = validatePhone(donorInfo.phone);
        if (phoneError) errors.phone = phoneError;
      }

      if (paymentMethod === "card") {
        const cardError = validateCardNumber(donorInfo.cardNumber);
        if (cardError) errors.cardNumber = cardError;

        const expiryError = validateExpiryDate(donorInfo.expiryDate);
        if (expiryError) errors.expiryDate = expiryError;

        const cvvError = validateCVV(donorInfo.cvv);
        if (cvvError) errors.cvv = cvvError;
      }

      const emailError = validateEmail(donorInfo.email);
      if (emailError) errors.email = emailError;

      setFieldErrors(errors);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [donorInfo, paymentMethod]);

  const handleChange = (field, value) => {
    setDonorInfo((prev) => ({
      ...prev,
      [field]: value,
      paymentMethod,
    }));

    // Auto-detect operator when phone changes
    if (field === "phone" && paymentMethod === "mobile-money") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 9) {
        const detected = detectOperator(value);
        if (detected && detected !== donorInfo.operator) {
          setDonorInfo((prev) => ({
            ...prev,
            phone: value,
            operator: detected,
            paymentMethod,
          }));
          setAutoDetected(true);
          setTimeout(() => setAutoDetected(false), 2000);
          console.log(`📱 Auto-detected operator: ${detected}`);
        }
      }
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setDonorInfo((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          Payment Details
        </h3>
        <p className="text-sm text-gray-600">
          Choose your preferred payment method
        </p>
      </div>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handlePaymentMethodChange("mobile-money")}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === "mobile-money"
              ? "border-[#32cd32] bg-[rgba(50,205,50,0.05)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Smartphone
            className={`w-6 h-6 mx-auto mb-2 ${
              paymentMethod === "mobile-money"
                ? "text-[#32cd32]"
                : "text-gray-400"
            }`}
          />
          <p
            className={`text-sm font-medium ${
              paymentMethod === "mobile-money"
                ? "text-[#32cd32]"
                : "text-gray-600"
            }`}
          >
            Mobile Money
          </p>
        </button>

        <button
          type="button"
          onClick={() => handlePaymentMethodChange("card")}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === "card"
              ? "border-[#32cd32] bg-[rgba(50,205,50,0.05)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <CreditCard
            className={`w-6 h-6 mx-auto mb-2 ${
              paymentMethod === "card" ? "text-[#32cd32]" : "text-gray-400"
            }`}
          />
          <p
            className={`text-sm font-medium ${
              paymentMethod === "card" ? "text-[#32cd32]" : "text-gray-600"
            }`}
          >
            Card Payment
          </p>
        </button>
      </div>

      {/* Common Fields */}
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
        label="Email (Optional)"
        type="email"
        name="email"
        value={donorInfo.email}
        onChange={handleChange}
        placeholder="johndoe@email.com"
        icon={Mail}
      />

      {/* Conditional Fields */}
      <AnimatePresence mode="wait">
        {paymentMethod === "mobile-money" && (
          <motion.div
            key="mobile-money"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="relative">
              <Input
                label="Mobile Money Number"
                type="tel"
                name="phone"
                value={donorInfo.phone}
                onChange={handleChange}
                placeholder="0971234567"
                error={error && !donorInfo.phone ? "Phone is required" : ""}
                required
                icon={Phone}
              />

              {/* Auto-detect indicator */}
              <AnimatePresence>
                {autoDetected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-6 left-0 flex items-center space-x-1 text-xs text-[#32cd32]"
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Operator auto-detected</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Select
              label="Mobile Money Operator"
              name="operator"
              value={donorInfo.operator}
              onChange={handleChange}
              options={MOBILE_MONEY_OPERATORS}
              error={error && !donorInfo.operator ? "Operator is required" : ""}
              required
            />

            <div className="bg-[rgba(67,24,221,0.05)] border border-[rgba(67,24,221,0.15)] p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                📱 You'll receive a push notification to approve this payment
              </p>
            </div>

            {/* MTN Warning */}
            {donorInfo.operator === "mtn" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg"
              >
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>MTN Notice:</strong> We're experiencing technical
                  issues with MTN mobile money. For faster processing, please
                  use <strong>Airtel</strong> or <strong>Zamtel</strong>.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {paymentMethod === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <Input
              label="Card Number"
              type="text"
              name="cardNumber"
              value={donorInfo.cardNumber || ""}
              onChange={handleChange}
              placeholder="4532 0151 1283 0366"
              error={
                error && !donorInfo.cardNumber ? "Card number required" : ""
              }
              required
              icon={CreditCard}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiry Date"
                type="text"
                name="expiryDate"
                value={donorInfo.expiryDate || ""}
                onChange={handleChange}
                placeholder="MM/YY"
                error={error && !donorInfo.expiryDate ? "Required" : ""}
                required
              />

              <Input
                label="CVV"
                type="text"
                name="cvv"
                value={donorInfo.cvv || ""}
                onChange={handleChange}
                placeholder="123"
                error={error && !donorInfo.cvv ? "Required" : ""}
                required
              />
            </div>

            <div className="bg-[rgba(67,24,221,0.05)] border border-[rgba(67,24,221,0.15)] p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                💳 Accepts Visa, Mastercard, and local Zambian cards
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentDetails;
