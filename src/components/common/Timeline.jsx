// components/common/Timeline.jsx
import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const Timeline = ({
  title,
  subtitle,
  items,
  lineColor = "#32cd32",
  animateLine = true,
}) => {
  return (
    <div className="mb-28">
      <div className="max-w-4xl mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
          </div>
        )}

        <div className="relative">
          {/* Animated timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ backgroundColor: lineColor }}
              className="w-full origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {items.map((item, idx) => {
              const IconComponent = item.iconName && LucideIcons[item.iconName];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="relative flex"
                >
                  {/* Step indicator - desktop */}
                  <div className="hidden md:flex items-center justify-center w-16 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.3, type: "spring" }}
                      style={{ borderColor: lineColor }}
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white relative z-10"
                    >
                      {IconComponent ? (
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: lineColor }}
                        />
                      ) : item.year ? (
                        <div
                          className="text-lg font-bold"
                          style={{ color: lineColor }}
                        >
                          {item.year}
                        </div>
                      ) : null}
                    </motion.div>
                  </div>

                  {/* Step indicator - mobile */}
                  <div className="md:hidden mr-4 flex-shrink-0">
                    <div
                      style={{ borderColor: lineColor }}
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white"
                    >
                      {IconComponent ? (
                        <IconComponent
                          className="w-5 h-5"
                          style={{ color: lineColor }}
                        />
                      ) : item.year ? (
                        <div
                          className="text-sm font-bold"
                          style={{ color: lineColor }}
                        >
                          {item.year}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:ml-8">
                    <div className="mb-3">
                      {item.year && (
                        <div
                          className="text-sm font-medium tracking-wider mb-1"
                          style={{ color: lineColor }}
                        >
                          {item.year}
                        </div>
                      )}
                      {item.title && (
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                          {item.title}
                        </h4>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.details && (
                      <div className="mt-4">
                        {item.details.map((detail, i) => (
                          <div key={i} className="text-gray-500 text-sm mb-1">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
