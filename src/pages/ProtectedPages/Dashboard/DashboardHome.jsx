import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Heart,
  Plus,
  TrendingUp,
  Activity,
  Calendar,
  ArrowRight,
  User,
  Feather,
} from "lucide-react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalLessons: 0,
    totalFavorites: 0,
    totalLikes: 0,
  });

  const [recentLessons, setRecentLessons] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);

        const [lessonsRes, favoritesRes, likesRes] = await Promise.all([
          axiosInstance.get(`/lessons?email=${user.email}`),
          axiosInstance.get(`/favorites?email=${user.email}`),
          axiosInstance.get(`/likes?email=${user.email}`),
        ]);

        const lessons = lessonsRes.data.result || [];

        setStats({
          totalLessons: lessonsRes.data.total || 0,
          totalFavorites: favoritesRes.data.length || 0,
          totalLikes: likesRes.data.length || 0,
        });

        const sortedLessons = [...lessons].sort(
          (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
        );
        setRecentLessons(sortedLessons.slice(0, 3));

        const processedChartData = processChartData(lessons);
        setChartData(processedChartData);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, axiosInstance]);

  const processChartData = (data) => {
    const dateMap = {};

    data.forEach((item) => {
      const date = new Date(item.postedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    return Object.keys(dateMap)
      .map((date) => ({
        name: date,
        lessons: dateMap[date],
      }))
      .slice(-7);
  };

  const StatCard = ({ title, value, icon, subtext }) => (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-transparent hover:border-[#D4C5A8]/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3F5F0] rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-full bg-[#1A2F23]/5 text-[#1A2F23] group-hover:bg-[#1A2F23] group-hover:text-[#D4C5A8] transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-4xl font-serif font-bold text-[#1A2F23] mb-1">
          {value}
        </h3>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-xs text-[#4F6F52] mt-2 font-medium">{subtext}</p>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center text-[#4F6F52] animate-pulse">
        <Feather size={48} />
        <p className="mt-4 font-serif">Gathering your wisdom...</p>
      </div>
    );

  console.log(stats.totalLessons);
  return (
    <div className="w-full font-sans space-y-8 p-10">
      {/* WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
            Welcome back, {user?.displayName?.split(" ")[0] || "Scholar"}
          </h1>
          <p className="text-gray-500 mt-2">
            "Knowledge speaks, but wisdom listens." Here is your journey so far.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-[#1A2F23] uppercase tracking-wider">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <StatCard
          title="Lessons Created"
          value={stats.totalLessons}
          icon={<BookOpen size={24} />}
          subtext="Contributions to the archive"
        />
        <StatCard
          title="Wisdom Saved"
          value={stats.totalFavorites}
          icon={<Heart size={24} />}
          subtext="Favorites collected"
        />
        <StatCard
          title="Impact (Likes)"
          value={stats.totalLikes}
          icon={<Activity size={24} />}
          subtext="Community appreciations"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className="lg:col-span-2 space-y-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* ANALYTICS CHART */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif font-bold text-[#1A2F23]">
                Contribution Insight
              </h3>
              <select className="bg-[#F3F5F0] text-xs font-bold text-[#1A2F23] px-3 py-1 rounded-lg border-none outline-none cursor-pointer">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="h-64 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorLessons"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4F6F52"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4F6F52"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A2F23",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#D4C5A8" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="lessons"
                      stroke="#1A2F23"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorLessons)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Activity size={32} className="mb-2 opacity-50" />
                  <p className="text-sm">
                    Not enough data to display trends yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RECENTLY ADDED */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-[#1A2F23]">
                Recently Added
              </h3>
              <Link
                to="/dashboard/my-lessons"
                className="text-xs font-bold text-[#4F6F52] hover:text-[#1A2F23] transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {recentLessons.length > 0 ? (
                recentLessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-transparent hover:border-[#D4C5A8] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-5 lg:w-12 lg:h-12 rounded-xl bg-[#F3F5F0] flex items-center justify-center text-[#1A2F23] group-hover:bg-[#1A2F23] group-hover:text-[#D4C5A8] transition-colors">
                        <Feather size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A2F23]">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(lesson.postedAt).toLocaleDateString()} •{" "}
                          {lesson.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          lesson.isPremiumAccess === "true"
                            ? "bg-[#D4C5A8]/20 text-[#8C7A5B]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {lesson.isPremiumAccess === "true" ? "Premium" : "Free"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                  <p className="text-gray-400">No lessons added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. SIDE COLUMN: SHORTCUTS (1/3 Width) */}
        <div
          className="lg:col-span-1 space-y-8 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Quick Actions Card */}
          <div className="bg-[#1A2F23] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F6F52] rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>

            <h3 className="text-xl font-serif font-bold mb-6 relative z-10">
              Quick Actions
            </h3>

            <div className="space-y-3 relative z-10">
              <Link
                to="/dashboard/add-lessons"
                className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm flex items-center gap-3 transition-all group"
              >
                <div className="p-2 rounded-full bg-[#D4C5A8] text-[#1A2F23]">
                  <Plus size={16} strokeWidth={3} />
                </div>
                <span className="font-bold text-sm">Create New Lesson</span>
              </Link>

              <Link
                to="/dashboard/my-favorites"
                className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-sm flex items-center gap-3 transition-all"
              >
                <div className="p-2 rounded-full bg-white/10">
                  <Heart size={16} />
                </div>
                <span className="font-medium text-sm">View Favorites</span>
              </Link>

              <Link
                to="/dashboard/profile"
                className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-sm flex items-center gap-3 transition-all"
              >
                <div className="p-2 rounded-full bg-white/10">
                  <User size={16} />
                </div>
                <span className="font-medium text-sm">Profile</span>
              </Link>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-[#D4C5A8]/20 rounded-[2rem] p-8 border border-[#D4C5A8]/30">
            <Feather size={24} className="text-[#8C7A5B] mb-4" />
            <p className="font-serif italic text-[#1A2F23] text-lg leading-relaxed">
              "The only true wisdom is in knowing you know nothing."
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#4F6F52] mt-4">
              — Socrates
            </p>
          </div>
        </div>
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

export default DashboardHome;