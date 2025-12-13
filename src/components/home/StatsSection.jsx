import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: "5", label: "Learning Domains" },
    { value: "100+", label: "Children Helped" },
    { value: "7", label: "Specialized Programs" },
    { value: "100%", label: "Dedicated Team" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24 rounded-full bg-[#32cd32] flex items-center justify-center shadow-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-semibold text-white"
                >
                  {stat.value}
                </motion.div>
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center max-w-[140px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
