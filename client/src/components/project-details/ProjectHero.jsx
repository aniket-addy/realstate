import {
  ArrowLeft,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProjectHero({ project }) {
  const navigate = useNavigate();

  const images =
    project?.images?.length > 0
      ? project.images
      : [
          project?.image ||
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
        ];

  return (
    <section className="bg-[#0f172a]">

      {/* TOP BAR */}

      <div className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-[#d6a84f]"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </button>

          <div className="flex items-center gap-2">

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Share"
            >
              <Share2 size={17} />
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Save"
            >
              <Heart size={17} />
            </button>

          </div>

        </div>

      </div>

      {/* IMAGE GRID */}

      <div className="mx-auto max-w-[1400px] px-3 pb-3 sm:px-5">

        <div className="grid h-[430px] grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">

          <div className="relative overflow-hidden sm:col-span-2 lg:col-span-2 lg:row-span-2">

            <img
              src={images[0]}
              alt={project?.name || "Project"}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">

              <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#0f172a]">
                {project?.projectType || "Featured Project"}
              </span>

              <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                {project?.name || "Project Name"}
              </h1>

              {project?.location && (
                <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
                  <MapPin size={15} />
                  {project.location}
                </div>
              )}

            </div>

          </div>

          {images.slice(1, 4).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="hidden overflow-hidden lg:block"
            >
              <img
                src={image}
                alt={`${project?.name || "Project"} ${index + 2}`}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ProjectHero;