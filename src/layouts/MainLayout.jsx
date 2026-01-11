import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F0]">
      <ScrollToTop />
      <Navbar />

      {/* 🔥 THIS IS THE KEY FIX */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
