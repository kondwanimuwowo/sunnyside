import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Parent of child with Autism",
      text: "Before Sunnyside, our son struggled to communicate even basic needs. After 6 months of speech therapy and behavioral support, he's now forming sentences and making friends. The team's dedication changed our entire family's life.",
      child: "Age 5, Autism Spectrum Disorder",
    },
    {
      name: "James K.",
      role: "Father of child with Cerebral Palsy",
      text: "The occupational therapy program has been remarkable. Our daughter went from struggling with basic motor skills to independently feeding herself and using scissors. The therapists' patience and expertise are unmatched.",
      child: "Age 7, Cerebral Palsy",
    },
    {
      name: "Mary & David L.",
      role: "Parents",
      text: "We searched for years for proper support for our child with Down Syndrome. Sunnyside not only provided excellent therapy but also educated us on how to support her at home. She's now thriving in a mainstream school.",
      child: "Age 8, Down Syndrome",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Stories of <span className="text-[#32cd32]">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real families. Real progress. Hear from parents whose children have
            found their path at Sunnyside.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full relative">
                <Quote className="w-12 h-12 text-[#32cd32]/30 mb-6 absolute -top-2 -left-2" />

                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <div className="mb-2">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                    {testimonial.child}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-gray-600">
            <div className="w-2 h-2 bg-[#32cd32] rounded-full"></div>
            <div className="text-sm">
              All testimonials used with family permission
            </div>
            <div className="w-2 h-2 bg-[#32cd32] rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
