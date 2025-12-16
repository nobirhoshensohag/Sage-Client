import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Camera,
  Edit3,
  Check,
  X,
  ShieldCheck,
  Calendar,
  Lock,
  Feather,
  Server,
  Database,
} from "lucide-react";

import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);

        const res = await axiosInstance.get(`/users?email=${user.email}`);

        const userData = res.data[0];

        if (userData) {
          setProfileData(userData);
          setEditFormData({
            displayName: userData.displayName || user.displayName,
            photoURL: userData.photoURL || user.photoURL,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load admin profile", error);
        toast.error("Error loading profile data");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user, axiosInstance]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditFormData({
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser(editFormData.displayName, editFormData.photoURL);

      const updatePayload = {
        displayName: editFormData.displayName,
        photoURL: editFormData.photoURL,
      };

      await axiosSecure.patch(`/users/${profileData._id}`, updatePayload);

      setProfileData({ ...profileData, ...updatePayload });
      setIsEditing(false);
      toast.success("Admin profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full font-sans pb-20 relative">
      {/* --- 1. HEADER BANNER --- */}
      <div className="h-64 w-full relative overflow-hidden bg-[#1A2F23]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#4F6F52 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F6F52] rounded-full blur-[120px] opacity-20 translate-y-1/2 translate-x-1/4"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32">
        {/* --- 2. MAIN PROFILE CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white flex flex-col md:flex-row gap-10 items-center md:items-start animate-fade-in-up">
          {/* LEFT: Avatar */}
          <div className="relative group shrink-0">
            <div className="w-40 h-40 rounded-full p-1.5 bg-white shadow-xl relative z-10">
              <img
                src={isEditing ? editFormData.photoURL : profileData?.photoURL}
                alt="Admin"
                className="w-full h-full rounded-full object-cover border-2 border-[#1A2F23]/10"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?u=admin";
                }}
              />
            </div>

            {/* Admin Badge */}
            <div
              className="absolute bottom-2 right-2 z-20 bg-[#1A2F23] text-[#D4C5A8] p-2.5 rounded-full border-4 border-white shadow-lg"
              title="Administrator"
            >
              <ShieldCheck size={20} fill="currentColor" />
            </div>

            {/* Edit Photo Overlay */}
            {isEditing && (
              <div className="absolute bottom-0 right-0 left-0 top-0 rounded-full bg-black/50 z-20 flex items-center justify-center cursor-pointer backdrop-blur-sm animate-fade-in">
                <Camera className="text-white" size={32} />
              </div>
            )}
          </div>

          {/* RIGHT: Details & Form */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-8">
              <div className="space-y-3 w-full text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1A2F23]/10 text-[#1A2F23] text-[10px] font-bold uppercase tracking-widest">
                  System Administrator
                </span>

                {isEditing ? (
                  <div className="space-y-4 max-w-md mx-auto md:mx-0">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        value={editFormData.displayName}
                        onChange={handleInputChange}
                        className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23] bg-[#F3F5F0] border-b-2 border-[#4F6F52] outline-none w-full px-3 py-2 rounded-t-lg transition-colors focus:bg-white"
                        placeholder="Admin Name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        name="photoURL"
                        value={editFormData.photoURL}
                        onChange={handleInputChange}
                        className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#4F6F52] font-mono text-gray-600"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ) : (
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
                    {profileData?.displayName}
                  </h1>
                )}

                {/* Email (Read Only) */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                  <Mail size={16} />
                  <span>{profileData?.email}</span>
                  <Lock
                    size={14}
                    className="opacity-40"
                    title="Email is locked for security"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleEditToggle}
                      className="p-3 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Cancel"
                    >
                      <X size={20} />
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="p-3 rounded-xl bg-[#1A2F23] text-[#D4C5A8] hover:bg-[#4F6F52] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      title="Save Changes"
                    >
                      <Check size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#1A2F23] hover:border-[#1A2F23] hover:bg-gray-50 transition-all text-sm font-bold shadow-sm"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Admin Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="p-4 bg-[#F9FAF8] rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg text-[#4F6F52] shadow-sm">
                  <Server size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Role
                  </p>
                  <p className="font-serif font-bold text-[#1A2F23]">
                    Administrator
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[#F9FAF8] rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg text-[#4F6F52] shadow-sm">
                  <Database size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Database ID
                  </p>
                  <p className="font-mono text-xs font-bold text-[#1A2F23] truncate max-w-[100px] sm:max-w-full">
                    {profileData?._id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. SECURITY NOTICE --- */}
        <div
          className="mt-12 text-center animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="inline-flex flex-col items-center gap-2 text-gray-400">
            <Feather size={24} className="opacity-50" />
            <p className="text-sm max-w-md mx-auto">
              "With great power comes great responsibility." <br />
              As an admin, ensure the integrity of the Book of Wisdom.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono mt-2 opacity-60">
              <Calendar size={12} />
              Account Created:{" "}
              {new Date(profileData?.createdAt).toLocaleDateString()}
            </div>
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
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminProfile;