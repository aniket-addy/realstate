import { useEffect, useState } from "react";

import {
  ArrowRight,
  BedDouble,
  Building2,
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
  normalizeProject,
} from "../../utils/projectutils";


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

  if (!id) {
    return "#";
  }

  return `/projects/${id}`;
}


// =========================================================
// NEW PROJECT CARD
// =========================================================

function NewProjectCard({ project }) {
  const normalizedProject = normalizeProject(project);

  const projectId = getProjectId(normalizedProject);

  const projectUrl = getProjectUrl(normalizedProject);

  const type = getProjectType(normalizedProject);

  const isPlot = String(type)
    .toLowerCase()
    .includes("plot");

  const image = getProjectImage(normalizedProject);

  const title =
    normalizedProject?.name ||
    normalizedProject?.title ||
    "Untitled Project";

  const location =
    normalizedProject?.location ||
    normalizedProject?.city ||
    "Location not available";

  const price = getProjectPrice(normalizedProject);

  const size =
    normalizedProject?.size ||
    normalizedProject?.area ||
    normalizedProject?.plotSize ||
    "";


  // =======================================================
  // DEBUG
  // =======================================================

  const handleClick = () => {
    console.log("NEW PROJECT CLICK:", {
      name: title,
      mongoId: normalizedProject?._id,
      id: normalizedProject?.id,
      projectId,
      projectUrl,
    });
  };


  return (
    <article
      className="
        group
        relative
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
        onClick={handleClick}
        className="
          relative
          block
          h-[230px]
          overflow-hidden

          sm:h-[235px]
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
            from-slate-950/65
            via-slate-950/5
            to-transparent
          "
        />


        {/* =================================================
            STATUS
        ================================================= */}

        {normalizedProject?.status && (
          <span
            className="
              absolute
              left-3
              top-3

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
            {normalizedProject.status}
          </span>
        )}


        {/* =================================================
            PROJECT TYPE FALLBACK
        ================================================= */}

        {!normalizedProject?.status && type && (
          <span
            className="
              absolute
              left-3
              top-3

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
            {type}
          </span>
        )}


        {/* =================================================
            PRICE ON IMAGE
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
          onClick={handleClick}
        >
          <h3
            className="
              line-clamp-1

              text-[16px]
              font-bold
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
            min-h-[24px]
            items-center
            justify-between
            gap-3
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
                "
              />
            ) : (
              <BedDouble
                size={13}
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

                transition-colors
                duration-300

                group-hover:text-[#8c691f]
              "
            >
              {type || "Property"}
            </span>
          </div>


          {/* =================================================
              SIZE
          ================================================= */}

          {size ? (
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

                  transition-colors
                  duration-300

                  group-hover:text-[#8c691f]
                "
              >
                {size}
              </span>
            </div>
          ) : (
            price && (
              <div
                className="
                  shrink-0
                  text-right
                "
              >
                <p
                  className="
                    text-[9px]
                    text-slate-400
                  "
                >
                  Starting
                </p>

                <p
                  className="
                    text-[11px]
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
            )
          )}

        </div>


        {/* =================================================
            VIEW DETAILS BUTTON
        ================================================= */}

        <Link
          to={projectUrl}
          onClick={handleClick}
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
            View Details
          </span>

          <ArrowRight
            size={14}
            className="
              transition-transform
              duration-200

              group-hover:translate-x-0.5
            "
          />

        </Link>

      </div>

    </article>
  );
}


// =========================================================
// NEW PROJECTS SECTION
// =========================================================

function NewProjects() {

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
        // FILTER BY NEW
        // =================================================

        let newProjects =
          filterProjectsBySection(
            normalizedProjects,
            "new"
          );


        // =================================================
        // NEW PROJECT FLAG
        // =================================================

        const sectionIds =
          new Set(
            newProjects.map((project) =>
              getProjectId(project)
            )
          );


        const flagBasedProjects =
          normalizedProjects.filter(
            (project) => {

              const id =
                getProjectId(project);


              const isNew =
                project?.newProject === true ||
                project?.newProject === "true";


              return (
                isNew &&
                !sectionIds.has(id)
              );
            }
          );


        // =================================================
        // COMBINE
        // =================================================

        newProjects = [
          ...newProjects,
          ...flagBasedProjects,
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
          );


        // =================================================
        // SET DATA
        // =================================================

        if (mounted) {

          setProjects(
            uniqueProjects
          );

        }

      } catch (err) {

        console.error(
          "Failed to load new projects:",
          err
        );


        if (mounted) {

          setError(
            "Unable to load new projects."
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
                    h-[390px]
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
  // NO PROJECTS
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
            justify-between
            gap-5

            sm:flex-row
            sm:items-end
          "
        >

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
                New & Upcoming
              </span>

            </div>


            <h2
              className="
                text-3xl
                font-extrabold
                tracking-[-0.03em]

                text-slate-900

                sm:text-4xl
              "
            >
              Explore Our

              <span className="text-[#b88b32]">
                {" "}New Projects
              </span>
            </h2>


            <p
              className="
                mt-3
                max-w-xl

                text-sm
                leading-6

                text-slate-500
              "
            >
              Stay ahead with newly launched and upcoming
              real estate opportunities across high-growth
              locations.
            </p>

          </div>


          {/* =================================================
              VIEW ALL
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
                duration-200

                group-hover:translate-x-1
              "
            />

          </Link>

        </div>


        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <div
          className="
            mt-10

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

              <NewProjectCard
                key={getProjectId(project)}
                project={project}
              />

            ))}

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
                className="text-[#b88b32]"
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
                className="text-[#b88b32]"
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
                className="text-[#b88b32]"
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


export default NewProjects;