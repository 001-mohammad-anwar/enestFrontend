import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Navbar from "../components/dashbord/Navbar";

import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";

import AxiosToastError from "../utils/AxiosToastError";

const AllTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH ALL TASKS
  // =========================

  const fetchAllTasks = async () => {

    try {

      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getAllTasks,
      });

      const data = response.data;

      if (data?.success) {
        setTasks(data.tasks);
      }

    } catch (error) {

      console.log(error);

      AxiosToastError(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (

      <DashboardLayout>

        <Navbar />

        <div className="mt-10 text-center text-gray-500">
          Loading tasks...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <Navbar />

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            All Tasks
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all project tasks from one place
          </p>

        </div>

      </div>

      {/* =========================
          TASK GRID
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

        {
          tasks?.length > 0 ? (

            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800 break-words">
                      {task.title}
                    </h2>

                    {/* PROJECT NAME */}
                    <p className="text-sm text-indigo-600 font-medium mt-2">
                      Project : {task.projectId?.name}
                    </p>

                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap

                    ${
                      task.status === "todo"
                        ? "bg-red-100 text-red-600"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }
                    `}
                  >

                    {
                      task.status === "todo"
                        ? "Todo"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "Done"
                    }

                  </span>

                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-5 leading-relaxed">
                  {task.description}
                </p>

                {/* ASSIGNED */}
                <div className="mt-6 bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between">

                  <p className="text-sm text-gray-500">
                    Assigned To
                  </p>

                  <span className="text-sm font-semibold text-gray-700">
                    {task.assignedTo || "Not Assigned"}
                  </span>

                </div>

                {/* FOOTER */}
                <div className="mt-5 flex items-center justify-between">

                  <div>

                    <p className="text-xs text-gray-400">
                      Created
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {
                        new Date(task.createdAt)
                          .toLocaleDateString()
                      }
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">

                    <button
                      className="px-4 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium transition-all"
                    >
                      Edit
                    </button>

                    <button
                      className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium transition-all"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-full flex items-center justify-center py-20">

              <div className="bg-white border border-gray-100 rounded-3xl px-10 py-14 text-center max-w-lg w-full shadow-sm">

                <h2 className="text-3xl font-bold text-gray-800">
                  No Tasks Found
                </h2>

                <p className="text-gray-500 mt-3">
                  There are no tasks available right now.
                </p>

              </div>

            </div>

          )
        }

      </div>

    </DashboardLayout>
  );
};

export default AllTasks;