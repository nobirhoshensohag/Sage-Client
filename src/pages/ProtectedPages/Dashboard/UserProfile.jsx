import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Camera,
  Edit3,
  Check,
  X,
  Crown,
  BookOpen,
  Heart,
  Calendar,
  Lock,
  Feather,
} from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import usePremium from "../../../hooks/usePremium";
import useTheme from "../../../hooks/useTheme";
import LessonCard from "../../../components/Shared/LessonCard";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const [UserProfileData, setUserProfileData] = useState(null);
  const [userLessons, setUserLessons] = useState([]);
  const [stats, setStats] = useState({ created: 0, saved: 0 });
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();
  const isPremium = usePremium();

  const { COLORS } = useTheme();

  useEffect(() => {
    const fetchUserProfileData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);

        const userRes = await axiosInstance.get(`/users?email=${user.email}`);
        const userData = userRes.data[0];
        setUserProfileData(userData);
        setEditFormData({
          displayName: userData.displayName || user.displayName,
          photoURL: userData.photoURL || user.photoURL,
        });

        const lessonsRes = await axiosInstance.get(
          `/lessons?email=${user.email}&isPrivate=false`
        );

        const sortedLessons = (lessonsRes.data.result || []).sort(
          (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
        );
        setUserLessons(sortedLessons);

        const favRes = await axiosInstance.get(
          `/favorites?email=${user.email}`
        );

        setStats({
          created: lessonsRes.data.total || 0,
          saved: favRes.data.length || 0,
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to load UserProfile", error);
        setLoading(false);
      }
    };

    fetchUserProfileData();
  }, [user, axiosInstance]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditFormData({
        displayName: UserProfileData.displayName,
        photoURL: UserProfileData.photoURL,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  const handleSaveUserProfile = async () => {
    try {
      const updatedLocalData = { ...UserProfileData, ...editFormData };

      await axiosSecure.patch(`/users/${UserProfileData._id}`, editFormData);

      await updateUser({
        displayName: editFormData.displayName,
        photoURL: editFormData.photoURL,
      });

      toast.success("User profile and all references updated successfully!");
      setUserProfileData(updatedLocalData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user profile:", error);
      setUserProfileData(UserProfileData);
    }
  };

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#F3F5F0]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen w-full font-sans pb-20"
      style={{ backgroundColor: COLORS.light }}
    >
      {/* ---  HEADER BANNER --- */}
      <div className="h-64 w-full relative overflow-hidden bg-[#1A2F23] rounded-3xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F6F52] rounded-full blur-[150px] opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32">
        {/* ---  UserProfile CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white flex flex-col md:flex-row gap-10 items-center md:items-start animate-fade-in-up">
          {/* LEFT: Avatar & Badge */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-full p-1.5 bg-white shadow-xl relative z-10">
              <img
                src={
                  isEditing ? editFormData.photoURL : UserProfileData?.photoURL
                }
                alt="UserProfile"
                className="w-full h-full rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?u=default";
                }}
              />
            </div>

            {/* Premium Badge Indicator */}
            {isPremium && (
              <div
                className="absolute bottom-2 right-2 z-20 bg-[#1A2F23] text-[#D4C5A8] p-2 rounded-full border-4 border-white shadow-lg"
                title="Premium Scholar"
              >
                <Crown size={20} fill="currentColor" />
              </div>
            )}

            {isEditing && (
              <div className="absolute bottom-0 right-0 left-0 top-0 rounded-full bg-black/40 z-20 flex items-center justify-center cursor-pointer backdrop-blur-sm">
                <Camera className="text-white" size={32} />
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div className="flex-1 w-full text-center md:text-left">
            {/*  Name & Edit Button */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-6">
              <div className="space-y-2 w-full">
                <label className="text-xs font-bold text-[#D4C5A8] uppercase tracking-widest block">
                  The Author
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={editFormData.displayName}
                    onChange={handleInputChange}
                    className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23] bg-[#F3F5F0] border-b-2 border-[#4F6F52] outline-none w-full max-w-md px-2 py-1 rounded-t-lg"
                    placeholder="Your Name"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
                    {UserProfileData?.displayName}
                  </h1>
                )}

                {/* Email  */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                  <Mail size={14} />
                  <span>{UserProfileData?.email}</span>
                  <Lock
                    size={12}
                    className="opacity-50"
                    title="Email cannot be changed"
                  />
                </div>

                {isEditing && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photoURL"
                      value={editFormData.photoURL}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#4F6F52]"
                      placeholder="https://..."
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditToggle}
                      className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <button
                      onClick={handleSaveUserProfile}
                      className="p-3 rounded-full bg-[#1A2F23] text-[#D4C5A8] hover:bg-[#4F6F52] transition-colors shadow-lg"
                    >
                      <Check size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-[#1A2F23] hover:border-[#1A2F23] transition-all text-sm font-bold cursor-pointer"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center md:justify-start gap-8 border-t border-gray-100 pt-6 mt-2">
              <div className="text-center md:text-left">
                <p className="text-2xl font-serif font-bold text-[#1A2F23]">
                  {stats.created}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Lessons Created
                </p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-serif font-bold text-[#1A2F23]">
                  {stats.saved}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Wisdom Saved
                </p>
              </div>
              {isPremium && (
                <>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center md:text-left">
                    <p className="text-2xl font-serif font-bold text-[#D4C5A8] flex items-center gap-1 justify-center md:justify-start">
                      <Crown size={24} fill="currentColor" />
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D4C5A8]">
                      Premium Member
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#1A2F23] rounded-lg text-white">
              <Feather size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23]">
              Published Works
            </h2>
          </div>

          {userLessons.length > 0 ? (
            <div
              className="grid grid-cols-1 xl:grid-cols-2  gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {userLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  isPremium={isPremium}
                />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 bg-white/50 border border-dashed border-gray-300 rounded-[2rem] flex flex-col items-center justify-center text-center">
              <BookOpen size={40} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">
                No lessons published yet.
              </p>
            </div>
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

export default UserProfile;