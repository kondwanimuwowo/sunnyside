import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Users, Hand } from "lucide-react";
import { ROUTES, IMAGES } from "@utils/constants";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

const ServicesPreview = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Brain,
      title: "Academic Skills",
      description: "Math, literacy, writing development",
      image: IMAGES.education,
    },
    {
      icon: Users,
      title: "Social Skills",
      description: "Turn-taking, group work",
      image: IMAGES.sunnyTwo,
    },
    {
      icon: Hand,
      title: "Motor Skills",
      description: "Fine and gross motor development",
      image: IMAGES.therapy,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-gray-900"
        >
          What We <span className="text-[#32cd32]">Offer</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto"
        >
          Comprehensive support across five learning domains to help every child
          reach their full potential
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                hover
                padding="none"
                className="h-full bg-white overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <service.icon className="w-6 h-6 text-[#32cd32]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={() => navigate(ROUTES.SERVICES)}>
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
