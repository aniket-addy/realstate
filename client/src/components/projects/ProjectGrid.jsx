import ProjectCard from "./ProjectCard";
import ProjectEmptyState from "./ProjectEmptyState";

function ProjectGrid({
  projects,
}) {
  if (!projects.length) {
    return <ProjectEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {projects.map((project) => (
        <ProjectCard
          key={project._id || project.id}
          project={project}
        />
      ))}

    </div>
  );
}

export default ProjectGrid;