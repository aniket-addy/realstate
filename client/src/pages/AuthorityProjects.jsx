import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FloatingActions from "../components/floating-actions/FloatingActions";

import {
  getAuthorityProjects,
} from "../services/authorityProjectService";

/*
|--------------------------------------------------------------------------
| AUTHORITY PROJECTS
|--------------------------------------------------------------------------
| Public Authority Projects Listing
|
| Backend
|   ↓
| getAuthorityProjects()
|   ↓
| MongoDB
|
| IMPORTANT:
| Project details always use:
|
| /projects/:projectId
|
| This keeps Authority Projects, Builder Projects,
| Featured Projects and New Projects consistent.
|--------------------------------------------------------------------------
*/


// =========================================================
// GET PROJECT ID
// =========================================================

function getProjectId(project) {
  if (!project) {
    return "";
  }

  // MongoDB _id gets first priority
  if (project._id) {
    return String(project._id);
  }

  // Normal id fallback
  if (project.id) {
    return String(project.id);
  }

  // Other backend id
  if (project.projectId) {
    return String(project.projectId);
  }

  // Slug fallback
  if (project.slug) {
    return String(project.slug);
  }

  return "";
}


// =========================================================
// PROJECT DETAILS URL
// =========================================================

function getProjectDetailsUrl(project) {
  const projectId = getProjectId(project);

  if (!projectId) {
    return "/authority-projects";
  }

  return `/projects/${projectId}`;
}


// =========================================================
// AUTHORITY PROJECTS
// =========================================================

function AuthorityProjects() {

  // =========================================================
  // STATE
  // =========================================================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [status, setStatus] = useState("all");

  const [authority, setAuthority] = useState("all");


  // =========================================================
  // FETCH PROJECTS
  // =========================================================

  const fetchProjects = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await getAuthorityProjects();


      // =====================================================
      // SUPPORT COMMON API RESPONSE FORMATS
      // =====================================================

      let data = [];


      if (Array.isArray(response)) {

        data = response;

      }

      else if (Array.isArray(response?.data)) {

        data = response.data;

      }

      else if (Array.isArray(response?.projects)) {

        data = response.projects;

      }


      // =====================================================
      // SAFETY
      // =====================================================

      if (!Array.isArray(data)) {

        data = [];

      }


      // =====================================================
      // PUBLIC WEBSITE VISIBILITY
      // =====================================================

      const publicProjects =
        data.filter((project) => {

          if (
            Object.prototype.hasOwnProperty.call(
              project || {},
              "published"
            )
          ) {

            return project.published === true;

          }

          return true;

        });


      setProjects(publicProjects);

    }

    catch (err) {

      console.error(
        "Failed to fetch authority projects:",
        err
      );


      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load authority projects."
      );


      setProjects([]);

    }

    finally {

      setLoading(false);

    }

  };


  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {

    fetchProjects();

  }, []);


  // =========================================================
  // AUTHORITIES
  // =========================================================

  const authorities = useMemo(() => {

    const values =
      projects
        .map(
          (project) =>
            project?.authority
        )
        .filter(Boolean)
        .map(
          (value) =>
            String(value).trim()
        )
        .filter(Boolean);


    return [
      ...new Set(values),
    ].sort(
      (a, b) =>
        a.localeCompare(b)
    );

  }, [projects]);


  // =========================================================
  // FILTER PROJECTS
  // =========================================================

  const filteredProjects = useMemo(() => {

    const query =
      search
        .trim()
        .toLowerCase();


    return projects.filter(
      (project) => {

        const projectName =
          String(
            project?.name || ""
          ).toLowerCase();


        const projectDescription =
          String(
            project?.description || ""
          ).toLowerCase();


        const projectLocation =
          String(
            project?.location || ""
          ).toLowerCase();


        const projectCity =
          String(
            project?.city || ""
          ).toLowerCase();


        const projectState =
          String(
            project?.state || ""
          ).toLowerCase();


        const projectAuthority =
          String(
            project?.authority || ""
          ).toLowerCase();


        const projectCategory =
          String(
            project?.projectCategory || ""
          ).toLowerCase();


        const projectStatus =
          String(
            project?.status || ""
          ).toLowerCase();


        // ===================================================
        // SEARCH
        // ===================================================

        const matchesSearch =
          !query ||
          projectName.includes(query) ||
          projectDescription.includes(query) ||
          projectLocation.includes(query) ||
          projectCity.includes(query) ||
          projectState.includes(query) ||
          projectAuthority.includes(query);


        // ===================================================
        // CATEGORY
        // ===================================================

        const matchesCategory =
          category === "all" ||
          projectCategory === category;


        // ===================================================
        // STATUS
        // ===================================================

        const matchesStatus =
          status === "all" ||
          projectStatus === status;


        // ===================================================
        // AUTHORITY
        // ===================================================

        const matchesAuthority =
          authority === "all" ||
          String(
            project?.authority || ""
          ).trim() === authority;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus &&
          matchesAuthority
        );

      }
    );

  }, [
    projects,
    search,
    category,
    status,
    authority,
  ]);


  // =========================================================
  // FORMAT LABEL
  // =========================================================

  const formatLabel = (value) => {

    if (!value) {
      return "";
    }


    return String(value)
      .replace(/[-_]/g, " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );

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
        return "Available";

    }

  };


  // =========================================================
  // PROJECT IMAGE
  // =========================================================

  const getProjectImage = (project) => {

    if (
      project?.image &&
      typeof project.image === "string"
    ) {

      return project.image;

    }


    if (
      Array.isArray(project?.images) &&
      project.images.length > 0
    ) {

      const firstImage =
        project.images.find(
          (image) =>
            typeof image === "string" &&
            image.trim()
        );


      if (firstImage) {
        return firstImage;
      }

    }


    return null;

  };


  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {

    setSearch("");

    setCategory("all");

    setStatus("all");

    setAuthority("all");

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="min-h-screen bg-white">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />


      <main>

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-slate-950">

          <div className="absolute inset-0">

            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
              alt="Authority real estate projects"
              className="h-full w-full object-cover"
            />


            <div className="absolute inset-0 bg-slate-950/80" />


            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

          </div>


          <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#d6a84f]/10 blur-3xl" />

          <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#d6a84f]/10 blur-3xl" />


          <div className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

            <div className="max-w-[760px]">

              <div className="mb-5 flex items-center gap-2">

                <span className="h-px w-8 bg-[#d6a84f]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e0b65c] sm:text-[11px]">
                  Authority Projects
                </span>

              </div>


              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">

                Verified

                <br />

                <span className="text-[#e0b65c]">
                  Authority Projects
                </span>

                <br />

                Across Growing Locations.

              </h1>


              <p className="mt-6 max-w-[620px] text-sm leading-7 text-slate-300 sm:text-base">

                Explore authority-backed real estate
                opportunities across emerging locations,
                planned developments and investment-focused
                destinations.

              </p>


              {/* LIVE BACKEND STATS */}

              <div className="mt-9 flex flex-wrap gap-3">

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">

                  <ShieldCheck
                    size={18}
                    className="text-[#e0b65c]"
                  />

                  <div>

                    <p className="text-lg font-extrabold text-white">
                      {loading
                        ? "—"
                        : projects.length}
                    </p>

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Projects
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">

                  <MapPin
                    size={18}
                    className="text-[#e0b65c]"
                  />

                  <div>

                    <p className="text-lg font-extrabold text-white">
                      {loading
                        ? "—"
                        : authorities.length}
                    </p>

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Authorities
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="bg-white py-14 sm:py-18 lg:py-20">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#d6a84f]" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                    Explore Opportunities
                  </span>

                </div>


                <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.035em] text-slate-900 sm:text-4xl">

                  Authority-Backed

                  <span className="block text-[#b88b32]">
                    Real Estate Opportunities.
                  </span>

                </h2>

              </div>


              <div>

                <p className="text-sm leading-7 text-slate-500 sm:text-base">

                  Discover projects developed around
                  planned infrastructure, established
                  authorities and high-growth locations.
                  Browse the available projects and explore
                  detailed information before making a
                  decision.

                </p>


                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-700">

                  <CheckCircle2
                    size={16}
                    className="text-[#b88b32]"
                  />

                  Verified project information

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PROJECT SECTION
        ====================================================== */}

        <section className="bg-slate-50 py-14 sm:py-18 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            {/* SECTION HEADER */}

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

              <div className="max-w-[680px]">

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#d6a84f]" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                    Our Projects
                  </span>

                </div>


                <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-900 sm:text-4xl">

                  Explore Authority{" "}

                  <span className="text-[#b88b32]">
                    Projects
                  </span>

                </h2>


                <p className="mt-3 text-sm leading-6 text-slate-500">

                  Find projects by location, category,
                  authority and development status.

                </p>

              </div>


              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">

                <Building2
                  size={17}
                  className="text-[#b88b32]"
                />

                {filteredProjects.length}{" "}

                {filteredProjects.length === 1
                  ? "Project"
                  : "Projects"}{" "}

                Found

              </div>

            </div>


            {/* FILTER BAR */}

            <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search authority projects..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-11
                      pr-4
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-[#d6a84f]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#d6a84f]/10
                    "
                  />

                </div>


                {/* AUTHORITY */}

                <div className="relative">

                  <ShieldCheck
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={authority}
                    onChange={(event) =>
                      setAuthority(event.target.value)
                    }
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-[#d6a84f]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#d6a84f]/10
                    "
                  >

                    <option value="all">
                      All Authorities
                    </option>

                    {authorities.map((item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    ))}

                  </select>

                </div>


                {/* CATEGORY */}

                <div className="relative">

                  <SlidersHorizontal
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-[#d6a84f]
                      focus:bg-white
                      focus:ring-2
                      focus:ring-[#d6a84f]/10
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

                </div>


                {/* STATUS */}

                <div>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      focus:border-[#d6a84f]
                      focus:bg-white
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

                </div>

              </div>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="flex min-h-[320px] items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                  <LoaderCircle
                    size={30}
                    className="animate-spin text-[#b88b32]"
                  />

                  <p className="text-sm font-medium text-slate-500">
                    Loading authority projects...
                  </p>

                </div>

              </div>

            )}


            {/* ERROR */}

            {!loading && error && (

              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">

                  <AlertCircle
                    size={22}
                    className="text-red-500"
                  />

                </div>


                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  Unable to Load Projects
                </h3>


                <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
                  {error}
                </p>


                <button
                  type="button"
                  onClick={fetchProjects}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-950
                    px-5
                    py-3
                    text-xs
                    font-extrabold
                    text-white
                    transition
                    hover:bg-[#d6a84f]
                    hover:text-slate-950
                  "
                >

                  <RefreshCw size={14} />

                  Try Again

                </button>

              </div>

            )}


            {/* =================================================
                PROJECT GRID
            ================================================== */}

            {!loading &&
              !error &&
              filteredProjects.length > 0 && (

                <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {filteredProjects.map((project) => {

                    const image =
                      getProjectImage(project);


                    // =================================================
                    // IMPORTANT:
                    // MongoDB _id is always preferred.
                    // =================================================

                    const projectId =
                      getProjectId(project);


                    // =================================================
                    // COMMON PROJECT DETAILS ROUTE
                    // =================================================

                    const projectDetailsUrl =
                      getProjectDetailsUrl(project);


                    return (

                      <article
                        key={projectId}
                        className="
                          group
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          shadow-sm
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-[#d6a84f]/40
                          hover:shadow-xl
                        "
                      >

                        {/* IMAGE */}

                        <div className="relative h-56 overflow-hidden bg-slate-100">

                          {image ? (

                            <img
                              src={image}
                              alt={
                                project?.name ||
                                "Authority Project"
                              }
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                              onError={(event) => {

                                event.currentTarget.style.display =
                                  "none";

                              }}
                            />

                          ) : (

                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

                              <Building2
                                size={48}
                                strokeWidth={1.2}
                                className="text-slate-400"
                              />

                            </div>

                          )}


                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />


                          {/* STATUS */}

                          <div className="absolute left-4 top-4">

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-800 shadow-sm backdrop-blur">

                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  project?.status === "active"
                                    ? "bg-green-500"
                                    : project?.status === "upcoming"
                                    ? "bg-[#d6a84f]"
                                    : project?.status === "completed"
                                    ? "bg-blue-500"
                                    : "bg-slate-400"
                                }`}
                              />

                              {getStatusLabel(
                                project?.status
                              )}

                            </span>

                          </div>


                          {/* CATEGORY */}

                          {project?.projectCategory && (

                            <div className="absolute bottom-4 left-4">

                              <span className="rounded-lg bg-slate-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e0b65c] backdrop-blur">

                                {formatLabel(
                                  project.projectCategory
                                )}

                              </span>

                            </div>

                          )}

                        </div>


                        {/* CONTENT */}

                        <div className="flex flex-1 flex-col p-6">

                          {/* AUTHORITY */}

                          {project?.authority && (

                            <div className="flex items-center gap-2">

                              <ShieldCheck
                                size={14}
                                className="text-[#b88b32]"
                              />

                              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#b88b32]">

                                {project.authority}

                              </span>

                            </div>

                          )}


                          {/* NAME */}

                          <h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-tight tracking-[-0.02em] text-slate-900">

                            {project?.name ||
                              "Untitled Project"}

                          </h3>


                          {/* LOCATION */}

                          {(project?.location ||
                            project?.city ||
                            project?.state) && (

                            <div className="mt-3 flex items-center gap-2">

                              <MapPin
                                size={15}
                                className="shrink-0 text-slate-400"
                              />

                              <span className="truncate text-xs font-medium text-slate-500">

                                {[
                                  project?.location,
                                  project?.city,
                                  project?.state,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}

                              </span>

                            </div>

                          )}


                          {/* DESCRIPTION */}

                          {project?.description && (

                            <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">

                              {project.description}

                            </p>

                          )}


                          {/* DETAILS */}

                          <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">

                            <div>

                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Price
                              </p>


                              <p className="mt-1 truncate text-sm font-extrabold text-slate-900">

                                {project?.price ||
                                (
                                  project?.priceFrom !==
                                    undefined &&
                                  project?.priceFrom !==
                                    null &&
                                  Number(
                                    project.priceFrom
                                  ) > 0
                                )
                                  ? (
                                      project?.price ||
                                      `₹${Number(
                                        project.priceFrom
                                      ).toLocaleString(
                                        "en-IN"
                                      )}`
                                    )
                                  : "On Request"}

                              </p>

                            </div>


                            <div>

                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Area
                              </p>


                              <p className="mt-1 truncate text-sm font-extrabold text-slate-900">

                                {project?.totalArea ||
                                  "Available on request"}

                              </p>

                            </div>

                          </div>


                          {/* =================================================
                              VIEW PROJECT
                              IMPORTANT:
                              Goes to /projects/:id
                          ================================================== */}

                          <div className="mt-auto pt-5">

                            <Link
                              to={projectDetailsUrl}
                              className="
                                group/link
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-950
                                px-5
                                py-3.5
                                text-xs
                                font-extrabold
                                text-white
                                transition
                                hover:bg-[#d6a84f]
                                hover:text-slate-950
                              "
                            >

                              View Project

                              <ArrowRight
                                size={15}
                                className="
                                  transition-transform
                                  group-hover/link:translate-x-1
                                "
                              />

                            </Link>

                          </div>

                        </div>

                      </article>

                    );

                  })}

                </div>

              )}


            {/* EMPTY STATE */}

            {!loading &&
              !error &&
              filteredProjects.length === 0 && (

                <div className="mt-9 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f0e2]">

                    <Building2
                      size={27}
                      className="text-[#b88b32]"
                    />

                  </div>


                  <h3 className="mt-5 text-xl font-extrabold text-slate-900">

                    {projects.length === 0
                      ? "No Authority Projects Available"
                      : "No Projects Found"}

                  </h3>


                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                    {projects.length === 0
                      ? "There are currently no published authority projects available."
                      : "We couldn't find any authority projects matching your current search or filters."}

                  </p>


                  {(search ||
                    category !== "all" ||
                    status !== "all" ||
                    authority !== "all") && (

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#d6a84f]
                        px-5
                        py-3
                        text-xs
                        font-extrabold
                        text-slate-950
                        transition
                        hover:bg-[#e3bb67]
                      "
                    >

                      Clear Filters

                      <ArrowRight size={14} />

                    </button>

                  )}

                </div>

              )}

          </div>

        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="bg-white py-16 sm:py-20">

          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-10 lg:px-16">

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d6a84f]/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#d6a84f]/10 blur-3xl" />


              <div className="relative">

                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e0b65c]">
                  Need Guidance?
                </p>


                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">

                  Looking For The Right{" "}

                  <span className="text-[#e0b65c]">
                    Project?
                  </span>

                </h2>


                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">

                  Tell us what you are looking for and our
                  team can help you explore suitable
                  authority-backed opportunities.

                </p>


                <Link
                  to="/contact"
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#d6a84f]
                    px-6
                    py-3.5
                    text-xs
                    font-extrabold
                    text-slate-950
                    transition
                    hover:bg-[#e3bb67]
                  "
                >

                  Talk To Our Team

                  <ArrowRight size={15} />

                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* FLOATING ACTIONS */}

      <FloatingActions />


      {/* FOOTER */}

      <Footer />

    </div>

  );

}


export default AuthorityProjects;