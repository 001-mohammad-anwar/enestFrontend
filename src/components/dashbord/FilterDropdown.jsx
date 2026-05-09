// ===============================
// FilterDropdown.jsx
// ===============================

import React from "react";

const FilterDropdown = () => {
  return (
    <select className="bg-white px-5 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-indigo-200 text-gray-600">

      <option>All</option>
      <option>Todo</option>
      <option>In Progress</option>
      <option>Done</option>

    </select>
  );
};

export default FilterDropdown;