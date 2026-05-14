import React from "react";
import { FolderKanban, ArrowRight } from "lucide-react";

const SelectProjectModal = ({ open, onClose, projects }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-2xl rounded-[32px] p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Select Project
            </h2>

            <p className="text-gray-500 mt-2">
              Choose a project to view all related tasks
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-xl"
          >
            ✕
          </button>

        </div>

        {/* PROJECT LIST */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">

          {
            projects?.length > 0 ? (

              projects.map((project) => (

                <a
                  key={project._id}
                  href={`/tasks/${project._id}`}
                  className="group bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-3xl p-5 flex items-center justify-between transition-all duration-300"
                >

                  {/* LEFT */}
                  <div className="flex items-start gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <FolderKanban size={28} />
                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition">
                        {project.name}
                      </h3>

                      <p className="text-gray-500 mt-1 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-3 mt-3 flex-wrap">

                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 border">
                          {project.tasks?.length || 0} Tasks
                        </span>

                        <span className="text-sm text-gray-400">
                          {
                            new Date(project.createdAt)
                              .toLocaleDateString()
                          }
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="hidden sm:flex items-center gap-2 text-indigo-600 font-semibold">

                    Open

                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition"
                    />

                  </div>

                </a>

              ))

            ) : (

              <div className="py-20 text-center">

                <h3 className="text-2xl font-bold text-gray-800">
                  No Projects Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Create a project first to manage tasks.
                </p>

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
};

export default SelectProjectModal;