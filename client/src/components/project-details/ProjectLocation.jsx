import { ExternalLink, MapPin } from "lucide-react";

function ProjectLocation({ project }) {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Location
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Find The Project
          </h2>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MapPin
              size={17}
              className="text-[#c49438]"
            />

            {project?.location || "Project Location"}
          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {project?.locationMap ? (
            <iframe
              src={project.locationMap}
              title="Project Location Map"
              className="h-[420px] w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-slate-100">

              <div className="text-center">

                <MapPin
                  size={38}
                  className="mx-auto text-[#c49438]"
                />

                <p className="mt-3 text-sm font-semibold text-[#0f172a]">
                  Location map will appear here
                </p>

              </div>

            </div>
          )}

        </div>

        {project?.mapUrl && (
          <a
            href={project.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0f172a] hover:text-[#b88b32]"
          >
            Open in Maps
            <ExternalLink size={15} />
          </a>
        )}

      </div>

    </section>
  );
}

export default ProjectLocation;