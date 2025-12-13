import React, { createContext, useContext, useState, useCallback } from "react";
import { initiateMobileMoneyPayment } from "@api/lenco";
import { createDonation, updateDonationStatus } from "@api/donations";
import errorTracker from "@services/errorTracking";

const DonationContext = createContext();

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within DonationProvider");
  }
  return context;
};

export const DonationProvider = ({ children }) => {
  const [donationStep, setDonationStep] = useState("amount"); // amount, details, processing, success, error
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    operator: "airtel",
  });
  const [currentDonation, setCurrentDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);

  const resetDonation = useCallback(() => {
    setDonationStep("amount");
    setDonationAmount("");
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
      operator: "airtel",
    });
    setCurrentDonation(null);
    setError(null);
    setPaymentReference(null);
  }, []);

  const updateDonorInfo = useCallback((field, value) => {
    setDonorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const processDonation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create donation record in backend
      const donationRecord = await createDonation({
        amount: parseFloat(donationAmount),
        donorName: donorInfo.name,
        donorEmail: donorInfo.email || null,
        donorPhone: donorInfo.phone,
        operator: donorInfo.operator,
        status: "pending",
      });

      setCurrentDonation(donationRecord);

      // Step 2: Initiate payment with Lenco
      const paymentResult = await initiateMobileMoneyPayment({
        amount: donationAmount,
        phone: donorInfo.phone,
        operator: donorInfo.operator,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
      });

      if (paymentResult.success) {
        setPaymentReference(paymentResult.reference);
        setDonationStep("processing");

        // Step 3: Update donation with payment reference
        await updateDonationStatus(donationRecord.id, {
          status: "processing",
          paymentReference: paymentResult.reference,
        });

        // Simulate checking payment status (in production, use webhooks)
        setTimeout(async () => {
          try {
            await updateDonationStatus(donationRecord.id, {
              status: "completed",
            });
            setDonationStep("success");
          } catch (err) {
            console.error("Status update error:", err);
          }
        }, 3000);
      } else {
        throw new Error(paymentResult.message || "Payment initiation failed");
      }
    } catch (err) {
      errorTracker.log(err, { context: "donation_processing" });
      setError(err.message || "Something went wrong. Please try again.");
      setDonationStep("error");
    } finally {
      setLoading(false);
    }
  }, [donationAmount, donorInfo]);

  const value = {
    donationStep,
    setDonationStep,
    donationAmount,
    setDonationAmount,
    donorInfo,
    updateDonorInfo,
    currentDonation,
    loading,
    error,
    paymentReference,
    processDonation,
    resetDonation,
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};
