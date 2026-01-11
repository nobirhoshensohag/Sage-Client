import React from "react";
import Hero from "../components/Home/Hero";
import LearningFromLifeSection from "../components/Home/LearningFromLifeSection";
import Featured from "../components/Home/Featured";
import TopContributors from "../components/Home/TopContributors";
import MostSaved from "../components/Home/MostSaved";
import PlatformStatistics from "../components/Home/PlatformStatistics";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import FAQ from "../components/Home/FAQ";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <LearningFromLifeSection />
      <TopContributors />
      <MostSaved />
      <PlatformStatistics />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Home;