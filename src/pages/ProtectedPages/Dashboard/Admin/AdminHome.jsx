import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Activity,
  Calendar,
  ShieldAlert,
  Crown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useAxios from "../../../../hooks/useAxios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPublicLessons: 0,
    totalReports: 0,
    lessonsToday: 0,
  });

  const [chartData, setChartData] = useState({
    userGrowth: [],
    lessonGrowth: [],
  });

  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        const [
          usersRes,
          lessonsRes,
          reportsRes,
          contributorsRes,
          recentLessonsRes,
        ] = await Promise.all([
          axiosInstance.get("/users"),
          axiosInstance.get("/lessons?isPrivate=false"),
          axiosSecure.get("/reports"),
          axiosInstance.get("/top-contributors-week"),
          axiosInstance.get("/lessons?sort=postedAt"),
        ]);

        const users = usersRes.data || [];
        const publicLessons = lessonsRes.data.result || [];
        const reports = reportsRes.data || [];
        const contributors = contributorsRes.data.contributors || [];
        const recentLessons = recentLessonsRes.data.result || [];

        const today = new Date().toDateString();
        const lessonsTodayCount = recentLessons.filter(
          (l) => new Date(l.postedAt).toDateString() === today
        ).length;

        setStats({
          totalUsers: users.length,
          totalPublicLessons: lessonsRes.data.total || 0,
          totalReports: reports.length,
          lessonsToday: lessonsTodayCount,
        });

        const userMap = {};
        users.forEach((u) => {
          const date = new Date(u.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          userMap[date] = (userMap[date] || 0) + 1;
        });
        const userChartData = Object.keys(userMap)
          .map((date) => ({ date, count: userMap[date] }))
          .slice(-7);

        const lessonMap = {};

        const allFetchedLessons = [...publicLessons, ...recentLessons];

        const uniqueLessons = Array.from(
          new Map(allFetchedLessons.map((item) => [item._id, item])).values()
        );

        uniqueLessons.forEach((l) => {
          const date = new Date(l.postedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          lessonMap[date] = (lessonMap[date] || 0) + 1;
        });
        const lessonChartData = Object.keys(lessonMap)
          .map((date) => ({ date, count: lessonMap[date] }))
          .slice(-7);

        setChartData({
          userGrowth: userChartData,
          lessonGrowth: lessonChartData,
        });

        setTopContributors(contributors);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load admin dashboard", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosInstance, axiosSecure]);

  const AdminStatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-transparent hover:border-gray-200 transition-all flex flex-col justify-between h-40 relative overflow-hidden group">
      <div
        className={`absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 ${color}`}
      >
        {React.cloneElement(icon, { size: 80 })}
      </div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            {title}
          </p>
          <h3 className="text-4xl font-serif font-bold text-[#1A2F23]">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl bg-[#F3F5F0] ${color}`}>{icon}</div>
      </div>

      {trend && (
        <div className="flex items-center gap-1 text-xs font-bold text-[#4F6F52] relative z-10 mt-auto">
          <TrendingUp size={14} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#D4C5A8] border-t-[#1A2F23] rounded-full animate-spin"></div>
        <p className="text-[#1A2F23] font-serif animate-pulse">
          Consulting the Archives...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen font-sans space-y-8 p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2F23]/5 text-[#1A2F23] text-[10px] font-bold uppercase tracking-wider mb-2 border border-[#1A2F23]/10">
            <ShieldAlert size={12} /> Admin Access
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
            Dashboard Overview
          </h1>
        </div>
        <p className="text-sm font-bold text-gray-400 flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
          <Calendar size={14} />{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* STATS GRID */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={24} />}
          color="text-blue-600"
          trend="Community Growing"
        />
        <AdminStatCard
          title="Active Lessons"
          value={stats.totalPublicLessons}
          icon={<BookOpen size={24} />}
          color="text-[#4F6F52]"
          trend="+Daily Knowledge"
        />
        <AdminStatCard
          title="New Today"
          value={stats.lessonsToday}
          icon={<Activity size={24} />}
          color="text-[#D4C5A8]"
          trend="Fresh Insights"
        />
        <AdminStatCard
          title="Pending Reports"
          value={stats.totalReports}
          icon={<AlertTriangle size={24} />}
          color="text-red-500"
          trend={stats.totalReports > 0 ? "Action Required" : "All Clear"}
        />
      </div>

      {/* ANALYTICS SECTION */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        {/* User Growth */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-[#1A2F23] flex items-center gap-2">
              <Users size={20} className="text-[#4F6F52]" /> User Growth
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase">
              Last 7 Days
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.userGrowth}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A2F23" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1A2F23" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
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
                  dataKey="count"
                  stroke="#1A2F23"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lesson Velocity */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-[#1A2F23] flex items-center gap-2">
              <BookOpen size={20} className="text-[#D4C5A8]" /> Lesson Output
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase">
              Last 7 Days
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.lessonGrowth}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "#F3F5F0" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e5e5",
                    color: "#1A2F23",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#D4C5A8"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP CONTRIBUTORS */}
      <div
        className="bg-[#1A2F23] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F6F52] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <h3 className="text-2xl font-serif font-bold flex items-center gap-3">
            <Crown size={24} className="text-[#D4C5A8]" /> Top Contributors
          </h3>
          <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-[#D4C5A8]">
            This Week
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {topContributors.slice(0, 3).map((contributor, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="relative">
                <img
                  src={contributor.authorImage}
                  alt={contributor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4C5A8]"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4C5A8] rounded-full flex items-center justify-center text-[#1A2F23] text-xs font-bold shadow-sm">
                  {index + 1}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#F3F5F0] line-clamp-1">
                  {contributor.name}
                </h4>
                <p className="text-xs text-white/50">
                  {contributor.count} Lessons
                </p>
              </div>
            </div>
          ))}
          {topContributors.length === 0 && (
            <p className="text-white/50 italic">
              No contributors data available this week.
            </p>
          )}
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

export default AdminHome;