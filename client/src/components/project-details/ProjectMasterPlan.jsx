import { Maximize2 } from "lucide-react";

function ProjectMasterPlan({ project }) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Master Plan
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Project Master Plan
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Explore the complete layout and planning of the project.
          </p>
        </div>

        {/* Master Plan */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

          {project?.masterPlan ? (
            <>
              <img
                src={project.masterPlan}
                alt={`${project?.name || "Project"} Master Plan`}
                className="max-h-[700px] w-full object-contain"
              />

              {/* Fullscreen Button */}
              <a
                href={project.masterPlan}
                target="_blank"
                rel="noreferrer"
                aria-label="View master plan"
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#0f172a]
                  shadow-lg
                  transition
                  hover:bg-[#0f172a]
                  hover:text-white
                "
              >
                <Maximize2 size={18} />
              </a>
            </>
          ) : (
            <div className="flex min-h-[350px] items-center justify-center sm:min-h-[450px]">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Maximize2
                    size={22}
                    className="text-[#c49438]"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-[#0f172a]">
                  Master plan will appear here
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Project master plan has not been uploaded yet.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default ProjectMasterPlan;