import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const testimonials = [
  { name: "Alice", text: "This platform changed my perspective on life.", img: "https://i.ibb.co/KpkxsJyy/Alice-Render.webp" },
  { name: "Bob", text: "I learned so much from real community experiences.", img: "https://i.ibb.co/Jwy8Pg8j/download.jpg" },
  { name: "Charlie", text: "The lessons are insightful and practical.", img: "https://i.ibb.co/Xf770WVM/download-1.jpg" },
];

const Testimonials = () => {
  const { COLORS } = useTheme();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: COLORS.darkGreen }}
        >
          Testimonials
        </h2>

        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-700 italic mb-2">"{t.text}"</p>
              <p className="font-semibold" style={{ color: COLORS.sage }}>
                {t.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
