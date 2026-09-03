import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  MapPin,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  Phone,
  Ruler,
} from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FloatingActions from "../components/floating-actions/FloatingActions";

import { getAuthorityProjects } from "../services/authorityProjectService";

import { callClient } from "../components/config/contact";

import {
  getProjectImage,
  getProjectPrice,
  getProjectType,
} from "../utils/projectutils";

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
| Project details
|   ↓
| /projects/:projectId
|--------------------------------------------------------------------------
*/


// =========================================================
// GET PROJECT ID
// =========================================================

function getProjectId(project) {
  if (!project) {
    return "";
  }

  if (project._id) {
    return String(project._id);
  }

  if (project.id) {
    return String(project.id);
  }

  if (project.projectId) {
    return String(project.projectId);
  }

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
// FORMAT LABEL
// =========================================================

function formatLabel(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


// =========================================================
// STATUS LABEL
// =========================================================

function getStatusLabel(value) {
  switch (String(value || "").toLowerCase()) {
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
}


// =========================================================
// PROJECT CARD
// SAME UI STYLE AS FEATURED PROJECT CARD
// =========================================================

function ProjectCard({ project }) {
  const type =
    getProjectType(project) ||
    project?.propertyType ||
    project?.projectType ||
    project?.projectCategory ||
    "Property";

  const isPlot = String(type)
    .toLowerCase()
    .includes("plot");

  const projectId = getProjectId(project);

  const projectUrl = projectId
    ? `/projects/${projectId}`
    : "#";

  const image = getProjectImage(project);

  const category =
    project?.category ||
    project?.projectCategory;

  const location =
    [
      project?.location,
      project?.city,
      project?.state,
    ]
      .filter(Boolean)
      .join(", ");

  const price = getProjectPrice(project);

  return (
    <article
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
        shadow-[0_8px_28px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:border-[#d6a84f]
        hover:shadow-[0_18px_45px_rgba(214,168,79,0.20)]
      "
    >

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Link
        to={projectUrl}
        className="
          relative
          block
          aspect-[1.55/1]
          overflow-hidden
        "
      >

        {image ? (
          <img
            src={image}
            alt={project?.name || "Project"}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-slate-100
              transition-colors
              duration-300
              group-hover:bg-[#fff9ed]
            "
          >
            <Building2
              size={42}
              className="
                text-slate-300
                transition-colors
                duration-300
                group-hover:text-[#d6a84f]
              "
            />
          </div>
        )}

        {/* IMAGE OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/50
            via-transparent
            to-transparent
          "
        />

        {/* CATEGORY */}

        {category && (
          <div className="absolute left-3 top-3">
            <span
              className="
                inline-flex
                rounded-md
                bg-white
                px-2.5
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
                text-slate-800
                shadow-sm
                transition-all
                duration-300
                group-hover:bg-[#d6a84f]
                group-hover:text-white
              "
            >
              {formatLabel(category)}
            </span>
          </div>
        )}

        {/* ARROW */}

        <div
          className="
            absolute
            bottom-3
            right-3
            flex
            h-9
            w-9
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-slate-900
            opacity-0
            shadow-lg
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            group-hover:bg-[#d6a84f]
            group-hover:text-white
          "
        >
          <ArrowRight size={16} />
        </div>

      </Link>


      {/* =====================================================
          CARD CONTENT
      ====================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          bg-white
          p-4
          transition-colors
          duration-300
        "
      >

        {/* AUTHORITY */}

        {project?.authority && (
          <div className="flex items-center gap-1.5">

            <ShieldCheck
              size={13}
              className="text-[#b88b32]"
            />

            <span
              className="
                truncate
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#b88b32]
              "
            >
              {formatLabel(project.authority)}
            </span>

          </div>
        )}


        {/* TITLE */}

        <Link to={projectUrl}>
          <h3
            className="
              mt-3
              line-clamp-2
              text-[16px]
              font-bold
              leading-snug
              tracking-tight
              text-slate-900
              transition-colors
              duration-300
              group-hover:text-[#b88b32]
            "
          >
            {project?.name || "Untitled Project"}
          </h3>
        </Link>


        {/* LOCATION */}

        {location && (
          <div
            className="
              mt-2
              flex
              items-start
              gap-1.5
            "
          >

            <MapPin
              size={13}
              className="
                mt-0.5
                shrink-0
                text-slate-400
                transition-colors
                duration-300
                group-hover:text-[#d6a84f]
              "
            />

            <p
              className="
                line-clamp-1
                text-[11px]
                font-medium
                text-slate-500
              "
            >
              {location}
            </p>

          </div>
        )}


        {/* DIVIDER */}

        <div
          className="
            my-3
            border-t
            border-slate-100
            transition-colors
            duration-300
            group-hover:border-[#ead6a8]
          "
        />


        {/* PROJECT INFO */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >

          {/* TYPE */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-1.5
            "
          >

            {isPlot ? (
              <Ruler
                size={13}
                className="
                  shrink-0
                  text-[#b88b32]
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            ) : (
              <BedDouble
                size={13}
                className="
                  shrink-0
                  text-[#b88b32]
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            )}

            <span
              className="
                truncate
                text-[10px]
                font-semibold
                text-slate-600
                transition-colors
                duration-300
                group-hover:text-[#8c691f]
              "
            >
              {formatLabel(type)}
            </span>

          </div>


          {/* PRICE */}

          {price && (
            <div
              className="
                shrink-0
                text-right
              "
            >

              <p
                className="
                  text-[10px]
                  text-slate-400
                "
              >
                Starting
              </p>

              <p
                className="
                  text-[12px]
                  font-extrabold
                  text-slate-900
                  transition-colors
                  duration-300
                  group-hover:text-[#b88b32]
                "
              >
                {price}
              </p>

            </div>
          )}

        </div>


        {/* STATUS */}

        {project?.status && (
          <div className="mt-3">

            <span
              className="
                inline-flex
                items-center
                rounded-md
                bg-slate-50
                px-2
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-wide
                text-slate-500
                transition-colors
                duration-300
                group-hover:bg-[#fff9ed]
                group-hover:text-[#8c691f]
              "
            >
              {getStatusLabel(project.status)}
            </span>

          </div>
        )}


        {/* VIEW PROJECT BUTTON */}

        <Link
          to={projectUrl}
          className="
            mt-4
            flex
            items-center
            justify-between
            rounded-lg
            border
            border-slate-200
            px-3
            py-2.5
            text-[11px]
            font-bold
            text-slate-700
            transition-all
            duration-300
            hover:border-[#d6a84f]
            hover:bg-[#d6a84f]
            hover:text-white
            hover:shadow-[0_8px_18px_rgba(214,168,79,0.25)]
          "
        >
          <span>
            View Project
          </span>

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

    </article>
  );
}


// =========================================================
// AUTHORITY PROJECTS PAGE
// =========================================================

function AuthorityProjects() {

  const navigate = useNavigate();


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


      let data = [];


      // API DIRECT ARRAY

      if (Array.isArray(response)) {

        data = response;

      }

      // API { data: [] }

      else if (
        Array.isArray(response?.data)
      ) {

        data = response.data;

      }

      // API { projects: [] }

      else if (
        Array.isArray(response?.projects)
      ) {

        data = response.projects;

      }


      if (!Array.isArray(data)) {
        data = [];
      }


      // =====================================================
      // ONLY PUBLISHED PROJECTS
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

    } catch (err) {

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

    } finally {

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

    const values = projects
      .map(
        (project) =>
          project?.authority
      )
      .filter(Boolean)
      .map((value) =>
        String(value).trim()
      )
      .filter(Boolean);


    return [
      ...new Set(values),
    ].sort((a, b) =>
      a.localeCompare(b)
    );

  }, [projects]);


  // =========================================================
  // FILTER PROJECTS
  // =========================================================

  const filteredProjects = useMemo(() => {

    const query = search
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
            project?.projectCategory ||
              project?.category ||
              ""
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
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {

    setSearch("");

    setCategory("all");

    setStatus("all");

    setAuthority("all");

  };


  // =========================================================
  // TALK TO TEAM
  // =========================================================

  const handleTalkToTeam = () => {

    const called = callClient();

    if (!called) {
      navigate("/contact");
    }

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>

        {/* ===================================================
            HERO
        ==================================================== */}

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


          <div
            className="
              relative
              mx-auto
              max-w-[1240px]
              px-4
              py-24
              sm:px-6
              sm:py-28
              lg:px-8
              lg:py-32
            "
          >

            <div className="max-w-[760px]">

              <div className="mb-5 flex items-center gap-2">

                <span className="h-px w-8 bg-[#d6a84f]" />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#e0b65c]
                    sm:text-[11px]
                  "
                >
                  Authority Projects
                </span>

              </div>


              <h1
                className="
                  text-4xl
                  font-extrabold
                  leading-[1.05]
                  tracking-[-0.045em]
                  text-white
                  sm:text-5xl
                  lg:text-7xl
                "
              >
                Verified

                <br />

                <span className="text-[#e0b65c]">
                  Authority Projects
                </span>

                <br />

                Across Growing Locations.
              </h1>


              <p
                className="
                  mt-6
                  max-w-[620px]
                  text-sm
                  leading-7
                  text-slate-300
                  sm:text-base
                "
              >
                Explore authority-backed real estate
                opportunities across emerging locations,
                planned developments and investment-focused
                destinations.
              </p>


              {/* STATS */}

              <div className="mt-9 flex flex-wrap gap-3">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-3
                    backdrop-blur-md
                  "
                >

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

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >
                      Projects
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-3
                    backdrop-blur-md
                  "
                >

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

                    <p
                      className="
                        text-[10]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >
                      Authorities
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            INTRO
        ==================================================== */}

        <section className="bg-white py-14 sm:py-18 lg:py-20">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div
              className="
                grid
                items-center
                gap-10
                lg:grid-cols-[0.8fr_1.2fr]
              "
            >

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#d6a84f]" />

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.2em]
                      text-[#b88b32]
                    "
                  >
                    Explore Opportunities
                  </span>

                </div>


                <h2
                  className="
                    text-3xl
                    font-extrabold
                    leading-tight
                    tracking-[-0.035em]
                    text-slate-900
                    sm:text-4xl
                  "
                >
                  Authority-Backed

                  <span className="block text-[#b88b32]">
                    Real Estate Opportunities.
                  </span>
                </h2>

              </div>


              <div>

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-500
                    sm:text-base
                  "
                >
                  Discover projects developed around
                  planned infrastructure, established
                  authorities and high-growth locations.
                  Browse the available projects and explore
                  detailed information before making a
                  decision.
                </p>


                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    text-slate-700
                  "
                >

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


        {/* ===================================================
            PROJECT SECTION
        ==================================================== */}

        <section className="bg-slate-50 py-14 sm:py-18 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            {/* SECTION HEADER */}

            <div
              className="
                flex
                flex-col
                justify-between
                gap-5
                lg:flex-row
                lg:items-end
              "
            >

              <div className="max-w-[680px]">

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#d6a84f]" />

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.2em]
                      text-[#b88b32]
                    "
                  >
                    Our Projects
                  </span>

                </div>


                <h2
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.035em]
                    text-slate-900
                    sm:text-4xl
                  "
                >
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


              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-500
                "
              >

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


            {/* =================================================
                FILTER BAR
            ================================================== */}

            <div
              className="
                mt-9
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-sm
                sm:p-4
              "
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]
                "
              >

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={18}
                    className="
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
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
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
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
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


            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (

              <div
                className="
                  flex
                  min-h-[320px]
                  items-center
                  justify-center
                "
              >

                <div className="flex flex-col items-center gap-3">

                  <LoaderCircle
                    size={30}
                    className="
                      animate-spin
                      text-[#b88b32]
                    "
                  />

                  <p className="text-sm font-medium text-slate-500">
                    Loading authority projects...
                  </p>

                </div>

              </div>

            )}


            {/* =================================================
                ERROR
            ================================================== */}

            {!loading && error && (

              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-8
                  text-center
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                  "
                >

                  <AlertCircle
                    size={22}
                    className="text-red-500"
                  />

                </div>


                <h3
                  className="
                    mt-4
                    text-base
                    font-extrabold
                    text-slate-900
                  "
                >
                  Unable to Load Projects
                </h3>


                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-lg
                    text-sm
                    text-slate-500
                  "
                >
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
                4 CARDS ON DESKTOP
            ================================================== */}

            {!loading &&
              !error &&
              filteredProjects.length > 0 && (

                <div
                  className="
                    mt-9
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                  "
                >

                  {filteredProjects.map(
                    (project) => (
                      <ProjectCard
                        key={getProjectId(project)}
                        project={project}
                      />
                    )
                  )}

                </div>

              )}


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {!loading &&
              !error &&
              filteredProjects.length === 0 && (

                <div
                  className="
                    mt-9
                    rounded-3xl
                    border
                    border-dashed
                    border-slate-300
                    bg-white
                    px-6
                    py-20
                    text-center
                  "
                >

                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-[#f7f0e2]
                    "
                  >

                    <Building2
                      size={27}
                      className="text-[#b88b32]"
                    />

                  </div>


                  <h3
                    className="
                      mt-5
                      text-xl
                      font-extrabold
                      text-slate-900
                    "
                  >
                    {projects.length === 0
                      ? "No Authority Projects Available"
                      : "No Projects Found"}
                  </h3>


                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-md
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
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

          <div
            className="
              mx-auto
              max-w-[1100px]
              px-4
              sm:px-6
              lg:px-8
            "
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-slate-950
                px-6
                py-12
                text-center
                sm:px-10
                lg:px-16
              "
            >

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#d6a84f]/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#d6a84f]/10
                  blur-3xl
                "
              />


              <div className="relative">

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.2em]
                    text-[#e0b65c]
                  "
                >
                  Need Guidance?
                </p>


                <h2
                  className="
                    mt-3
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  Looking For The Right{" "}

                  <span className="text-[#e0b65c]">
                    Project?
                  </span>
                </h2>


                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  Tell us what you are looking for and our
                  team can help you explore suitable
                  authority-backed opportunities.
                </p>


                <button
                  type="button"
                  onClick={handleTalkToTeam}
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

                  <Phone size={15} />

                </button>

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