import React from "react";
import {
  Check,
  Crown,
  Star,
  ArrowRight,
  X,
  Minus,
  Shield,
  Zap,
  BookOpen,
  Feather,
  Layout,
} from "lucide-react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const UpgradePremium = () => {
  const { COLORS } = useTheme();

  const benefits = [
    {
      text: "Unlimited access to the full Book of Wisdom",
      icon: <BookOpen size={18} />,
    },
    {
      text: "Unlock exclusive 'Deep Dive' psychological breakdowns",
      icon: <Zap size={18} />,
    },
    {
      text: "Support the creators and curators directly",
      icon: <Crown size={18} />,
    },
    { text: "Ad-free, focused reading experience", icon: <Layout size={18} /> },
    {
      text: "Early access to new features and community tools",
      icon: <Star size={18} />,
    },
  ];

  const comparisonFeatures = [
    { name: "Access to Public Lessons", free: true, premium: true },
    { name: "Premium 'Deep Dive' Articles", free: false, premium: true },
    { name: "Ad-Free Experience", free: false, premium: true },
    { name: "Lesson Creation Limit", free: "3 / month", premium: "Unlimited" },
    { name: "Golden Contributor Badge", free: false, premium: true },

    { name: "Priority Community Listing", free: false, premium: true },
    { name: "Direct Support to Authors", free: false, premium: true },
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

  const renderCell = (value, isPremium) => {
    if (value === true)
      return (
        <div
          className={`mx-auto w-6 h-6 rounded-full flex items-center justify-center ${
            isPremium
              ? "bg-[#1A2F23] text-[#D4C5A8]"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <Check size={14} strokeWidth={3} />
        </div>
      );
    if (value === false)
      return <Minus size={16} className="mx-auto text-gray-300" />;

    return (
      <span
        className={`font-bold text-sm tracking-wide ${
          isPremium ? "text-[#1A2F23]" : "text-gray-400"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div
      className="min-h-screen w-full relative font-sans overflow-x-hidden selection:bg-[#D4C5A8] selection:text-[#1A2F23]"
      style={{ backgroundColor: { COLORS }.light }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 fixed" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 lg:py-32">
        {/* 1. HEADER SECTION */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A2F23]/10 bg-white/50 text-[#1A2F23] text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            <Crown size={14} className="text-[#D4C5A8]" fill="currentColor" />
            <span>Membership Invitation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2F23] mb-6 tracking-tight">
            Invest in your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4C5A8] to-[#bfae8d] italic">
              legacy.
            </span>
          </h1>
          <p className="text-[#4F6F52] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Join the inner circle of the Book of Wisdom. Unlock the full
            archive, support the mission, and elevate your mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
          {/* LARGE LEFT CARD: The Pitch & Price */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group animate-fade-in-up shadow-2xl shadow-[#1A2F23]/5 border border-white">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-serif font-bold text-[#1A2F23] mb-4">
                Lifetime Access
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-md leading-relaxed">
                One simple payment. No subscriptions. No hidden fees. Just pure
                wisdom, forever.
              </p>

              {/* Benefits List inside card */}
              <div className="space-y-4 mb-10">
                {benefits.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="p-1.5 rounded-full bg-[#F3F5F0] text-[#1A2F23] group-hover/item:bg-[#1A2F23] group-hover/item:text-[#D4C5A8] transition-colors">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-[#1A2F23] font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    Total Price
                  </span>
                  <span className="text-5xl font-serif font-bold text-[#1A2F23]">
                    ৳1500
                  </span>
                </div>

                <div className="h-px w-full sm:w-auto sm:h-12  flex-1 hidden sm:block"></div>

                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto px-10 py-5 bg-[#1A2F23] text-white rounded-xl font-bold text-lg hover:bg-[#4F6F52] transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 group/btn cursor-pointer"
                >
                  <span>Accept Invite</span>
                  <ArrowRight
                    size={20}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center sm:text-left flex items-center gap-1 justify-center sm:justify-start">
                <Shield size={12} /> Secure Stripe Checkout • 100% Money-back
                guarantee
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Visual Benefits (Vertical Stack) */}
          <div
            className="lg:col-span-5 flex flex-col gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Benefit 1 */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 flex items-center gap-6 hover:shadow-lg transition-shadow shadow-sm border border-white">
              <div className="w-16 h-16 rounded-2xl bg-[#F3F5F0] flex items-center justify-center text-[#1A2F23] shrink-0">
                <Feather size={28} />
              </div>
              <div>
                <h3 className="text-[#1A2F23] font-bold text-xl mb-1">
                  Creation Unlimited
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Create and publish without limits. Your wisdom has no bounds.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 flex items-center gap-6 hover:shadow-lg transition-shadow shadow-sm border border-white">
              <div className="w-16 h-16 rounded-2xl bg-[#F3F5F0] flex items-center justify-center text-[#1A2F23] shrink-0">
                <Crown size={28} />
              </div>
              <div>
                <h3 className="text-[#1A2F23] font-bold text-xl mb-1">
                  Golden Badge
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Stand out in the community with the prestigious Gold status.
                </p>
              </div>
            </div>

            {/* Benefit 3 (CTA Card) */}
            <div
              className="flex-1 bg-gradient-to-br from-[#1A2F23] to-[#0F1C15] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group cursor-pointer shadow-xl"
              onClick={handlePayment}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-[#4F6F52] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>

              <Star
                size={32}
                className="mb-3 relative z-10 text-[#D4C5A8]"
                fill="currentColor"
              />
              <h3 className="font-serif font-bold text-2xl relative z-10">
                Upgrade Now
              </h3>
              <p className="text-white/60 text-sm font-medium relative z-10 mt-1">
                Join 1,000+ members
              </p>
            </div>
          </div>
        </div>

        {/* 3. THE COMPARISON TABLE (Clean Light Mode) */}
        <div
          className="max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif font-bold text-[#1A2F23]">
              The Distinction
            </h3>
            <p className="text-gray-500 mt-2">Why the upgrade matters</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#1A2F23]/5">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest w-5/12 pl-10">
                      Feature
                    </th>
                    <th className="p-8 text-xs font-bold text-gray-400 uppercase tracking-widest w-3/12">
                      Guest
                    </th>
                    <th className="p-0 w-4/12 relative bg-[#F9FAF8]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2F23]"></div>
                      <div className="p-8 text-xs font-bold text-[#1A2F23] uppercase tracking-widest flex items-center justify-center gap-2">
                        <Crown
                          size={14}
                          className="text-[#D4C5A8]"
                          fill="currentColor"
                        />{" "}
                        Member
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr
                      key={index}
                      className="group border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-none"
                    >
                      <td className="p-6 pl-10 text-left font-serif font-bold text-[#1A2F23] text-base">
                        {row.name}
                      </td>
                      <td className="p-6">{renderCell(row.free, false)}</td>
                      <td className="p-6 bg-[#F9FAF8] border-l border-gray-100 relative">
                        {/* Hover Highlight */}
                        <div className="absolute inset-0 bg-[#D4C5A8] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="relative z-10">
                          {renderCell(row.premium, true)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handlePayment}
              className="text-gray-400 hover:text-[#1A2F23] transition-colors text-sm font-medium border-b border-transparent hover:border-[#1A2F23] pb-1"
            >
              Questions? Contact Support
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default UpgradePremium;