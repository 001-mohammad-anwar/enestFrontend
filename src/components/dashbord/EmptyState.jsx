// ===============================
// EmptyState.jsx
// ===============================

import React from "react";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-3xl py-20 flex flex-col items-center justify-center shadow-sm mt-10">

      <h2 className="text-2xl font-bold text-gray-700">
        No Projects Found
      </h2>

      <p className="text-gray-500 mt-3">
        Create your first project to get started
      </p>

      <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl transition">
        Create Project
      </button>
    </div>
  );
};

export default EmptyState;