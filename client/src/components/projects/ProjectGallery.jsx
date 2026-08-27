import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
} from "lucide-react";

function ProjectGallery({ project }) {
  const images = Array.isArray(project?.images)
    ? project.images.filter(Boolean)
    : project?.image
      ? [project.image]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const totalImages = images.length;

  const nextImage = () => {
    if (!totalImages) return;

    setActiveIndex((current) =>
      current === totalImages - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    if (!totalImages) return;

    setActiveIndex((current) =>
      current === 0 ? totalImages - 1 : current - 1
    );
  };

  const activeImage = images[activeIndex];

  return (
    <div className="w-full">

      {/* =====================================================
          MAIN IMAGE
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-border-primary
          bg-background-secondary
        "
      >

        {activeImage ? (
          <img
            src={activeImage}
            alt={project?.title || "Project"}
            className="
              h-[280px]
              w-full
              object-cover

              sm:h-[380px]

              md:h-[450px]

              lg:h-[520px]
            "
          />
        ) : (
          <div
            className="
              flex
              h-[280px]
              w-full
              items-center
              justify-center
              text-text-secondary

              sm:h-[380px]

              md:h-[450px]

              lg:h-[520px]
            "
          >
            <div className="text-center">

              <ImageIcon
                size={42}
                strokeWidth={1.5}
                className="mx-auto mb-2 opacity-50"
              />

              <p className="text-sm">
                No image available
              </p>

            </div>
          </div>
        )}


        {/* =================================================
            IMAGE OVERLAY
        ================================================= */}

        {activeImage && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-black/10
            "
          />
        )}


        {/* =================================================
            STATUS BADGES
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            flex-wrap
            gap-2

            sm:left-4
            sm:top-4
          "
        >

          {project?.verified && (
            <span
              className="
                rounded-md
                bg-emerald-600
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-white
                shadow-sm
              "
            >
              Verified
            </span>
          )}

          {project?.featured && (
            <span
              className="
                rounded-md
                bg-slate-900
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-white
                shadow-sm
              "
            >
              Featured
            </span>
          )}

        </div>


        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
          }}
          aria-label="Save project"
          className="
            absolute
            right-3
            top-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            text-primary
            shadow-md
            transition

            hover:scale-105

            sm:right-4
            sm:top-4
          "
        >
          <Heart
            size={19}
            strokeWidth={1.8}
          />
        </button>


        {/* =================================================
            PREVIOUS BUTTON
        ================================================= */}

        {totalImages > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="
              absolute
              left-2
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              bg-white
              text-primary
              shadow-md
              transition

              hover:scale-105

              sm:left-3
              sm:h-10
              sm:w-10
            "
          >
            <ChevronLeft
              size={21}
              strokeWidth={2}
            />
          </button>
        )}


        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        {totalImages > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="
              absolute
              right-2
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              bg-white
              text-primary
              shadow-md
              transition

              hover:scale-105

              sm:right-3
              sm:h-10
              sm:w-10
            "
          >
            <ChevronRight
              size={21}
              strokeWidth={2}
            />
          </button>
        )}


        {/* =================================================
            PHOTO COUNT
        ================================================= */}

        {totalImages > 0 && (
          <div
            className="
              absolute
              bottom-3
              left-3
              flex
              items-center
              gap-2
              rounded-lg
              bg-slate-900/90
              px-3
              py-2
              text-xs
              font-medium
              text-white

              sm:bottom-4
              sm:left-4
            "
          >
            <ImageIcon
              size={15}
              strokeWidth={1.8}
            />

            <span>
              Photos ({totalImages})
            </span>
          </div>
        )}

      </div>


      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      {totalImages > 1 && (
        <div
          className="
            mt-2
            flex
            gap-2
            overflow-x-auto
            pb-1

            sm:mt-3
          "
        >

          {images.slice(0, 5).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`
                relative
                h-[68px]
                w-[100px]
                shrink-0
                overflow-hidden
                rounded-lg
                border-2
                transition

                sm:h-[72px]
                sm:w-[105px]

                ${
                  activeIndex === index
                    ? "border-primary"
                    : "border-transparent"
                }
              `}
            >

              <img
                src={image}
                alt={`${project?.title || "Project"} ${index + 1}`}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

            </button>
          ))}


          {/* =================================================
              MORE IMAGES
          ================================================= */}

          {totalImages > 5 && (
            <button
              type="button"
              onClick={() => setActiveIndex(5)}
              className="
                relative
                h-[68px]
                w-[100px]
                shrink-0
                overflow-hidden
                rounded-lg
                bg-slate-900
                sm:h-[72px]
                sm:w-[105px]
              "
            >

              <img
                src={images[5]}
                alt="More project images"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  opacity-50
                "
              />

              <span
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                  text-white
                "
              >
                +{totalImages - 5} More
              </span>

            </button>
          )}

        </div>
      )}

    </div>
  );
}

export default ProjectGallery;