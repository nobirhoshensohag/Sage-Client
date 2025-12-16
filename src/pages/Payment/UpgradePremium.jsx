import React from "react";
import { Check, Crown, Star, Shield, Zap, ArrowRight } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const UpgradePremium = () => {
  const THEME = {
    dark: "#1A2F23", // Dark Forest
    primary: "#4F6F52", // Sage
    light: "#F3F5F0", // Mist
    accent: "#D4C5A8", // Gold
    white: "#FFFFFF",
  };

  const benefits = [
    "Unlimited access to the full Book of Wisdom",
    "Unlock exclusive 'Deep Dive' psychological breakdowns",
    "Support the creators and curators directly",
    "Ad-free, focused reading experience",
    "Early access to new features and community tools",
  ];

  const axiosInstance = useAxios();
  const { user } = useAuth();

  const handlePayment = () => {
    const paymentInfo = {
      email: user.email,
    };
    axiosInstance.post("/payment-checkout-session", paymentInfo).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center font-sans p-4 py-12"
      style={{ backgroundColor: THEME.light }}
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
        }}
      />
      {/* Gold Glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[600px] h-[600px] bg-[#D4C5A8] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      {/* --- MAIN SPLIT CARD --- */}
      <div className="relative my-16 z-10 w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        {/* === LEFT SIDE: BRANDING & MOOD === */}
        <div
          className="w-full md:w-2/5 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: THEME.dark }}
        >
          {/* Abstract Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F6F52] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

          {/* Top Icon */}
          <div className="relative z-10 w-12 h-12 rounded-full border border-[#D4C5A8]/30 flex items-center justify-center mb-6">
            <Crown size={24} style={{ color: THEME.accent }} />
          </div>

          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Invest in your <br />
              <span style={{ color: THEME.accent }}>Mind.</span>
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              "An investment in knowledge pays the best interest." <br />
              <span className="text-sm opacity-50 mt-2 block">
                — Benjamin Franklin
              </span>
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="flex items-center gap-2 text-[#D4C5A8] text-sm font-bold uppercase tracking-widest">
              <Star size={14} fill="currentColor" />
              <span>Premium Membership</span>
            </div>
          </div>
        </div>

        {/* === RIGHT SIDE: OFFER & ACTION === */}
        <div className="w-full md:w-3/5 p-10 md:p-14 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: THEME.dark }}
            >
              Unlock the Full Archive
            </h2>
            <p className="text-gray-500">
              Join a community of seekers and get unlimited access to life's
              greatest lessons.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${THEME.primary}20` }}
                >
                  <Check
                    size={14}
                    style={{ color: THEME.primary }}
                    strokeWidth={3}
                  />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Pricing Box */}
          <div
            className="rounded-2xl p-6 mb-8 flex items-center justify-between border"
            style={{
              backgroundColor: THEME.light,
              borderColor: `${THEME.accent}40`,
            }}
          >
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                One Time Payment
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl font-serif font-bold"
                  style={{ color: THEME.dark }}
                >
                  $30.00
                </span>
              </div>
            </div>
            <div className="px-3 py-1 bg-[#D4C5A8] text-[#1A2F23] text-xs font-bold uppercase rounded-lg">
              Best Value
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handlePayment}
            className="w-full cursor-pointer py-5 rounded-xl text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
            style={{ backgroundColor: THEME.primary }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

            <span>Upgrade Now</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Secure payment. Cancel anytime. 100% money-back guarantee.
          </p>
        </div>
      </div>

      {/* --- CSS ANIMATIONS --- */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .group-hover:animate-shimmer:hover {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default UpgradePremium;