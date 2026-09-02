import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  ChevronDown,
  Eye,
  Filter,
  Loader2,
  Pencil,
  Plus,
  Search,
  Star,
  X,
} from "lucide-react";

import {
  getAuthorityProjects,
} from "../../services/authorityProjectService";


function AuthorityProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");


  // =========================================================
  // FETCH AUTHORITY PROJECTS
  // =========================================================

  const fetchAuthorityProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAuthorityProjects();

      const data =
        response?.data?.projects ||
        response?.data ||
        response?.projects ||
        [];

      setProjects(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Failed to fetch authority projects:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load authority projects."
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchAuthorityProjects();
  }, []);


  // =========================================================
  // HELPERS
  // =========================================================

  const getProjectName = (project) => {
    return (
      project?.name ||
      project?.projectName ||
      "Untitled Project"
    );
  };


  const getAuthorityName = (project) => {
    return (
      project?.authority ||
      project?.authorityName ||
      "—"
    );
  };


  const getLocation = (project) => {
    if (
      typeof project?.location === "string"
    ) {
      return project.location;
    }

    if (
      project?.location?.city &&
      project?.location?.state
    ) {
      return `${project.location.city}, ${project.location.state}`;
    }

    return (
      project?.city ||
      project?.address ||
      "—"
    );
  };


  const getStatus = (project) => {
    return project?.status || "active";
  };


  const isFeatured = (project) => {
    return Boolean(
      project?.featured ??
        project?.isFeatured
    );
  };


  const isNewProject = (project) => {
    return Boolean(
      project?.newProject ??
        project?.isNewProject
    );
  };


  // =========================================================
  // FILTER PROJECTS
  // =========================================================

  const filteredProjects = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return projects.filter((project) => {
      const projectName =
        getProjectName(project);

      const authorityName =
        getAuthorityName(project);

      const location =
        getLocation(project);

      const projectStatus =
        getStatus(project);


      const matchesSearch =
        !searchText ||
        projectName
          .toLowerCase()
          .includes(searchText) ||
        authorityName
          .toLowerCase()
          .includes(searchText) ||
        location
          .toLowerCase()
          .includes(searchText);


      const matchesStatus =
        status === "all" ||
        projectStatus.toLowerCase() ===
          status.toLowerCase();


      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    projects,
    search,
    status,
  ]);


  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (project) => {
    const id =
      project?._id ||
      project?.id;

    if (!id) return;

    navigate(
      `/admin/authority-projects/edit/${id}`
    );
  };


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (project) => {
    const id =
      project?._id ||
      project?.id;

    if (!id) return;

    navigate(
      `/admin/authority-projects/view/${id}`
    );
  };


  // =========================================================
  // ADD
  // =========================================================

  const handleAdd = () => {
    navigate(
      "/admin/authority-projects/add"
    );
  };


  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-full bg-slate-50">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8f0df] text-[#b88b32]">
                  <Building2
                    size={17}
                    strokeWidth={1.8}
                  />
                </span>

                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b88b32]">
                  Project Management
                </span>

              </div>


              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Authority Projects
              </h1>


              <p className="mt-1 text-sm text-slate-500">
                Manage all authority-led real estate projects.
              </p>

            </div>


            <button
              type="button"
              onClick={handleAdd}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-950
                px-5
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-slate-800
              "
            >
              <Plus size={17} />
              Add Authority Project
            </button>

          </div>

        </div>
      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="px-6 py-6 lg:px-8">


        {/* ===================================================
            FILTER BAR
        ==================================================== */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">


            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search authority projects..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-10
                  text-sm
                  font-medium
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                "
              />


              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                >
                  <X size={15} />
                </button>
              )}

            </div>


            {/* STATUS */}

            <div className="relative w-full lg:w-[190px]">

              <Filter
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  h-11
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-10
                  pr-9
                  text-sm
                  font-semibold
                  text-slate-700
                  outline-none
                  transition
                  focus:border-[#d6a84f]
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                "
              >

                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="upcoming">
                  Upcoming
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>


              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

            </div>

          </div>

        </div>


        {/* ===================================================
            PROJECT COUNT
        ==================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-sm font-extrabold text-slate-900">
              All Authority Projects
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}{" "}
              found
            </p>

          </div>


          {(search || status !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
              className="
                text-xs
                font-bold
                text-[#b88b32]
                hover:underline
              "
            >
              Clear filters
            </button>
          )}

        </div>


        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

            <div className="flex flex-col items-center gap-3">

              <Loader2
                size={28}
                className="animate-spin text-[#b88b32]"
              />

              <p className="text-sm font-medium text-slate-500">
                Loading authority projects...
              </p>

            </div>

          </div>
        )}


        {/* ===================================================
            ERROR
        ==================================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <p className="text-sm font-bold text-red-700">
              {error}
            </p>


            <button
              type="button"
              onClick={fetchAuthorityProjects}
              className="
                mt-3
                rounded-lg
                bg-white
                px-4
                py-2
                text-xs
                font-bold
                text-red-700
                shadow-sm
                ring-1
                ring-red-200
                hover:bg-red-50
              "
            >
              Try Again
            </button>

          </div>
        )}


        {/* ===================================================
            TABLE
        ==================================================== */}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="border-b border-slate-200 bg-slate-50/80">

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Project
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Authority
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Location
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Visibility
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredProjects.map(
                    (project) => {

                      const projectStatus =
                        getStatus(project);

                      const id =
                        project?._id ||
                        project?.id;

                      return (
                        <tr
                          key={id}
                          className="transition hover:bg-slate-50/60"
                        >


                          {/* PROJECT */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                                {project?.image ? (
                                  <img
                                    src={project.image}
                                    alt={getProjectName(
                                      project
                                    )}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <Building2
                                    size={19}
                                    className="text-slate-400"
                                  />
                                )}

                              </div>


                              <div className="min-w-0">

                                <p className="truncate text-sm font-extrabold text-slate-900">
                                  {getProjectName(
                                    project
                                  )}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  Authority Project
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* AUTHORITY */}

                          <td className="px-5 py-4">

                            <span className="text-sm font-semibold text-slate-700">
                              {getAuthorityName(
                                project
                              )}
                            </span>

                          </td>


                          {/* LOCATION */}

                          <td className="px-5 py-4">

                            <span className="text-sm font-medium text-slate-600">
                              {getLocation(project)}
                            </span>

                          </td>


                          {/* VISIBILITY */}

                          <td className="px-5 py-4">

                            <div className="flex flex-wrap gap-1.5">

                              {isFeatured(project) && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf4e5] px-2.5 py-1 text-[10px] font-bold text-[#a47723]">

                                  <Star
                                    size={11}
                                    fill="currentColor"
                                  />

                                  Featured

                                </span>
                              )}


                              {isNewProject(project) && (
                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                  New
                                </span>
                              )}


                              {!isFeatured(project) &&
                                !isNewProject(project) && (
                                  <span className="text-xs text-slate-400">
                                    —
                                  </span>
                                )}

                            </div>

                          </td>


                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <span
                              className={`
                                inline-flex
                                rounded-full
                                px-2.5
                                py-1
                                text-[10px]
                                font-extrabold
                                capitalize
                                ${
                                  projectStatus.toLowerCase() ===
                                  "active"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : projectStatus.toLowerCase() ===
                                      "upcoming"
                                    ? "bg-blue-50 text-blue-600"
                                    : projectStatus.toLowerCase() ===
                                      "completed"
                                    ? "bg-purple-50 text-purple-600"
                                    : "bg-slate-100 text-slate-500"
                                }
                              `}
                            >
                              {projectStatus}
                            </span>

                          </td>


                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <div className="flex items-center justify-end gap-1.5">

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(project)
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition
                                  hover:bg-slate-100
                                  hover:text-slate-800
                                "
                                title="View Project"
                              >
                                <Eye size={16} />
                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(project)
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition
                                  hover:bg-[#fbf4e5]
                                  hover:text-[#b88b32]
                                "
                                title="Edit Project"
                              >
                                <Pencil size={16} />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>


            {/* =================================================
                MOBILE CARDS
            ================================================== */}

            <div className="divide-y divide-slate-100 lg:hidden">

              {filteredProjects.map(
                (project) => {

                  const projectStatus =
                    getStatus(project);

                  return (
                    <div
                      key={
                        project?._id ||
                        project?.id
                      }
                      className="p-4"
                    >

                      <div className="flex gap-3">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                          {project?.image ? (
                            <img
                              src={project.image}
                              alt={getProjectName(
                                project
                              )}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Building2
                              size={21}
                              className="text-slate-400"
                            />
                          )}

                        </div>


                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div>

                              <h3 className="truncate text-sm font-extrabold text-slate-900">
                                {getProjectName(
                                  project
                                )}
                              </h3>

                              <p className="mt-1 text-xs text-slate-400">
                                {getAuthorityName(
                                  project
                                )}
                              </p>

                            </div>


                            <span
                              className={`
                                shrink-0
                                rounded-full
                                px-2
                                py-1
                                text-[9px]
                                font-extrabold
                                capitalize
                                ${
                                  projectStatus.toLowerCase() ===
                                  "active"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : projectStatus.toLowerCase() ===
                                      "upcoming"
                                    ? "bg-blue-50 text-blue-600"
                                    : projectStatus.toLowerCase() ===
                                      "completed"
                                    ? "bg-purple-50 text-purple-600"
                                    : "bg-slate-100 text-slate-500"
                                }
                              `}
                            >
                              {projectStatus}
                            </span>

                          </div>


                          <p className="mt-2 text-xs font-medium text-slate-500">
                            {getLocation(project)}
                          </p>


                          <div className="mt-3 flex items-center justify-between">

                            <div className="flex gap-1.5">

                              {isFeatured(project) && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf4e5] px-2 py-1 text-[9px] font-bold text-[#a47723]">

                                  <Star
                                    size={10}
                                    fill="currentColor"
                                  />

                                  Featured

                                </span>
                              )}


                              {isNewProject(project) && (
                                <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                                  New
                                </span>
                              )}

                            </div>


                            <div className="flex gap-1">

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(project)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                              >
                                <Eye size={15} />
                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(project)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#fbf4e5] hover:text-[#b88b32]"
                              >
                                <Pencil size={15} />
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {filteredProjects.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Building2 size={24} />
                </div>


                <h3 className="mt-4 text-sm font-extrabold text-slate-900">
                  No authority projects found
                </h3>


                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  {search || status !== "all"
                    ? "Try changing your search or filters."
                    : "Start by adding your first authority project."}
                </p>


                {!search &&
                  status === "all" && (
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-950
                        px-4
                        py-2.5
                        text-xs
                        font-bold
                        text-white
                        hover:bg-slate-800
                      "
                    >
                      <Plus size={15} />
                      Add Authority Project
                    </button>
                  )}

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}


export default AuthorityProjects;