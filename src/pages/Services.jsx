import React from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import ServiceCard from "@components/services/ServiceCard";
import { LEARNING_DOMAINS, ADDITIONAL_SERVICES } from "@utils/constants";
import { CheckCircle } from "lucide-react";

const Services = () => {
  return (
    <>
      <SEO
        title="Our Services"
        description="Comprehensive therapy and education services for children with learning challenges. Five learning domains plus specialized behavioral and sensory support."
        keywords="therapy services, academic skills, communication therapy, social skills, motor skills, behavior management, sensory support"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
              Our <span className="text-[#32cd32]">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on comprehensive development across five essential
              domains and provide additional specialized support to help every
              child reach their full potential.
            </p>
          </motion.div>

          {/* Five Domains */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              The Five Domains of Learning
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {LEARNING_DOMAINS.map((domain, idx) => (
                <ServiceCard key={domain.id} service={domain} index={idx} />
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Additional Specialized Services
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {ADDITIONAL_SERVICES.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-[rgba(50,205,50,0.03)] to-[rgba(50,205,50,0.10)] rounded-2xl p-8 border border-[rgba(50,205,50,0.25)] h-full flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#1c4d1c]">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
