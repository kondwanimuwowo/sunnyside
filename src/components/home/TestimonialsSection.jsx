import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Card from "@components/common/Card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Parent",
      text: "Sunnyside has been a blessing for our family. The dedicated team has helped my son make incredible progress in his communication and social skills.",
      rating: 5,
    },
    {
      name: "James K.",
      role: "Parent",
      text: "The individualized approach and caring environment at Sunnyside have made all the difference. We finally found a place where our daughter is truly understood.",
      rating: 5,
    },
    {
      name: "Mary L.",
      role: "Parent",
      text: "The behavioral management program has helped us understand and support our son better. The staff is professional, patient, and genuinely caring.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            What <span className="gradient-text">Parents Say</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from families we've supported
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card hover padding="default" className="h-full">
                <Quote className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
