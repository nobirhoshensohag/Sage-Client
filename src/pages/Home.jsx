import React from "react";
import Hero from "../components/Home/Hero";
import LearningFromLifeSection from "../components/Home/LearningFromLifeSection";
import Featured from "../components/Home/Featured";
import TopContributors from "../components/Home/TopContributors";
import MostSaved from "../components/Home/MostSaved";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <LearningFromLifeSection />
      <TopContributors />
      <MostSaved />
    </div>
  );
};

export default Home;