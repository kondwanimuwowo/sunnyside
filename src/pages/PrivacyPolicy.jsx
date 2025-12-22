import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from "lucide-react";
import SEO from "@components/common/SEO";

const Section = ({ title, icon: Icon, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-[#32cd32]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#32cd32]" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="prose prose-green max-w-none text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.section>
);

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Sunnyside Therapy Center"
        description="Learn how Sunnyside Therapy Center protects your privacy and handles personal and developmental data for children across Zambia."
        keywords="privacy policy, data protection, therapy center privacy, child data safety"
      />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-[#32cd32]">Policy</span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 22, 2024
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            <p className="text-lg text-gray-600 mb-12 italic border-l-4 border-[#32cd32] pl-6">
              At Sunnyside Therapy Center, we understand that we are entrusted
              with sensitive information about children and families. Protecting
              this information is not just a legal requirement but a fundamental
              part of our commitment to your family.
            </p>

            <Section title="Information We Collect" icon={FileText}>
              <p>
                To provide the best possible therapy and education, we collect
                specific types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Contact Information:</strong> Names, phone
                  numbers, email addresses, and physical addresses of parents or
                  guardians.
                </li>
                <li>
                  <strong>Child's Developmental Profile:</strong> Date of birth,
                  medical history, previous assessments, and current
                  developmental challenges.
                </li>
                <li>
                  <strong>Session Notes:</strong> Detailed records of therapy
                  sessions, progress monitoring data, and educational goals.
                </li>
                <li>
                  <strong>Correspondence:</strong> Records of communications
                  between families and our therapy team.
                </li>
              </ul>
            </Section>

            <Section title="How We Use Your Information" icon={Eye}>
              <p>The information we collect is used solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Design and implement personalized therapy and education plans.</li>
                <li>Track developmental progress over time.</li>
                <li>Communicate with parents regarding session updates and scheduling.</li>
                <li>Provide necessary medical information to emergency services if required.</li>
                <li>Comply with regulatory and professional reporting standards in Zambia.</li>
              </ul>
            </Section>

            <Section title="Data Protection & Security" icon={Lock}>
              <p>
                We implement industry-standard security measures to protect your
                data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Confidentiality:</strong> All staff members sign strict
                  confidentiality agreements.
                </li>
                <li>
                  <strong>Access Control:</strong> Only authorized therapists
                  working directly with your child have access to their records.
                </li>
                <li>
                  <strong>Secure Storage:</strong> Physical records are stored in
                  locked filing systems, and digital data is stored on encrypted,
                  password-protected platforms.
                </li>
              </ul>
            </Section>

            <Section title="Sharing Your Information" icon={Shield}>
              <p>
                We do <strong>not</strong> sell, trade, or rent your personal
                information to third parties. We only share information when:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We have your explicit written consent.</li>
                <li>
                  Sharing with other medical professionals is necessary for your
                  child's care (e.g., coordinating with a pediatrician).
                </li>
                <li>Required by Zambian law or professional regulatory bodies.</li>
              </ul>
            </Section>

            <Section title="Your Rights" icon={FileText}>
              <p>As a parent or guardian, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your child's developmental records upon request.</li>
                <li>Request corrections to any inaccurate information.</li>
                <li>Withdraw consent for data processing (noting this may affect our ability to provide services).</li>
                <li>Request that records be transferred to another professional service.</li>
              </ul>
            </Section>

            {/* Contact Footer */}
            <div className="mt-16 pt-12 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">
                Questions or Concerns?
              </h3>
              <p className="text-gray-600 mb-8">
                If you have any questions about our privacy practices, please
                reach out to our management team:
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <a
                  href="mailto:info@sunnyside.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#32cd32]/5 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-[#32cd32]" />
                  <span className="text-gray-700 font-medium">info@sunnyside.com</span>
                </a>
                <a
                  href="tel:0978501101"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#32cd32]/5 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-[#32cd32]" />
                  <span className="text-gray-700 font-medium">+260 978 501 101</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
