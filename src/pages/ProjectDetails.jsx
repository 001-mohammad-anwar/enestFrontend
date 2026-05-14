import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Navbar from "../components/dashbord/Navbar";

import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

import { CalendarDays, ListTodo } from "lucide-react";

import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

import TaskModelCreate from "../components/Task/TaskModelCreate";

const ProjectDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [tasks, setTask] = useState(null);
  const [project, setProject] = useState(null);
  // console.log("project", project);

  const [openModal, setOpenModal] = useState(false);

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
        fetchAllTask()
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProject();
    fetchAllTask();
  }, [id]);

  // update Task
  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateTaskStatus(taskId),

        data: {
          status,
        },
      });

      const data = response.data;

      if (data?.success) {
        toast.success("Status updated");

        // UI UPDATE
        setProject((prev) => ({
          ...prev,

          tasks: prev.tasks.map((task) =>
            task._id === taskId ? { ...task, status } : task,
          ),
        }));
      }
    } catch (error) {
      console.log(error);

      AxiosToastError(error);
    }
  };

  // delete task

  const deleteTask = async (taskId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteTask(taskId),
      });

      const data = response.data;
      
      if (data?.success) {
        toast.success("Task deleted");
        setProject((prev) => ({
          ...prev,
          task: prev.tasks.filter((task) => task._id !== taskId),
        }));
        fetchAllTask();
      }

      // setProject((prev) => ({
      //   ...prev,
      //   tasks: [...(prev.tasks || []), data.task],
      // }));
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  // fetch all task

const fetchAllTask = async () => {

  try {

    const response = await Axios({

      ...SummaryApi.getAllTask(id),

    });

    const data = response.data;

    console.log("tasks data", data);

    if (data?.success) {

      // PROJECT STATE ME TASKS UPDATE
      setProject((prev) => ({
        ...prev,
        tasks: data.tasks,
      }));

    }

  } catch (error) {

    console.log(error);

    AxiosToastError(error);

  }
};

  // =========================
  // CREATE TASK
  // =========================

  const createTask = async (taskData) => {
    try {
      // VALIDATION
      if (!taskData.title) {
        toast.error("Title required");
        return;
      }

      const response = await Axios({
        ...SummaryApi.createTask,

        data: {
          ...taskData,
          projectId: id,
        },
      });

      const data = response.data;

      if (data?.success) {
        toast.success("Task created");

        // INSTANT UI UPDATE
        setProject((prev) => ({
          ...prev,
          tasks: [...(prev.tasks || []), data.task],
        }));

        // CLOSE MODAL
        setOpenModal(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // =========================
  // LOADING STATE
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
          PROJECT CARD
      ========================== */}

      <div className="mt-8 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">{project?.name}</h1>

        <p className="text-gray-500 mt-4 max-w-3xl">{project?.description}</p>

        <div className="flex flex-wrap gap-6 mt-8">
          {/* TOTAL TASKS */}

          <div className="bg-indigo-50 px-5 py-4 rounded-2xl flex items-center gap-3">
            <ListTodo className="text-indigo-600" />

            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>

              <h3 className="text-xl font-bold">
                {project?.tasks?.length || 0}
              </h3>
            </div>
          </div>

          {/* CREATED DATE */}

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
          HEADER
      ========================== */}

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition"
        >
          Add Task
        </button>
      </div>

      {/* =========================
          TASK LIST
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {project?.tasks?.length > 0 ? (
          project.tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* TOP */}
              <div>
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold text-gray-800 break-words">
                    {task.title}
                  </h3>

                  {/* STATUS DROPDOWN */}
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                    className={`text-sm px-3 py-2 rounded-xl border outline-none

                ${
                  task.status === "todo"
                    ? "bg-red-100 text-red-600 border-red-200"
                    : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                      : "bg-green-100 text-green-600 border-green-200"
                }
                `}
                  >
                    <option value="todo">Todo</option>

                    <option value="in-progress">In Progress</option>

                    <option value="done">Done</option>
                  </select>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-4 leading-relaxed break-words">
                  {task.description}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="mt-6">
                {/* ASSIGNED */}
                <div className="bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Assigned To
                  </p>

                  <span className="text-sm font-semibold text-gray-700 break-all">
                    {task.assignedTo || "Not Assigned"}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => handleEditTask(task)}
                    className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-3 rounded-2xl font-medium transition-all duration-300"
                  >
                    Edit Task
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-3 rounded-2xl font-medium transition-all duration-300"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-10 py-14 text-center max-w-lg w-full">
              <h2 className="text-3xl font-bold text-gray-800">
                No Tasks Found
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                You haven’t created any task yet. Start by adding your first
                task.
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300"
              >
                Create First Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================
          MODAL
      ========================== */}

      {openModal && (
        <TaskModelCreate
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onCreate={createTask}
        />
      )}
    </DashboardLayout>
  );
};

export default ProjectDetail;
