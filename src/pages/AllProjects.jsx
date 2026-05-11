import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

import { setProjects } from "../store/projectSlice";
import ProjectGrid from "../components/dashbord/ProjectGrid";

import { FolderKanban } from "lucide-react";

const AllProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  const [loading, setLoading] = useState(false);

  // FETCH ALL PROJECTS
  const fetchAllProjects = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getAllProject,
      });

      const data = response.data;

      if (data?.success) {
        dispatch(setProjects(data.projects));
      }
    } catch (error) {
      console.error(
        "FETCH PROJECT ERROR:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projects.length === 0) {
      fetchAllProjects();
    }
  }, [dispatch]);

  return (
    <div className="w-full pt-4 sm:pt-6 px-2 sm:px-4">

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
            <FolderKanban className="text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Projects
            </h2>

            <p className="text-sm text-gray-500">
              Manage and track all your projects
            </p>
          </div>
        </div>

        {/* TOTAL COUNT */}
        <div className="self-start sm:self-auto bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm min-w-[80px] text-center">

          <p className="text-gray-500 text-xs sm:text-sm">
            Total
          </p>

          <p className="text-lg sm:text-xl font-bold text-gray-800">
            {projects?.length || 0}
          </p>

        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && projects?.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            No Projects Found
          </h3>

          <p className="text-gray-500 mt-1">
            Create your first project to get started
          </p>
        </div>
      )}

      {/* PROJECT GRID */}
      {!loading && projects?.length > 0 && (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
};

export default AllProjects;