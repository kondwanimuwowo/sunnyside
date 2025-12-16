import React from "react";
import { motion } from "framer-motion";
import Card from "@components/common/Card";

const ImpactSection = () => {
  const primaryColor = "#32cd32";

  const impacts = [
    {
      amount: "K50",
      title: "One Therapy Session",
      description: "Provides one specialized therapy session for a child.",
    },
    {
      amount: "K250",
      title: "Week of Support",
      description: "Covers a full week of therapy and educational support.",
    },
    {
      amount: "K500",
      title: "Learning Materials",
      description:
        "Provides essential learning materials and therapy tools for a month.",
    },
    {
      amount: "K1000",
      title: "Transform a Life",
      description:
        "Sponsors a full month of comprehensive support for a child.",
    },
  ];

  return (
    <section className="py-12">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">
          Your Impact Matters
        </h3>
        <p className="text-gray-600">
          A simple, clear look at how your gift helps children at Sunnyside.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {impacts.map((impact, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-full"
          >
            <Card
              hover
              padding="default"
              className="bg-white h-full flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div
                  className="inline-flex items-baseline px-3 py-1 rounded-full text-sm font-semibold mb-1"
                  style={{
                    backgroundColor: "rgba(50,205,50,0.06)",
                    color: primaryColor,
                  }}
                >
                  {impact.amount}
                </div>
                <h4 className="font-bold text-gray-900">{impact.title}</h4>
                <p className="text-sm text-gray-600">{impact.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 bg-gradient-to-r from-[rgba(50,205,50,0.06)] to-[rgba(50,205,50,0.12)] rounded-2xl p-6 border border-[rgba(50,205,50,0.2)]"
      >
        <div className="text-center">
          <h4 className="font-bold text-lg mb-2 text-gray-900">
            100% of Your Donation Goes to the Children
          </h4>
          <p className="text-gray-600">
            We cover all operational costs so that every kwacha you donate
            directly supports therapy, education, and resources for children
            with learning challenges.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactSection;
