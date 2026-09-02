import {
  Heart,
  MapPin,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const projectId = project?._id || project?.id;

  const handleProjectClick = () => {
    if (!projectId) {
      console.error("Project ID missing:", project);
      return;
    }

    navigate(`/projects/${projectId}`);
  };

  /* =========================================================
     IMAGE
  ========================================================= */

  const image =
    project?.propertyImage ||
    project?.image ||
    project?.images?.[0] ||
    project?.gallery?.[0] ||
    "";

  /* =========================================================
     DATA
  ========================================================= */

  const title =
    project?.title ||
    project?.name ||
    "Untitled Project";

  const location =
    project?.location ||
    project?.city ||
    "Location not available";

  const price =
    project?.price !== undefined &&
    project?.price !== null &&
    project?.price !== ""
      ? project.price
      : null;

  const priceType =
    project?.priceType ||
    project?.priceUnit ||
    "";

  const projectType =
    project?.projectType ||
    project?.propertyType ||
    project?.category ||
    "Project";

  const area =
    project?.area ||
    project?.plotSize ||
    project?.size ||
    null;

  return (
    <article
      onClick={handleProjectClick}
      className="
        group
        relative
        flex
        h-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-[22px]

        border
        border-[#e2e8f0]

        bg-white

        shadow-[0_8px_30px_rgba(15,23,42,0.06)]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-[#d6a84f]
        hover:shadow-[0_20px_50px_rgba(214,168,79,0.20)]
      "
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          h-[255px]
          overflow-hidden

          sm:h-[270px]

          lg:h-[260px]
        "
      >

        {image ? (
          <img
            src={image}
            alt={title}
            className="
              h-full
              w-full
              object-cover

              transition-transform
              duration-700
              ease-out

              group-hover:scale-[1.06]
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

              bg-[#f8fafc]

              text-sm
              text-[#64748b]
            "
          >
            No Image Available
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
            from-black/65
            via-black/5
            to-transparent

            transition-opacity
            duration-300
          "
        />

        {/* =================================================
            PROJECT TYPE
        ================================================= */}

        <div
          className="
            absolute
            left-4
            top-4

            rounded-full

            bg-white

            px-3.5
            py-2

            text-[10px]
            font-bold
            uppercase
            tracking-[0.1em]

            text-[#102b52]

            shadow-lg

            transition-all
            duration-300

            group-hover:bg-[#d6a84f]
            group-hover:text-white
          "
        >
          {projectType}
        </div>

        {/* =================================================
            HEART
        ================================================= */}

        <button
          type="button"
          aria-label="Add project to wishlist"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="
            absolute
            right-4
            top-4

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            bg-white

            text-[#102b52]

            shadow-lg

            transition-all
            duration-200

            hover:scale-105
            hover:bg-[#d6a84f]
            hover:text-white
          "
        >
          <Heart
            size={19}
            strokeWidth={1.8}
          />
        </button>

        {/* =================================================
            LOCATION ON IMAGE
        ================================================= */}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4

            flex
            items-center
            gap-2

            text-sm
            font-medium
            text-white
          "
        >
          <MapPin
            size={16}
            className="shrink-0"
          />

          <span className="truncate">
            {location}
          </span>
        </div>

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col

          bg-white

          p-5

          sm:p-6

          transition-colors
          duration-300
        "
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            line-clamp-1

            text-[20px]
            font-extrabold
            tracking-[-0.025em]

            text-[#102b52]

            transition-colors
            duration-300

            group-hover:text-[#102b52]
          "
        >
          {title}
        </h3>

        {/* =================================================
            LOCATION
        ================================================= */}

        <div
          className="
            mt-2

            flex
            items-center
            gap-1.5

            text-sm
            text-[#64748b]
          "
        >
          <MapPin
            size={15}
            className="
              text-[#d6a84f]

              transition-transform
              duration-300

              group-hover:scale-110
            "
          />

          <span className="truncate">
            {location}
          </span>
        </div>

        {/* =================================================
            META
        ================================================= */}

        {(area ||
          project?.bhkType ||
          project?.configuration) && (
          <div
            className="
              mt-5

              flex
              flex-wrap
              gap-2
            "
          >

            {area && (
              <div
                className="
                  flex
                  items-center
                  gap-1.5

                  rounded-lg

                  bg-[#f8fafc]

                  px-3
                  py-2

                  text-xs
                  font-medium
                  text-[#475569]

                  transition-all
                  duration-300

                  group-hover:bg-[#fff9ed]
                  group-hover:text-[#8c691f]
                "
              >
                <Maximize2 size={13} />

                {area}
              </div>
            )}

            {(project?.bhkType ||
              project?.configuration) && (
              <div
                className="
                  rounded-lg

                  bg-[#f8fafc]

                  px-3
                  py-2

                  text-xs
                  font-medium
                  text-[#475569]

                  transition-all
                  duration-300

                  group-hover:bg-[#fff9ed]
                  group-hover:text-[#8c691f]
                "
              >
                {project?.bhkType ||
                  project?.configuration}
              </div>
            )}

          </div>
        )}

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div
          className="
            my-5

            h-px

            bg-[#e8edf3]

            transition-colors
            duration-300

            group-hover:bg-[#ead6a8]
          "
        />

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div
          className="
            mt-auto

            flex
            items-end
            justify-between

            gap-4
          "
        >

          {/* =================================================
              PRICE
          ================================================= */}

          <div>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]

                text-[#94a3b8]
              "
            >
              Starting From
            </p>

            {price !== null ? (
              <p
                className="
                  mt-1

                  text-[20px]
                  font-extrabold

                  text-[#102b52]

                  transition-colors
                  duration-300

                  group-hover:text-[#b4872f]
                "
              >
                ₹{price}

                {priceType && (
                  <span
                    className="
                      ml-1

                      text-xs
                      font-medium

                      text-[#64748b]
                    "
                  >
                    {priceType}
                  </span>
                )}
              </p>
            ) : (
              <p
                className="
                  mt-1

                  text-sm
                  font-semibold

                  text-[#102b52]
                "
              >
                Price on Request
              </p>
            )}

          </div>

          {/* =================================================
              VIEW DETAILS
          ================================================= */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleProjectClick();
            }}
            className="
              group/button

              flex
              shrink-0
              items-center
              gap-2

              rounded-full

              border
              border-[#d9e0e8]

              px-4
              py-2.5

              text-sm
              font-semibold

              text-[#102b52]

              transition-all
              duration-300

              hover:border-[#d6a84f]
              hover:bg-[#d6a84f]
              hover:text-white

              hover:shadow-[0_8px_20px_rgba(214,168,79,0.25)]
            "
          >
            View Details

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-200

                group-hover/button:translate-x-0.5
                group-hover/button:-translate-y-0.5
              "
            />
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProjectCard;