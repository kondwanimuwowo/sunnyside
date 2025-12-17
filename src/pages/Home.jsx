import React from "react";
import SEO from "@components/common/SEO";
import HeroSection from "@components/home/HeroSection";
import StatsSection from "@components/home/StatsSection";
import TestimonialsSection from "@components/home/TestimonialsSection";
import CTASection from "@components/home/CTASection";
import ProgramsSection from "../components/home/ProgramsSection";
import MissionSection from "../components/home/MissionSection";

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Empowering children with learning challenges in Zambia. Specialized therapy for autism, Down syndrome, cerebral palsy, and developmental delays."
        keywords="therapy center zambia, autism support, down syndrome, cerebral palsy, special needs education, learning challenges, sunnyside therapy"
      />

      <HeroSection />
      <MissionSection />
      <StatsSection />
      <ProgramsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
