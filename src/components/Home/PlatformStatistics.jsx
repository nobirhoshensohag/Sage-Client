import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const stats = [
  { label: "Lessons Shared", value: "1,250", color: "#FFB347" },
  { label: "Active Contributors", value: "320", color: "#6AB04C" },
  { label: "Community Likes", value: "8,500", color: "#2980B9" },
  { label: "Premium Members", value: "150", color: "#8E44AD" },
];

const PlatformStatistics = () => {
  const { COLORS } = useTheme();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: COLORS.darkGreen }}
        >
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl shadow-xl cursor-pointer"
              style={{ backgroundColor: stat.color, color: COLORS.light }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.2)" }}
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
              <p className="text-lg md:text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatistics;
