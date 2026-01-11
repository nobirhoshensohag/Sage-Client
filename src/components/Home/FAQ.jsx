import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const faqs = [
  { q: "How do I share a lesson?", a: "Sign up, then click on 'Add Lesson' to share your wisdom." },
  { q: "Is there a premium membership?", a: "Yes! Premium members get exclusive lessons and features." },
  { q: "Can I like or save lessons?", a: "Absolutely, interact with content by liking and saving your favorites." },
  { q: "How can I search for specific topics?", a: "Use the search bar and filters to find lessons by category or tone." },
  { q: "Can I edit or delete my lessons?", a: "Yes, go to 'My Lessons' in your dashboard to edit or remove them." },
  { q: "Is there a community forum?", a: "Yes! Join discussions, ask questions, and share insights with others." },
];

const colors = ["#FDE2E2", "#E0F7FA", "#FFF3E0", "#E8F5E9", "#F3E5F5", "#FFF9C4"];

const FAQ = () => {
  const { COLORS } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: COLORS.darkGreen }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-left">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-5 cursor-pointer shadow-md hover:shadow-xl transition-all"
              style={{ backgroundColor: colors[i % colors.length] }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <p className="font-semibold text-lg" style={{ color: COLORS.darkGreen }}>{f.q}</p>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.p
                    className="mt-3 text-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {f.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
