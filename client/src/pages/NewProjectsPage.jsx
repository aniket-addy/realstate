import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  MapPin,
  Ruler,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import {
  getAuthorityProjects,
} from "../services/authorityProjectService";

import {
  getBuilderProjects,
} from "../services/builderProjectService";

import {
  normalizeProject,
  filterProjectsBySection,
  getProjectImage,
  getProjectPrice,
  getProjectType,
} from "../utils/projectUtils";


// =========================================================
// PROJECT ID
// =========================================================

function getProjectId(project) {
  return (
    project?._id ||
    project?.id ||
    project?.projectId ||
    project?.slug ||
    ""
  );
}


// =========================================================
// PROJECT URL
// =========================================================

function getProjectUrl(project) {
  const id = getProjectId(project);

  return id ? `/projects/${id}` : "#";
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
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
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
// SAME UI STYLE AS AUTHORITY PROJECTS
// =========================================================

function NewProjectCard({ project }) {
  const projectUrl = getProjectUrl(project);

  const type =
    getProjectType(project) ||
    project?.propertyType ||
    project?.projectType ||
    project?.projectCategory ||
    "Property";

  const isPlot = String(type)
    .toLowerCase()
    .includes("plot");

  const image = getProjectImage(project);

  const price = getProjectPrice(project);

  const category =
    project?.category ||
    project?.projectCategory;

  const location = [
    project?.location,
    project?.city,
    project?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const authority =
    project?.authority ||
    project?.authorityName;

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
            alt={project?.name || "New Project"}
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


        {/* NEW PROJECT BADGE */}

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
            New Project
          </span>
        </div>


        {/* CATEGORY */}

        {category && (
          <div className="absolute right-3 top-3">
            <span
              className="
                inline-flex
                rounded-md
                bg-slate-950/80
                px-2.5
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
                text-white
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                group-hover:bg-[#d6a84f]
              "
            >
              {formatLabel(category)}
            </span>
          </div>
        )}


        {/* HOVER ARROW */}

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
          CONTENT
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

        {/* =================================================
            AUTHORITY
        ================================================= */}

        {authority && (
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
              {formatLabel(authority)}
            </span>

          </div>
        )}


        {/* =================================================
            TITLE
        ================================================= */}

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
            {project?.name || "Unnamed Project"}
          </h3>
        </Link>


        {/* =================================================
            LOCATION
        ================================================= */}

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


        {/* =================================================
            DIVIDER
        ================================================= */}

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


        {/* =================================================
            PROJECT INFO
        ================================================= */}

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


        {/* =================================================
            BHK / AREA
        ================================================= */}

        {(project?.bhk ||
          project?.area ||
          project?.size ||
          project?.areaRange) && (

          <div
            className="
              mt-3
              flex
              items-center
              gap-3
            "
          >

            {project?.bhk && (
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-1.5
                  text-[10px]
                  font-semibold
                  text-slate-500
                "
              >

                <BedDouble
                  size={12}
                  className="shrink-0 text-slate-400"
                />

                <span className="truncate">
                  {Array.isArray(project.bhk)
                    ? project.bhk.join(", ")
                    : project.bhk}
                </span>

              </div>
            )}


            {(project?.area ||
              project?.size ||
              project?.areaRange) && (

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-1.5
                  text-[10px]
                  font-semibold
                  text-slate-500
                "
              >

                <Ruler
                  size={12}
                  className="shrink-0 text-slate-400"
                />

                <span className="truncate">
                  {project?.area ||
                    project?.size ||
                    project?.areaRange}
                </span>

              </div>

            )}

          </div>

        )}


        {/* =================================================
            STATUS
        ================================================= */}

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


        {/* =================================================
            VIEW PROJECT BUTTON
        ================================================= */}

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
// NEW PROJECTS PAGE
// =========================================================

export default function NewProjectsPage() {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =======================================================
  // FETCH PROJECTS
  // =======================================================

  useEffect(() => {

    const loadProjects = async () => {

      try {

        setLoading(true);

        setError("");


        const [
          authorityResponse,
          builderResponse,
        ] = await Promise.all([
          getAuthorityProjects(),
          getBuilderProjects(),
        ]);


        // =================================================
        // AUTHORITY PROJECTS
        // =================================================

        const authorityProjects =
          authorityResponse?.data ||
          authorityResponse?.projects ||
          authorityResponse ||
          [];


        // =================================================
        // BUILDER PROJECTS
        // =================================================

        const builderProjects =
          builderResponse?.data ||
          builderResponse?.projects ||
          builderResponse ||
          [];


        // =================================================
        // NORMALIZE AUTHORITY
        // =================================================

        const normalizedAuthority =
          Array.isArray(authorityProjects)
            ? authorityProjects.map(
                (project) =>
                  normalizeProject({
                    ...project,
                    projectSource: "authority",
                  })
              )
            : [];


        // =================================================
        // NORMALIZE BUILDER
        // =================================================

        const normalizedBuilder =
          Array.isArray(builderProjects)
            ? builderProjects.map(
                (project) =>
                  normalizeProject({
                    ...project,
                    projectSource: "builder",
                  })
              )
            : [];


        // =================================================
        // COMBINE
        // =================================================

        const allProjects = [
          ...normalizedAuthority,
          ...normalizedBuilder,
        ];


        // =================================================
        // FILTER NEW PROJECTS
        // =================================================

        let newProjects =
          filterProjectsBySection(
            allProjects,
            "new"
          );


        // =================================================
        // EXPLICIT NEW PROJECT
        // =================================================

        const explicitlyNew =
          allProjects.filter(
            (project) =>
              project?.newProject === true ||
              project?.newProject === "true"
          );


        newProjects = [
          ...newProjects,
          ...explicitlyNew,
        ];


        // =================================================
        // REMOVE DUPLICATES
        // =================================================

        const uniqueProjects =
          Array.from(
            new Map(
              newProjects.map(
                (project) => [
                  getProjectId(project),
                  project,
                ]
              )
            ).values()
          ).filter(
            (project) =>
              getProjectId(project)
          );


        setProjects(uniqueProjects);

      } catch (err) {

        console.error(
          "Failed to load new projects:",
          err
        );

        setError(
          "Unable to load new projects. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    loadProjects();

  }, []);


  // =======================================================
  // SORT PROJECTS
  // =======================================================

  const sortedProjects = useMemo(() => {

    return [...projects].sort(
      (a, b) => {

        const dateA =
          new Date(
            a?.createdAt ||
              a?.updatedAt ||
              0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt ||
              b?.updatedAt ||
              0
          ).getTime();

        return dateB - dateA;

      }
    );

  }, [projects]);


  // =======================================================
  // PAGE
  // =======================================================

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />


      <main>

        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="relative overflow-hidden bg-slate-950">

          {/* BACKGROUND */}

          <div className="absolute inset-0">

            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
              alt="New real estate projects"
              className="
                h-full
                w-full
                object-cover
              "
            />

            <div className="absolute inset-0 bg-slate-950/80" />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-slate-950
                via-slate-950/80
                to-slate-950/30
              "
            />

          </div>


          {/* GOLD GLOW */}

          <div
            className="
              absolute
              -right-32
              top-20
              h-72
              w-72
              rounded-full
              bg-[#d6a84f]/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              left-10
              h-72
              w-72
              rounded-full
              bg-[#d6a84f]/10
              blur-3xl
            "
          />


          {/* CONTENT */}

          <div
            className="
              relative
              mx-auto
              max-w-[1240px]
              px-4
              py-20
              sm:px-6
              sm:py-24
              lg:px-8
              lg:py-28
            "
          >

            {/* BACK */}

            <Link
              to="/"
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                text-slate-300
                transition-colors
                hover:text-[#e0b65c]
              "
            >

              <ArrowLeft size={15} />

              Back to Home

            </Link>


            <div className="max-w-[760px]">

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-2
                "
              >

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
                  Latest Listings
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

                Discover

                <br />

                <span className="text-[#e0b65c]">
                  New Projects
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
                Explore the latest residential,
                commercial and plotted developments
                recently added to our platform.
              </p>


              {/* STATS */}

              {!loading && !error && (

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

                    <Building2
                      size={18}
                      className="text-[#e0b65c]"
                    />

                    <div>

                      <p className="text-lg font-extrabold text-white">
                        {projects.length}
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
                        New Projects
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

        </section>


        {/* ===================================================
            INTRO
        ==================================================== */}

        <section className="bg-white py-14 sm:py-18 lg:py-20">

          <div
            className="
              mx-auto
              max-w-[1240px]
              px-4
              sm:px-6
              lg:px-8
            "
          >

            <div
              className="
                grid
                items-center
                gap-10
                lg:grid-cols-[0.8fr_1.2fr]
              "
            >

              <div>

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >

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
                    Latest Opportunities
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

                  Newly Added

                  <span className="block text-[#b88b32]">
                    Real Estate Projects.
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
                  Discover recently added real estate
                  projects from builders and authorities.
                  Explore project details, locations,
                  property types and pricing information
                  before making your decision.
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

                  <ShieldCheck
                    size={16}
                    className="text-[#b88b32]"
                  />

                  Latest project information

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            PROJECT SECTION
        ==================================================== */}

        <section
          className="
            bg-slate-50
            py-14
            sm:py-18
            lg:py-24
          "
        >

          <div
            className="
              mx-auto
              max-w-[1240px]
              px-4
              sm:px-6
              lg:px-8
            "
          >

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

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >

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

                  Latest New{" "}

                  <span className="text-[#b88b32]">
                    Projects
                  </span>

                </h2>


                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Explore the latest projects added
                  to our platform.
                </p>

              </div>


              {!loading && !error && (

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

                  {sortedProjects.length}{" "}

                  {sortedProjects.length === 1
                    ? "Project"
                    : "Projects"}

                </div>

              )}

            </div>


            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (

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

                {Array.from({
                  length: 8,
                }).map((_, index) => (

                  <div
                    key={index}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                    "
                  >

                    <div
                      className="
                        aspect-[1.55/1]
                        animate-pulse
                        bg-slate-200
                      "
                    />

                    <div className="space-y-4 p-4">

                      <div
                        className="
                          h-3
                          w-1/3
                          animate-pulse
                          rounded
                          bg-slate-200
                        "
                      />

                      <div
                        className="
                          h-5
                          w-3/4
                          animate-pulse
                          rounded
                          bg-slate-200
                        "
                      />

                      <div
                        className="
                          h-3
                          w-1/2
                          animate-pulse
                          rounded
                          bg-slate-200
                        "
                      />

                      <div
                        className="
                          h-px
                          w-full
                          animate-pulse
                          bg-slate-200
                        "
                      />

                      <div
                        className="
                          h-9
                          w-full
                          animate-pulse
                          rounded-lg
                          bg-slate-200
                        "
                      />

                    </div>

                  </div>

                ))}

              </div>

            )}


            {/* =================================================
                ERROR
            ================================================== */}

            {!loading && error && (

              <div
                className="
                  mt-9
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
                  Unable to Load New Projects
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
                  onClick={() =>
                    window.location.reload()
                  }
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
                EMPTY
            ================================================== */}

            {!loading &&
              !error &&
              sortedProjects.length === 0 && (

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
                    No New Projects
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
                    There are currently no projects
                    marked as new. Please check back
                    later.
                  </p>


                  <Link
                    to="/projects"
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
                    Browse All Projects

                    <ArrowRight size={14} />

                  </Link>

                </div>

              )}


            {/* =================================================
                PROJECT GRID
                4 CARDS DESKTOP
            ================================================== */}

            {!loading &&
              !error &&
              sortedProjects.length > 0 && (

                <>

                  <div className="mt-9">

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-4
                      "
                    >

                      {sortedProjects.map(
                        (project) => (

                          <NewProjectCard
                            key={getProjectId(project)}
                            project={project}
                          />

                        )
                      )}

                    </div>

                  </div>

                </>

              )}

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}