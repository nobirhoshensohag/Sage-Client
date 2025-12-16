import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  Trash2,
  ExternalLink,
  Calendar,
  User,
  ArrowRight,
  ImageIcon,
  Eye,
} from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosInstance.get(`/favorites?email=${user.email}`);
        setFavorites(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user, axiosInstance]);

  const handleRemove = async (id) => {
    const previousFavorites = [...favorites];
    setFavorites(favorites.filter((fav) => fav._id !== id));

    try {
      await axiosInstance.delete(`/favorites/${id}`);
    } catch (error) {
      console.error("Failed to delete", error);

      setFavorites(previousFavorites);
    }
  };

  return (
    <div className="w-full font-sans min-h-[80vh]">
      {/* 1. HEADER */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#D4C5A8]/20 rounded-xl text-[#8C7A5B]">
            <Heart size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
            Saved Collection
          </h1>
        </div>
        <p className="text-gray-500 max-w-2xl">
          Your personal index of wisdom. You have bookmarked{" "}
          <span className="font-bold text-[#1A2F23]">{favorites.length}</span>{" "}
          entries.
        </p>
      </div>

      {/* 2. TABLE CONTAINER */}
      <div
        className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-16 w-full bg-gray-50 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAF8]">
                  <th className="p-6 pl-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-5/12">
                    Wisdom Context
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-3/12">
                    Author
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Saved Date
                  </th>
                  <th className="p-6 pr-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {favorites.map((fav) => (
                  <tr
                    key={fav._id}
                    className="group hover:bg-[#F3F5F0]/50 transition-colors"
                  >
                    {/* COL 1: CONTEXT */}
                    <td className="p-6 pl-10">
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="h-16 w-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                          {fav.postImage ? (
                            <img
                              src={fav.postImage}
                              alt="Post"
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-300">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        {/* Text */}
                        <div>
                          <span className="block text-xs font-bold text-[#D4C5A8] uppercase tracking-wide mb-1">
                            Lesson
                          </span>
                          <h3 className="font-serif font-bold text-[#1A2F23] text-lg hover:text-[#4F6F52] hover:underline decoration-[#D4C5A8] underline-offset-4 transition-all line-clamp-1">
                            {fav.postTitle}
                          </h3>
                        </div>
                      </div>
                    </td>

                    {/* COL 2: AUTHOR */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={fav.posterImage}
                          alt={fav.posterName}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                        <div>
                          <p className="font-bold text-[#1A2F23] text-sm">
                            {fav.posterName}
                          </p>
                          <p className="text-xs text-gray-400 font-mono truncate max-w-[150px]">
                            {fav.posterEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* COL 3: DATE */}
                    <td className="p-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-gray-100 shadow-sm text-gray-500 text-sm font-medium">
                        <Calendar size={14} className="text-[#D4C5A8]" />
                        {new Date(fav.favoriteAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* COL 4: ACTIONS */}
                    <td className="p-6 pr-10 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/lesson-details/${fav.postId}`}
                          className="p-2.5 rounded-full bg-[#1A2F23] text-white hover:bg-[#4F6F52] transition-colors shadow-md"
                          title="Read Lesson"
                        >
                          <ArrowRight size={16} />
                        </Link>
                        <button
                          onClick={() => handleRemove(fav._id)}
                          className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm"
                          title="Remove Favorite"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F3F5F0] flex items-center justify-center mb-6 text-[#1A2F23]/30">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-2">
              The pages are blank
            </h3>
            <p className="text-gray-500 max-w-sm mb-8">
              Your collection is currently empty. Explore the library to find
              wisdom worth keeping.
            </p>
            <Link
              to="/"
              className="px-8 py-3 bg-[#1A2F23] text-white rounded-xl font-bold hover:bg-[#4F6F52] transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Library
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

export default MyFavorites;