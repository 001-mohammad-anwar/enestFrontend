import CardProject from "../CardProject";

const ProjectGrid = ({ projects = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project) => (
          <CardProject
            key={project._id}
            _id={project._id}
            projectName={project.name}
            description={project.description}
            totalTasks={project.totalTasks}
            createdAt={project.createdAt}
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No projects found
        </p>
      )}

    </div>
  );
};

export default ProjectGrid;