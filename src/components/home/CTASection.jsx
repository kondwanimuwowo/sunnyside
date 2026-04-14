import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES, CONTACT } from "@utils/constants";
import Button from "@components/common/Button";
import unTwo from "@assets/images/un-three.jpg";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${unTwo})`,
                filter: "blur(2px)",
              }}
            ></div>
          </div>

          <div className="relative z-10 text-center text-white p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Be Part of Something Greater
            </h2>

            <p className="text-base lg:text-lg mb-8 max-w-2xl mx-auto opacity-95">
              We're here to help families find the right support path. Talk with
              our team, schedule a visit, or learn how to get involved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="bg-[#32cd32] hover:bg-[#22a722] text-white"
              >
                Talk to Our Team
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.ABOUT)}
                className="text-white border-white hover:bg-white/10"
              >
                Learn About Our Programs
              </Button>
            </div>

            <p className="mt-8 text-sm opacity-90">
              Or call us at{" "}
              <a
                href={`tel:${CONTACT.PHONE_1}`}
                className="text-[#32cd32] font-semibold hover:underline"
              >
                {CONTACT.PHONE_1}
              </a>{" "}
              to discuss how to get involved
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;



