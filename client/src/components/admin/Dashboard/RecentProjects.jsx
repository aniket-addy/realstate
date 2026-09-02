import {
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

function RecentProjects({ projects = [] }) {
  const defaultProjects = [
    {
      id: "1",
      name: "Yamuna Expressway Project",
      location: "Greater Noida, Uttar Pradesh",
      type: "Authority Project",
      status: "Active",
      date: "31 Aug 2026",
    },
    {
      id: "2",
      name: "Dholera Smart City",
      location: "Dholera, Gujarat",
      type: "Authority Project",
      status: "Active",
      date: "29 Aug 2026",
    },
    {
      id: "3",
      name: "Premium Heights",
      location: "Noida, Uttar Pradesh",
      type: "Builder Project",
      status: "Active",
      date: "27 Aug 2026",
    },
    {
      id: "4",
      name: "Green Valley Residency",
      location: "Greater Noida, Uttar Pradesh",
      type: "Builder Project",
      status: "Draft",
      date: "25 Aug 2026",
    },
  ];

  const projectList =
    projects.length > 0 ? projects : defaultProjects;

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-200
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2 className="text-base font-extrabold text-slate-950">
            Recent Projects
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Recently added and updated projects
          </p>
        </div>

        <Link
          to="/admin/projects"
          className="
            group
            inline-flex
            w-fit
            items-center
            gap-1.5
            text-xs
            font-bold
            text-[#b88b32]
            transition
            hover:text-[#9a7428]
          "
        >
          View All

          <ArrowRight
            size={14}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* PROJECT LIST */}
      <div className="divide-y divide-slate-100">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="
              group
              flex
              flex-col
              gap-4
              px-5
              py-4
              transition
              hover:bg-slate-50
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* LEFT */}
            <div className="flex min-w-0 items-start gap-3">
              {/* ICON */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#f7f0e2]
                  text-[#b88b32]
                "
              >
                <Building2
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              {/* INFO */}
              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-slate-900
                  "
                >
                  {project.name}
                </h3>

                <div
                  className="
                    mt-1.5
                    flex
                    flex-wrap
                    items-center
                    gap-x-3
                    gap-y-1.5
                  "
                >
                  {/* LOCATION */}
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      text-[11px]
                      text-slate-500
                    "
                  >
                    <MapPin size={12} />

                    {project.location}
                  </span>

                  {/* TYPE */}
                  <span
                    className="
                      rounded-full
                      bg-slate-100
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      text-slate-600
                    "
                  >
                    {project.type}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                pl-[52px]
                sm:justify-end
                sm:pl-0
              "
            >
              {/* DATE */}
              <div
                className="
                  hidden
                  items-center
                  gap-1.5
                  text-[11px]
                  text-slate-400
                  md:flex
                "
              >
                <CalendarDays size={13} />

                {project.date}
              </div>

              {/* STATUS */}
              <span
                className={`
                  inline-flex
                  items-center
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  ${
                    project.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : project.status === "Draft"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-slate-100 text-slate-500"
                  }
                `}
              >
                {project.status}
              </span>

              {/* ARROW */}
              <Link
                to={`/projects/${project.id}`}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  text-slate-400
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#f7f0e2]
                  hover:text-[#b88b32]
                "
                aria-label={`View ${project.name}`}
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {projectList.length === 0 && (
        <div className="px-5 py-12 text-center">
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
            "
          >
            <Building2 size={20} />
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-900">
            No projects found
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Recently added projects will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentProjects;