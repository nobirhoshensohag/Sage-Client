import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import LessonCard from "../Shared/LessonCard";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader";
import useTheme from "../../hooks/useTheme";
import usePremium from "../../hooks/usePremium";

const Featured = () => {
  const { COLORS } = useTheme();
  const { user } = useAuth();
  const isPremium = usePremium();
  const [lessons, setLessons] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Get current user
  useEffect(() => {
    if (!user?.email) return;
    axiosInstance.get(`/users?email=${user.email}`).then((res) => {
      setCurrentUser(res.data[0]);
    });
  }, [axiosInstance, user]);

  // Fetch featured lessons
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/lessons?isFeatured=true") // ✅ limit 8
      .then((res) => {
        setLessons(res.data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance]);

  return (
    <div>
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ backgroundColor: COLORS.sage, color: COLORS.mist }}
        >
          Best Lessons
        </span>
        <h2
          className="text-4xl sm:text-5xl font-bold leading-tight"
          style={{ color: COLORS.darkGreen }}
        >
          Featured Life
          <span className="ml-3 italic" style={{ color: COLORS.sage }}>
            Lessons.
          </span>
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          A curated treasury of exceptional wisdom
        </p>
      </div>

      {/* LESSON GRID */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <p className="mt-4 text-gray-400 font-serif italic">
              Retrieving archives...
            </p>
          </div>
        ) : lessons.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {lessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <LessonCard lesson={lesson} isPremium={isPremium} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl font-serif text-gray-400 mb-2">
              The pages are blank.
            </h3>
            <p className="text-gray-400">Be the first to share your wisdom.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
