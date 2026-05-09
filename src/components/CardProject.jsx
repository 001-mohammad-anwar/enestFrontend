import React, { useState } from "react";
import {
  CalendarDays,
  FolderKanban,
  ListTodo,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../store/projectSlice";

const CardProject = ({
  _id,
  projectName,
  description,
  totalTasks,
  createdAt,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleting, setDeleting] = useState(false);

  // Redux projects
  const projects = useSelector(
    (state) => state.project.projects
  );

  // DELETE HANDLER
  const handleDelete = async (e) => {
    e.stopPropagation();

    if (deleting) return;

    try {
      setDeleting(true);

      // API CALL
      const response = await Axios({
        ...SummaryApi.deleteProject(_id),
      });

      if (response?.data?.success) {
        // 🔥 UPDATE REDUX STORE (NO RELOAD NEEDED)
        const updated = projects.filter(
          (p) => p._id !== _id
        );

        dispatch(setProjects(updated));
      }

    } catch (error) {
      console.log("DELETE ERROR:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/projects/${_id}`)}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative"
    >
      {/* DELETE BUTTON */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`absolute top-5 right-24 w-10 h-10 rounded-xl flex items-center justify-center transition
          ${deleting ? "bg-gray-100" : "bg-red-50 hover:bg-red-100"}
        `}
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>

      {/* ICON + TASK COUNT */}
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <FolderKanban className="text-indigo-600 w-7 h-7" />
        </div>

        <div className="bg-indigo-50 text-indigo-600 text-sm font-semibold px-4 py-1 rounded-full">
          {totalTasks} Tasks
        </div>
      </div>

      {/* NAME */}
      <h2 className="text-2xl font-bold text-gray-800 mt-6">
        {projectName}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm leading-6 mt-3">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <CalendarDays className="w-4 h-4" />

          <span>
            {createdAt
              ? new Date(createdAt).toLocaleDateString()
              : "No date"}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
          <ListTodo className="w-4 h-4" />
          Active
        </div>
      </div>
    </div>
  );
};

export default CardProject;