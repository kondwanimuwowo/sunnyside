import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Card from "@components/common/Card";
import { CheckCircle } from "lucide-react";

const ServiceCard = ({ service, index }) => {
  const Icon = Icons[service.icon] || Icons.Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        hover
        padding="none"
        className="h-full bg-white overflow-hidden flex flex-col"
      >
        {/* Image Header */}
        {service.image && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Icon Overlay */}
            <div className="absolute bottom-4 left-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Icon className="w-7 h-7 text-[#32cd32]" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-gray-900">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4 flex-1">{service.description}</p>

          {service.features && (
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-[#32cd32] mr-2 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
