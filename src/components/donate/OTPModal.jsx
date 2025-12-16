import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Loader2, AlertCircle } from "lucide-react";

const OTPModal = ({ isOpen, onClose, onSubmit, loading, error, phone }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Enter OTP</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="w-16 h-16 bg-[rgba(50,205,50,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-[#32cd32]" />
            </div>
            <p className="text-center text-gray-600 mb-2">
              We've sent a verification code to
            </p>
            <p className="text-center font-semibold text-gray-900">{phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 6) setOtp(value);
                }}
                placeholder="000000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:border-[#32cd32] focus:outline-none"
                maxLength={6}
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={otp.length !== 6 || loading}
              className="w-full py-3 bg-[#32cd32] text-white rounded-lg font-semibold hover:bg-[#22a722] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Didn't receive the code? Check your messages or try again.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OTPModal;
