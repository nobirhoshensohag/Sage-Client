import React, { useEffect, useState } from "react";
import {
  User,
  Shield,
  ShieldCheck,
  Search,
  Trash2,
  MoreVertical,
  Mail,
  BookOpen,
  Crown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [lessonCounts, setLessonCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    type: null,
    data: null,
    title: "",
    message: "",
    actionButtonText: "",
    isDanger: false,
  });

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [usersRes, lessonsRes] = await Promise.all([
          axiosInstance.get("/users"),
          axiosInstance.get("/lessons"),
        ]);

        const allUsers = usersRes.data || [];
        const allLessons = lessonsRes.data.result || [];

        const counts = {};
        allLessons.forEach((lesson) => {
          if (lesson.email) {
            counts[lesson.email] = (counts[lesson.email] || 0) + 1;
          }
        });

        setLessonCounts(counts);
        setUsers(allUsers);
        setFilteredUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load user directory.");
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        (user.displayName?.toLowerCase() || "").includes(lowerTerm) ||
        (user.email?.toLowerCase() || "").includes(lowerTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const executeRoleUpdate = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      const updatedUsers = users.map((u) =>
        u._id === user._id ? { ...u, role: newRole } : u
      );
      setUsers(updatedUsers);

      await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error("Role update failed", error);
      toast.error("Failed to update role");
    }
  };

  const executeDeleteUser = async (user) => {
    try {
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      await axiosSecure.delete(`/users/${user._id}/role`);
      toast.success("User account deleted.");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete user.");
    }
  };

  const requestRoleUpdate = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const actionText =
      newRole === "admin" ? "Promote to Admin" : "Demote to User";

    setConfirmation({
      isOpen: true,
      type: "role",
      data: user,
      title: "Update User Role?",
      message: `Are you sure you want to ${actionText.toLowerCase()}? This will change their access permissions immediately.`,
      actionButtonText: actionText,
      isDanger: newRole === "user",
    });
  };

  const handleConfirmAction = () => {
    if (confirmation.type === "role") {
      executeRoleUpdate(confirmation.data);
    } else if (confirmation.type === "delete") {
      executeDeleteUser(confirmation.data);
    }
    setConfirmation({ ...confirmation, isOpen: false });
  };

  const RoleBadge = ({ role }) => {
    const isAdmin = role === "admin";
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          isAdmin
            ? "bg-[#1A2F23] text-[#D4C5A8] border-[#1A2F23]"
            : "bg-gray-100 text-gray-500 border-gray-200"
        }`}
      >
        {isAdmin ? <ShieldCheck size={12} /> : <User size={12} />}
        {role}
      </div>
    );
  };

  const ConfirmationModal = () => {
    if (!confirmation.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-[#1A2F23]/60 backdrop-blur-sm transition-opacity"
          onClick={() => setConfirmation({ ...confirmation, isOpen: false })}
        ></div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-in-up border border-gray-100">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              confirmation.isDanger
                ? "bg-red-100 text-red-500"
                : "bg-[#1A2F23]/10 text-[#1A2F23]"
            }`}
          >
            {confirmation.isDanger ? (
              <AlertTriangle size={24} />
            ) : (
              <HelpCircle size={24} />
            )}
          </div>

          <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-2">
            {confirmation.title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {confirmation.message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setConfirmation({ ...confirmation, isOpen: false })
              }
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAction}
              className={`flex-1 py-3 rounded-xl text-white font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5 ${
                confirmation.isDanger
                  ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                  : "bg-[#1A2F23] hover:bg-[#4F6F52] shadow-[#1A2F23]/20"
              }`}
            >
              {confirmation.actionButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full font-sans min-h-[80vh] relative p-8">
      {/* 1. HEADER & SEARCH */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#D4C5A8]/20 rounded-xl text-[#8C7A5B]">
              <User size={24} fill="currentColor" className="opacity-80" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
              User Directory
            </h1>
          </div>
          <p className="text-gray-500">
            Manage access and roles. Total Users:{" "}
            <span className="font-bold text-[#1A2F23]">{users.length}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D4C5A8] focus:ring-1 focus:ring-[#D4C5A8] shadow-sm transition-all"
          />
        </div>
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
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAF8]">
                  <th className="p-6 pl-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-4/12">
                    User Identity
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-3/12">
                    Role & Status
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Contribution
                  </th>
                  <th className="p-6 pr-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-3/12 text-right">
                    Management
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((userData) => {
                  const isPremium = userData.isPremium === true;
                  const count = lessonCounts[userData.email] || 0;

                  return (
                    <tr
                      key={userData._id}
                      className="group hover:bg-[#F3F5F0]/50 transition-colors"
                    >
                      {/* COL 1: IDENTITY */}
                      <td className="p-6 pl-10">
                        <div className="flex items-center gap-4">
                          <div className="relative shrink-0">
                            <img
                              src={
                                userData.photoURL ||
                                "https://i.pravatar.cc/150?u=default"
                              }
                              alt={userData.displayName}
                              className={`w-12 h-12 rounded-full object-cover border-2 ${
                                isPremium
                                  ? "border-[#D4C5A8]"
                                  : "border-gray-100"
                              }`}
                            />
                            {isPremium && (
                              <div
                                className="absolute -top-1 -right-1 bg-[#D4C5A8] text-[#1A2F23] rounded-full p-0.5 border border-white"
                                title="Premium Member"
                              >
                                <Crown size={10} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-[#1A2F23] text-lg leading-tight">
                              {userData.displayName}
                            </h3>
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                              <Mail size={10} />
                              <span className="font-mono">
                                {userData.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* COL 2: ROLE */}
                      <td className="p-6">
                        <div className="flex flex-col items-start gap-2">
                          <RoleBadge role={userData.role} />
                        </div>
                      </td>

                      {/* COL 3: STATS */}
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                          <BookOpen size={16} className="text-[#4F6F52]" />
                          <span>
                            {count}{" "}
                            <span className="text-xs text-gray-400 font-normal">
                              Lessons
                            </span>
                          </span>
                        </div>
                      </td>

                      {/* COL 4: ACTIONS */}
                      <td className="p-6 pr-10 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Toggle Button */}
                          <button
                            onClick={() => requestRoleUpdate(userData)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-2 ${
                              userData.role === "admin"
                                ? "border-red-200 text-red-500 hover:bg-red-50"
                                : "border-[#4F6F52]/30 text-[#4F6F52] hover:bg-[#4F6F52] hover:text-white"
                            }`}
                            title={
                              userData.role === "admin"
                                ? "Remove Admin Access"
                                : "Grant Admin Access"
                            }
                          >
                            {userData.role === "admin" ? (
                              <XCircle size={14} />
                            ) : (
                              <ShieldCheck size={14} />
                            )}
                            {userData.role === "admin" ? "Demote" : "Promote"}
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
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-2">
              No users found
            </h3>
            <p className="text-gray-500 max-w-sm">
              Try adjusting your search criteria or invite new members to the
              library.
            </p>
          </div>
        )}
      </div>

      <ConfirmationModal />

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

export default ManageUsers;