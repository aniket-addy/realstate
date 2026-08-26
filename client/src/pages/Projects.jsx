import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectGrid from "../components/projects/ProjectGrid";

import useProjects from "../hooks/useProjects";

import { LoaderCircle } from "lucide-react";

import projectsBanner from "../assets/images/projects/projects-banner.png";

function Projects() {
  const {
    filteredProjects,
    filters,
    updateFilter,
    clearFilters,
    loading,
    error,
  } = useProjects();

  return (
    <div className="min-h-screen bg-background">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar variant="light" />


      <main>

        {/* =====================================================
            PROJECT HERO
        ===================================================== */}

        <section
          className="
            relative
            h-[430px]
            overflow-visible
            bg-cover
            bg-center
            bg-no-repeat

            sm:h-[470px]

            lg:h-[510px]
          "
          style={{
            backgroundImage: `url(${projectsBanner})`,
          }}
        >

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black/20" />


          {/* Left Gradient */}
          <div
            className="
              absolute
              inset-y-0
              left-0
              w-full
              bg-gradient-to-r
              from-black/70
              via-black/35
              to-transparent

              lg:w-[65%]
            "
          />


          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              pt-[115px]

              sm:pt-[130px]

              lg:pt-[145px]
            "
          >

            <div className="container-site">

              <div className="max-w-[560px]">

                {/* Label */}

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-secondary

                    sm:text-[12px]

                    lg:text-[14px]
                  "
                >
                  New Projects
                </p>


                {/* Heading */}

                <h1
                  className="
                    mt-3
                    max-w-[550px]
                    text-[36px]
                    font-extrabold
                    leading-[1.04]
                    tracking-[-0.04em]
                    text-white

                    sm:text-[46px]

                    lg:text-[60px]
                  "
                >
                  Discover
                  <br />
                  New Projects
                </h1>


                {/* Divider */}

                <div
                  className="
                    mt-5
                    h-[3px]
                    w-[55px]
                    rounded-full
                    bg-secondary

                    sm:mt-6
                    sm:w-[65px]
                  "
                />


                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-[430px]
                    text-[11px]
                    font-medium
                    leading-[1.7]
                    text-white/90

                    sm:text-[13px]

                    lg:text-[15px]
                  "
                >
                  Explore the finest upcoming and new launch
                  projects in prime locations.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              FILTERS
          ================================================= */}

          <div
            className="
              absolute
              left-0
              bottom-[-245px]
              z-30
              w-full

              sm:bottom-[-205px]

              lg:bottom-[-65px]
            "
          >

            <div className="container-site">

              <ProjectFilters
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <section
          className="
            site-section
            pt-[285px]

            sm:pt-[245px]

            lg:pt-[115px]
          "
        >

          <div className="container-site">

            {/* Error */}

            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                "
              >
                <p className="text-xs text-red-600">
                  {error}
                </p>
              </div>
            )}


            {/* Section Heading */}

            {!loading && filteredProjects?.length > 0 && (
              <div className="mb-6">

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
                  New Launches
                </p>

                <h2
                  className="
                    mt-1
                    text-[24px]
                    font-bold
                    tracking-tight
                    text-primary

                    sm:text-[28px]
                  "
                >
                  Our Projects
                </h2>

                <p className="mt-1 text-[11px] text-text-secondary sm:text-[12px]">
                  Handpicked new launch projects for you
                </p>

              </div>
            )}


            {/* Loading */}

            {loading ? (
              <ProjectLoading />
            ) : (
              <ProjectGrid
                projects={filteredProjects}
              />
            )}

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </div>
  );
}


/* =============================================================
   LOADING
============================================================= */

function ProjectLoading() {
  return (
    <div
      className="
        flex
        min-h-[300px]
        items-center
        justify-center
      "
    >

      <div className="flex flex-col items-center gap-3">

        <LoaderCircle
          size={28}
          className="animate-spin text-secondary"
        />

        <p className="text-xs text-text-secondary">
          Loading projects...
        </p>

      </div>

    </div>
  );
}


export default Projects;