import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { ROUTES, CONTACT } from "@utils/constants";
import Button from "@components/common/Button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#32cd32] rounded-3xl p-12 overflow-hidden shadow-xl"
        >
          {/* Background Pattern - Subtle */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-10 h-10 text-white" fill="white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>

            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Your support helps us provide quality therapy and education to
              children who need it most. Every donation makes an impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="white"
                size="lg"
                onClick={() => navigate(ROUTES.DONATE)}
                icon={Heart}
              >
                Donate Now
              </Button>

              <a href={`tel:${CONTACT.PHONE_1}`}>
                <Button variant="accent" size="lg" icon={Phone}>
                  Call Us Today
                </Button>
              </a>
            </div>

            <p className="mt-6 text-sm opacity-90">
              Questions?{" "}
              <span
                className="underline cursor-pointer font-semibold hover:opacity-80 transition-opacity"
                onClick={() => navigate(ROUTES.CONTACT)}
              >
                Contact us
              </span>{" "}
              to learn more
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
