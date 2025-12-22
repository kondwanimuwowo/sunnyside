import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { CONTACT } from "@utils/constants";
import { useForm } from "@hooks/useForm";
import { contactValidators } from "@utils/validators";
import { submitContactForm } from "@api/contact";
import { useNotification } from "@context/NotificationContext";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { success, error } = useNotification();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: "",
    },
    contactValidators
  );

  const subjectOptions = [
    { value: "", label: "Select a subject", disabled: true },
    { value: "enrollment", label: "Enrollment Inquiry" },
    { value: "services", label: "Services Information" },
    { value: "visit", label: "Schedule a Visit" },
    { value: "support", label: "Support & Resources" },
    { value: "other", label: "Other" },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      details: [CONTACT.PHONE_1, CONTACT.PHONE_2],
      action: `tel:${CONTACT.PHONE_1.replace(/\s+/g, "")}`,
      description: "For urgent inquiries or quick questions",
    },
    {
      icon: Mail,
      title: "Email",
      details: [CONTACT.EMAIL],
      action: `mailto:${CONTACT.EMAIL}`,
      description: "Detailed inquiries or document submissions",
    },
    {
      icon: MapPin,
      title: "Location",
      details: [CONTACT.ADDRESS],
      action: `https://maps.google.com/?q=${encodeURIComponent(
        CONTACT.ADDRESS
      )}`,
      description: "Visit our center for a personal tour",
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      details: ["Facebook Messenger"],
      action: CONTACT.FACEBOOK,
      description: "Connect and follow our updates",
    },
  ];

  const responseTimeCards = [
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within 24 hours",
    },
    {
      icon: Users,
      title: "Personal Attention",
      description: "Each inquiry gets individual care",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Book appointments at your convenience",
    },
  ];

  const onSubmit = async (formData) => {
    try {
      await submitContactForm(formData);
      success("Message sent successfully! We'll get back to you soon.");
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      error("Failed to send message. Please try again or contact us directly.");
    }
  };

  const quickFill = (method) => {
    setSelectedMethod(method.title);
    const newValues = {
      ...values,
      subject: "other",
      message: `I'm interested in contacting you via ${method.title.toLowerCase()}.\n\n`,
    };

    handleChange({ target: { name: "subject", value: newValues.subject } });
    handleChange({ target: { name: "message", value: newValues.message } });
  };

  return (
    <>
      <SEO
        title="Contact Us - Sunnyside Therapy Center"
        description="Get in touch with Sunnyside Therapy Center. Contact us for enrollment, services information, or to schedule a visit."
        keywords="contact sunnyside therapy center, special needs support zambia, autism therapy contact"
      />

      <div className="pt-24 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Contact <span className="text-[#32cd32]">Us</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reach out to us today and take the first step toward supporting
              your child's journey.
            </p>
          </motion.div>

          <div className="flex flex-col-reverse lg:flex-row lg:grid lg:grid-cols-3 gap-8">
            {/* Contact Information - Below on mobile, left on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Ways to Connect
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose your preferred method of contact.
                </p>
              </div>

              {/* Minified Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className={`
                      bg-white rounded-lg p-4 shadow-sm border border-gray-200 
                      hover:border-[#32cd32]/40 transition-all duration-200
                      ${
                        selectedMethod === method.title
                          ? "border-[#32cd32]"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#32cd32]/10 flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-5 h-5 text-[#32cd32]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {method.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          {method.description}
                        </p>
                        {method.details.map((detail, i) => (
                          <p key={i} className="text-sm text-gray-700 truncate">
                            {method.action ? (
                              <a
                                href={method.action}
                                target={
                                  method.action.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel="noopener noreferrer"
                                className="hover:text-[#32cd32] transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => quickFill(method)}
                        className="text-xs text-[#32cd32] hover:text-[#22a722] p-0 h-auto"
                      >
                        Use this method
                      </Button>
                      {method.action && (
                        <a
                          href={method.action}
                          target={
                            method.action.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-[#32cd32] hover:text-[#22a722]"
                        >
                          Contact →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visit Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#32cd32]/5 p-4 rounded-lg border border-[#32cd32]/20"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  Visit Our Center
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Schedule a tour to see our facilities and meet our team.
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    CONTACT.ADDRESS
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#32cd32] hover:text-[#22a722] font-medium inline-flex items-center gap-1"
                >
                  Get directions
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Form on top, Response Cards below */}
            <div className="lg:col-span-2">
              {/* Contact Form - Takes top priority on mobile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="bg-white rounded-xl shadow-md border border-gray-200 mt-6">
                  <div className="p-6 sm:p-8">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Fill out the form below and we'll get back to you
                        promptly.
                      </p>
                    </div>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-12 h-12 bg-[#32cd32]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="w-6 h-6 text-[#32cd32]" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          Message Received!
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Thank you for reaching out. We'll contact you soon.
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSubmitted(false)}
                          className="text-[#32cd32] hover:text-[#22a722]"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(onSubmit);
                        }}
                        className="space-y-4"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            label="Your Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name ? errors.name : ""}
                            required
                            placeholder="John Doe"
                          />

                          <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email ? errors.email : ""}
                            required
                            placeholder="[email protected]"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone ? errors.phone : ""}
                            placeholder="0971234567"
                          />

                          <Select
                            label="Preferred Contact"
                            name="preferredContact"
                            value={values.preferredContact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={[
                              { value: "", label: "Any method" },
                              { value: "phone", label: "Phone Call" },
                              { value: "whatsapp", label: "WhatsApp" },
                              { value: "email", label: "Email" },
                            ]}
                          />
                        </div>

                        <Select
                          label="Subject"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={subjectOptions}
                          error={touched.subject ? errors.subject : ""}
                          required
                        />

                        <Textarea
                          label="Your Message"
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.message ? errors.message : ""}
                          required
                          rows={4}
                          placeholder="Tell us about your inquiry..."
                        />

                        <div className="pt-2">
                          <Button
                            type="submit"
                            loading={isSubmitting}
                            fullWidth
                          >
                            Send Message
                          </Button>
                          <p className="text-xs text-gray-500 text-center mt-3">
                            We respect your privacy and will never share your
                            information.
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Response Time Cards - Right below the form on the right side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid sm:grid-cols-3 gap-4">
                  {responseTimeCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#32cd32]/10 flex-shrink-0">
                          <card.icon className="w-4 h-4 text-[#32cd32]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                            {card.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
