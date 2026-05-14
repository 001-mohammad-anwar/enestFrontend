import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR MOBILE */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white shadow-sm z-40 px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600">
          PM App
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[260px]
          bg-white border-r border-gray-200
          px-6 py-8
          flex flex-col justify-between
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        {/* TOP */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold text-indigo-600">
              PM App
            </h1>

            <button
              className="md:hidden"
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            <button className="flex items-center gap-3 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-2xl font-medium">
              <LayoutDashboard size={20} />
              Dashboard
            </button>

            <Link
              to="/projects"
              className="flex items-center gap-3 w-full text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-2xl transition"
            >
              <FolderKanban size={20} />
              Projects
            </Link>

            <Link to="/tasks" className="flex items-center gap-3 w-full text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
              <ListTodo size={20} />
              Tasks
            </Link>

            <button className="flex items-center gap-3 w-full text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-2xl transition">
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;