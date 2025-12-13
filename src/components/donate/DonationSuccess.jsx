import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";
import { ROUTES } from "@utils/constants";

const DonationSuccess = ({ amount, reference, onReset }) => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I just donated to Sunnyside Therapy Center!",
        text: `I just made a donation to support children with learning challenges. Join me in making a difference!`,
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="text-center py-12">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 bg-[rgba(50,205,50,0.1)] rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-[#32cd32]" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold mb-2 text-gray-900">Thank You! 🎉</h3>
        <p className="text-gray-600 mb-8">Your donation was successful</p>
      </motion.div>

      {/* Amount Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-sm mx-auto mb-8"
      >
        <div className="bg-[rgba(50,205,50,0.05)] border border-[rgba(50,205,50,0.15)] rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Donation Amount</p>
          <p className="text-4xl font-bold text-[#32cd32] mb-2">K{amount}</p>
          <p className="text-xs text-gray-500">Reference: {reference}</p>
        </div>
      </motion.div>

      {/* Impact Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto mb-8 bg-white border border-gray-200 rounded-lg p-6"
      >
        <div className="w-12 h-12 bg-[rgba(50,205,50,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-6 h-6 text-[#32cd32]" />
        </div>
        <h4 className="font-bold text-lg mb-2 text-gray-900">Your Impact</h4>
        <p className="text-gray-600">
          Your support will directly help children with learning challenges
          receive the therapy and education they need to thrive.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
      >
        <Button onClick={onReset} icon={Heart} className="flex-1">
          Donate Again
        </Button>

        {navigator.share && (
          <Button
            variant="outline"
            icon={Share2}
            onClick={handleShare}
            className="flex-1"
          >
            Share
          </Button>
        )}
      </motion.div>

      {/* Additional Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 pt-8 border-t border-gray-100"
      >
        <p className="text-sm text-gray-600 mb-4">
          Explore more ways to support
        </p>
        <button
          onClick={() => navigate(ROUTES.ABOUT)}
          className="inline-flex items-center text-sm font-medium text-[#32cd32] hover:text-[#22a722] transition-colors"
        >
          Learn about our programs
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </motion.div>

      <p className="text-xs text-gray-500 mt-8">
        A receipt has been sent to your email (if provided)
      </p>
    </div>
  );
};

export default DonationSuccess;
