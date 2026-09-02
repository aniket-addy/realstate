function ProjectGallery({ project }) {
  const gallery =
    project?.gallery?.length > 0
      ? project.gallery
      : project?.images || [];

  return (
    <section className="bg-white py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Gallery
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Explore The Project
          </h2>

        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

            {gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >

                <img
                  src={image}
                  alt={`${project?.name || "Project"} gallery ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 py-24 text-center">

            <p className="text-sm text-slate-400">
              Project gallery will appear here.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}

export default ProjectGallery;