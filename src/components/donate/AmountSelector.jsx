import React from "react";
import { motion } from "framer-motion";
import { DONATION_AMOUNTS, MIN_DONATION } from "@utils/constants";
import { DollarSign } from "lucide-react";

const AmountSelector = ({ amount, setAmount, error }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Amount</h3>
        <p className="text-gray-600">Select or enter your donation amount</p>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-3 gap-3">
        {DONATION_AMOUNTS.map((preset, idx) => (
          <motion.button
            key={preset}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAmount(preset.toString())}
            className={`py-4 px-2 rounded-lg font-semibold transition-all ${
              amount === preset.toString()
                ? "bg-[#32cd32] text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            K{preset}
          </motion.button>
        ))}
      </div>

      {/* Custom Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Amount (ZMW)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors text-lg font-medium ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-200 focus:border-[#32cd32] focus:ring-1 focus:ring-[#32cd32]"
            } focus:outline-none`}
            min={MIN_DONATION}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {!error && (
          <p className="mt-2 text-sm text-gray-500">
            Minimum donation: K{MIN_DONATION}
          </p>
        )}
      </div>

      {/* Impact Preview */}
      {amount && parseFloat(amount) >= MIN_DONATION && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[rgba(50,205,50,0.05)] border border-[rgba(50,205,50,0.15)] rounded-lg p-4"
        >
          <p className="text-sm font-medium text-gray-900 mb-1">Your Impact</p>
          <p className="text-sm text-gray-600">
            {parseFloat(amount) >= 1000 &&
              "Your donation will sponsor a full month of comprehensive support for a child!"}
            {parseFloat(amount) >= 500 &&
              parseFloat(amount) < 1000 &&
              "Your donation will provide learning materials for a month!"}
            {parseFloat(amount) >= 250 &&
              parseFloat(amount) < 500 &&
              "Your donation will cover a full week of therapy!"}
            {parseFloat(amount) >= 50 &&
              parseFloat(amount) < 250 &&
              "Your donation will provide a therapy session!"}
            {parseFloat(amount) >= MIN_DONATION &&
              parseFloat(amount) < 50 &&
              "Every contribution makes a difference! Thank you!"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AmountSelector;
