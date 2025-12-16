import React from "react";
import { Link, useNavigate } from "react-router";
import { FileQuestion, ArrowLeft, Home, Compass } from "lucide-react";

const Error404 = () => {
  const navigate = useNavigate();

  const THEME = {
    dark: "#1A2F23",
    primary: "#4F6F52",
    light: "#F3F5F0",
    accent: "#D4C5A8",
    white: "#FFFFFF",
  };

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center font-sans p-6 overflow-hidden"
      style={{ backgroundColor: THEME.light }}
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
        }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#1A2F23]/5 pointer-events-none"></div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-center animate-fade-in-up border border-white/60">
        {/* Animated Icon Visual */}
        <div className="relative mb-10 mx-auto w-32 h-32 flex items-center justify-center group">
          {/* Rotating Compass Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4C5A8] animate-spin-slow"></div>

          {/* The Icon */}
          <div className="relative z-10 bg-[#F3F5F0] p-6 rounded-full text-[#4F6F52] shadow-inner group-hover:scale-110 transition-transform duration-500">
            <FileQuestion size={48} strokeWidth={2} />
          </div>

          {/* Decoration */}
          <div className="absolute -bottom-2 right-0 bg-[#1A2F23] text-[#D4C5A8] p-2 rounded-full shadow-lg">
            <Compass size={20} />
          </div>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <h1 className="text-8xl font-serif font-bold text-[#1A2F23] opacity-10 absolute left-1/2 -translate-x-1/2 -top-16 select-none w-full">
            404
          </h1>
          <h2 className="text-4xl font-serif font-bold text-[#1A2F23] mb-3 relative z-10">
            The Lost Chapter
          </h2>
          <div className="w-12 h-1 bg-[#D4C5A8] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 text-lg leading-relaxed">
            We've searched the entire archive, but the page you are looking for
            seems to have been misplaced in time.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full px-6 py-4 rounded-xl bg-[#1A2F23] text-white font-bold hover:bg-[#4F6F52] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Return to Library
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-4 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-[#F3F5F0] hover:text-[#1A2F23] hover:border-[#1A2F23]/20 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>

      {/* --- CSS ANIMATIONS --- */}
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Error404;