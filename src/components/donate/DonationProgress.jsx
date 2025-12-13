import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  CreditCard,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";

const DonationProgress = ({
  amount,
  phone,
  paymentMethod = "mobile-money",
  error,
}) => {
  // Different steps based on payment method
  const mobileMoneySteps = [
    { label: "Payment initiated", done: true },
    { label: "Push notification sent", done: true },
    { label: "Waiting for approval", done: false },
  ];

  const cardSteps = [
    { label: "Payment initiated", done: true },
    { label: "Processing card payment", done: true },
    { label: "Verifying transaction", done: false },
  ];

  const steps = paymentMethod === "card" ? cardSteps : mobileMoneySteps;
  const Icon = paymentMethod === "card" ? CreditCard : Smartphone;
  const title =
    paymentMethod === "card" ? "Processing Card Payment" : "Processing Payment";
  const subtitle =
    paymentMethod === "card"
      ? "Please wait while we process your card"
      : "Please check your phone to complete";

  return (
    <div className="text-center py-12">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto bg-[#32cd32] rounded-full flex items-center justify-center shadow-sm"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-24 h-24 border-2 border-gray-100 border-t-[#32cd32] rounded-full" />
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      {/* Amount Display */}
      <div className="max-w-sm mx-auto mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Amount</p>
          <p className="text-3xl font-bold text-[#32cd32]">K{amount}</p>
          {/* Only show phone number for mobile money */}
          {paymentMethod === "mobile-money" && phone && (
            <p className="text-sm text-gray-500 mt-1">{phone}</p>
          )}
          {paymentMethod === "card" && (
            <p className="text-sm text-gray-500 mt-1">Secure card processing</p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-red-900 mb-1">
                Payment Issue
              </p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Steps */}
      {!error && (
        <div className="max-w-sm mx-auto space-y-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center text-sm"
            >
              {step.done ? (
                <div className="w-5 h-5 bg-[#32cd32] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 border-2 border-[#32cd32] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Loader2 className="w-3 h-3 text-[#32cd32] animate-spin" />
                </div>
              )}
              <span
                className={
                  step.done ? "text-gray-600" : "text-gray-900 font-medium"
                }
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-8">
        This may take up to 2 minutes
      </p>
    </div>
  );
};

export default DonationProgress;
