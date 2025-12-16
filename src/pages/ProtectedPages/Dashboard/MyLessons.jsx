import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Eye,
  Globe,
  Lock,
  Crown,
  Calendar,
  Feather,
  Plus,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const axiosInstance = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyLessons = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosInstance.get(`/lessons?email=${user.email}`);
        setLessons(res.data.result);
        setTotalCount(res.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching my lessons:", error);
        setLoading(false);
      }
    };

    fetchMyLessons();
  }, [user, axiosInstance]);

  const StatusBadge = ({ isPrivate }) => (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        isPrivate
          ? "bg-gray-100 text-gray-500 border-gray-200"
          : "bg-[#1A2F23]/5 text-[#1A2F23] border-[#1A2F23]/10"
      }`}
    >
      {isPrivate ? <Lock size={10} /> : <Globe size={10} />}
      {isPrivate ? "Private" : "Public"}
    </div>
  );

  const PremiumBadge = () => (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-gradient-to-r from-[#D4C5A8]/20 to-[#F3E5C5]/20 text-[#8C7A5B] border-[#D4C5A8]/30">
      <Crown size={10} fill="currentColor" /> Premium
    </div>
  );

  return (
    <div className="w-full font-sans min-h-[80vh] p-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23] mb-2">
            My Contributions
          </h1>
          <p className="text-gray-500">
            You have authored{" "}
            <span className="font-bold text-[#4F6F52]">{totalCount}</span>{" "}
            lessons in the archive.
          </p>
        </div>

        <Link
          to="/dashboard/add-lessons"
          className="flex items-center gap-2 px-6 py-3 bg-[#1A2F23] text-white rounded-xl font-bold shadow-lg hover:bg-[#4F6F52] hover:-translate-y-0.5 transition-all"
        >
          <Plus size={20} />
          <span>Write New Lesson</span>
        </Link>
      </div>

      {/* TABLE */}
      <div
        className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-20 w-full bg-gray-50 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : lessons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAF8]">
                  <th className="p-6 pl-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-4/12">
                    Lesson Details
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Status
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Engagement
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Published
                  </th>
                  <th className="p-6 pr-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lessons.map((lesson) => {
                  const isPrivate = lesson.isPrivate === "true";
                  const isPremium = lesson.isPremiumAccess === "true";
                  const date = new Date(lesson.postedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  );

                  return (
                    <tr
                      key={lesson._id}
                      className="group hover:bg-[#F3F5F0]/50 transition-colors"
                    >
                      {/* DETAILS */}
                      <td className="p-6 pl-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#F3F5F0] flex items-center justify-center text-[#1A2F23] group-hover:bg-[#1A2F23] group-hover:text-[#D4C5A8] transition-colors">
                            <Feather size={20} />
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-[#1A2F23] text-lg leading-tight mb-1 group-hover:text-[#4F6F52] transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                              {lesson.category} •{" "}
                              <span className="italic font-normal">
                                {lesson.tone}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-6">
                        <div className="flex flex-col items-start gap-2">
                          <StatusBadge isPrivate={isPrivate} />
                          {isPremium && <PremiumBadge />}
                        </div>
                      </td>

                      {/* ENGAGEMENT */}
                      <td className="p-6">
                        <div className="flex items-center gap-4 text-gray-400">
                          <div
                            className="flex items-center gap-1.5"
                            title="Likes"
                          >
                            <Heart
                              size={16}
                              className={
                                lesson.likes > 0
                                  ? "text-red-400 fill-red-400"
                                  : ""
                              }
                            />
                            <span className="text-sm font-bold">
                              {lesson.likes}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1.5"
                            title="Comments"
                          >
                            <MessageCircle size={16} />
                            <span className="text-sm font-bold">
                              {lesson.comments?.length || 0}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* DATE */}
                      <td className="p-6">
                        <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                          <Calendar size={14} className="text-[#D4C5A8]" />
                          {date}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-6 pr-10 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit */}
                          <button
                            className="p-2 rounded-full hover:bg-[#D4C5A8]/20 text-gray-400 hover:text-[#8C7A5B] transition-colors"
                            title="Edit Lesson"
                          >
                            <Edit2 size={16} />
                          </button>
                          {/* Delete */}
                          <button
                            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete Lesson"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F3F5F0] flex items-center justify-center mb-6 text-[#1A2F23]/30">
              <Feather size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-2">
              Your pages are blank
            </h3>
            <p className="text-gray-500 max-w-sm mb-8">
              Every master was once a beginner. Start your journey by
              documenting your first lesson learned.
            </p>
            <Link
              to="/dashboard/add-lessons"
              className="px-8 py-3 bg-[#1A2F23] text-white rounded-xl font-bold hover:bg-[#4F6F52] transition-colors shadow-lg hover:shadow-xl"
            >
              Write First Lesson
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MyLessons;