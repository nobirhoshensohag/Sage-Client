import React from "react";
import useTheme from "../hooks/useTheme";

const KnowledgeBase = () => {
  const { COLORS } = useTheme();

  return (
    <div
      className="min-h-screen py-20 px-4 md:px-16 lg:px-32"
      style={{ backgroundColor: COLORS.light }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{ color: COLORS.darkGreen }}
      >
        Knowledge Base
      </h1>
      <p className="text-gray-600 text-lg mb-12">
        Browse curated articles, tutorials, and guides to grow your knowledge.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
            style={{
              borderLeft: `5px solid ${COLORS.darkGreen}`,
            }}
          >
            <h2
              className="font-semibold text-xl mb-3"
              style={{ color: COLORS.darkGreen }}
            >
              Article #{i}
            </h2>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-medium hover:from-green-500 hover:to-green-700 transition-colors duration-300"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
