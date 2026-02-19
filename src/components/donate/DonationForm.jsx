import React, { useEffect, useState } from "react";
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

const DonationForm = () => {
  const [donationStep, setDonationStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [lencoReady, setLencoReady] = useState(false);

  const steps = [
    { number: 1, label: "Amount", Icon: DollarSign },
    { number: 2, label: "Details", Icon: FileText },
    { number: 3, label: "Payment", Icon: CreditCard },
    { number: 4, label: "Confirmation", Icon: CheckCircle },
  ];

  useEffect(() => {
    const existing = document.querySelector('script[data-lenco="inline"]');
    if (window.LencoPay) {
      setLencoReady(true);
      return;
    }
    if (existing) return;

    const script = document.createElement("script");
    const isSandbox = String(import.meta.env.VITE_LENCO_SANDBOX) === "true";
    script.src = isSandbox
      ? "https://pay.sandbox.lenco.co/js/v1/inline.js"
      : "https://pay.lenco.co/js/v1/inline.js";
    script.async = true;
    script.dataset.lenco = "inline";
    script.onload = () => setLencoReady(true);
    script.onerror = () => {
      setError("Unable to load payment system. Please try again.");
      setLencoReady(false);
    };
    document.body.appendChild(script);
  }, []);

  const getApiBase = () => {
    const base = import.meta.env.VITE_API_BASE_URL || "";
    if (!base) return "/api";
    return base.endsWith("/api") ? base : `${base}/api`;
  };

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

    if (!donorInfo.email) {
      setError("Please enter your email address");
      return false;
    }

    return true;
  };

  const openLencoCheckout = (ref) => {
    const key = import.meta.env.VITE_LENCO_PUBLIC_KEY;
    if (!key) {
      throw new Error("Payment key is missing. Please contact support.");
    }

    const nameParts = donorInfo.name.trim().split(/\s+/);
    const firstName = nameParts[0] || donorInfo.name;
    const lastName = nameParts.slice(1).join(" ") || " ";

    window.LencoPay.getPaid({
      key,
      reference: ref,
      amount: Number(donationAmount),
      currency: "ZMW",
      email: donorInfo.email,
      firstName,
      lastName,
      phone: donorInfo.phone || undefined,
      title: "Sunnyside Therapy Center",
      description: "Donation",
      onClose: () => {
        setLoading(false);
        setError("Payment was cancelled. You can try again.");
        setDonationStep(2);
      },
      callback: () => {
        setLoading(false);
        setDonationStep(4);
      },
    });
  };

  const handleSubmit = async () => {
    if (!validateDonorInfo()) {
      return;
    }

    setLoading(true);
    setError("");
    setDonationStep(3);

    try {
      if (!lencoReady) {
        throw new Error("Payment system is still loading. Please try again.");
      }

      const API_URL = getApiBase();

      const payload = {
        amount: donationAmount,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        isRecurring,
        frequency,
      };

      const response = await fetch(`${API_URL}/donations/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setReference(data.reference);
        openLencoCheckout(data.reference);
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setDonationStep(3);
    }
  };

  const resetDonation = () => {
    setDonationStep(1);
    setDonationAmount("");
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
    });
    setError("");
    setReference("");
    setLoading(false);
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
              Proceed to Payment
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
            <DonationProgress amount={donationAmount} error={error} />

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
    </div>
  );
};

export default DonationForm;
