
import React, { useEffect, useRef, useState } from "react";
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
  UploadCloud,
  Send,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePremium from "../../../hooks/usePremium";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const isPremium = usePremium();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const modalRef = useRef(null);

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
    "Philosophy",
  ];

  const tones = [
    { label: "Motivational", emoji: "🔥" },
    { label: "Sad", emoji: "🌧️" },
    { label: "Gratitude", emoji: "🗿" },
    { label: "Realization", emoji: "✨" },
  ];

  const onSubmit = async (data) => {
    if (!selectedLesson) return;
    console.log(selectedLesson._id);
    try {
      const updatedLesson = {
        title: data.title,
        description: data.description,
        category: data.category,
        tone: data.tone,
        isPrivate: data.isPrivate ? "true" : "false",
        isPremiumAccess: data.accessLevel === "premium" ? "true" : "false",
        image: imagePreview ? imagePreview : "",
      };

      await axiosSecure.patch(
        `/lessons/${selectedLesson._id}/edit`,
        updatedLesson
      );
      await axiosSecure.patch(
        `/favorites/${selectedLesson._id}`,
        updatedLesson
      );

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson._id === selectedLesson._id
            ? { ...lesson, ...updatedLesson }
            : lesson
        )
      );

      toast.success("Lesson updated successfully!");
      handleCloseModal();
      setSelectedLesson(null);
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to update lesson:", error);
      toast.error("Failed to update lesson.");
    }
    console.log({ ...data, imagePreview });
  };

  const handleOpenModal = (lesson) => {
    setSelectedLesson(lesson);
    setImagePreview(lesson.image || null);
    setValue("title", lesson.title);
    setValue("description", lesson.description);
    setValue("category", lesson.category);
    setValue("tone", lesson.tone);
    setValue("isPrivate", lesson.isPrivate === "true");
    setValue(
      "accessLevel",
      lesson.isPremiumAccess === "true" ? "premium" : "free"
    );

    modalRef.current.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a2f23",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.result.deletedCount) {
            setLessons(lessons.filter((lesson) => lesson._id !== id));

            Swal.fire({
              title: "Removed!",
              text: "Your post has been removed.",
              icon: "success",
              confirmButtonColor: "#1a2f23",
            });
          }
        });
      }
    });
  };

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
                  lesson.isPremiumAccess === "true";
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
                          {lesson.isPremiumAccess === "true" && (
                            <PremiumBadge />
                          )}
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
                                lesson.favorites > 0
                                  ? "text-red-400 fill-red-400"
                                  : ""
                              }
                            />
                            <span className="text-sm font-bold">
                              {lesson.favorites}
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
                            onClick={() => handleOpenModal(lesson)}
                            className="p-2 cursor-pointer rounded-full hover:bg-[#D4C5A8]/20 text-gray-400 hover:text-[#8C7A5B] transition-colors"
                            title="Edit Lesson"
                          >
                            <Edit2 size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(lesson._id)}
                            className="p-2 cursor-pointer rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete Lesson"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <dialog
                          ref={modalRef}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="space-y-8"
                            >
                              {/* Title */}
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-2 text-left">
                                    The Headline
                                  </label>
                                  <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="e.g. The Quiet Power of Patience"
                                    className="w-full bg-[#F3F5F0] border-2 border-transparent focus:bg-white focus:border-[#D4C5A8] rounded-2xl px-5 py-4 text-lg outline-none transition-all shadow-inner"
                                    defaultValue={lesson.title}
                                  />
                                </div>

                                {/* Description */}
                                <div>
                                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-2 text-left">
                                    The Lesson
                                  </label>
                                  <textarea
                                    {...register("description", {
                                      required: true,
                                    })}
                                    rows="4"
                                    placeholder="What did experience teach you?"
                                    className="w-full bg-[#F3F5F0] border-2 border-transparent focus:bg-white focus:border-[#D4C5A8] rounded-2xl px-5 py-4 text-base outline-none transition-all shadow-inner resize-none"
                                    defaultValue={lesson.description}
                                  />
                                </div>
                              </div>

                              <div className="w-full h-[1px] bg-gray-100" />

                              {/* CATEGORY + TONE */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Category */}
                                <div>
                                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 text-left">
                                    Category
                                  </label>
                                  <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                      <button
                                        key={cat}
                                        type="button"
                                        onClick={() =>
                                          setValue("category", cat)
                                        }
                                        className={`px-4 py-2 rounded-xl text-sm border ${
                                          watch("category") === cat
                                            ? "bg-[#1A2F23] text-[#D4C5A8] border-[#1A2F23]"
                                            : "bg-white text-gray-500 border-gray-200 hover:border-[#4F6F52] cursor-pointer"
                                        }`}
                                      >
                                        {cat}
                                      </button>
                                    ))}
                                  </div>

                                  {/* default value */}
                                  <input
                                    type="hidden"
                                    {...register("category")}
                                    defaultValue={lesson.category}
                                  />
                                </div>

                                {/* Tone */}
                                <div>
                                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 text-left">
                                    Emotional Tone
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {tones.map((t) => (
                                      <button
                                        key={t.label}
                                        type="button"
                                        onClick={() =>
                                          setValue("tone", t.label)
                                        }
                                        className={`px-3 py-2 rounded-xl text-sm border flex items-center gap-2 justify-center cursor-pointer ${
                                          watch("tone") === t.label
                                            ? "bg-[#1A2F23] border-[#D4C5A8] text-[#D4C5A8] "
                                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                        }`}
                                      >
                                        {t.emoji} {t.label}
                                      </button>
                                    ))}
                                  </div>

                                  <input
                                    type="hidden"
                                    {...register("tone")}
                                    defaultValue={lesson.tone}
                                  />
                                </div>
                              </div>

                              {/* Visibility */}
                              <div>
                                <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                                  Visibility
                                </label>

                                <select
                                  {...register("visibility")}
                                  defaultValue={
                                    lesson.isPrivate === "true"
                                      ? "private"
                                      : "public"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setValue("isPrivate", value === "private");
                                  }}
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:border-[#4F6F52] outline-none cursor-pointer"
                                >
                                  <option value="public">
                                    Public — Visible to everyone
                                  </option>
                                  <option value="private">
                                    Private — Only you can see
                                  </option>
                                </select>
                              </div>

                              {/* Access Level */}
                              <div>
                                <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                                  Access Level
                                </label>

                                <select
                                  {...register("accessLevel")}
                                  value={watch("accessLevel")}
                                  onChange={(e) =>
                                    setValue("accessLevel", e.target.value)
                                  }
                                  disabled={!isPremium}
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:border-[#4F6F52] outline-none cursor-pointer"
                                >
                                  <option value="free">
                                    Free — Visible to all users
                                  </option>
                                  <option value="premium">
                                    Premium — Members only
                                  </option>
                                </select>

                                {!isPremium && (
                                  <p className="mt-1 text-xs text-blue-500">
                                    <Link to="/payment" className="underline">
                                      Become a Premium Member to access this
                                    </Link>
                                  </p>
                                )}
                              </div>

                              {/* Submit */}
                              <div className="pt-4">
                                <button
                                  type="submit"
                                  className="group relative w-full rounded-2xl bg-[#1A2F23] py-4 text-white shadow-xl transition-all hover:-translate-y-1"
                                >
                                  <div className="relative z-10 flex justify-center gap-2 text-lg cursor-pointer items-center">
                                    Publish <Send size={18} />
                                  </div>
                                </button>
                              </div>
                            </form>
                            <div className="modal-action">
                              <div method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                  onClick={handleCloseModal}
                                  className="btn"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </dialog>
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