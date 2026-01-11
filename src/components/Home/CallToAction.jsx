import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const CallToAction = () => {
  const { COLORS } = useTheme();

  return (
    <section
      className="py-24 px-4 text-center rounded-3xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.sage}50, ${COLORS.darkGreen}20)`,
      }}
    >
      {/* Decorative Circles */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-green-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-green-300/30 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      {/* Headline */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{ color: COLORS.darkGreen }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Ready to Share Your Wisdom?
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mb-12 text-gray-700 max-w-2xl mx-auto text-lg md:text-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Join our community today and start contributing life lessons that can
        inspire thousands of people around the world.
      </motion.p>

      {/* Button */}
      <motion.a
        href="/dashboard/add-lessons"
        className="inline-block px-10 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
        whileHover={{ scale: 1.1, y: -3 }}
      >
        Get Started
      </motion.a>
    </section>
  );
};

export default CallToAction;
