import React, { useState } from "react";
import {
  Home,
  PlusCircle,
  BookOpen,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Feather,
} from "lucide-react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Logo from "../components/Shared/Logo";
import useRole from "../hooks/useRole";
import { FaFlag, FaUsers } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { logoutUser } = useAuth();
  const { COLORS } = useTheme();
  const role = useRole();
  console.log(role);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a2f23",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Signed Out!",
              text: "Your have been signed out.",
              icon: "success",
              confirmButtonColor: "#1a2f23",
            });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

  const navItems =
    role === "admin"
      ? [
          {
            name: "Home",
            path: "/dashboard/admin-home",
            icon: <Home size={20} />,
          },

          {
            name: "Manage Lessons",
            path: "/dashboard/approve-lessons",
            icon: <AiOutlineCheckCircle size={20} />,
          },
          {
            name: "Manage Users",
            path: "/dashboard/manage-users",
            icon: <FaUsers />,
          },
          {
            name: "Reported Lessons",
            path: "/dashboard/reported-lessons",
            icon: <FaFlag />,
          },
          {
            name: "Profile",
            path: "/dashboard/admin-profile",
            icon: <User size={20} />,
          },
        ]
      : [
          { name: "Home", path: "/dashboard", icon: <Home size={20} /> },
          {
            name: "Add Lessons",
            path: "/dashboard/add-lessons",
            icon: <PlusCircle size={20} />,
          },
          {
            name: "My Lessons",
            path: "/dashboard/my-lessons",
            icon: <BookOpen size={20} />,
          },
          {
            name: "My Favorites",
            path: "/dashboard/my-favorites",
            icon: <Heart size={20} />,
          },
          {
            name: "Profile",
            path: "/dashboard/profile",
            icon: <User size={20} />,
          },
        ];

  const NavLink = ({ item, isMobile = false }) => {
    const isActive = location.pathname === item.path;

    return (
      <Link
        to={item.path}
        onClick={() => isMobile && setIsMobileOpen(false)}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? "bg-[#D4C5A8] text-[#1A2F23] font-bold shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        {/* Icon */}
        <span
          className={`relative z-10 transition-transform duration-300 ${
            isActive ? "scale-110" : "group-hover:scale-110"
          }`}
        >
          {item.icon}
        </span>

        {/* Text */}
        <span className="relative z-10 text-sm tracking-wide">{item.name}</span>

        {isActive && (
          <div className="absolute inset-0 bg-white/20 blur-xl"></div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-[#F3F5F0]">
      <aside
        className="hidden lg:flex flex-col w-72 h-screen sticky top-0 p-6 z-50 shadow-2xl"
        style={{ backgroundColor: COLORS.dark }}
      >
        {/* LOGO AREA */}
        <div className="flex flex-col items-center justify-center py-8 mb-8 border-b border-white/10">
          <Logo />
          <h1 className="text-xl font-serif font-bold text-white tracking-wide">
            Book of Wisdom
          </h1>
          <p className="text-[10px] text-[#D4C5A8] uppercase tracking-[0.2em] font-bold mt-1">
            {role === "admin"
              ? "Admin Dashboard"
              : role === "user"
              ? "User Dashboard"
              : "Loading..."}
          </p>
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        {/* BOTTOM USER AREA */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-white/50 hover:text-[#D4C5A8] hover:bg-white/5 transition-all group cursor-pointer"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-xl"></div>
      </aside>

      <div className="lg:hidden fixed top-0 w-full z-40 bg-[#1A2F23] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Logo className="text-[#1A2F23]" />

          <span className="font-serif font-bold">Book of Wisdom</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#1A2F23] pt-32 px-6 animate-fade-in-right">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} isMobile={true} />
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/50 hover:text-red-400 mt-8"
            >
              <LogOut size={20} />
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1 relative overflow-y-auto lg:p-8 pt-20 lg:pt-8">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50 fixed"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
          }}
        />

        <Outlet />
        <div className="relative z-10 w-full max-w-7xl mx-auto">{children}</div>
      </main>

      <style jsx>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;