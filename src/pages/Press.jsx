import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const cardData = [
  {
    title: "Sage in Media",
    description:
      "See how Sage has been featured across news outlets and media channels.",
    color: "#2F5D62", // Deep teal
  },
  {
    title: "Press Releases",
    description:
      "Official announcements and releases from Sage to keep you updated.",
    color: "#D9A441", // Warm gold
  },
  {
    title: "Events & Coverage",
    description:
      "Coverage from events, interviews, and workshops hosted by Sage.",
    color: "#6B8E23", // Olive green
  },
  {
    title: "Community Spotlight",
    description:
      "Highlighting stories and features from the Sage community worldwide.",
    color: "#3B7A57", // Medium green
  },
  {
    title: "Media Kit",
    description:
      "Download logos, images, and resources for press and media use.",
    color: "#8C5E58", // Muted brown
  },
  {
    title: "Announcements",
    description:
      "Stay informed with the latest updates, partnerships, and news.",
    color: "#506D84", // Slate blue
  },
];

const Press = () => {
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
          Press
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
          News, announcements, and media resources from Sage.
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

      {/* Extra Info */}
      <motion.div
        className="mt-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
      >
        <h3 className="text-3xl font-semibold mb-4" style={{ color: COLORS.gold }}>
          Stay Updated
        </h3>
        <p className="text-gray-300 text-lg">
          Subscribe to our newsletter to get the latest news and press updates from Sage.
        </p>
      </motion.div>
    </div>
  );
};

export default Press;
