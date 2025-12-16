import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Eye,
  Trash2,
  CheckCircle,
  X,
  ShieldAlert,
  FileText,
  User,
  Slash,
  HelpCircle,
} from "lucide-react";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ReportedLessons = () => {
  const [groupedReports, setGroupedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);

  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    type: null,
    data: null,
    title: "",
    description: "",
  });

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/reports");
        const rawReports = res.data || [];

        const groups = rawReports.reduce((acc, report) => {
          const id = report.postId;

          if (!acc[id]) {
            acc[id] = {
              postId: id,
              title: report.postTitle || "Untitled Lesson",
              reports: [],
              count: 0,
              latestReportAt: report.reportedAt,
            };
          }

          acc[id].reports.push(report);
          acc[id].count += 1;

          if (new Date(report.reportedAt) > new Date(acc[id].latestReportAt)) {
            acc[id].latestReportAt = report.reportedAt;
          }

          return acc;
        }, {});

        setGroupedReports(Object.values(groups));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const performDeleteLesson = async (group) => {
    const { postId, reports } = group;
    try {
      await axiosSecure.delete(`/lessons/${postId}`);

      await Promise.all(
        reports.map((r) => axiosSecure.delete(`/reports/${r._id}`))
      );

      setGroupedReports((prev) => prev.filter((g) => g.postId !== postId));
      setSelectedCase(null);
      toast.success("Lesson and associated reports deleted permanently.");
    } catch (error) {
      console.error("Failed to delete data", error);
      toast.error("Failed to delete lesson/reports. Please try again.");
    }
  };

  const performIgnoreReports = async (group) => {
    try {
      await Promise.all(
        group.reports.map((r) => axiosSecure.delete(`/reports/${r._id}`))
      );

      setGroupedReports((prev) =>
        prev.filter((g) => g.postId !== group.postId)
      );
      setSelectedCase(null);
      toast.success("Reports dismissed successfully.");
    } catch (error) {
      console.error("Failed to ignore reports", error);
      toast.error("Failed to clear reports.");
    }
  };

  const requestDelete = (group) => {
    setConfirmation({
      isOpen: true,
      type: "delete",
      data: group,
      title: "Delete Lesson & Reports?",
      description:
        "This will permanently delete the lesson content and remove all associated reports from the database. This cannot be undone.",
    });
  };

  const requestIgnore = (group) => {
    setConfirmation({
      isOpen: true,
      type: "ignore",
      data: group,
      title: "Dismiss Reports?",
      description:
        "This will delete all reports for this lesson from the database, but the lesson content will remain visible to users.",
    });
  };

  const handleConfirmAction = () => {
    if (confirmation.type === "delete") {
      performDeleteLesson(confirmation.data);
    } else if (confirmation.type === "ignore") {
      performIgnoreReports(confirmation.data);
    }
    setConfirmation({ ...confirmation, isOpen: false });
  };

  const ConfirmationModal = () => {
    if (!confirmation.isOpen) return null;

    const isDelete = confirmation.type === "delete";

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-[#1A2F23]/60 backdrop-blur-sm transition-opacity"
          onClick={() => setConfirmation({ ...confirmation, isOpen: false })}
        ></div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-in-up border border-gray-100">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              isDelete ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-600"
            }`}
          >
            {isDelete ? <AlertTriangle size={24} /> : <HelpCircle size={24} />}
          </div>

          <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-2">
            {confirmation.title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {confirmation.description}
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
                isDelete
                  ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                  : "bg-[#1A2F23] hover:bg-[#4F6F52] shadow-[#1A2F23]/20"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ReportsModal = ({ caseData, onClose }) => {
    if (!caseData) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-[#1A2F23]/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="bg-[#1A2F23] p-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-white/10 rounded-lg">
                <ShieldAlert size={24} className="text-[#D4C5A8]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">
                  Moderation Case File
                </h3>
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">
                  ID: {caseData.postId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 overflow-y-auto">
            <div className="mb-8">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Flagged Content
              </span>
              <h4 className="text-2xl font-bold text-[#1A2F23] font-serif leading-tight">
                "{caseData.title}"
              </h4>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                Reporter Statements ({caseData.reports.length})
              </span>

              {caseData.reports.map((report) => (
                <div
                  key={report._id}
                  className="p-5 rounded-2xl bg-[#F3F5F0] border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1A2F23]/10 flex items-center justify-center">
                        <User size={12} className="text-[#1A2F23]" />
                      </div>
                      <span className="text-sm font-bold text-[#1A2F23]">
                        {report.reportedUserEmail}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(report.reportedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <AlertTriangle
                      size={16}
                      className="text-red-500 mt-0.5 shrink-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                        {report.reportReason}
                      </span>
                      {report.reportDetails ? (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          "{report.reportDetails}"
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          No additional details provided.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3 bg-gray-50 shrink-0">
            <button
              onClick={() => requestIgnore(caseData)}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-500 font-bold hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Slash size={16} /> Dismiss / Ignore
            </button>
            <button
              onClick={() => requestDelete(caseData)}
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg hover:shadow-red-500/30 text-sm flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Delete Lesson
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full font-sans min-h-[80vh] relative">
      {/* 1. HEADER */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-500/10 rounded-xl text-red-500 border border-red-500/20">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2F23]">
            Report Center
          </h1>
        </div>
        <p className="text-gray-500 max-w-2xl">
          Community safety alerts. There are{" "}
          <span className="font-bold text-red-500">
            {groupedReports.length}
          </span>{" "}
          lessons currently flagged for review.
        </p>
      </div>

      {/* 2. TABLE CONTAINER */}
      <div
        className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 w-full bg-gray-50 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : groupedReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAF8]">
                  <th className="p-6 pl-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-5/12">
                    Flagged Lesson
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12 text-center">
                    Severity
                  </th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-2/12">
                    Latest Report
                  </th>
                  <th className="p-6 pr-10 text-xs font-bold text-gray-400 uppercase tracking-widest w-3/12 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {groupedReports.map((group) => (
                  <tr
                    key={group.postId}
                    className="group hover:bg-red-50/20 transition-colors"
                  >
                    {/* COL 1: TITLE */}
                    <td className="p-6 pl-10">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-[#F3F5F0] text-[#1A2F23] group-hover:bg-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <span className="font-serif font-bold text-[#1A2F23] text-lg leading-tight line-clamp-1 block mb-1 max-w-xs">
                            {group.title}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                            ID: {group.postId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* COL 2: COUNT */}
                    <td className="p-6 text-center">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs border ${
                          group.count > 2
                            ? "bg-red-100 text-red-600 border-red-200"
                            : "bg-orange-100 text-orange-600 border-orange-200"
                        }`}
                      >
                        <AlertTriangle size={12} fill="currentColor" />
                        {group.count} Report{group.count !== 1 && "s"}
                      </div>
                    </td>

                    {/* COL 3: DATE */}
                    <td className="p-6">
                      <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                        {new Date(group.latestReportAt).toLocaleDateString()}
                      </span>
                    </td>

                    {/* COL 4: ACTIONS */}
                    <td className="p-6 pr-10 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setSelectedCase(group)}
                          className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-[#1A2F23] hover:bg-[#1A2F23] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm group/btn"
                        >
                          <Eye size={14} /> View Details
                        </button>

                        <div className="h-6 w-px bg-gray-200"></div>

                        {/* Quick Actions */}
                        <button
                          onClick={() => requestIgnore(group)}
                          className="p-2 rounded-full text-gray-400 hover:text-[#4F6F52] hover:bg-[#4F6F52]/10 transition-colors"
                          title="Ignore Reports"
                        >
                          <Slash size={18} />
                        </button>
                        <button
                          onClick={() => requestDelete(group)}
                          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Lesson"
                        >
                          <Trash2 size={18} />
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
            <div className="w-24 h-24 rounded-full bg-[#4F6F52]/10 flex items-center justify-center mb-6 text-[#4F6F52] animate-pulse">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-2">
              Community Secure
            </h3>
            <p className="text-gray-500 max-w-sm">
              There are no active reports. The wisdom in the archive remains
              pure.
            </p>
          </div>
        )}
      </div>

      {/* --- RENDER MODALS --- */}
      {selectedCase && (
        <ReportsModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}

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

export default ReportedLessons;