import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen } from "lucide-react";
import Loader from "../components/Shared/Loader";
import LessonCard from "../components/Shared/LessonCard";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const PublicLessons = () => {
  const THEME = {
    dark: "#1A2F23",
    primary: "#4F6F52",
    light: "#F3F5F0",
    accent: "#D4C5A8",
    white: "#FFFFFF",
  };

  const [lessons, setLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const axiosInstance = useAxios();
  const limit = 6;

  // Fetch lessons
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(
        `/lessons?isPrivate=false&limit=${limit}&skip=${currentPage * limit}`
      )
      .then((res) => {
        setLessons(res.data.result);
        setTotalLessons(res.data.total);
        setTotalPages(Math.ceil(res.data.total / limit));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance, currentPage]);

  // Fetch current user
  useEffect(() => {
    if (!user?.email) return;
    axiosInstance.get(`/users?email=${user.email}`).then((res) => {
      setCurrentUser(res.data[0]);
    });
  }, [axiosInstance, user]);

  return (
    <div
      className="min-h-screen w-full relative py-20"
      style={{ backgroundColor: THEME.light }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 10%, ${THEME.accent}20 0%, transparent 25%),
            radial-gradient(circle at 85% 90%, ${THEME.primary}15 0%, transparent 30%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white shadow-md mb-4">
            <BookOpen size={24} style={{ color: THEME.primary }} />
          </div>
          <h1
            className="text-4xl md:text-6xl font-serif font-bold"
            style={{ color: THEME.dark }}
          >
            The Collective Wisdom
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            A curated library of life lessons shared by the community.
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3">
              <Search size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search for wisdom..."
                className="flex-1 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 text-gray-600">
              <Filter size={18} />
              Filter
            </button>
            <button
              className="px-8 py-3 rounded-xl text-white font-bold"
              style={{ backgroundColor: THEME.dark }}
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Lessons */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader />
            <p className="mt-4 text-gray-400 italic">
              Retrieving archives...
            </p>
          </div>
        ) : lessons.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {lessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <LessonCard
                  lesson={lesson}
                  user={currentUser || { isPremium: false }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl text-gray-400 mb-2">
              The pages are blank.
            </h3>
            <p className="text-gray-400">
              Be the first to share your wisdom.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex gap-2 justify-center">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn border"
            >
              Prev
            </button>
          )}

          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`btn ${
                i === currentPage ? "bg-black text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn border"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
