import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Book, Sparkles } from "lucide-react";
import Card from "@components/common/Card";

const ImpactSection = () => {
  const impacts = [
    {
      icon: Heart,
      amount: "K50",
      title: "One Therapy Session",
      description: "Provides one specialized therapy session for a child",
      color: "#32cd32",
    },
    {
      icon: Users,
      amount: "K250",
      title: "Week of Support",
      description: "Covers a full week of therapy and educational support",
      color: "#4318dd",
    },
    {
      icon: Book,
      amount: "K500",
      title: "Learning Materials",
      description:
        "Provides essential learning materials and tools for a month",
      color: "#1ba397",
    },
    {
      icon: Sparkles,
      amount: "K1000",
      title: "Transform a Life",
      description: "Sponsors a month of comprehensive support for a child",
      color: "#efe82a",
    },
  ];

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          Your Impact Matters
        </h3>
        <p className="text-gray-600">
          See how your donation makes a difference
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {impacts.map((impact, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card hover padding="default" className="bg-white">
              <div className="flex items-start space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${impact.color}15` }}
                >
                  <impact.icon
                    className="w-6 h-6"
                    style={{ color: impact.color }}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: impact.color }}
                  >
                    {impact.amount}
                  </div>
                  <h4 className="font-bold mb-1 text-gray-900">
                    {impact.title}
                  </h4>
                  <p className="text-sm text-gray-600">{impact.description}</p>
                </div>
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
        className="mt-8 bg-gradient-to-r from-[rgba(50,205,50,0.08)] to-[rgba(27,163,151,0.08)] rounded-xl p-6 border border-[rgba(50,205,50,0.2)]"
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
