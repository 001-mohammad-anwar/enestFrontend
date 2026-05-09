import React, { useState } from "react";

const TaskModelCreate = ({ isOpen, onClose, onCreate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) return;

    onCreate(task);

    setTask({
      title: "",
      description: "",
      assignedTo: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assign To"
            value={task.assignedTo}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
            >
              Create
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModelCreate;