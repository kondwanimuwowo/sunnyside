import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";
import { CONTACT, ROUTES } from "@utils/constants";

const EnrollmentSuccess = ({ referenceNumber }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16 px-4">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-[rgba(50,205,50,0.1)] rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-14 h-14 text-[#32cd32]" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Enrollment Submitted! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for choosing Sunnyside Therapy Center
        </p>
      </motion.div>

      {/* Reference Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto mb-12"
      >
        <div className="bg-[rgba(50,205,50,0.05)] border border-[rgba(50,205,50,0.15)] rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Your Reference Number</p>
          <p className="text-3xl font-bold text-[#32cd32] font-mono">
            {referenceNumber}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Please save this for your records
          </p>
        </div>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          What Happens Next?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="w-10 h-10 bg-[#32cd32] text-white rounded-full flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h4 className="font-bold mb-2">Email Confirmation</h4>
            <p className="text-sm text-gray-600">
              You'll receive a confirmation email within 24 hours
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="w-10 h-10 bg-[#32cd32] text-white rounded-full flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h4 className="font-bold mb-2">Initial Assessment</h4>
            <p className="text-sm text-gray-600">
              We'll contact you to schedule an assessment
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="w-10 h-10 bg-[#32cd32] text-white rounded-full flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h4 className="font-bold mb-2">Start Services</h4>
            <p className="text-sm text-gray-600">
              Begin your child's journey to success!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-md mx-auto mb-8"
      >
        <p className="text-gray-600 mb-4">Questions? Contact us:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${CONTACT.PHONE_1}`}
            className="flex items-center justify-center gap-2 text-[#32cd32] font-medium"
          >
            <Phone className="w-4 h-4" />
            {CONTACT.PHONE_1}
          </a>
          <a
            href={`mailto:${CONTACT.EMAIL}`}
            className="flex items-center justify-center gap-2 text-[#32cd32] font-medium"
          >
            <Mail className="w-4 h-4" />
            {CONTACT.EMAIL}
          </a>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button onClick={() => navigate(ROUTES.HOME)}>Back to Home</Button>
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.SERVICES)}
          icon={ArrowRight}
          iconPosition="right"
        >
          Learn About Our Services
        </Button>
      </motion.div>
    </div>
  );
};

export default EnrollmentSuccess;
