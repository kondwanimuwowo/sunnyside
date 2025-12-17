import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
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
import OTPModal from "./OTPModal";

const DonationForm = () => {
  const [donationStep, setDonationStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    operator: "airtel",
    paymentMethod: "mobile-money",
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpError, setOTPError] = useState("");
  const [otpLoading, setOTPLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

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

      const payload = {
        amount: donationAmount,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        paymentMethod: donorInfo.paymentMethod,
      };

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
        pollPaymentStatus(data.reference);
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setDonationStep(3);
    }
  };

  const handleOTPSubmit = async (otp) => {
    setOTPLoading(true);
    setOTPError("");

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

      const response = await fetch(`${API_URL}/donations/${reference}/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (data.success) {
        setShowOTPModal(false);
        setLoading(true);
        setDonationStep(3);
        // Resume polling
        pollPaymentStatus(reference);
      } else {
        setOTPError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setOTPError(err.message);
    } finally {
      setOTPLoading(false);
    }
  };

  const pollPaymentStatus = async (ref) => {
    let attempts = 0;
    const maxAttempts = 20;
    let lookupFailCount = 0;
    const maxLookupFails = 5;

    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    let shouldStopPolling = false;

    const checkStatus = async () => {
      if (shouldStopPolling) {
        console.log("⏹️ Polling stopped");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/donations/status/${ref}`);
        const data = await response.json();

        if (data.success && data.data) {
          const status = data.data.status?.toLowerCase();

          console.log(
            `📊 Status #${attempts + 1}: ${status}${
              data.data.lookupFailCount
                ? ` (lookup fails: ${data.data.lookupFailCount})`
                : ""
            }`
          );

          // ✅ Handle lookup failures (MTN Lenco bug)
          if (status === "pending" && data.data.lookupFailCount) {
            lookupFailCount = data.data.lookupFailCount;

            if (lookupFailCount >= maxLookupFails) {
              shouldStopPolling = true;
              setLoading(false);
              setError(
                "MTN mobile money is experiencing technical issues. Please try Airtel or Zamtel instead, or contact support."
              );
              setDonationStep(3);
              return;
            }
          }

          // ✅ SUCCESS
          if (status === "successful") {
            shouldStopPolling = true;
            setLoading(false);
            setDonationStep(4);
            console.log("🎉 Payment successful!");
            return;
          }

          // ✅ FAILED, CANCELLED, or TIMEOUT
          if (["failed", "cancelled", "timeout"].includes(status)) {
            shouldStopPolling = true;
            setLoading(false);

            let errorMsg = "Payment failed. Please try again.";
            if (status === "cancelled") {
              errorMsg = "Payment was cancelled.";
            } else if (status === "timeout") {
              errorMsg =
                "Payment timed out. You did not approve the payment in time.";
            } else if (data.data.reasonForFailure) {
              errorMsg = data.data.reasonForFailure;
            }

            setError(errorMsg);
            setDonationStep(3);
            console.log(`❌ Payment ${status}`);
            return;
          }

          // ✅ PENDING/PROCESSING - Continue polling
          if (["pending", "pay-offline", "processing"].includes(status)) {
            attempts++;

            // Smart backoff: slower intervals after first 10 attempts
            const interval = attempts > 10 ? 10000 : 6000;

            if (attempts < maxAttempts) {
              setTimeout(checkStatus, interval);
            } else {
              shouldStopPolling = true;
              setLoading(false);
              setError(
                "Payment verification is taking longer than expected. Check your SMS for confirmation or contact support."
              );
              setDonationStep(3);
              console.log("⏱️ Polling timeout");
            }
            return;
          }

          // Unknown status
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(checkStatus, 6000);
          } else {
            shouldStopPolling = true;
            setLoading(false);
            setError("Unable to verify payment. Please contact support.");
            setDonationStep(3);
          }
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("❌ Status check error:", err);
        shouldStopPolling = true;
        setError(err.message || "Could not verify payment status");
        setLoading(false);
        setDonationStep(3);
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
    setShowOTPModal(false);
    setOTPError("");
    setOTPLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress Header */}
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
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[rgba(50,205,50,0.05)] to-[rgba(27,163,151,0.05)] rounded-lg border border-[rgba(50,205,50,0.2)]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[rgba(50,205,50,0.15)] rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#32cd32]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Make it Monthly
                    </h4>
                    <p className="text-sm text-gray-600">
                      Support children every month automatically
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isRecurring ? "bg-[#32cd32]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isRecurring ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {isRecurring && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#32cd32] focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">
                      Quarterly (Every 3 months)
                    </option>
                    <option value="annually">Annually</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 You can cancel anytime from your email confirmation
                  </p>
                </motion.div>
              )}
            </div>

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

            {error && (
              <>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mt-6">
                  {error}
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      setError("");
                      handleSubmit();
                    }}
                    className="flex-1 py-2 bg-[#32cd32] text-white rounded-lg font-medium hover:bg-[#22a722] transition-colors"
                  >
                    🔄 Retry Payment
                  </button>

                  <button
                    onClick={() => {
                      setError("");
                      setDonationStep(1);
                    }}
                    className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Change Amount
                  </button>
                </div>
              </>
            )}
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
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmit={handleOTPSubmit}
        loading={otpLoading}
        error={otpError}
        phone={donorInfo.phone}
      />
    </div>
  );
};

export default DonationForm;
