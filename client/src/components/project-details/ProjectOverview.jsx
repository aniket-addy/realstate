import {
  Building2,
  MapPin,
  Ruler,
  ShieldCheck,
} from "lucide-react";

function ProjectOverview({ project }) {
  const details = [
    {
      icon: Building2,
      label: "Project Type",
      value: project?.propertyType || "Residential",
    },
    {
      icon: MapPin,
      label: "Location",
      value: project?.location || "Location",
    },
    {
      icon: Ruler,
      label: "Project Size",
      value: project?.projectSize || "Available on request",
    },
    {
      icon: ShieldCheck,
      label: "Project Status",
      value: project?.status || "Available",
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-white py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
              Project Overview
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#0f172a]">
              About {project?.name || "This Project"}
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              {project?.description ||
                "Detailed project information will be available here, including project highlights, location advantages, specifications and other important details."}
            </p>

          </div>

          {/* DETAILS */}

          <div className="grid grid-cols-2 gap-3">

            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >

                  <Icon
                    size={19}
                    className="text-[#c49438]"
                  />

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0f172a]">
                    {item.value}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProjectOverview;