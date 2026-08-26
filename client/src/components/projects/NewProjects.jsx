import SectionHeader from "../common/SectionHeader";
import LoadingCard from "../common/LoadingCard";
import EmptyState from "../common/EmptyState";

import ProjectCard from "./ProjectCard";

import useNewProjects from "../../hooks/useNewProjects";

function NewProjects() {
  const {
    projects,
    loading,
    error,
  } = useNewProjects();

  return (
    <section className="site-section bg-background">

      <div className="container-site">

        <SectionHeader
          title="New Projects"
          description="Discover the latest launches and future-ready spaces."
          buttonText="View All Projects"
        />

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-status-danger/20 bg-status-danger/5 px-4 py-3">
            <p className="text-sm text-status-danger">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}

          </div>
        )}

        {/* API Data */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {projects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project._id || project.id}
                project={project}
              />
            ))}

          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <EmptyState
            message="No new projects available."
          />
        )}

      </div>

    </section>
  );
}

export default NewProjects;