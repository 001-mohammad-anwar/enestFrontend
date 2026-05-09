import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Navbar from "../components/dashbord/Navbar";

import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

import { CalendarDays, ListTodo } from "lucide-react";

import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ProjectDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  // =========================
  // FETCH SINGLE PROJECT
  // =========================
  const fetchSingleProject = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getSingleProject(id),
      });

      const data = response.data;

      if (data?.success) {
        setProject(data.project);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProject();
  }, [id]);

  // =========================
  // CREATE TASK
  // =========================
  const createTask = async () => {
    try {
      if (!task.title) {
        toast.error("Title required");
        return;
      }

      const response = await Axios({
        ...SummaryApi.createTask,
        data: {
          ...task,
          projectId: id,
        },
      });

      const data = response.data;

      if (data?.success) {
        toast.success("Task created");

        // 🔥 instant UI update (no reload)
        setProject((prev) => ({
          ...prev,
          tasks: [...(prev.tasks || []), data.task],
        }));

        setTask({
          title: "",
          description: "",
          assignedTo: "",
        });

        setOpenModal(false);
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <DashboardLayout>
        <Navbar />
        <p className="mt-10 text-gray-500">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Navbar />

      {/* =========================
          PROJECT CARD (SAME DESIGN)
      ========================== */}
      <div className="mt-8 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          {project?.name}
        </h1>

        <p className="text-gray-500 mt-4 max-w-3xl">
          {project?.description}
        </p>

        <div className="flex flex-wrap gap-6 mt-8">
          <div className="bg-indigo-50 px-5 py-4 rounded-2xl flex items-center gap-3">
            <ListTodo className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <h3 className="text-xl font-bold">
                {project?.tasks?.length || 0}
              </h3>
            </div>
          </div>

          <div className="bg-gray-100 px-5 py-4 rounded-2xl flex items-center gap-3">
            <CalendarDays className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <h3 className="text-lg font-semibold">
                {project?.createdAt
                  ? new Date(project.createdAt).toLocaleDateString()
                  : "N/A"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ADD TASK BUTTON (SAME STYLE)
      ========================== */}
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Tasks
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition"
        >
          Add Task
        </button>
      </div>

      {/* =========================
          TASK LIST (SAME STYLE)
      ========================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {project?.tasks?.length > 0 ? (
          project.tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-gray-800">
                {task.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {task.description}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Assigned: {task.assignedTo || "Not Assigned"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">
            No tasks found
          </p>
        )}
      </div>

      {/* =========================
          MODAL (SIMPLE FIXED)
      ========================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Create Task
            </h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Title"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-4"
              placeholder="Assign To"
              value={task.assignedTo}
              onChange={(e) =>
                setTask({ ...task, assignedTo: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={createTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProjectDetail;