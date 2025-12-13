import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield } from "lucide-react";
import EnrollmentForm from "@components/enrollment/EnrollmentForm";
import SEO from "@components/common/SEO";

const Enrollment = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Personalized Care",
      description: "Individual assessment and customized therapy plans",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Morning and afternoon sessions to fit your family",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Licensed professionals in a welcoming space",
    },
  ];

  return (
    <>
      <SEO
        title="Enroll Your Child"
        description="Register your child for therapy and educational services at Sunnyside Therapy Center. Specialized support for children with autism, Down syndrome, and learning challenges."
        keywords="enroll, register, therapy enrollment, special needs education, Lusaka therapy center"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Header */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
                Enroll <span className="text-[#32cd32]">Your Child</span>
              </h1>

              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Take the first step towards your child's success. Complete this
                form to register for our specialized therapy and educational
                programs.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#32cd32]" />
                  <span>10-15 minutes</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#32cd32]" />
                  <span>Secure & Confidential</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[rgba(50,205,50,0.1)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-[#32cd32]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enrollment Form */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <EnrollmentForm />
          </div>
        </section>

        {/* Help Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[rgba(50,205,50,0.02)]">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have questions or need assistance with the enrollment
              process, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0978501101"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-[#32cd32] text-[#32cd32] rounded-lg font-medium hover:bg-[rgba(50,205,50,0.05)] transition-colors"
              >
                Call Us
              </a>
              <a
                href={`https://wa.me/260978501101?text=${encodeURIComponent(
                  "Hello, I need help with enrollment"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#25d366] text-white rounded-lg font-medium hover:bg-[#20ba5a] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Enrollment;
