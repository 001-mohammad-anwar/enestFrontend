import React from "react";

const TaskCard = ({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}) => {

  return (
    <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">

          <div>

            <h3 className="text-2xl font-bold text-gray-800 break-words">
              {task.title}
            </h3>

            {
              task.projectId?.name && (
                <p className="text-sm text-indigo-600 font-medium mt-2">
                  Project : {task.projectId.name}
                </p>
              )
            }

          </div>

          {/* STATUS */}
          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(task._id, e.target.value)
            }
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

            <option value="todo">
              Todo
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="done">
              Done
            </option>

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

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-5 flex-wrap gap-4">

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

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">

            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium transition-all duration-300"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="px-4 py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium transition-all duration-300"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;