import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Users, Hand, MessageCircle } from "lucide-react";
import { ROUTES, IMAGES } from "@utils/constants";
import Button from "@components/common/Button";
import bgImage from "@assets/images/unsplash-1.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const iconComponents = [
    { Icon: Brain, label: "Academic" },
    { Icon: Users, label: "Social" },
    { Icon: Hand, label: "Motor" },
    { Icon: MessageCircle, label: "Communication" },
  ];

  return (
    <section
      className="
        relative 
        min-h-screen
        flex
        items-center
        px-4 sm:px-6 lg:px-8
        bg-cover bg-center bg-no-repeat
        pt-16 md:pt-0
        md:-mt-16
        pt-32 sm:pt-32 md:pt-32 lg:pt-32 xl:pt-16
      "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* White Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-white/80 backdrop-blur-[8px]"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-[rgba(50,205,50,0.12)] px-4 py-2 rounded-full"
            >
              <span className="font-medium text-[#22a722]">
                Every Child Learns
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold leading-tight text-gray-900"
            >
              Empowering
              <br />
              Children with
              <br />
              Learning Challenges
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              At Sunnyside Therapy Center, we provide specialized support for
              children with autism, Down syndrome, cerebral palsy, and other
              learning challenges. We care when you need a safe space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pb-6"
            >
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate(ROUTES.DONATE)}
                icon={ArrowRight}
                iconPosition="right"
              >
                Support Our Mission
              </Button>
              <Button
                variant="teal"
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={IMAGES.hero}
                alt="Ben holding a child"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(67, 24, 221, 1)] to-[rgba(67, 24, 221, 0.1)]"></div>
            </div>

            {/* Icon Grid Overlay */}
            <div className="absolute -bottom-6 left-6 grid grid-cols-2 gap-3">
              {iconComponents.map(({ Icon, label }, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.6 + idx * 0.1,
                    type: "spring",
                    stiffness: 150,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-xl shadow-md cursor-pointer border-2 border-[rgba(50,205,50,0.2)]"
                >
                  <Icon className="w-8 h-8 text-[#32cd32] mx-auto mb-1" />
                  <p className="text-xs text-gray-600 text-center font-medium">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
