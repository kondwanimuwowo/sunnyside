import React from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import DonationForm from "@components/donate/DonationForm";
import ImpactSection from "@components/donate/ImpactSection";

const Donate = () => {
  return (
    <>
      <SEO
        title="Donate"
        description="Support children with learning challenges in Zambia. Your donation helps provide therapy, education, and resources for children with autism, Down syndrome, and other developmental needs."
        keywords="donate, support children, zambia donations, therapy center donations, special needs support"
      />

      <div className="pt-24 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Support <span className="text-[#32cd32]">Our Mission</span>
            </h1>
            <p className="text-lg text-gray-600">
              Your donation helps us provide quality therapy and education to
              children who need it most.
            </p>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DonationForm />
          </motion.div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ImpactSection />
          </motion.div>

          {/* Tax Deductibility Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-sm text-gray-600"
          >
            <p>
              Sunnyside Therapy Center is a registered organization in Zambia.
              All donations go directly to supporting children with learning
              challenges.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Donate;
