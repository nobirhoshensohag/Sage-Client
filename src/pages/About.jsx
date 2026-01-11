import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const cardData = [
  {
    title: "Our Mission",
    description:
      "To empower individuals with curated wisdom, life lessons, and meaningful insights that guide personal growth.",
    color: "#4F6F52",
  },
  {
    title: "Our Vision",
    description:
      "A community where knowledge is shared openly, helping everyone make better life decisions through collective experience.",
    color: "#FF825F",
  },
  {
    title: "Our Values",
    description:
      "Integrity, creativity, inclusivity, and continuous learning drive everything we do at Sage.",
    color: "#8FBC8F",
  },
  {
    title: "Global Reach",
    description:
      "Sage's content is accessible worldwide, connecting learners and thinkers across cultures.",
    color: "#6B8E23",
  },
  {
    title: "Innovation",
    description:
      "We continuously explore new ways to make learning interactive, engaging, and impactful.",
    color: "#D9A441",
  },
  {
    title: "Transparency",
    description:
      "Open sharing of insights and knowledge is at the core of everything we do.",
    color: "#506D84",
  },
  {
    title: "Community Focus",
    description:
      "We prioritize building a supportive community that values collaboration and growth.",
    color: "#8C5E58",
  },
  {
    title: "Sustainability",
    description:
      "Ensuring that our platform and practices positively impact people and the planet.",
    color: "#3B7A57",
  },
  {
    title: "Learning Resources",
    description:
      "Curated guides, articles, and lessons to make personal development actionable.",
    color: "#FF6347",
  },
  {
    title: "Mentorship",
    description:
      "Connecting learners with experts to accelerate growth and insight.",
    color: "#20B2AA",
  },
  {
    title: "Events & Workshops",
    description:
      "Interactive sessions designed to enhance understanding and community bonding.",
    color: "#9370DB",
  },
  {
    title: "Feedback Driven",
    description:
      "We continuously improve based on user feedback to ensure meaningful impact.",
    color: "#F4A460",
  },
];

const About = () => {
  const { COLORS } = useTheme();

  return (
    <div className="min-h-screen py-20 px-4 md:px-10">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: COLORS.darkGreen }}
        >
          About Us
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
          Sage is a repository of curated knowledge and profound insights,
          designed for the modern contemplative.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl shadow-xl text-center"
            style={{ backgroundColor: card.color, color: COLORS.light }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
            <p className="text-gray-100">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Extra Info Section */}
      <motion.div
        className="mt-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.8 }}
      >
        <h3 className="text-3xl font-semibold mb-4" style={{ color: COLORS.gold }}>
          Join Our Journey
        </h3>
        <p className="text-gray-300 text-lg">
          Explore, learn, and grow with our community. Every lesson, every insight,
          contributes to a better understanding of life.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
