import React from "react";
import { Link, useNavigate } from "react-router";
import { ShieldBan, ArrowLeft, Home, LockKeyhole } from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-sans p-6 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#1A2F23]/10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 text-center animate-fade-in-up border-4 border-double border-[#D4C5A8]/50">
        <div className="relative mb-10 mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#1A2F23]/5 animate-ping opacity-75"></div>
          <div className="absolute inset-4 rounded-full bg-[#1A2F23]/10"></div>

          <div className="relative z-10 bg-[#1A2F23] p-6 rounded-full text-[#D4C5A8] shadow-xl">
            <LockKeyhole size={48} strokeWidth={2.5} />
          </div>

          <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full border-4 border-white shadow-md animate-bounce-slight">
            <ShieldBan size={20} />
          </div>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#1A2F23] mb-4 -mt-8 relative z-20">
          Forbidden Access
        </h2>

        <div className="w-16 h-1 bg-[#D4C5A8] mx-auto rounded-full mb-6"></div>

        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          This chapter of the archive is sealed. You do not have the necessary
          clearance or credentials to view this wisdom.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-[#1A2F23]/10 text-[#1A2F23] font-bold hover:bg-[#F3F5F0] hover:border-[#1A2F23]/30 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="flex-1 px-6 py-4 rounded-xl bg-[#1A2F23] text-white font-bold hover:bg-[#4F6F52] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-slight {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-slight {
          animation: bounce-slight 2s infinite ease-in-out;
        }
        .bg-radial-gradient {
          background: radial-gradient(
            circle,
            transparent 60%,
            rgba(26, 47, 35, 0.05) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default Forbidden;