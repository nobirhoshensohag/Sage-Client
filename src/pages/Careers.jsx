import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const cardData = [
  {
    title: "Software Engineer",
    description:
      "Work on building scalable and meaningful products for our community of learners.",
    color: "#4F6F52",
  },
  {
    title: "Product Designer",
    description:
      "Design intuitive and engaging interfaces that make learning enjoyable and impactful.",
    color: "#FF825F",
  },
  {
    title: "Community Manager",
    description:
      "Help grow and nurture our community, ensuring members feel valued and supported.",
    color: "#8FBC8F",
  },
];

const Careers = () => {
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
          Careers
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
          Join our team and help build thoughtful products for modern minds.
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
            transition={{ duration: 0.5, delay: index * 0.2 }}
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
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <h3 className="text-3xl font-semibold mb-4" style={{ color: COLORS.gold }}>
          Grow With Us
        </h3>
        <p className="text-gray-300 text-lg">
          Be part of a team that values innovation, community, and meaningful learning.
        </p>
      </motion.div>
    </div>
  );
};

export default Careers;
