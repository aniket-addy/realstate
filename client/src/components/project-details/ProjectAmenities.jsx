import {
  CheckCircle2,
  Dumbbell,
  Trees,
  Wifi,
} from "lucide-react";

function ProjectAmenities({ project }) {
  const fallbackAmenities = [
    {
      name: "Landscaped Gardens",
      icon: Trees,
    },
    {
      name: "Modern Fitness Centre",
      icon: Dumbbell,
    },
    {
      name: "High-Speed Connectivity",
      icon: Wifi,
    },
    {
      name: "24/7 Security",
      icon: CheckCircle2,
    },
  ];

  const amenities =
    project?.amenities?.length > 0
      ? project.amenities.map((item) => ({
          name: typeof item === "string" ? item : item.name,
          icon: CheckCircle2,
        }))
      : fallbackAmenities;

  return (
    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Amenities
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Everything You Need
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

          {amenities.map((item, index) => {
            const Icon = item.icon || CheckCircle2;

            return (
              <div
                key={`${item.name}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#d6a84f]/50 hover:shadow-md"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff9ed]">
                  <Icon
                    size={19}
                    className="text-[#c49438]"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-[#0f172a]">
                  {item.name}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default ProjectAmenities;