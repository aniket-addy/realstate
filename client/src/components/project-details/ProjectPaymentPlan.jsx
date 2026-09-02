import { CheckCircle2 } from "lucide-react";

function ProjectPaymentPlan({ project }) {
  const plans =
    project?.paymentPlan?.length > 0
      ? project.paymentPlan
      : [
          {
            stage: "Booking",
            percentage: "10%",
            description: "At the time of booking",
          },
          {
            stage: "Agreement",
            percentage: "20%",
            description: "On agreement",
          },
          {
            stage: "Construction",
            percentage: "40%",
            description: "As per construction progress",
          },
          {
            stage: "Possession",
            percentage: "30%",
            description: "At possession",
          },
        ];

  return (
    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Payment Plan
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Flexible Payment Structure
          </h2>

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {plans.map((plan, index) => (
            <div
              key={index}
              className="grid gap-3 border-b border-slate-100 p-5 last:border-0 sm:grid-cols-[1fr_120px_1.5fr] sm:items-center"
            >

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={18}
                  className="text-[#c49438]"
                />

                <span className="text-sm font-bold text-[#0f172a]">
                  {plan.stage}
                </span>

              </div>

              <div className="text-lg font-extrabold text-[#0f172a]">
                {plan.percentage}
              </div>

              <p className="text-xs text-slate-500">
                {plan.description}
              </p>

            </div>
          ))}

        </div>

        <p className="mt-4 text-xs text-slate-400">
          *Payment plans are indicative and may vary. Please confirm the
          latest plan with our sales team.
        </p>

      </div>

    </section>
  );
}

export default ProjectPaymentPlan;