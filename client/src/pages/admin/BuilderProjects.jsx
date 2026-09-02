import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  ChevronRight,
  Edit3,
  Eye,
  Filter,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import useBuilderProjects from "../../hooks/useBuilderProjects";


/*
|--------------------------------------------------------------------------
| BUILDER PROJECTS - ADMIN
|--------------------------------------------------------------------------
| Manage all builder / developer projects.
|--------------------------------------------------------------------------
*/

function BuilderProjects() {
  const navigate = useNavigate();

  const {
    projects,
    loading,
    error,
    fetchProjects,
    removeProject,
  } = useBuilderProjects({
    autoFetch: true,
  });


  // =========================================================
  // LOCAL FILTER STATE
  // =========================================================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);


  // =========================================================
  // FILTER PROJECTS
  // =========================================================

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project?.name
          ?.toLowerCase()
          .includes(query) ||
        project?.developer
          ?.toLowerCase()
          .includes(query) ||
        project?.city
          ?.toLowerCase()
          .includes(query) ||
        project?.location
          ?.toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "all" ||
        project?.projectCategory === category;

      const matchesStatus =
        status === "all" ||
        project?.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    projects,
    search,
    category,
    status,
  ]);


  // =========================================================
  // DELETE PROJECT
  // =========================================================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      await removeProject(deleteId);

      setDeleteId(null);
    } catch (err) {
      console.error(
        "Failed to delete builder project:",
        err
      );
    } finally {
      setDeleting(false);
    }
  };


  // =========================================================
  // STATUS LABEL
  // =========================================================

  const getStatusLabel = (value) => {
    switch (value) {
      case "active":
        return "Active";

      case "upcoming":
        return "Upcoming";

      case "completed":
        return "Completed";

      case "inactive":
        return "Inactive";

      default:
        return value || "—";
    }
  };


  // =========================================================
  // CATEGORY LABEL
  // =========================================================

  const getCategoryLabel = (value) => {
    switch (value) {
      case "residential":
        return "Residential";

      case "commercial":
        return "Commercial";

      case "plot":
        return "Plot";

      case "mixed":
        return "Mixed";

      default:
        return "—";
    }
  };


  // =========================================================
  // STATUS STYLES
  // =========================================================

  const getStatusClasses = (value) => {
    switch (value) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "upcoming":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };


  // =========================================================
  // VISIBILITY
  // =========================================================

  const getVisibility = (project) => {
    if (project?.published === false) {
      return {
        label: "Hidden",
        classes:
          "bg-slate-100 text-slate-600 border-slate-200",
      };
    }

    return {
      label: "Published",
      classes:
        "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
  };


  return (
    <div className="min-h-full bg-[#f3f7fb]">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="bg-white border-b border-[#dfe7f0]">

        <div className="px-7 py-7">

          <div className="flex items-center justify-between gap-6">

            {/* LEFT */}

            <div className="flex items-start gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#f8f1df]
                  text-[#c7952d]
                "
              >
                <Building2 size={21} strokeWidth={1.8} />
              </div>

              <div>

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#c7952d]
                    "
                  >
                    PROJECT MANAGEMENT
                  </span>

                </div>

                <h1
                  className="
                    text-[30px]
                    font-bold
                    leading-tight
                    tracking-[-0.03em]
                    text-[#07112b]
                  "
                >
                  Builder Projects
                </h1>

                <p
                  className="
                    mt-1
                    text-[15px]
                    text-[#7083a0]
                  "
                >
                  Manage all builder and developer projects.
                </p>

              </div>

            </div>


            {/* ADD BUTTON */}

            <button
              type="button"
              onClick={() =>
                navigate("/admin/builder-projects/add")
              }
              className="
                inline-flex
                h-12
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-[#070c22]
                px-5
                text-[15px]
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#101735]
                active:scale-[0.98]
              "
            >
              <Plus size={19} />
              Add Builder Project
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="px-7 py-7">

        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (
          <div
            className="
              mb-5
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={() => fetchProjects()}
              className="
                rounded-lg
                bg-white
                px-3
                py-1.5
                font-semibold
                text-red-700
                shadow-sm
                ring-1
                ring-red-200
              "
            >
              Retry
            </button>

          </div>
        )}


        {/* ===================================================
            SEARCH / FILTER CARD
        ==================================================== */}

        <div
          className="
            rounded-2xl
            border
            border-[#dce5ef]
            bg-white
            p-4
            shadow-[0_2px_5px_rgba(15,23,42,0.06)]
          "
        >

          <div
            className="
              grid
              grid-cols-1
              gap-3
              lg:grid-cols-[1.2fr_1fr_1fr]
            "
          >

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={19}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#91a3bb]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search project, developer, city..."
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-[#dce5ef]
                  bg-white
                  pl-11
                  pr-10
                  text-[15px]
                  text-[#14213d]
                  outline-none
                  transition
                  placeholder:text-[#9aabc0]
                  focus:border-[#aebed0]
                  focus:ring-2
                  focus:ring-[#e9eef5]
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-[#8fa0b7]
                    hover:bg-[#f3f6fa]
                  "
                >
                  <X size={17} />
                </button>
              )}

            </div>


            {/* CATEGORY */}

            <div className="relative">

              <Filter
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#91a3bb]
                "
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  h-14
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-[#dce5ef]
                  bg-white
                  pl-11
                  pr-10
                  text-[15px]
                  text-[#14213d]
                  outline-none
                  transition
                  focus:border-[#aebed0]
                  focus:ring-2
                  focus:ring-[#e9eef5]
                "
              >

                <option value="all">
                  All Categories
                </option>

                <option value="residential">
                  Residential
                </option>

                <option value="commercial">
                  Commercial
                </option>

                <option value="plot">
                  Plot
                </option>

                <option value="mixed">
                  Mixed
                </option>

              </select>

              <ChevronRight
                size={17}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  rotate-90
                  text-[#91a3bb]
                "
              />

            </div>


            {/* STATUS */}

            <div className="relative">

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  h-14
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-[#dce5ef]
                  bg-white
                  px-4
                  pr-10
                  text-[15px]
                  text-[#14213d]
                  outline-none
                  transition
                  focus:border-[#aebed0]
                  focus:ring-2
                  focus:ring-[#e9eef5]
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

              <ChevronRight
                size={17}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  rotate-90
                  text-[#91a3bb]
                "
              />

            </div>

          </div>

        </div>


        {/* ===================================================
            LIST HEADER
        ==================================================== */}

        <div className="mb-3 mt-7">

          <h2
            className="
              text-[17px]
              font-bold
              text-[#07112b]
            "
          >
            All Builder Projects
          </h2>

          <p
            className="
              mt-0.5
              text-[13px]
              text-[#8ba0ba]
            "
          >
            {loading
              ? "Loading projects..."
              : `${filteredProjects.length} ${
                  filteredProjects.length === 1
                    ? "project"
                    : "projects"
                } found`}
          </p>

        </div>


        {/* ===================================================
            PROJECT TABLE
        ==================================================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#dce5ef]
            bg-white
            shadow-[0_2px_5px_rgba(15,23,42,0.05)]
          "
        >

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="min-w-[1050px] w-full">

              <thead>

                <tr
                  className="
                    border-b
                    border-[#dce5ef]
                    bg-[#fbfcfe]
                  "
                >

                  <th className="px-6 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Project
                  </th>

                  <th className="px-5 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Developer
                  </th>

                  <th className="px-5 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Category
                  </th>

                  <th className="px-5 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Location
                  </th>

                  <th className="px-5 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Status
                  </th>

                  <th className="px-5 py-5 text-left text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Visibility
                  </th>

                  <th className="px-6 py-5 text-right text-[12px] font-bold uppercase tracking-wide text-[#8093ad]">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* =================================================
                    LOADING
                ================================================== */}

                {loading && (
                  <tr>

                    <td
                      colSpan="7"
                      className="px-6 py-20"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <Loader2
                          size={30}
                          className="animate-spin text-[#c7952d]"
                        />

                        <p
                          className="
                            mt-4
                            text-sm
                            font-medium
                            text-[#7083a0]
                          "
                        >
                          Loading builder projects...
                        </p>

                      </div>

                    </td>

                  </tr>
                )}


                {/* =================================================
                    EMPTY
                ================================================== */}

                {!loading &&
                  filteredProjects.length === 0 && (
                    <tr>

                      <td
                        colSpan="7"
                        className="px-6 py-20"
                      >

                        <div className="flex flex-col items-center justify-center text-center">

                          <div
                            className="
                              flex
                              h-16
                              w-16
                              items-center
                              justify-center
                              rounded-2xl
                              bg-[#f2f6fa]
                              text-[#9aaabd]
                            "
                          >
                            <Building2 size={28} />
                          </div>

                          <h3
                            className="
                              mt-5
                              text-[16px]
                              font-bold
                              text-[#14213d]
                            "
                          >
                            No builder projects found
                          </h3>

                          <p
                            className="
                              mt-1
                              text-[14px]
                              text-[#91a3bb]
                            "
                          >
                            {search ||
                            category !== "all" ||
                            status !== "all"
                              ? "Try changing your search or filters."
                              : "Add a builder project to get started."}
                          </p>

                          {!search &&
                            category === "all" &&
                            status === "all" && (
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    "/admin/builder-projects/add"
                                  )
                                }
                                className="
                                  mt-6
                                  inline-flex
                                  h-11
                                  items-center
                                  gap-2
                                  rounded-xl
                                  bg-[#070c22]
                                  px-5
                                  text-sm
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-[#101735]
                                "
                              >
                                <Plus size={18} />
                                Add Builder Project
                              </button>
                            )}

                        </div>

                      </td>

                    </tr>
                  )}


                {/* =================================================
                    PROJECT ROWS
                ================================================== */}

                {!loading &&
                  filteredProjects.map((project) => {

                    const visibility =
                      getVisibility(project);

                    return (
                      <tr
                        key={project._id}
                        className="
                          border-b
                          border-[#edf1f5]
                          last:border-b-0
                          transition
                          hover:bg-[#fbfcfe]
                        "
                      >

                        {/* PROJECT */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                h-12
                                w-12
                                shrink-0
                                overflow-hidden
                                rounded-xl
                                bg-[#eef3f8]
                              "
                            >

                              {project?.image ? (
                                <img
                                  src={project.image}
                                  alt={project?.name || "Project"}
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                  "
                                />
                              ) : (
                                <div
                                  className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    text-[#8fa2ba]
                                  "
                                >
                                  <Building2 size={21} />
                                </div>
                              )}

                            </div>

                            <div className="min-w-0">

                              <p
                                className="
                                  max-w-[220px]
                                  truncate
                                  text-[14px]
                                  font-bold
                                  text-[#14213d]
                                "
                              >
                                {project?.name || "Untitled Project"}
                              </p>

                              {project?.price && (
                                <p
                                  className="
                                    mt-1
                                    text-[12px]
                                    text-[#8fa0b7]
                                  "
                                >
                                  {project.price}
                                </p>
                              )}

                            </div>

                          </div>

                        </td>


                        {/* DEVELOPER */}

                        <td className="px-5 py-5">

                          <span
                            className="
                              text-[14px]
                              font-medium
                              text-[#425675]
                            "
                          >
                            {project?.developer || "—"}
                          </span>

                        </td>


                        {/* CATEGORY */}

                        <td className="px-5 py-5">

                          <span
                            className="
                              inline-flex
                              rounded-lg
                              bg-[#f4f7fa]
                              px-3
                              py-1.5
                              text-[12px]
                              font-semibold
                              text-[#536983]
                            "
                          >
                            {getCategoryLabel(
                              project?.projectCategory
                            )}
                          </span>

                        </td>


                        {/* LOCATION */}

                        <td className="px-5 py-5">

                          <div className="max-w-[180px]">

                            <p
                              className="
                                truncate
                                text-[14px]
                                font-medium
                                text-[#425675]
                              "
                            >
                              {project?.city ||
                                project?.location ||
                                "—"}
                            </p>

                            {project?.state && (
                              <p
                                className="
                                  mt-0.5
                                  truncate
                                  text-[11px]
                                  text-[#9aabc0]
                                "
                              >
                                {project.state}
                              </p>
                            )}

                          </div>

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-5">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-[11px]
                              font-bold
                              ${getStatusClasses(
                                project?.status
                              )}
                            `}
                          >
                            {getStatusLabel(
                              project?.status
                            )}
                          </span>

                        </td>


                        {/* VISIBILITY */}

                        <td className="px-5 py-5">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-[11px]
                              font-bold
                              ${visibility.classes}
                            `}
                          >
                            {visibility.label}
                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex items-center justify-end gap-2">

                            {/* VIEW */}

                            <button
                              type="button"
                              title="View Project"
                              onClick={() =>
                                navigate(
                                  `/projects/${project._id}`
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-[#dce5ef]
                                bg-white
                                text-[#7083a0]
                                transition
                                hover:border-[#c4d1df]
                                hover:bg-[#f5f8fb]
                                hover:text-[#14213d]
                              "
                            >
                              <Eye size={17} />
                            </button>


                            {/* EDIT */}

                            <button
                              type="button"
                              title="Edit Project"
                              onClick={() =>
                                navigate(
                                  `/admin/builder-projects/edit/${project._id}`
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-[#dce5ef]
                                bg-white
                                text-[#7083a0]
                                transition
                                hover:border-[#d5bd82]
                                hover:bg-[#fbf7ed]
                                hover:text-[#a87817]
                              "
                            >
                              <Edit3 size={16} />
                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              title="Delete Project"
                              onClick={() =>
                                setDeleteId(
                                  project._id
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-[#f0d9d9]
                                bg-white
                                text-[#bd7373]
                                transition
                                hover:bg-[#fff5f5]
                                hover:text-[#b33f3f]
                              "
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

              </tbody>

            </table>

          </div>

        </div>

      </main>


      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {deleteId && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#07112b]/40
            px-4
            backdrop-blur-[2px]
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setDeleteId(null);
            }
          }}
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-[#dce5ef]
              bg-white
              p-6
              shadow-2xl
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <Trash2 size={21} />
            </div>

            <h3
              className="
                mt-5
                text-xl
                font-bold
                text-[#07112b]
              "
            >
              Delete Builder Project?
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#7083a0]
              "
            >
              This project will be permanently removed.
              This action cannot be undone.
            </p>


            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteId(null)
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-[#dce5ef]
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-[#526680]
                  transition
                  hover:bg-[#f7f9fb]
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#b33f3f]
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#993434]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {deleting && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                Delete Project

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default BuilderProjects;