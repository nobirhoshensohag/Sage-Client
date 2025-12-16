import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { BookOpen, Check, Home, Sparkles } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTheme from "../../hooks/useTheme";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { COLORS } = useTheme();

  const [currUser, setCurrUser] = useState(null);
  const hasUpdatedRef = useRef(false); // prevents double PATCH

  /* --------------------------------------------------
     1. Load current user from DB
  -------------------------------------------------- */
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/users?email=${user.email}`)
      .then((res) => {
        setCurrUser(res.data?.[0] || null);
      })
      .catch(console.error);
  }, [user?.email, axiosInstance]);

  /* --------------------------------------------------
     2. Mark user as Premium (ONCE)
  -------------------------------------------------- */
  useEffect(() => {
    if (!session_id || !currUser?._id) return;
    if (hasUpdatedRef.current) return;

    hasUpdatedRef.current = true;

    axiosSecure
      .patch(`/users/${currUser._id}`, { isPremium: true })
      .then(() => {
        // 🔥 Notify Navbar / usePremium instantly
        window.dispatchEvent(new Event("premium-updated"));
      })
      .catch(console.error);
  }, [session_id, currUser, axiosSecure]);

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center font-sans p-4"
      style={{ backgroundColor: COLORS.light }}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.primary}30 0%, transparent 60%)`,
        }}
      />

      {/* Main Card */}
      <div className="relative my-20 z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 text-center animate-fade-in-up border border-white/50">
        {/* Icon */}
        <div
          className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
          style={{ backgroundColor: `${COLORS.primary}15` }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: COLORS.primary }}
          />
          <Check size={40} style={{ color: COLORS.primary }} strokeWidth={4} />
        </div>

        {/* Headings */}
        <h1
          className="text-3xl md:text-4xl font-serif font-bold mb-2"
          style={{ color: COLORS.dark }}
        >
          Wisdom Unlocked!
        </h1>

        <h2
          className="text-xl font-medium mb-4"
          style={{ color: COLORS.primary }}
        >
          Payment Successful
        </h2>

        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Thank you for investing in your journey. Your premium access is now
          active.
        </p>

        {/* Info Box */}
        <div
          className="border rounded-2xl p-5 mb-10 flex items-start gap-4 text-left"
          style={{
            backgroundColor: `${COLORS.accent}10`,
            borderColor: `${COLORS.accent}30`,
          }}
        >
          <Sparkles
            size={24}
            className="flex-shrink-0 mt-1"
            style={{ color: COLORS.accent }}
          />
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-wide mb-1"
              style={{ color: COLORS.dark }}
            >
              Premium Membership Active
            </h3>
            <p className="text-sm text-gray-600">
              Unlimited access to locked lessons and exclusive content.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link to="/public-lessons">
            <button
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.dark }}
            >
              <BookOpen size={20} />
              Dive Into Content
            </button>
          </Link>

          <Link to="/dashboard">
            <button
              className="w-full py-4 rounded-xl font-medium transition-colors hover:bg-gray-50 flex items-center justify-center gap-2"
              style={{ color: COLORS.primary }}
            >
              <Home size={20} />
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* Animation */}
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

export default PaymentSuccess;