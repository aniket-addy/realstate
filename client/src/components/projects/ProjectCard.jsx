import {
  Building2,
  Heart,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function ProjectCard({ project }) {
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
        border-border-primary
        bg-white
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}

      <div
        className="
          relative
          h-[190px]
          shrink-0
          overflow-hidden

          sm:h-[200px]

          lg:h-[210px]
        "
      >

        {/* Project Image */}

        <img
          src={project.image}
          alt={project.title || "New Project"}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />


        {/* Image Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent
          "
        />


        {/* =================================================
            STATUS BADGE
        ================================================= */}

        {project.status && (
          <span
            className="
              absolute
              left-3
              top-3
              rounded-md
              bg-primary
              px-2.5
              py-1.5
              text-[9px]
              font-semibold
              leading-none
              text-white
              shadow-sm

              sm:text-[10px]
            "
          >
            {project.status}
          </span>
        )}


        {/* =================================================
            WISHLIST BUTTON
        ================================================= */}

        <button
          type="button"
          aria-label={`Add ${
            project.title || "project"
          } to wishlist`}
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/70
            bg-black/20
            text-white
            backdrop-blur-sm
            transition-all
            duration-200

            hover:scale-110
            hover:bg-white
            hover:text-primary

            active:scale-95
          "
        >
          <Heart
            size={19}
            strokeWidth={1.8}
          />
        </button>

      </div>


      {/* =====================================================
          PROJECT CONTENT
      ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-4

          sm:p-4
        "
      >

        {/* =================================================
            PROJECT TITLE
        ================================================= */}

        <h3
          className="
            line-clamp-1
            text-[15px]
            font-bold
            leading-5
            text-primary

            sm:text-[16px]
          "
          title={project.title}
        >
          {project.title || "Untitled Project"}
        </h3>


        {/* =================================================
            LOCATION
        ================================================= */}

        {project.location && (
          <div
            className="
              mt-2
              flex
              min-w-0
              items-center
              gap-1.5
              text-[10px]
              text-text-secondary

              sm:text-[11px]
            "
          >

            <MapPin
              size={13}
              strokeWidth={1.8}
              className="shrink-0 text-primary"
            />

            <span className="truncate">
              {project.location}
            </span>

          </div>
        )}


        {/* =================================================
            PROJECT TYPE
        ================================================= */}

        {project.type && (
          <p
            className="
              mt-2
              line-clamp-1
              text-[10px]
              leading-4
              text-text-secondary

              sm:text-[11px]
            "
          >
            {project.type}
          </p>
        )}


        {/* =================================================
            DEVELOPER
        ================================================= */}

        {project.developer && (
          <p
            className="
              mt-1
              line-clamp-1
              text-[10px]
              leading-4
              text-text-secondary

              sm:text-[11px]
            "
          >
            {project.developer}
          </p>
        )}


        {/* =================================================
            PRICE + VIEW DETAILS
        ================================================= */}

        <div
          className="
            mt-4
            flex
            items-end
            justify-between
            gap-3
          "
        >

          {/* Price */}

          <div className="min-w-0">

            {project.price && (
              <span
                className="
                  block
                  truncate
                  text-[13px]
                  font-bold
                  text-primary

                  sm:text-[14px]
                "
              >
                From {project.price}
              </span>
            )}

          </div>


          {/* View Details */}

          <button
            type="button"
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-md
              border
              border-border-primary
              px-2.5
              py-1.5
              text-[9px]
              font-semibold
              text-primary
              transition-all
              duration-200

              hover:border-primary
              hover:bg-primary
              hover:text-white

              sm:px-3
              sm:text-[10px]
            "
          >
            View Details

            <ArrowRight
              size={11}
              strokeWidth={2}
            />
          </button>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FEATURES
      ===================================================== */}

      <div
        className="
          grid
          min-h-[48px]
          grid-cols-2
          gap-2
          border-t
          border-border-primary
          bg-background-secondary
          px-3
          py-2.5

          sm:px-4
        "
      >

        {/* =================================================
            AMENITIES
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-1.5
          "
        >

          <Building2
            size={14}
            strokeWidth={1.8}
            className="
              shrink-0
              text-primary
            "
          />

          <span
            className="
              line-clamp-1
              text-[9px]
              font-medium
              leading-4
              text-text-secondary

              sm:text-[10px]
            "
          >
            {project.amenities || "Modern Amenities"}
          </span>

        </div>


        {/* =================================================
            RERA / APPROVAL
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            justify-end
            gap-1.5
          "
        >

          <ShieldCheck
            size={14}
            strokeWidth={1.8}
            className="
              shrink-0
              text-primary
            "
          />

          <span
            className="
              line-clamp-1
              text-[9px]
              font-medium
              leading-4
              text-text-secondary

              sm:text-[10px]
            "
          >
            {project.approval || "RERA Approved"}
          </span>

        </div>

      </div>

    </article>
  );
}

export default ProjectCard;