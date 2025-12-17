import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ROUTES, CONTACT } from "@utils/constants";
import Button from "@components/common/Button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(/images/sunnyside-3.jpg)`,
                filter: "blur(2px)",
              }}
            ></div>
          </div>

          <div className="relative z-10 text-center text-white p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Be Part of Something Greater
            </h2>

            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Your support doesn't just fund therapy—it builds futures. Every
              contribution helps us provide specialized care, train more
              therapists, and reach more families across Zambia who have nowhere
              else to turn.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold mb-2">K50</div>
                <div className="text-sm">Sponsors a therapy session</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold mb-2">K500</div>
                <div className="text-sm">Funds a week of therapy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold mb-2">K2,000</div>
                <div className="text-sm">Supports a child for a month</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.DONATE)}
                className="bg-[#32cd32] hover:bg-[#22a722] text-white"
              >
                Make a Difference Today
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.ABOUT)}
                className="text-white border-white hover:bg-white/10"
              >
                Learn About Our Impact
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
              to discuss other ways to support
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
