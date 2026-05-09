import React from "react";

import { Plus } from "lucide-react";

const DashboardHeader = ({
  setOpenModal,
}) => {

  return (

    <div className="flex items-center justify-between mt-8">

      {/* LEFT */}
      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Projects Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track and manage all your projects
        </p>

      </div>



      {/* BUTTON */}
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition"
      >
        <Plus size={20} />

        New Project
      </button>

    </div>
  );
};

export default DashboardHeader;