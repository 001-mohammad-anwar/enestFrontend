// ===============================
// Navbar.jsx
// ===============================

import React from "react";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-3xl px-8 py-5 shadow-sm">

      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, Anwar 👋
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Manage your projects and tasks easily
        </p>
      </div>



      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="relative">
          <Bell className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>



        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
          A
        </div>
      </div>
    </div>
  );
};

export default Navbar;