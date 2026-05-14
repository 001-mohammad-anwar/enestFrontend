import React, { useState } from "react";

const TaskModelCreate = ({ isOpen, onClose, onCreate }) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "todo",
  });

  const [error, setError] = useState("");

  // CLOSE MODAL
  if (!isOpen) return null;

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (!task.title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!task.description.trim()) {
      setError("Task description is required");
      return;
    }

    // CLEAR ERROR
    setError("");

    // SEND DATA TO PARENT
    onCreate(task);

    // RESET FORM
    setTask({
      title: "",
      description: "",
      assignedTo: "",
      status: "todo",
    });

    // CLOSE MODAL
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Create Task</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TASK TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter task description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* ASSIGNED TO */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Assigned Tooooo
            </label>

            <input
              type="text"
              name="assignedTo"
              placeholder="Assign task to someone"
              value={task.assignedTo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Task Status
            </label>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="todo">Todo</option>

              <option value="in-progress">In Progress</option>

              <option value="done">Done</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModelCreate;
