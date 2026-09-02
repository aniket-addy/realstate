import { useEffect, useState } from "react";

import {
  ArrowRight,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Ruler,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getAuthorityProjects,
} from "../../services/authorityProjectService";

import {
  getBuilderProjects,
} from "../../services/builderProjectService";

import {
  filterProjectsBySection,
  getProjectImage,
  getProjectPrice,
  getProjectType,
} from "../../utils/projectutils";


// =========================================================
// PROJECT CARD
// =========================================================

function ProjectCard({ project }) {
  const type = getProjectType(project);

  const isPlot =
    String(type).toLowerCase().includes("plot");

  const projectId =
    project?._id ||
    project?.id;

  const projectUrl = projectId
    ? `/projects/${projectId}`
    : "#";


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
          aspect-[1.55/1]
          overflow-hidden
        "
      >

        {getProjectImage(project) ? (

          <img
            src={getProjectImage(project)}
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


        {/* =================================================
            IMAGE OVERLAY
        ================================================= */}

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


        {/* =================================================
            CATEGORY
        ================================================= */}

        {project?.category && (

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
              {project.category}
            </span>

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
      ===================================================== */}

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
            TITLE
        ================================================= */}

        <Link
          to={projectUrl}
        >

          <h3
            className="
              text-[16px]
              font-bold
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


        {/* =================================================
            LOCATION
        ================================================= */}

        {project?.location && (

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
              {project.location}
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

          {/* =================================================
              TYPE
          ================================================= */}

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
              {type || "Property"}
            </span>

          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          {getProjectPrice(project) && (

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
                {getProjectPrice(project)}
              </p>

            </div>

          )}

        </div>


        {/* =================================================
            BUTTON
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
// FEATURED PROJECTS
// =========================================================

function FeaturedProjects() {

  const [
    projects,
    setProjects,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  // =======================================================
  // LOAD PROJECTS
  // =======================================================

  useEffect(() => {

    let mounted = true;


    async function loadProjects() {

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
        // FEATURED
        // =================================================

        const featured =
          filterProjectsBySection(
            allProjects,
            "featured"
          );


        // =================================================
        // SET DATA
        // =================================================

        if (mounted) {

          setProjects(
            featured
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


    loadProjects();


    return () => {

      mounted = false;

    };

  }, []);


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (

      <section
        className="
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
              grid
              grid-cols-1
              gap-5

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {[1, 2, 3, 4].map(
              (item) => (

                <div
                  key={item}
                  className="
                    h-[430px]

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

    );

  }


  // =======================================================
  // ERROR
  // =======================================================

  if (error) {
    return null;
  }


  // =======================================================
  // NO FEATURED PROJECTS
  // =======================================================

  if (!projects.length) {
    return null;
  }


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <section
      className="
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

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            {/* SECTION LABEL */}

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
                  w-6

                  bg-[#d6a84f]
                "
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.18em]

                  text-[#b88b32]
                "
              >
                Featured Projects
              </span>

            </div>


            {/* TITLE */}

            <h2
              className="
                text-3xl
                font-extrabold
                tracking-[-0.03em]

                text-slate-900

                sm:text-4xl
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

            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                mt-3

                max-w-[600px]

                text-sm
                leading-6

                text-slate-500
              "
            >
              Explore carefully selected authority and builder
              projects offering strong locations, trusted
              development and promising investment opportunities.
            </p>

          </div>


          {/* =================================================
              VIEW ALL PROJECTS
          ================================================= */}

          <Link
            to="/projects"
            className="
              group

              inline-flex
              shrink-0
              items-center
              gap-2

              self-start

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

              hover:shadow-[0_8px_18px_rgba(214,168,79,0.22)]

              sm:self-auto
            "
          >

            View All Projects

            <ArrowRight
              size={14}
              className="
                transition-transform

                group-hover:translate-x-1
              "
            />

          </Link>

        </div>


        {/* =================================================
            PROJECT CARDS
        ================================================= */}

        <div
          className="
            relative
            mt-10
          "
        >

          <div
            className="
              grid
              grid-cols-1
              gap-5

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {projects
              .slice(0, 4)
              .map((project) => (

                <ProjectCard
                  key={
                    project?._id ||
                    project?.id
                  }
                  project={project}
                />

              ))}

          </div>


          {/* =================================================
              ARROWS
          ================================================= */}

          {projects.length > 4 && (

            <>

              {/* PREVIOUS */}

              <button
                type="button"
                aria-label="Previous projects"
                className="
                  absolute

                  -right-5
                  top-1/2

                  hidden

                  h-10
                  w-10

                  -translate-y-1/2
                  translate-x-full

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-slate-200

                  bg-white

                  text-slate-700

                  shadow-md

                  transition-all
                  duration-300

                  hover:border-[#d6a84f]
                  hover:bg-[#d6a84f]
                  hover:text-white

                  hover:shadow-[0_8px_18px_rgba(214,168,79,0.22)]

                  xl:flex
                "
              >

                <ChevronLeft
                  size={18}
                />

              </button>


              {/* NEXT */}

              <button
                type="button"
                aria-label="Next projects"
                className="
                  absolute

                  -right-5
                  top-1/2

                  hidden

                  h-10
                  w-10

                  -translate-y-1/2

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-slate-200

                  bg-white

                  text-slate-700

                  shadow-md

                  transition-all
                  duration-300

                  hover:border-[#d6a84f]
                  hover:bg-[#d6a84f]
                  hover:text-white

                  hover:shadow-[0_8px_18px_rgba(214,168,79,0.22)]

                  xl:flex
                "
              >

                <ChevronRight
                  size={18}
                />

              </button>

            </>

          )}

        </div>


        {/* =================================================
            TRUST STRIP
        ================================================= */}

        <div
          className="
            mt-8

            grid
            grid-cols-1
            gap-3

            sm:grid-cols-3
          "
        >

          {/* =================================================
              AUTHORITY & BUILDER
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3

              rounded-xl

              bg-slate-50

              px-4
              py-3.5

              transition-all
              duration-300

              hover:border
              hover:border-[#ead6a8]

              hover:bg-[#fffaf0]
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-lg

                bg-white

                shadow-sm
              "
            >

              <Building2
                size={16}
                className="
                  text-[#b88b32]
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold

                  text-slate-800
                "
              >
                Authority & Builder
              </p>

              <p
                className="
                  mt-0.5

                  text-[10px]

                  text-slate-500
                "
              >
                Curated project options
              </p>

            </div>

          </div>


          {/* =================================================
              PRIME LOCATIONS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3

              rounded-xl

              bg-slate-50

              px-4
              py-3.5

              transition-all
              duration-300

              hover:border
              hover:border-[#ead6a8]

              hover:bg-[#fffaf0]
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-lg

                bg-white

                shadow-sm
              "
            >

              <MapPin
                size={16}
                className="
                  text-[#b88b32]
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold

                  text-slate-800
                "
              >
                Prime Locations
              </p>

              <p
                className="
                  mt-0.5

                  text-[10px]

                  text-slate-500
                "
              >
                Growth-focused destinations
              </p>

            </div>

          </div>


          {/* =================================================
              PROPERTY TYPES
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3

              rounded-xl

              bg-slate-50

              px-4
              py-3.5

              transition-all
              duration-300

              hover:border
              hover:border-[#ead6a8]

              hover:bg-[#fffaf0]
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-lg

                bg-white

                shadow-sm
              "
            >

              <Ruler
                size={16}
                className="
                  text-[#b88b32]
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold

                  text-slate-800
                "
              >
                Multiple Property Types
              </p>

              <p
                className="
                  mt-0.5

                  text-[10px]

                  text-slate-500
                "
              >
                Plots, apartments & villas
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}


export default FeaturedProjects;