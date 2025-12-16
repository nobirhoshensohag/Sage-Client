import React, { useEffect, useState } from "react";
import { Crown, Star, Feather, Trophy, Medal, Gem } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const COLORS = useTheme();


  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await axiosInstance.get("/top-contributors-week");
        setContributors(res.data.contributors);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch top contributors", error);
        setLoading(false);
      }
    };

    fetchContributors();
  }, [axiosInstance]);

  // --- STYLING LOGIC ---
  const getRankStyles = (index) => {
    // RANK 1: THE CHAMPION
    if (index === 0)
      return {
        cardClasses:
          "bg-white border-2 border-[#D4C5A8] shadow-2xl shadow-[#D4C5A8]/30 md:scale-110 z-20",
        headerBg: "bg-[#1A2F23]", // Dark Forest Header
        headerText: "text-[#D4C5A8]", // Gold Text
        avatarBorder: "border-[4px] border-[#D4C5A8]",
        icon: (
          <Crown
            size={32}
            fill="#D4C5A8"
            className="text-[#D4C5A8] animate-pulse"
          />
        ),
        rankBadge: "bg-[#D4C5A8] text-[#1A2F23] border-[#1A2F23]",
        footerBg: "bg-[#F3F5F0]",
      };

    // RANK 2: SILVER
    if (index === 1)
      return {
        cardClasses: "bg-white/90 border border-gray-200 shadow-xl z-10",
        headerBg: "bg-[#1A2F23]",
        headerText: "text-[#1A2F23]",
        avatarBorder: "border-[3px] border-gray-300",
        icon: <Medal size={28} className="text-gray-400" />,
        rankBadge: "bg-gray-200 text-gray-600 border-white",
        footerBg: "bg-white",
      };

    // RANK 3: BRONZE
    if (index === 2)
      return {
        cardClasses: "bg-white/90 border border-gray-200 shadow-xl z-10",
        headerBg: "bg-[#1A2F23]",
        headerText: "text-[#1A2F23]",
        avatarBorder: "border-[3px] border-amber-700/50",
        icon: <Medal size={28} className="text-amber-700" />,
        rankBadge: "bg-amber-100 text-amber-800 border-white",
        footerBg: "bg-white",
      };

    // OTHERS
    return {
      cardClasses:
        "bg-white/60 border border-transparent hover:border-[#4F6F52]/30 hover:bg-white transition-all shadow-md hover:shadow-lg",
      headerBg: "bg-[#1A2F23]",
      headerText: "text-[#4F6F52]",
      avatarBorder: "border-[2px] border-[#4F6F52]/20",
      icon: <Star size={24} className="text-[#4F6F52]/60" />,
      rankBadge: "bg-white text-gray-400 border-gray-100",
      footerBg: "bg-transparent",
    };
  };

  if (loading) {
    return (
      <div
        className="w-full py-32 flex justify-center items-center"
        style={{ backgroundColor: THEME.light }}
      >
        <div className="flex flex-col items-center gap-4 animate-pulse opacity-50">
          <Feather size={48} className="text-[#4F6F52]" />
          <p className="font-serif text-[#1A2F23] tracking-widest uppercase text-sm">
            Summoning Sages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-24 px-4 md:px-8 relative font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#D4C5A8] text-xs font-bold uppercase tracking-widest text-[#1A2F23] shadow-sm">
            <Trophy size={14} className="text-[#D4C5A8] fill-current" />
            <span>The Inner Circle</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A2F23]">
            Sages of the Week
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Honoring the architects of wisdom who have contributed the most to
            our collective consciousness.
          </p>
        </div>

        {/* --- CONTRIBUTORS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-end justify-center pb-12">
          {contributors.map((contributor, index) => {
            const styles = getRankStyles(index);

            return (
              <div
                key={contributor.email}
                className={`relative rounded-[2rem] overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 group ${styles.cardClasses}`}
              >
                {/* 1. Header Background (Curved) */}
                <div
                  className={`absolute top-0 w-full h-32 ${styles.headerBg} rounded-b-[50%] scale-150 transition-transform duration-700 group-hover:scale-[1.6]`}
                ></div>

                {/* 2. Premium Badge (Jewelry Style) */}
                {contributor.isPremium === "true" && (
                  <div className="absolute top-4 right-4 z-30 animate-fade-in tooltip-container cursor-help">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-[#D4C5A8] via-[#FDFBF7] to-[#C3B08D] shadow-lg border border-white/40">
                      <Gem size={12} className="text-[#1A2F23]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A2F23]">
                        Premium
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Rank Badge (Floating) */}
                <div
                  className={`absolute top-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 z-30 font-serif font-bold text-lg ${styles.rankBadge}`}
                >
                  #{index + 1}
                </div>

                {/* 4. Avatar & Icon Wrapper */}
                <div className="relative mt-20 mb-6 z-10">
                  {/* Crown/Icon floating above avatar */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 drop-shadow-lg transform transition-transform group-hover:scale-110">
                    {styles.icon}
                  </div>

                  {/* The Image */}
                  <div
                    className={`w-28 h-28 rounded-full p-1 bg-white shadow-2xl ${styles.avatarBorder}`}
                  >
                    <img
                      src={contributor.authorImage}
                      alt={contributor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Golden Glow for #1 */}
                  {index === 0 && (
                    <div className="absolute inset-0 bg-[#D4C5A8] rounded-full blur-2xl opacity-40 -z-10 animate-pulse"></div>
                  )}
                </div>

                {/* 5. Content Body */}
                <div className="w-full px-6 pb-8 flex flex-col items-center flex-grow z-10">
                  <h3
                    className={`text-xl font-serif font-bold mb-1 line-clamp-1 ${
                      index === 0 ? "text-[#1A2F23]" : "text-[#1A2F23]"
                    }`}
                  >
                    {contributor.email === user?.email
                      ? "You"
                      : contributor.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium tracking-wide mb-6 font-mono bg-gray-50 px-2 py-1 rounded-md max-w-full truncate">
                    {contributor.email}
                  </p>

                  {/* Stats Divider */}
                  <div className="w-12 h-[1px] bg-gray-200 mb-6"></div>

                  {/* Wisdom Count */}
                  <div
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 ${styles.footerBg}`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        index === 0
                          ? "bg-[#D4C5A8] text-[#1A2F23]"
                          : "bg-[#1A2F23] text-white"
                      }`}
                    >
                      <Feather size={16} />
                    </div>
                    <div className="text-left">
                      <span
                        className={`block font-bold text-lg leading-none ${
                          index === 0 ? "text-[#1A2F23]" : "text-[#1A2F23]"
                        }`}
                      >
                        {contributor.count}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Lessons Shared
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default TopContributors;