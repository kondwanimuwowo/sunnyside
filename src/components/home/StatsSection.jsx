import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    {
      value: "160+",
      label: "Children Supported",
      description: "Active cases across Zambia",
    },
    {
      value: "5+",
      label: "Mainstream School Partnerships",
      description: "Creating inclusive education",
    },
    {
      value: "98%",
      label: "Parent Satisfaction Rate",
      description: "Based on parent feedback",
    },
    {
      value: "5",
      label: "Specialized Therapy Programs",
      description: "Tailored to individual needs",
    },
  ];

  return (
    <section className="pt-12 pb-12 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-50 rounded-2xl shadow-lg shadow-gray-200 overflow-hidden bg-white p-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center px-8 py-8 bg-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: idx * 0.1 + 0.2,
                }}
                className="text-3xl md:text-4xl font-bold text-[#32cd32] mb-3"
              >
                {stat.value}
              </motion.div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>

              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
