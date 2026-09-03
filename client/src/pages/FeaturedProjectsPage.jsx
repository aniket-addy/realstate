import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  MapPin,
  Ruler,
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
  filterProjectsBySection,
  getProjectImage,
  getProjectPrice,
  getProjectType,
  normalizeProject,
} from "../utils/projectutils";


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

  return "";
}


// =========================================================
// PROJECT URL
// =========================================================

function getProjectUrl(project) {
  const id = getProjectId(project);

  return id ? `/projects/${id}` : "#";
}


// =========================================================
// FEATURED PROJECT CARD
// =========================================================

function FeaturedProjectCard({ project }) {
  const normalizedProject = normalizeProject(project);

  const title =
    normalizedProject?.name ||
    normalizedProject?.title ||
    "Untitled Project";

  const location =
    normalizedProject?.location ||
    normalizedProject?.city ||
    "Location not available";

  const type =
    getProjectType(normalizedProject) ||
    "Property";

  const price =
    getProjectPrice(normalizedProject);

  const image =
    getProjectImage(normalizedProject);

  const size =
    normalizedProject?.size ||
    normalizedProject?.area ||
    normalizedProject?.plotSize ||
    "";

  const isPlot =
    String(type)
      .toLowerCase()
      .includes("plot");

  const projectUrl =
    getProjectUrl(normalizedProject);


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
      ===================================================== */}

      <Link
        to={projectUrl}
        className="
          relative
          block

          h-[240px]

          overflow-hidden
        "
      >

        {image ? (
          <img
            src={image}
            alt={title}
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
              size={48}
              className="
                text-slate-300

                transition-colors
                duration-300

                group-hover:text-[#d6a84f]
              "
            />
          </div>
        )}


        {/* =================================================
            IMAGE OVERLAY
        ================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-slate-950/65
            via-slate-950/5
            to-transparent
          "
        />


        {/* =================================================
            FEATURED BADGE
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
          "
        >

          <span
            className="
              inline-flex
              items-center

              rounded-md

              bg-[#d6a84f]

              px-2.5
              py-1.5

              text-[9px]
              font-extrabold
              uppercase
              tracking-wide

              text-white

              shadow-sm
            "
          >
            Featured
          </span>

        </div>


        {/* =================================================
            PROJECT CATEGORY
        ================================================= */}

        {normalizedProject?.category && (

          <div
            className="
              absolute
              right-3
              top-3
            "
          >

            <span
              className="
                rounded-md

                bg-white/95

                px-2.5
                py-1.5

                text-[9px]
                font-extrabold
                uppercase
                tracking-wide

                text-slate-800

                shadow-sm
              "
            >
              {normalizedProject.category}
            </span>

          </div>

        )}


        {/* =================================================
            PRICE
        ================================================= */}

        {price && (

          <div
            className="
              absolute
              bottom-3
              left-3
            "
          >

            <p
              className="
                text-[9px]
                font-medium

                text-white/80
              "
            >
              Starting From
            </p>

            <p
              className="
                text-sm
                font-extrabold

                text-white
              "
            >
              {price}
            </p>

          </div>

        )}


        {/* =================================================
            ARROW
        ================================================= */}

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

            bg-white

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
      ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col

          p-5
        "
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <Link to={projectUrl}>

          <h3
            className="
              line-clamp-2

              text-[17px]
              font-bold
              leading-6
              tracking-tight

              text-slate-900

              transition-colors
              duration-300

              group-hover:text-[#b88b32]
            "
          >
            {title}
          </h3>

        </Link>


        {/* =================================================
            LOCATION
        ================================================= */}

        <div
          className="
            mt-2.5

            flex
            items-start
            gap-1.5
          "
        >

          <MapPin
            size={14}
            className="
              mt-0.5
              shrink-0

              text-[#b88b32]
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


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div
          className="
            my-4

            border-t
            border-slate-100
          "
        />


        {/* =================================================
            PROJECT INFO
        ================================================= */}

        <div
          className="
            flex
            min-h-[25px]

            items-center
            justify-between

            gap-3
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
                size={14}
                className="
                  shrink-0
                  text-[#b88b32]
                "
              />

            ) : (

              <BedDouble
                size={14}
                className="
                  shrink-0
                  text-[#b88b32]
                "
              />

            )}

            <span
              className="
                truncate

                text-[10px]
                font-semibold

                text-slate-600
              "
            >
              {type}
            </span>

          </div>


          {/* SIZE */}

          {size && (

            <div
              className="
                flex
                min-w-0
                items-center
                gap-1.5
              "
            >

              <Ruler
                size={13}
                className="
                  shrink-0
                  text-[#b88b32]
                "
              />

              <span
                className="
                  truncate

                  text-[10px]
                  font-semibold

                  text-slate-600
                "
              >
                {size}
              </span>

            </div>

          )}

        </div>


        {/* =================================================
            BUTTON
        ================================================= */}

        <Link
          to={projectUrl}
          className="
            mt-5

            flex
            items-center
            justify-between

            rounded-lg

            border
            border-slate-200

            px-3.5
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
// FEATURED PROJECTS PAGE
// =========================================================

function FeaturedProjectsPage() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =======================================================
  // LOAD FEATURED PROJECTS
  // =======================================================

  useEffect(() => {

    let mounted = true;


    async function loadFeaturedProjects() {

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
          Array.isArray(authorityResponse)
            ? authorityResponse
            : authorityResponse?.data ||
              authorityResponse?.projects ||
              [];


        // =================================================
        // BUILDER PROJECTS
        // =================================================

        const builderProjects =
          Array.isArray(builderResponse)
            ? builderResponse
            : builderResponse?.data ||
              builderResponse?.projects ||
              [];


        // =================================================
        // COMBINE
        // =================================================

        const allProjects = [
          ...authorityProjects,
          ...builderProjects,
        ];


        // =================================================
        // NORMALIZE
        // =================================================

        const normalizedProjects =
          allProjects
            .map((project) =>
              normalizeProject(project)
            )
            .filter((project) =>
              getProjectId(project)
            );


        // =================================================
        // FILTER FEATURED
        // =================================================

        const featuredProjects =
          filterProjectsBySection(
            normalizedProjects,
            "featured"
          );


        // =================================================
        // REMOVE DUPLICATES
        // =================================================

        const uniqueProjects =
          Array.from(
            new Map(
              featuredProjects.map(
                (project) => [
                  getProjectId(project),
                  project,
                ]
              )
            ).values()
          );


        if (mounted) {

          setProjects(
            uniqueProjects
          );

        }

      } catch (err) {

        console.error(
          "Failed to load featured projects:",
          err
        );


        if (mounted) {

          setError(
            "Unable to load featured projects."
          );

        }

      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    }


    loadFeaturedProjects();


    return () => {

      mounted = false;

    };

  }, []);


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-white">

        <Navbar />

        <main>

          <section
            className="
              min-h-[70vh]

              bg-white

              py-16
              sm:py-20
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

              <div
                className="
                  mb-10

                  h-32

                  animate-pulse

                  rounded-2xl

                  bg-slate-100
                "
              />

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5

                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >

                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                  (item) => (

                    <div
                      key={item}
                      className="
                        h-[440px]

                        animate-pulse

                        rounded-2xl

                        bg-slate-100
                      "
                    />

                  )
                )}

              </div>

            </div>

          </section>

        </main>

        <Footer />

      </div>
    );
  }


  // =======================================================
  // ERROR
  // =======================================================

  if (error) {

    return (
      <div className="min-h-screen bg-white">

        <Navbar />

        <main>

          <section
            className="
              flex
              min-h-[65vh]

              items-center
              justify-center

              bg-white

              px-4
            "
          >

            <div
              className="
                text-center
              "
            >

              <Building2
                size={42}
                className="
                  mx-auto
                  mb-4

                  text-slate-300
                "
              />

              <h2
                className="
                  text-xl
                  font-bold

                  text-slate-900
                "
              >
                Unable to Load Projects
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-slate-500
                "
              >
                Please try again later.
              </p>

              <Link
                to="/"
                className="
                  mt-5

                  inline-flex
                  items-center
                  gap-2

                  rounded-lg

                  bg-[#d6a84f]

                  px-4
                  py-2.5

                  text-xs
                  font-bold

                  text-white
                "
              >

                <ArrowLeft size={14} />

                Back Home

              </Link>

            </div>

          </section>

        </main>

        <Footer />

      </div>
    );
  }


  // =======================================================
  // MAIN PAGE
  // =======================================================

  return (
    <div
      className="
        min-h-screen
        bg-white
      "
    >

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          MAIN
      ================================================= */}

      <main>

        <section
          className="
            bg-white

            py-12
            sm:py-16
            lg:py-20
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

            {/* =================================================
                BACK TO HOME
            ================================================= */}

            <Link
              to="/"
              className="
                mb-7

                inline-flex
                items-center
                gap-2

                text-xs
                font-bold

                text-slate-500

                transition-colors
                duration-200

                hover:text-[#b88b32]
              "
            >

              <ArrowLeft size={14} />

              Back to Home

            </Link>


            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                flex
                flex-col
                gap-6

                border-b
                border-slate-100

                pb-10

                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <div>

                {/* LABEL */}

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
                      h-px
                      w-7

                      bg-[#d6a84f]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.2em]

                      text-[#b88b32]
                    "
                  >
                    Featured Projects
                  </span>

                </div>


                {/* TITLE */}

                <h1
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.03em]

                    text-slate-900

                    sm:text-4xl
                    lg:text-5xl
                  "
                >

                  Handpicked Projects

                  <span
                    className="
                      text-[#b88b32]
                    "
                  >
                    {" "}for You
                  </span>

                </h1>


                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4

                    max-w-2xl

                    text-sm
                    leading-6

                    text-slate-500

                    sm:text-base
                  "
                >
                  Explore our carefully selected authority and
                  builder projects offering strong locations,
                  trusted development and promising investment
                  opportunities.
                </p>

              </div>


              {/* =================================================
                  PROJECT COUNT
              ================================================= */}

              <div
                className="
                  shrink-0

                  rounded-xl

                  border
                  border-[#ead6a8]

                  bg-[#fffaf0]

                  px-5
                  py-3
                "
              >

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider

                    text-slate-500
                  "
                >
                  Featured Projects
                </p>

                <p
                  className="
                    mt-0.5

                    text-2xl
                    font-extrabold

                    text-[#b88b32]
                  "
                >
                  {projects.length}
                </p>

              </div>

            </div>


            {/* =================================================
                NO FEATURED PROJECTS
            ================================================= */}

            {!projects.length ? (

              <div
                className="
                  flex
                  min-h-[400px]

                  flex-col
                  items-center
                  justify-center

                  text-center
                "
              >

                <div
                  className="
                    flex
                    h-16
                    w-16

                    items-center
                    justify-center

                    rounded-2xl

                    bg-slate-50
                  "
                >

                  <Building2
                    size={28}
                    className="
                      text-slate-300
                    "
                  />

                </div>


                <h2
                  className="
                    mt-5

                    text-lg
                    font-bold

                    text-slate-900
                  "
                >
                  No Featured Projects
                </h2>


                <p
                  className="
                    mt-2

                    max-w-md

                    text-sm
                    leading-6

                    text-slate-500
                  "
                >
                  Featured projects will appear here once
                  they are added from the admin panel.
                </p>


                <Link
                  to="/projects"
                  className="
                    mt-5

                    inline-flex
                    items-center
                    gap-2

                    rounded-lg

                    border
                    border-slate-200

                    px-4
                    py-2.5

                    text-xs
                    font-bold

                    text-slate-700

                    transition-all
                    duration-300

                    hover:border-[#d6a84f]
                    hover:bg-[#d6a84f]
                    hover:text-white
                  "
                >

                  Browse All Projects

                  <ArrowRight size={14} />

                </Link>

              </div>

            ) : (

              /* =================================================
                 FEATURED PROJECT GRID
              ================================================= */

              <div
                className="
                  mt-10

                  grid
                  grid-cols-1
                  gap-5

                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >

                {projects.map((project) => (

                  <FeaturedProjectCard
                    key={getProjectId(project)}
                    project={project}
                  />

                ))}

              </div>

            )}

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}


export default FeaturedProjectsPage;