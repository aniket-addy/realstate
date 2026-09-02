import { IndianRupee, Tag } from "lucide-react";

function ProjectPrice({ project }) {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Pricing
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Price List
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {project?.priceList?.length > 0 ? (
            project.priceList.map((item, index) => (
              <div
                key={item._id || index}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff9ed]">
                    <Tag
                      size={18}
                      className="text-[#c49438]"
                    />
                  </div>

                  <h3 className="font-bold text-[#0f172a]">
                    {item.type || "Property"}
                  </h3>

                </div>

                <p className="mt-5 text-2xl font-extrabold text-[#0f172a]">
                  {item.price || "Price on Request"}
                </p>

                {item.size && (
                  <p className="mt-1 text-xs text-slate-500">
                    {item.size}
                  </p>
                )}

              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-7 md:col-span-2 lg:col-span-3">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff9ed]">
                  <IndianRupee
                    size={22}
                    className="text-[#c49438]"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0f172a]">
                    Price information
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Contact our team for the latest price list.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default ProjectPrice;