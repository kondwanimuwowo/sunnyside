import React from "react";
import { motion } from "framer-motion";
import SEO from "@components/common/SEO";
import ServiceCard from "@components/services/ServiceCard";
import {
  LEARNING_DOMAINS,
  ADDITIONAL_SERVICES,
  ROUTES,
  CONTACT,
} from "@utils/constants";
import {
  CheckCircle,
  Users,
  BookOpen,
  Heart,
  Calendar,
  Phone,
  MessageSquare,
  ClipboardCheck,
  Map,
} from "lucide-react";
import Button from "@components/common/Button";
import { useNavigate } from "react-router-dom";
import servicesData from "../data/services";

const Services = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: "Early Intervention Program",
      description:
        "For children ages 2-6, building foundational skills before school entry",
      duration: "6-12 months program",
      focus: [
        "Academic readiness",
        "Communication basics",
        "Social interaction",
        "Motor development",
      ],
      outcome: "85% of children show measurable progress within 3 months",
    },
    {
      title: "School Readiness Program",
      description:
        "Prepares children for successful mainstream school integration",
      duration: "Customized timeline",
      focus: [
        "Classroom behavior",
        "Peer interaction",
        "Academic skills",
        "Following instructions",
      ],
      outcome: "92% transition successfully to mainstream schools",
    },
    {
      title: "Parent Training Program",
      description:
        "Empower parents to support their child's development at home",
      duration: "Monthly workshops + ongoing support",
      focus: [
        "Behavior management",
        "Communication strategies",
        "Daily routine structure",
        "Progress tracking",
      ],
      outcome: "Parents report 80% more confidence in supporting their child",
    },
  ];

  const volunteerOpportunities = [
    {
      role: "Therapy Assistant",
      description: "Support our therapists during sessions (training provided)",
      commitment: "Flexible hours",
      requirements: [
        "Patience",
        "Willingness to learn",
        "Passion for children",
      ],
      benefits: [
        "Hands-on experience",
        "Training certificate",
        "Community impact",
      ],
    },
    {
      role: "Parent Support Mentor",
      description: "Share your experience with new parents (parents only)",
      commitment: "2-4 hours weekly",
      requirements: [
        "Parent of child with special needs",
        "6+ months at Sunnyside",
        "Good communication skills",
      ],
      benefits: [
        "Make a difference",
        "Peer support network",
        "Leadership experience",
      ],
    },
    {
      role: "Teacher Training Assistant",
      description: "Help train mainstream teachers on inclusive practices",
      commitment: "Project-based",
      requirements: [
        "Education background",
        "Understanding of special needs",
        "Public speaking comfort",
      ],
      benefits: [
        "Professional development",
        "Network building",
        "Systemic impact",
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Our Services & Programs"
        description="Comprehensive physical therapy, developmental education services, and support programs for children with learning challenges. Five learning domains plus specialized behavioral, physical, and sensory support."
        keywords="therapy services, physical therapy, academic skills, communication therapy, social skills, motor skills, behavior management, sensory support, early intervention, school readiness, parent training, volunteer opportunities"
      />

      <div className="pt-24 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 md:mb-28 max-w-4xl mx-auto h-screen-flex justify-center items-center flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our <span className="text-[#32cd32]">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              At Sunnyside, we don't just provide therapy—we build comprehensive
              pathways to success for children, families, and communities across
              Zambia.
            </p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8 bg-[#32cd32]/5 p-4 rounded-2xl"
            >
              <div className="text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-[#32cd32]">5</div>
                <div className="text-sm text-gray-600">Learning Domains</div>
              </div>
              <div className="text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-[#32cd32]">3</div>
                <div className="text-sm text-gray-600">Core Programs</div>
              </div>
              <div className="text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-[#32cd32]">8</div>
                <div className="text-sm text-gray-600">
                  Specialized Services
                </div>
              </div>
              <div className="text-center p-4 rounded-xl">
                <div className="text-2xl font-bold text-[#32cd32]">160+</div>
                <div className="text-sm text-gray-600">Children Served</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.ENROLLMENT)}
                className="bg-[#32cd32] hover:bg-[#22a722] text-white"
              >
                Start Enrollment Process
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="border-gray-300 text-gray-700 hover:border-[#32cd32]"
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </motion.div>
          {/* Five Domains */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                The Five Learning Domains
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our holistic approach addresses every aspect of development,
                ensuring children build comprehensive skills for success in
                school and life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.domains.map((domain, idx) => (
                <ServiceCard key={domain.id} service={domain} index={idx} />
              ))}
            </div>
          </div>
          {/* Core Programs Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Our Structured Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond individual therapy, we offer comprehensive programs
                designed to create lasting change at every stage of development.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#32cd32]/10 rounded-xl flex items-center justify-center mr-4">
                      {idx === 0 && (
                        <BookOpen className="w-6 h-6 text-[#32cd32]" />
                      )}
                      {idx === 1 && (
                        <Users className="w-6 h-6 text-[#32cd32]" />
                      )}
                      {idx === 2 && (
                        <Heart className="w-6 h-6 text-[#32cd32]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {program.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{program.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Program Focus
                    </h4>
                    <ul className="space-y-2">
                      {program.focus.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#32cd32]/5 p-4 rounded-lg">
                    <p className="text-sm text-[#32cd32] font-medium">
                      {program.outcome}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#32cd32]/5 to-[#32cd32]/10 p-8 rounded-2xl text-center max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Not Sure Which Program Is Right?
              </h3>
              <p className="text-gray-600 mb-6">
                Our assessment process helps identify the best starting point
                for your child. We'll create a personalized plan that combines
                the right program with targeted therapy domains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="bg-[#32cd32] hover:bg-[#22a722] text-white"
                >
                  Book a Free Assessment
                </Button>
                <a href={`tel:${CONTACT.PHONE_1}`}>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:border-[#32cd32]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call to Discuss
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          {/* Additional Services */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Specialised Support Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide targeted interventions to address specific
                challenges, ensuring every child receives comprehensive support.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ADDITIONAL_SERVICES.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-[rgba(50,205,50,0.03)] to-[rgba(50,205,50,0.10)] rounded-2xl p-8 border border-[rgba(50,205,50,0.25)] h-full flex flex-col"
                >
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#32cd32] mr-3 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* The Sunnyside Process - With Lucide Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-28"
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                  Our Process
                </h3>
                <p className="text-gray-600 text-lg">
                  A clear, thoughtful journey from initial conversation to
                  personalized support
                </p>
              </div>

              <div className="relative">
                {/* Animated timeline line - desktop only */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full bg-[#32cd32] origin-top"
                  />
                </div>

                <div className="space-y-12 md:space-y-16">
                  {[
                    {
                      step: "Step One",
                      title: "Understanding Your Journey",
                      description:
                        "We begin with a free, no-pressure consultation. This is where we listen—to your story, your concerns, and your hopes for your child's future.",
                      Icon: MessageSquare,
                    },
                    {
                      step: "Step Two",
                      title: "Comprehensive Assessment",
                      description:
                        "Through careful observation and interaction, we evaluate strengths and needs across all five learning domains to build a complete picture.",
                      Icon: ClipboardCheck,
                    },
                    {
                      step: "Step Three",
                      title: "Personalized Pathway",
                      description:
                        "We craft a tailored plan that combines targeted therapy with strategic programs, creating a roadmap for meaningful, sustainable progress.",
                      Icon: Map,
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: idx * 0.2, duration: 0.6 }}
                      className="relative flex"
                    >
                      {/* Step indicator - desktop */}
                      <div className="hidden md:flex items-center justify-center w-16 flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: idx * 0.2 + 0.3,
                            type: "spring",
                          }}
                          className="w-16 h-16 rounded-full border-2 border-[#32cd32] flex items-center justify-center bg-white relative z-10"
                        >
                          <item.Icon className="w-6 h-6 text-[#32cd32]" />
                        </motion.div>
                      </div>

                      {/* Step indicator - mobile */}
                      <div className="md:hidden mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full border-2 border-[#32cd32] flex items-center justify-center bg-white">
                          <item.Icon className="w-5 h-5 text-[#32cd32]" />
                        </div>
                      </div>

                      {/* Content - proper spacing */}
                      <div className="flex-1 md:ml-8">
                        <div className="mb-3">
                          <div className="text-sm text-[#32cd32] font-medium tracking-wider mb-1">
                            {item.step}
                          </div>
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-20 pt-12 border-t border-gray-100 text-center"
              >
                <p className="text-gray-600 mb-8 text-lg">Ready to begin?</p>
                <div className="inline-flex flex-col sm:flex-row items-center gap-8">
                  <button
                    onClick={() => navigate(ROUTES.CONTACT)}
                    className="text-[#32cd32] hover:text-[#22a722] font-medium text-lg transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      Start your journey
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </span>
                  </button>

                  <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>

                  <div className="text-gray-500 text-sm">
                    Questions? Call{" "}
                    <a
                      href={`tel:${CONTACT.PHONE_1}`}
                      className="text-[#32cd32] hover:text-[#22a722] font-medium"
                    >
                      {CONTACT.PHONE_1}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* Volunteer & Get Involved */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Join Our Movement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in community-powered change. Whether you're a parent,
                teacher, therapist, or concerned citizen, there's a place for
                you at Sunnyside.
              </p>
              <h3 className="text-2xl font-bold mb-2 mt-8 text-gray-900">
                Volunteer & Get Involved
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {volunteerOpportunities.map((opportunity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow h-full"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {opportunity.role}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {opportunity.description}
                    </p>
                    <div className="text-sm text-[#32cd32] font-medium bg-[#32cd32]/5 px-3 py-1 rounded-full inline-block">
                      {opportunity.commitment}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {opportunity.requirements.map((req, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {opportunity.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 rounded-2xl text-center max-w-4xl mx-auto"
            >
              <h3 className="text-3xl font-bold mb-6">
                Ready to Make a Difference?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're enrolling your child, training as a volunteer, or
                supporting our mission in other ways—we're here to help you get
                started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="white"
                  onClick={() => navigate(ROUTES.ENROLLMENT)}
                  className="border-white text-gray-900 hover:bg-white/90 hover:border-white"
                >
                  Start Enrollment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="text-white border-white hover:bg-white/10"
                >
                  Volunteer Interest Form
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.DONATE)}
                  className="text-white border-white hover:bg-white/10"
                >
                  Support Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
