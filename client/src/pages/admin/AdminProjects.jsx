import {
  Building2,
  ChevronDown,
  Edit3,
  FolderKanban,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import useProjects from "../../hooks/useProjects";

function AdminProjects() {
  const {
    projects,
    loading,
    error,
    removeProject,
  } = useProjects();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | FILTER PROJECTS
  |--------------------------------------------------------------------------
  */

  const filteredProjects = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return projects.filter((project) => {
      const name =
        project?.name ||
        project?.projectName ||
        "";

      const location =
        project?.location ||
        project?.city ||
        "";

      const projectCategory =
        project?.category ||
        project?.projectCategory ||
        project?.type ||
        "";

      const matchesSearch =
        !searchValue ||
        name
          .toLowerCase()
          .includes(searchValue) ||
        location
          .toLowerCase()
          .includes(searchValue);

      const normalizedCategory =
        projectCategory.toLowerCase();

      const matchesCategory =
        category === "all" ||
        normalizedCategory ===
          category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [projects, search, category]);

  /*
  |--------------------------------------------------------------------------
  | DELETE PROJECT
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await removeProject(id);
      setDeleteId(null);
    } catch (err) {
      console.error(
        "Delete project failed:",
        err
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const getProjectId = (project) =>
    project?._id || project?.id;

  const getProjectName = (project) =>
    project?.name ||
    project?.projectName ||
    "Untitled Project";

  const getLocation = (project) =>
    project?.location ||
    project?.city ||
    project?.address ||
    "Location not added";

  const getCategory = (project) =>
    project?.category ||
    project?.projectCategory ||
    project?.type ||
    "—";

  const getStatus = (project) =>
    project?.status ||
    "active";

  const getImage = (project) => {
    if (
      Array.isArray(project?.images) &&
      project.images.length > 0
    ) {
      const firstImage =
        project.images[0];

      if (
        typeof firstImage ===
        "string"
      ) {
        return firstImage;
      }

      return (
        firstImage?.url ||
        firstImage?.src ||
        ""
      );
    }

    return (
      project?.image ||
      project?.coverImage ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <FolderKanban
                    size={17}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b88b32]">
                    Admin Panel
                  </p>

                  <h1 className="mt-0.5 text-xl font-extrabold tracking-tight text-slate-950">
                    Projects
                  </h1>
                </div>
              </div>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">
                Manage authority and builder
                projects displayed across the
                website.
              </p>
            </div>

            <Link
              to="/admin/add-property"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus size={15} />

              Add New Project
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================================================
            STATS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* TOTAL */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Projects
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {projects.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Building2 size={18} />
              </div>
            </div>
          </div>

          {/* AUTHORITY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Authority Projects
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {
                    projects.filter(
                      (project) =>
                        (
                          project?.category ||
                          project?.projectCategory ||
                          project?.type ||
                          ""
                        )
                          .toLowerCase()
                          .includes("authority")
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f0e2] text-[#b88b32]">
                <ShieldCheck size={18} />
              </div>
            </div>
          </div>

          {/* BUILDER */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Builder Projects
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {
                    projects.filter(
                      (project) =>
                        (
                          project?.category ||
                          project?.projectCategory ||
                          project?.type ||
                          ""
                        )
                          .toLowerCase()
                          .includes("builder")
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Building2 size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            TOOLBAR
        ==================================================== */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search projects..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:bg-white"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="h-10 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-xs font-bold text-slate-700 outline-none focus:border-[#d6a84f]"
              >
                <option value="all">
                  All Projects
                </option>

                <option value="authority">
                  Authority Projects
                </option>

                <option value="builder">
                  Builder Projects
                </option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ===================================================
            PROJECT TABLE
        ==================================================== */}

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* TABLE HEADER */}

          <div className="hidden grid-cols-[minmax(280px,2fr)_1fr_1fr_120px_100px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 lg:grid">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Project
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Category
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Location
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Status
            </span>

            <span className="text-right text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Actions
            </span>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

              <p className="mt-3 text-xs font-medium text-slate-500">
                Loading projects...
              </p>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            filteredProjects.length ===
              0 && (
              <div className="px-5 py-14 text-center">
                <FolderKanban
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-bold text-slate-600">
                  No projects found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or
                  filter.
                </p>
              </div>
            )}

          {/* PROJECTS */}

          {!loading &&
            filteredProjects.length > 0 && (
              <div>
                {filteredProjects.map(
                  (project) => {
                    const id =
                      getProjectId(
                        project
                      );

                    const image =
                      getImage(project);

                    return (
                      <div
                        key={id}
                        className="border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5"
                      >
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,2fr)_1fr_1fr_120px_100px] lg:items-center lg:gap-4">
                          {/* PROJECT */}

                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {image ? (
                                <img
                                  src={image}
                                  alt={getProjectName(
                                    project
                                  )}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-300">
                                  <Building2
                                    size={20}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xs font-extrabold text-slate-800">
                                {getProjectName(
                                  project
                                )}
                              </h3>

                              <p className="mt-1 truncate text-[10px] text-slate-400">
                                ID:{" "}
                                {id || "—"}
                              </p>
                            </div>
                          </div>

                          {/* CATEGORY */}

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 lg:hidden">
                              Category
                            </span>

                            <p className="mt-1 text-xs font-semibold capitalize text-slate-700 lg:mt-0">
                              {getCategory(
                                project
                              )}
                            </p>
                          </div>

                          {/* LOCATION */}

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 lg:hidden">
                              Location
                            </span>

                            <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-600 lg:mt-0">
                              {getLocation(
                                project
                              )}
                            </p>
                          </div>

                          {/* STATUS */}

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 lg:hidden">
                              Status
                            </span>

                            <div className="mt-1 lg:mt-0">
                              <span
                                className={`
                                  inline-flex
                                  rounded-full
                                  px-2.5
                                  py-1
                                  text-[9px]
                                  font-extrabold
                                  uppercase
                                  tracking-wide
                                  ${
                                    getStatus(
                                      project
                                    )
                                      .toLowerCase() ===
                                    "active"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-slate-100 text-slate-500"
                                  }
                                `}
                              >
                                {getStatus(
                                  project
                                )}
                              </span>
                            </div>
                          </div>

                          {/* ACTIONS */}

                          <div className="flex items-center gap-2 lg:justify-end">
                            <Link
                              to={`/admin/edit-property/${id}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#d6a84f] hover:text-[#b88b32]"
                              title="Edit"
                            >
                              <Edit3
                                size={13}
                              />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteId(
                                  id
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                              title="Delete"
                            >
                              <Trash2
                                size={13}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
        </div>
      </main>

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-base font-extrabold text-slate-950">
              Delete Project?
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              This action cannot be undone. The
              project will be removed from the
              admin list.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="h-9 rounded-lg border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(deleteId)
                }
                disabled={loading}
                className="h-9 rounded-lg bg-red-500 px-4 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjects;