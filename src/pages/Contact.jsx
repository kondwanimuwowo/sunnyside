import React, { useState } from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
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
    },
    contactValidators
  );

  const subjectOptions = [
    { value: "enrollment", label: "Enrollment Inquiry" },
    { value: "services", label: "Services Information" },
    { value: "visit", label: "Schedule a Visit" },
    { value: "support", label: "Support & Resources" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = async (formData) => {
    try {
      await submitContactForm(formData);
      success("Message sent successfully! We'll get back to you soon.");
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      error("Failed to send message. Please try again or contact us directly.");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      details: [CONTACT.PHONE_1, CONTACT.PHONE_2],
      color: "#32cd32",
    },
    {
      icon: Mail,
      title: "Email",
      details: [CONTACT.EMAIL],
      link: `mailto:${CONTACT.EMAIL}`,
      color: "#4318dd",
    },
    {
      icon: MapPin,
      title: "Location",
      details: [CONTACT.ADDRESS],
      color: "#1ba397",
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      details: ["Find us on Facebook"],
      link: CONTACT.FACEBOOK,
      linkText: "Sunnyside Therapy Center",
      color: "#efe82a",
    },
  ];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Sunnyside Therapy Center. Contact us for enrollment, services information, or to schedule a visit."
        keywords="contact sunnyside, therapy center contact, zambia special needs contact"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
              Get in <span className="text-[#32cd32]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600">
              We're here to answer your questions and help your child thrive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of the following channels. We're
                  always happy to discuss how we can support your child.
                </p>
              </div>

              {/* Contact Methods - Uniform Icons */}
              <div className="space-y-6">
                {contactMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    {/* Uniform white background with lime green icon */}
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                      <method.icon className="w-6 h-6 text-[#32cd32]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">
                        {method.title}
                      </h3>
                      {method.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">
                          {method.link ? (
                            <a
                              href={method.link}
                              target={
                                method.link.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel="noopener noreferrer"
                              className="text-[#32cd32] hover:text-[#22a722] transition-colors"
                            >
                              {method.linkText || detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[rgba(50,205,50,0.08)] p-6 rounded-xl border border-[rgba(50,205,50,0.2)]">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Visit Our Center
                </h3>
                <p className="text-gray-700">
                  Come visit us to learn more about our programs and see our
                  facility. We welcome parents and guardians to schedule a tour.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[rgba(50,205,50,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-[#32cd32]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
                  }}
                  className="space-y-4"
                >
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
                    label="Message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message ? errors.message : ""}
                    required
                    rows={6}
                    placeholder="Tell us about your inquiry..."
                  />

                  <Button type="submit" loading={isSubmitting} fullWidth>
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
