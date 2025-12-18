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
import { IMAGES, ROUTES } from "@utils/constants";
import Timeline from "@components/common/Timeline";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";

const Card = ({
  children,
  variant = "default",
  padding = "default",
  hover = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-white shadow-sm border border-gray-200",
    outlined: "bg-white border-2 border-gray-200",
    gradient:
      "bg-gradient-to-br from-[#32cd32]/5 to-[#32cd32]/10 border border-[#32cd32]/20",
    dark: "bg-gray-900 text-white border border-gray-800",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const hoverClass = hover
    ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
  const navigate = useNavigate();

  const conditions = [
    {
      name: "Autism Spectrum Disorder",
      description: "Comprehensive support for communication and social skills",
    },
    {
      name: "Down Syndrome",
      description: "Specialized programs for cognitive and motor development",
    },
    {
      name: "Global Developmental Delay",
      description: "Individualized therapy to bridge developmental gaps",
    },
    {
      name: "Cerebral Palsy",
      description: "Targeted motor skills and physical therapy",
    },
    {
      name: "Other Learning Challenges",
      description: "Customized support for unique developmental needs",
    },
  ];

  const team = [
    {
      name: "Tom",
      role: "Physiotherapist & Education Specialist",
      description:
        "Registered with HPCZ, focusing on physical development and specialized education strategies for children with special needs.",
      expertise: ["Physiotherapy", "Special Education", "Motor Development"],
      years: "4+ years",
    },
    {
      name: "Chisha Kaite",
      role: "Behavioral Therapist",
      description:
        "Specializes in behavior management and skill-building interventions for children with developmental challenges.",
      expertise: ["ABA Therapy", "Behavior Modification", "Skill Acquisition"],
      years: "3+ years",
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
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
              Our Story & <span className="text-[#32cd32]">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              How a husband-and-wife team is transforming lives and creating
              inclusive futures for children with learning challenges across
              Zambia.
            </p>
          </motion.div>

          {/* Hero Image with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-lg mb-24 max-w-6xl mx-auto"
          >
            <img
              src={IMAGES.sunnysideAbout}
              alt="Children engaging in therapy activities at Sunnyside Therapy Center, Lusaka"
              className="w-full h-80 md:h-120 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#32cd32]" />
                <div>
                  <p className="text-sm opacity-80">Sunnyside Therapy Center</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content with Two-Column Layout */}
          <div className="mb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Timeline - Now Sticky */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                <Timeline
                  title="Our Journey"
                  subtitle="From home visits to a center of excellence"
                  items={[
                    {
                      year: "2022",
                      title: "The Beginning",
                      description:
                        "Started with home-based one-on-one therapy sessions across Zambia.",
                      details: [
                        "Home visits only",
                        "Served 15 families",
                        "Founded by Ben & Izzy Phiri",
                      ],
                      iconName: "Home",
                    },
                    {
                      year: "2023",
                      title: "Center Established",
                      description:
                        "Opened the first Sunnyside Therapy Center in Lusaka.",
                      details: [
                        "First physical center",
                        "Added 3 therapists",
                        "Started school readiness program",
                      ],
                      iconName: "Building",
                    },
                    {
                      year: "2024",
                      title: "Growth & Impact",
                      description: "Expanded programs and school partnerships.",
                      details: [
                        "Served 100+ children",
                        "Trained 20+ teachers",
                        "Launched parent workshops",
                      ],
                      iconName: "TrendingUp",
                    },
                    {
                      year: "2025",
                      title: "Looking Ahead",
                      description: "Expanding reach and community impact.",
                      details: [
                        "New outreach programs",
                        "Teacher training expansion",
                        "Community partnerships",
                      ],
                      iconName: "Target",
                    },
                  ]}
                  lineColor="#32cd32"
                  animateLine={true}
                  variant="condensed"
                />
              </motion.div>

              {/* Right Column: Our Story - Also Sticky */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-10 lg:sticky lg:top-24"
              >
                {/* Story Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                    Our Story
                  </h2>

                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      Founded in Lusaka by husband-and-wife team{" "}
                      <strong className="text-[#22a722]">Ben Phiri</strong> and{" "}
                      <strong className="text-[#22a722]">
                        Izzy (Elizabeth) Phiri
                      </strong>
                      , Sunnyside began with a simple but profound vision: to
                      provide specialized support for children with learning
                      challenges when and where they needed it most.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      What started as home-based one-on-one therapy sessions in
                      2022 quickly grew into something much larger. As word
                      spread and the need became apparent, we expanded into a
                      full Therapy Center and Preparatory School in 2023.
                    </p>

                    {/* Added Vision Card */}
                    <div className="bg-[#32cd32]/5 p-6 rounded-xl border border-[#32cd32]/20">
                      <h4 className="font-bold text-lg mb-2 text-gray-900">
                        Our Vision
                      </h4>
                      <p className="text-gray-700">
                        A Zambia where every child with learning challenges is
                        accepted, supported, and treated fairly in mainstream
                        schools and society.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#32cd32]/5 to-[#32cd32]/10 p-6 rounded-xl border border-[#32cd32]/20">
                      <h3 className="font-bold text-lg mb-3 text-gray-900">
                        The Gap We Fill
                      </h3>
                      <p className="text-gray-700">
                        We identified a critical void in Zambia's support
                        systems—children with learning challenges were often
                        overlooked, without access to specialized care.
                        Sunnyside bridges this gap, ensuring every child has the
                        tools and support to thrive.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      With Ben's 14+ years of hands-on developmental therapy
                      experience and Izzy's 11+ years in education and behavior
                      management, we've created more than just a therapy
                      center—we've built a movement for inclusive education in
                      Zambia.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Founders Section */}
          <div className="mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                The Hearts Behind the{" "}
                <span className="text-[#32cd32]">Mission</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the passionate founders whose combined 25+ years of
                experience drive Sunnyside's life-changing work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Ben Phiri */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card variant="gradient" hover={true} padding="lg">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-0 border-gray-700 shadow-xl">
                      <img
                        src={IMAGES.ben}
                        alt="Ben Phiri, Co-Founder and Developmental Therapist"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Ben Phiri
                    </h3>
                    <div className="text-lg text-[#32cd32] font-medium mb-4">
                      Co-Founder & Developmental Therapist
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      With over 14 years of hands-on experience, Ben specializes
                      in creating nurturing environments where children can
                      develop at their own pace.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
                        Developmental Therapy
                      </span>
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
                        Hands-on Support
                      </span>
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="gradient" hover={true} padding="lg">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-0 border-gray-700 shadow-xl">
                      <img
                        src={IMAGES.izzy}
                        alt="Izzy (Elizabeth) Phiri, Co-Founder and Education Specialist"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Izzy (Elizabeth) Phiri
                    </h3>
                    <div className="text-lg text-[#32cd32] font-medium mb-4">
                      Co-Founder & Education/Behaviour Specialist
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      With 11+ years in education and behavior management, Izzy
                      designs transformative programs that build confidence and
                      independence.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
                        Behavior Management
                      </span>
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
                        Special Education
                      </span>
                      <span className="px-3 py-1 bg-[#32cd32]/10 text-[#32cd32] rounded-full text-sm font-medium">
                        Program Development
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our Expert <span className="text-[#32cd32]">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized professionals dedicated to supporting every child's
                unique journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="default" hover={true} padding="lg">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="text-sm text-[#32cd32] font-medium mb-1">
                          {member.years} Experience
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <div className="text-lg text-[#32cd32] font-medium">
                          {member.role}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6">{member.description}</p>
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

          {/* Who We Serve */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Who We <span className="text-[#32cd32]">Serve</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored programs for children with specific developmental
                challenges
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {conditions.map((condition, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card
                    variant="default"
                    hover={true}
                    padding="lg"
                    className="h-full flex flex-col items-center justify-center text-center min-h-[180px] transition-all duration-300 hover:shadow-md"
                  >
                    {/* Icon with Animation */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="mb-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#32cd32]/10 to-[#32cd32]/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#32cd32] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {idx + 1}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Title - Fixed Height */}
                    <div className="h-12 flex items-center justify-center mb-2">
                      <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                        {condition.name}
                      </h3>
                    </div>

                    {/* Description - Fixed Height */}
                    <div className="h-16 flex items-center">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {condition.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission & Values */}
          <div className="mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our Core <span className="text-[#32cd32]">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide every interaction and decision at
                Sunnyside.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description:
                    "We approach every child and family with empathy, understanding that each journey is unique and deserves personalized care.",
                },
                {
                  icon: Users,
                  title: "Inclusion",
                  description:
                    "We create environments where every child feels valued, respected, and has equal opportunities to learn and grow.",
                },
                {
                  icon: CheckCircle,
                  title: "Excellence",
                  description:
                    "We deliver evidence-based, high-quality therapy and education, constantly refining our approach for optimal outcomes.",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="gradient" padding="lg" className="h-full">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#32cd32] rounded-full flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card
              variant="dark"
              padding="lg"
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Begin the Journey?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Every child deserves the opportunity to learn, grow, and thrive.
                Let's work together to create a brighter future.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
                {[
                  {
                    icon: Phone,
                    title: "Call/WhatsApp",
                    details: ["+260 978 501 101", "+260 973 902 247"],
                    action: "tel:+260978501101",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    details: ["info@sunnysidetherapy.com"],
                    action: "mailto:info@sunnysidetherapy.com",
                  },
                  {
                    icon: Calendar,
                    title: "Visit Us",
                    details: ["Lusaka, Zambia", "Schedule a tour"],
                    action: ROUTES.CONTACT,
                  },
                ].map((contact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <contact.icon className="w-8 h-8 text-[#32cd32] mb-3" />
                    <p className="text-white font-semibold mb-2">
                      {contact.title}
                    </p>
                    {contact.details.map((detail, i) => (
                      <p key={i} className="text-gray-300 text-sm">
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                {/* Changed to white variant */}
                <Button
                  variant="white"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  size="lg"
                >
                  Book a Consultation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.ENROLLMENT)}
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  Start Enrollment
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-gray-400 mb-6">Connect with our community</p>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://facebook.com/sunnysidetherapycenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#32cd32] hover:text-lime-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com/_sunnysidetherapycenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#32cd32] hover:text-lime-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
