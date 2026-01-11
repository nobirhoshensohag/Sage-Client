import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const steps = [
  { step: 1, title: "Sign Up", desc: "Create an account to start learning.", color: "#FFB347" },
  { step: 2, title: "Explore Lessons", desc: "Browse curated life lessons.", color: "#6AB04C" },
  { step: 3, title: "Share Your Wisdom", desc: "Contribute your own lessons.", color: "#2980B9" },
  { step: 4, title: "Engage & Grow", desc: "Like, save and interact with content.", color: "#E67E22" },
  { step: 5, title: "Connect Community", desc: "Interact with contributors and peers.", color: "#8E44AD" },
  { step: 6, title: "Track Progress", desc: "Monitor your learning journey effectively.", color: "#16A085" },
];

const HowItWorks = () => {
  const { COLORS } = useTheme();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: COLORS.darkGreen }}
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl shadow-xl cursor-pointer"
              style={{ backgroundColor: s.color, color: COLORS.light }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.2)" }}
            >
              <p className="text-xl font-bold mb-2">Step {s.step}</p>
              <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-100">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
