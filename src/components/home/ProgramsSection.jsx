import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Users, Hand, MessageCircleHeart } from "lucide-react";
import { ROUTES, IMAGES } from "@utils/constants";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

const ProgramsSection = () => {
  const navigate = useNavigate();

  // Programs data (strategic, large-scale)
  const programs = [
    {
      title: "Early Intervention Program",
      description:
        "For children ages 2-6, focusing on foundational skills that prepare them for school success.",
      impact: "85% of children show measurable progress within 3 months",
    },
    {
      title: "School Readiness Program",
      description:
        "Prepares children for mainstream schooling with academic, social, and behavioral skills.",
      impact: "92% transition successfully to mainstream schools",
    },
    {
      title: "Parent Empowerment Sessions",
      description:
        "Encouraging parents to be present during therapy sessions and teaching them strategies to support their child's development at home.",
      impact: "Over 20 parents trained since 2020",
    },
    {
      title: "Teacher Training Program",
      description:
        "Training Zambian teachers on inclusive education practices for diverse learners.",
      impact: "Training 15+ teachers annually",
    },
  ];

  // Services data (specific therapy domains)
  const services = [
    {
      icon: Brain,
      title: "Academic Skills",
      description: "Math, literacy, writing development",
      image: IMAGES.learning,
    },
    {
      icon: Users,
      title: "Social Skills",
      description: "Turn-taking, group work, peer interaction",
      image: IMAGES.sunnyTwo,
    },
    {
      icon: Hand,
      title: "Motor Skills",
      description: "Fine and gross motor development",
      image: IMAGES.playing,
    },
    {
      icon: MessageCircleHeart,
      title: "Communication Skills",
      description: "Expressive and receptive language",
      image: IMAGES.therapy,
    },
  ];

  return (
    <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Core Programs (Strategic) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-normal">
            Creating Lasting Change
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our programs are designed to create sustainable impact at every
            level—for children, families, and the broader education system in
            Zambia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 my-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-900">
              Core Initiatives
            </h3>
            <div className="space-y-6 mb-16">
              {programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-[#32cd32] pl-6 py-2"
                >
                  <h4 className="font-bold text-lg mb-2 text-gray-900">
                    {program.title}
                  </h4>
                  <p className="text-gray-700 mb-3">{program.description}</p>
                  <div className="text-sm text-[#32cd32] font-medium bg-[#32cd32]/5 px-3 py-1 rounded-full inline-block">
                    {program.impact}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Section 2: Therapy Services (Operational) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center my-12 border-t border-[#32cd32]/50 pt-12"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                Our Therapy Domains
              </h3>
              <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
                Comprehensive support across specialized learning domains,
                delivered within our strategic programs
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      hover
                      padding="none"
                      className="h-full bg-white overflow-hidden border border-gray-200"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                        {/* Icon Overlay */}
                        <div className="absolute bottom-4 left-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <service.icon className="w-6 h-6 text-[#32cd32]" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate(ROUTES.SERVICES)}
                className="mt-8 mx-auto block bg-transparent hover:bg-transparent hover:text-gray-700 transition-all duration-300"
              >
                View All Domains
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-96 rounded-2xl bg-cover bg-center mb-6"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${IMAGES.community})`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Real Progress</h3>
                  <p className="opacity-95">
                    See how our programs translate into real change
                  </p>
                </div>
              </motion.div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">
                  Our 2025 Impact Goals
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                    Support 50+ children directly
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                    Train 15+ teachers in inclusive practices
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                    Partner with 5+ schools across Lusaka, Zambia
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-[#32cd32] rounded-full mr-3"></div>
                    Launch 1 new community outreach program
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Unified CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate(ROUTES.SERVICES)}
              className="bg-[#32cd32] hover:bg-[#22a722] text-white"
            >
              View All Services
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(ROUTES.CONTACT)}
              className="border-gray-300 text-gray-700 hover:border-[#32cd32]"
            >
              Schedule a Visit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
