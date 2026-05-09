import React, { useState } from "react";

import { X } from "lucide-react";

import Axios from "../../utils/Axios";

import SummaryApi from "../../commonApi's/SummaryApi.js";

const CreateProjectModal = ({
  openModal,
  setOpenModal,
  fetchAllProject,
}) => {

  const [loading, setLoading] =
    useState(false);



  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });


   console.log("formdata",formData)
  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  // CREATE PROJECT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);



      const response = await Axios({

        ...SummaryApi.createProject,

        data: formData,
      });



      const data = response.data;



      console.log(
        "create project response",
        data
      );



      if (data?.success) {

        // REFRESH PROJECTS
        await fetchAllProject();



        // CLOSE MODAL
        setOpenModal(false);



        // RESET FORM
        setFormData({
          name: "",
          description: "",
        });
      }

    } catch (error) {

      console.log(
        "create project error",
        error
      );

    } finally {

      setLoading(false);
    }
  };



  // CLOSE MODAL
  if (!openModal) return null;



  return (

    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

      {/* MODAL */}
      <div className="bg-white w-full max-w-2xl rounded-[35px] p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition"
        >
          <X size={24} />
        </button>



        {/* HEADER */}
        <div>

          <h2 className="text-4xl font-bold text-gray-800">
            Create New Project 🚀
          </h2>

          <p className="text-gray-500 mt-3">
            Add your new project and start managing tasks.
          </p>
        </div>



        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* PROJECT NAME */}
          <div>

            <label className="text-sm font-semibold text-gray-700">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full mt-3 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>



          {/* DESCRIPTION */}
          <div>

            <label className="text-sm font-semibold text-gray-700">
              Project Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write project description..."
              className="w-full mt-3 border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>



          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>



            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold transition"
            >
              {
                loading
                  ? "Creating..."
                  : "Create Project"
              }
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;