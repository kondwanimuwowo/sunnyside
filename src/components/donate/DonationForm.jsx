import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  DollarSign,
  FileText,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import AmountSelector from "./AmountSelector";
import PaymentDetails from "./PaymentDetails";
import DonationProgress from "./DonationProgress";
import DonationSuccess from "./DonationSuccess";
import Button from "@components/common/Button";
import { MIN_DONATION } from "@utils/constants";

const DonationForm = () => {
  const [donationStep, setDonationStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    operator: "airtel",
    paymentMethod: "mobile-money", // NEW: Track payment method
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const steps = [
    { number: 1, label: "Amount", Icon: DollarSign },
    { number: 2, label: "Details", Icon: FileText },
    { number: 3, label: "Payment", Icon: CreditCard },
    { number: 4, label: "Complete", Icon: CheckCircle },
  ];

  const handleAmountContinue = () => {
    if (!donationAmount || parseFloat(donationAmount) < MIN_DONATION) {
      setError(`Minimum donation is K${MIN_DONATION}`);
      return;
    }
    setError("");
    setDonationStep(2);
  };

  const handleDetailsBack = () => {
    setDonationStep(1);
    setError("");
  };

  // ✅ ENHANCED: Validate based on payment method
  const validateDonorInfo = () => {
    if (!donorInfo.name) {
      setError("Please enter your name");
      return false;
    }

    if (donorInfo.paymentMethod === "mobile-money") {
      if (!donorInfo.phone) {
        setError("Please enter your mobile money number");
        return false;
      }
      if (!donorInfo.operator) {
        setError("Please select your mobile money operator");
        return false;
      }
    } else if (donorInfo.paymentMethod === "card") {
      if (!donorInfo.cardNumber) {
        setError("Please enter your card number");
        return false;
      }
      if (!donorInfo.expiryDate) {
        setError("Please enter card expiry date");
        return false;
      }
      if (!donorInfo.cvv) {
        setError("Please enter CVV");
        return false;
      }
    }

    return true;
  };

  // ✅ ENHANCED: Handle both mobile money and card payments
  const handleSubmit = async () => {
    if (!validateDonorInfo()) {
      return;
    }

    setLoading(true);
    setError("");
    setDonationStep(3);

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

      // Prepare payload based on payment method
      const payload = {
        amount: donationAmount,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        paymentMethod: donorInfo.paymentMethod,
      };

      // Add payment-specific fields
      if (donorInfo.paymentMethod === "mobile-money") {
        payload.phone = donorInfo.phone;
        payload.operator = donorInfo.operator;
      } else if (donorInfo.paymentMethod === "card") {
        payload.cardNumber = donorInfo.cardNumber;
        payload.expiryDate = donorInfo.expiryDate;
        payload.cvv = donorInfo.cvv;
      }

      const response = await fetch(`${API_URL}/donations/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setReference(data.reference);
        // Start polling for payment status
        pollPaymentStatus(data.reference);
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setDonationStep(2);
    }
  };

  const pollPaymentStatus = async (ref) => {
    let attempts = 0;
    const maxAttempts = 40; // 4 minutes total (6 sec intervals)
    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/donations/status/${ref}`);
        const data = await response.json();

        if (data.success && data.data) {
          const status = data.data.status;

          console.log(`Status check #${attempts + 1}: ${status}`);

          if (status === "successful") {
            setLoading(false);
            setDonationStep(4);
            return;
          } else if (status === "failed") {
            throw new Error(data.data.reasonForFailure || "Payment failed");
          } else if (status === "pending" || status === "pay-offline") {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkStatus, 6000);
            } else {
              throw new Error(
                "Payment is taking longer than expected. Please contact support if needed."
              );
            }
          } else {
            // Unknown status - keep polling
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkStatus, 6000);
            } else {
              throw new Error(
                "Unable to verify payment status. Please contact support."
              );
            }
          }
        } else {
          throw new Error("Failed to check payment status");
        }
      } catch (err) {
        console.error("Status check error:", err);
        setError(err.message);
        setLoading(false);
        setDonationStep(2);
      }
    };

    checkStatus();
  };

  const resetDonation = () => {
    setDonationStep(1);
    setDonationAmount("");
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
      operator: "airtel",
      paymentMethod: "mobile-money",
    });
    setError("");
    setReference("");
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Clean Progress Header */}
      <div className="bg-white border-b border-gray-100 p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: donationStep >= step.number ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    donationStep >= step.number
                      ? "bg-[#32cd32] text-white shadow-sm"
                      : "bg-gray-50 text-gray-400 border border-gray-200"
                  }`}
                >
                  {donationStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.Icon className="w-5 h-5" />
                  )}
                </motion.div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                    donationStep >= step.number
                      ? "text-[#32cd32]"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: donationStep > step.number ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[#32cd32]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {donationStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            <AmountSelector
              amount={donationAmount}
              setAmount={setDonationAmount}
              error={error}
            />

            <Button
              onClick={handleAmountContinue}
              disabled={
                !donationAmount || parseFloat(donationAmount) < MIN_DONATION
              }
              fullWidth
              className="mt-6"
            >
              Continue to Details
            </Button>
          </motion.div>
        )}

        {donationStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            <button
              onClick={handleDetailsBack}
              className="mb-6 flex items-center text-[#32cd32] hover:text-[#22a722] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to amount
            </button>

            <div className="mb-6 p-4 bg-[rgba(50,205,50,0.05)] rounded-lg border border-[rgba(50,205,50,0.15)]">
              <p className="text-sm text-gray-600 mb-1">Donation Amount</p>
              <p className="text-2xl font-bold text-[#32cd32]">
                K{donationAmount}
              </p>
            </div>

            <PaymentDetails
              donorInfo={donorInfo}
              setDonorInfo={setDonorInfo}
              error={error}
            />

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
              fullWidth
              className="mt-6"
            >
              Complete Donation
            </Button>

            <p className="mt-4 text-xs text-center text-gray-500">
              🔒 Secure payment powered by Lenco
            </p>
          </motion.div>
        )}

        {donationStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            <DonationProgress
              amount={donationAmount}
              phone={donorInfo.phone}
              paymentMethod={donorInfo.paymentMethod}
              error={error}
            />
          </motion.div>
        )}

        {donationStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            <DonationSuccess
              amount={donationAmount}
              reference={reference}
              onReset={resetDonation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationForm;
