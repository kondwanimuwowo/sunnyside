import React from "react";
import { motion } from "framer-motion";
import unImg from "../../assets/images/therapy.png";

const MissionSection = () => {
  return (
    <section className="pt-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-normal">
            More Than Therapy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a movement for inclusion in Zambia. Our approach goes
            beyond traditional therapy to create lasting change for children,
            families, and communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div
              className="h-96 bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${unImg})`,
              }}
            >
              {/* Dark gradient overlay: strong at bottom, fading to transparent at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  The Sunnyside Promise
                </h3>
                <p className="opacity-95">
                  Every child deserves the opportunity to learn, grow, and
                  belong.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Why We're Different
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Unlike traditional therapy centers that focus solely on clinical
                intervention, we address the entire ecosystem around a child.
                Our holistic approach includes therapy, education, family
                support, and community advocacy.
              </p>
            </div>

            <div className="bg-[#32cd32]/5 p-6 rounded-2xl border border-[#32cd32]/20">
              <h4 className="font-bold text-lg mb-2 text-gray-900">
                Our Vision
              </h4>
              <p className="text-gray-700">
                A Zambia where every child with learning challenges is accepted,
                supported, and treated fairly in mainstream schools and society.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
