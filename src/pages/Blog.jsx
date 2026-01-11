import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const cardData = [
  {
    title: "Latest Articles",
    description:
      "Explore our newest articles, covering wisdom, life lessons, and actionable insights.",
    color: "#2F5D62", // Dark teal green
  },
  {
    title: "Community Insights",
    description:
      "Read what our community shares—experiences, reflections, and personal growth stories.",
    color: "#D9A441", // Warm gold
  },
  {
    title: "Tips & Guides",
    description:
      "Practical advice and guides to help you apply life lessons in your daily journey.",
    color: "#6B8E23", // Olive green
  },
];

const Blog = () => {
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
          Blog
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
          Read thoughtful articles, insights, and updates from Sage.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl shadow-xl text-center"
            style={{ backgroundColor: card.color, color: COLORS.light }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
          >
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="text-gray-100">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Extra Info Section */}
      <motion.div
        className="mt-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-4" style={{ color: COLORS.gold }}>
          Stay Updated
        </h3>
        <p className="text-gray-300 text-lg">
          Subscribe to our newsletter and never miss out on the latest insights
          from Sage.
        </p>
      </motion.div>
    </div>
  );
};

export default Blog;
