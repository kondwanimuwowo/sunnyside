import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOBILE_MONEY_OPERATORS } from "@utils/constants";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import { User, Mail, Phone, CreditCard, Smartphone } from "lucide-react";

const PaymentDetails = ({ donorInfo, setDonorInfo, error }) => {
  const [paymentMethod, setPaymentMethod] = useState("mobile-money"); // 'mobile-money' or 'card'

  const handleChange = (field, value) => {
    setDonorInfo((prev) => ({
      ...prev,
      [field]: value,
      paymentMethod, // Always include payment method
    }));
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
        label="Email"
        type="email"
        name="email"
        value={donorInfo.email}
        onChange={handleChange}
        placeholder="[email protected]"
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
