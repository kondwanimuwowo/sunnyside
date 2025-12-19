import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationContainer from "@components/common/NotificationContainer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#efe82a]/10 via-white to-purple-50 flex flex-col md:pt-16">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <NotificationContainer />
    </div>
  );
};

export default Layout;
