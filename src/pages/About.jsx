import React from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import { Heart, CheckCircle } from "lucide-react";

const About = () => {
  const conditions = [
    "Autism Spectrum Disorder",
    "Down Syndrome",
    "Global Developmental Delay",
    "Cerebral Palsy",
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Sunnyside Therapy Center's mission to support children with learning challenges in Zambia. Founded by Ben and Izzy."
        keywords="about sunnyside, therapy center zambia, ben and izzy, special needs education"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Making a difference in the lives of children with learning
              challenges across Zambia.
            </p>
          </motion.div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-gray-700">
                Founded by Ben and Izzy, Sunnyside Therapy Center is dedicated
                to ensuring that all children with learning challenges are
                accepted and treated fairly in mainstream schools across Zambia.
              </p>
              <p className="text-lg text-gray-700">
                We work with children experiencing autism, Down syndrome, global
                delay, cerebral palsy, and other developmental challenges,
                providing them with the tools and support they need to thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Individualized therapy programs tailored to each child's
                    unique needs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Safe, inclusive environment where every child is valued
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Advocacy for fair treatment in mainstream education
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-6">
                  <Heart className="w-10 h-10 text-white" fill="white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  We Care
                </h3>
                <p className="text-xl text-gray-600 italic mb-6">
                  "When you need a safe space, consider us"
                </p>
                <p className="text-gray-700">
                  At Sunnyside, we don't just provide therapy – we create a
                  community where children can grow, learn, and flourish at
                  their own pace.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Who We Serve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Who We Serve
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              We provide specialized support for children with various learning
              challenges, including:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditions.map((condition, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-orange-100 to-pink-100 p-6 rounded-xl text-center"
                >
                  <p className="font-semibold text-gray-800">{condition}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
