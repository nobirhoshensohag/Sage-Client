import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  PenTool,
  LogOut,
  User as UserIcon,
  Settings,
  LayoutDashboard,
  ChevronDown,
  Gem,
  Lock,
} from "lucide-react";
import { NavLink, Link } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import usePremium from "../../hooks/usePremium";

/* ================= USER DROPDOWN ================= */
const UserDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          src={user?.photoURL || "/avatar.png"}
          alt={user?.displayName || "User"}
          className="w-9 h-9 rounded-full object-cover border-2 border-[#D4DEC9]"
        />
        <ChevronDown
          size={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border py-2 z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-bold truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || ""}
            </p>
          </div>

          <div className="py-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <LayoutDashboard size={16} className="mr-3" /> Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <UserIcon size={16} className="mr-3" /> Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <Settings size={16} className="mr-3" /> Settings
            </Link>
          </div>

          <div className="border-t px-2 pt-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={16} className="mr-3" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= NAVBAR ================= */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const isPremium = usePremium();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser().catch((err) => toast.error(err.message));
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/public-lessons">Public Lessons</NavLink>
      {user && <NavLink to="/add-lessons">Add Lessons</NavLink>}
      <NavLink to="/contact">Contact</NavLink>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex gap-6">{links}</div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {isPremium ? (
                <span className="flex items-center gap-1 text-xs font-bold">
                  <Gem size={12} /> Premium
                </span>
              ) : (
                <Link to="/payment" className="flex items-center gap-1">
                  <Lock size={14} /> Upgrade
                </Link>
              )}
              <UserDropdown user={user} handleLogout={handleLogout} />
            </>
          ) : (
            <>
              <Link to="/auth/login">Sign In</Link>
              <Link to="/auth/register">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          {links}
          {user ? (
            <button onClick={handleLogout} className="text-red-600">
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/auth/login">Sign In</Link>
              <Link to="/auth/register">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
