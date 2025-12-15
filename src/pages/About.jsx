import React from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import {
  Heart,
  CheckCircle,
  Users,
  Calendar,
  Phone,
  Facebook,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";
import { IMAGES } from "@utils/constants";

const Card = ({
  children,
  variant = "default",
  padding = "default",
  hover = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-white shadow-lg",
    outlined: "bg-white border-2 border-gray-200",
    gradient:
      "bg-gradient-to-br from-lime-50 to-teal-50 border-2 border-lime-200",
    dark: "bg-gray-900 text-white",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const hoverClass = hover
    ? "hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    : "";

  return (
    <div
      className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const About = () => {
  const conditions = [
    "Autism Spectrum Disorder",
    "Down Syndrome",
    "Global Developmental Delay",
    "Cerebral Palsy",
    "And other learning challenges",
  ];

  const domains = [
    {
      title: "Academic Skills",
      items: [
        "Cognition",
        "Math skills",
        "Writing development",
        "Literacy",
        "Time & weather concepts",
      ],
    },
    {
      title: "Communication Skills",
      items: [
        "Expressive & receptive language",
        "Speech-language therapy",
        "Picture Exchange Communication System (PECS)",
        "Augmentative and alternative communication",
      ],
    },
    {
      title: "Social Skills",
      items: [
        "Turn-taking",
        "Small group work",
        "Peer interaction",
        "Emotional regulation",
        "Friendship building",
      ],
    },
    {
      title: "Motor Skills",
      items: [
        "Gross motor: catching, throwing, balancing",
        "Fine motor: lacing, beading, scissor use",
        "Occupational therapy integration",
        "Sensory motor activities",
      ],
    },
    {
      title: "Adaptive Skills",
      items: [
        "Toilet training & bathroom independence",
        "Independent feeding",
        "Daily living skills",
        "Self-care routines",
      ],
    },
    {
      title: "Behavioral Support",
      items: [
        "Behavior management strategies",
        "Positive behavior support",
        "SPED tutorials",
        "Individualized behavior plans",
      ],
    },
  ];

  const team = [
    {
      name: "Tom",
      role: "Physiotherapist & Education Specialist",
      description:
        "Registered with HPCZ, focusing on physical development and specialized education strategies for children with special needs.",
      expertise: ["Physiotherapy", "Special Education", "Motor Development"],
    },
    {
      name: "Chisha Kaite",
      role: "Behavioral Therapist",
      description:
        "Specializes in behavior management and skill-building interventions for children with developmental challenges.",
      expertise: ["ABA Therapy", "Behavior Modification", "Skill Acquisition"],
    },
  ];

  const additionalServices = [
    {
      title: "Speech & Language Therapy",
      description:
        "Comprehensive assessment and intervention for speech, language, and communication disorders.",
    },
    {
      title: "Occupational Therapy",
      description:
        "Enhancing daily living skills, sensory processing, and fine/gross motor coordination.",
    },
    {
      title: "Sensory Integration",
      description:
        "Tailored sensory activities for sensory seekers and calming strategies for sensory overload.",
    },
    {
      title: "Parent Training & Support",
      description:
        "Empowering parents with strategies and tools to support their child's development at home.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Home-Based Services",
      description: "Started with one-on-one home therapy sessions",
    },
    {
      year: "2023",
      title: "Center Established",
      description: "Opened full therapy center and preparatory school",
    },
    {
      year: "2024",
      title: "Team Expansion",
      description: "Added specialized therapists and educators",
    },
    {
      year: "2025",
      title: "Community Impact",
      description: "Serving 100+ families across Zambia",
    },
  ];

  return (
    <>
      <SEO
        title="About Sunnyside Therapy Center & Preparatory School - Lusaka, Zambia"
        description="Founded by Ben & Izzy Phiri, Sunnyside provides specialized therapy and education for children with Autism, Down Syndrome, and other learning challenges in Zambia. Offering speech therapy, occupational therapy, and behavioral support."
        keywords="sunnyside therapy zambia, special needs school lusaka, autism therapy zambia, ben izzy phiri, speech therapy lusaka, occupational therapy zambia, down syndrome support zambia, special education zambia"
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
              About <span className="text-[#32cd32]">Sunnyside</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Empowering children with learning challenges to thrive through
              therapy, education, and love in Lusaka, Zambia.
            </p>
          </motion.div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
              >
                Our <span className="text-[#32cd32]">Story</span>
              </motion.h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in Lusaka by husband-and-wife team{" "}
                <strong>Ben Phiri</strong> and{" "}
                <strong>Izzy (Elizabeth) Phiri</strong>, Sunnyside began with
                home-based one-on-one therapy sessions for families across
                Zambia. Seeing the growing need, we expanded into a full Therapy
                Center and Preparatory School in 2023.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                With <strong>Ben's 14+ years</strong> in developmental therapy
                and <strong>Izzy's 11+ years</strong> in education and behavior
                management, we've created a safe, inclusive space where every
                child is valued and supported to reach their full potential.
              </p>

              {/* Milestones Timeline */}
              <div className="pt-8">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-4 text-gray-900 text-center mb-12 "
                >
                  Our Journey
                </motion.h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {milestones.map((milestone, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-[#32cd32]">
                        {milestone.year}
                      </div>
                      <div className="font-semibold mt-2 text-gray-900">
                        {milestone.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {milestone.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.sunnysideAbout}
                  alt="Children engaging in therapy activities at Sunnyside Therapy Center, Lusaka"
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#32cd32] text-white p-6 rounded-2xl shadow-xl">
                <Heart className="w-12 h-12 fill-white" />
              </div>
            </motion.div>
          </div>

          {/* Founders Section */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
            >
              Meet Our <span className="text-[#32cd32]">Founders</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Ben Phiri */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <Card variant="gradient" hover={true} padding="lg">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#32cd32] shadow-xl">
                      <img
                        src={IMAGES.ben}
                        alt="Ben Phiri, Co-Founder and Developmental Therapist"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Ben Phiri
                    </h3>
                    <p className="text-xl text-[#32cd32] font-medium mb-4">
                      Co-Founder & Developmental Therapist
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                      With over 14 years of hands-on experience, Ben specializes
                      in developmental therapy and creating supportive
                      environments for children with special needs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <span className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-sm">
                        Developmental Therapy
                      </span>
                      <span className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-sm">
                        Hands-on Support
                      </span>
                      <span className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-sm">
                        Program Design
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Izzy Phiri */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="gradient" hover={true} padding="lg">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#32cd32] shadow-xl">
                      <img
                        src={IMAGES.izzy}
                        alt="Izzy (Elizabeth) Phiri, Co-Founder and Education Specialist"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Izzy (Elizabeth) Phiri
                    </h3>
                    <p className="text-xl text-[#32cd32] font-medium mb-4">
                      Co-Founder & Education/Behaviour Specialist
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                      With 11+ years in education and behavior management, Izzy
                      designs individualized programs that build confidence and
                      replace challenging behaviors with positive alternatives.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        Behavior Management
                      </span>
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        Special Education
                      </span>
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        Program Development
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
              >
                Our <span className="text-[#32cd32]">Team</span>
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="default" hover={true} padding="lg">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-xl text-[#32cd32] font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Domains of Learning */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
              >
                Comprehensive <span className="text-[#32cd32]">Services</span>
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domains.map((domain, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="default" hover={true} padding="lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {domain.title}
                    </h3>
                    <ul className="space-y-3">
                      {domain.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <CheckCircle className="w-5 h-5 text-[#32cd32] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Specialized Therapeutic Services
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {additionalServices.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="outlined" hover={true} padding="lg">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {service.title}
                        </h4>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Who We Serve */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
              >
                Who We <span className="text-[#32cd32]">Serve</span>
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {conditions.map((condition, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-900">
                    {condition}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission & Values */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4 text-gray-900 text-center mb-12 "
              >
                Our <span className="text-[#32cd32]">Values</span>
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description:
                    "Treating every child and family with empathy, understanding, and unconditional positive regard.",
                },
                {
                  icon: Users,
                  title: "Inclusion",
                  description:
                    "Creating a welcoming environment where every child feels valued and has equal opportunities to learn and grow.",
                },
                {
                  icon: CheckCircle,
                  title: "Excellence",
                  description:
                    "Delivering evidence-based, high-quality therapy and education tailored to each child's unique needs.",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="gradient" padding="lg">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#32cd32] rounded-full flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card
              variant="dark"
              padding="lg"
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex justify-center mb-8"
              >
                {/*<div className="w-24 h-24 bg-[#32cd32] rounded-full flex items-center justify-center">
                  {/*<Heart className="w-14 h-14 text-white" />
                </div>*/}
              </motion.div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Our Ultimate Goal
              </h2>
              <p className="text-2xl text-gray-200 mb-8 max-w-3xl mx-auto italic">
                To ensure every child with learning challenges in Zambia is
                accepted, supported, and treated fairly in mainstream schools
                and society.
              </p>

              {/* Contact Information */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Phone,
                    title: "Phone / WhatsApp",
                    details: ["+260 978 501 101", "+260 973 902 247"],
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    details: ["info@sunnysidetherapy.com"],
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    details: ["Lusaka, Zambia"],
                  },
                ].map((contact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <contact.icon className="w-8 h-8 text-[#32cd32] mb-3" />
                    <p className="text-white font-semibold">{contact.title}</p>
                    {contact.details.map((detail, i) => (
                      <p key={i} className="text-gray-300">
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links - Only Facebook and Instagram */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-6 mt-12"
              >
                <a
                  href="https://facebook.com/sunnysidetherapycenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#32cd32] hover:text-lime-400 p-3 transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-8 h-8" />
                </a>
                <a
                  href="https://instagram.com/_sunnysidetherapycenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#32cd32] hover:text-lime-400 p-3 transition-colors"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-8 h-8" />
                </a>
              </motion.div>

              <p className="mt-8 text-gray-400 text-lg">
                When you need a safe space – consider Sunnyside.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
