import {
  BadgeCheck,
  Headphones,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";

const trustPoints = [
  {
    id: 1,
    icon: BadgeCheck,
    title: "Verified Projects",
    description:
      "Projects are carefully verified for transparency and reliability.",
  },
  {
    id: 2,
    icon: UserRoundCheck,
    title: "Expert Guidance",
    description:
      "Professional assistance to help you make smarter property decisions.",
  },
  {
    id: 3,
    icon: HandCoins,
    title: "Best Price Guarantee",
    description:
      "Get competitive pricing and transparent property deals.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "End-to-End Support",
    description:
      "From property selection and site visit to documentation and possession.",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "High ROI Potential",
    description:
      "Explore locations and projects selected for long-term growth potential.",
  },
];

function WhyChooseInvestorise() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-7 bg-[#d6a84f]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
              Why Choose Investorise
            </span>

            <span className="h-px w-7 bg-[#d6a84f]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            Your Trust,
            <span className="text-[#b88b32]"> Our Commitment</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            We make your real estate journey simpler, more transparent and
            more confident with expert guidance at every step.
          </p>

        </div>

        {/* =====================================================
            TRUST CARDS
        ====================================================== */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">

            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.id}
                  className="group relative px-5 py-7 text-center transition hover:bg-slate-50"
                >

                  {/* =================================================
                      ICON
                  ================================================== */}

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300 group-hover:border-[#d6a84f]/40 group-hover:bg-[#f9f4e9]">

                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      className="text-slate-700 transition-colors duration-300 group-hover:text-[#b88b32]"
                    />

                  </div>

                  {/* =================================================
                      TITLE
                  ================================================== */}

                  <h3 className="mt-4 text-[13px] font-bold text-slate-900">
                    {point.title}
                  </h3>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <p className="mx-auto mt-2 max-w-[190px] text-[11px] leading-5 text-slate-500">
                    {point.description}
                  </p>

                  {/* Bottom hover indicator */}
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#d6a84f] transition-all duration-300 group-hover:w-12" />

                </div>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            BOTTOM TRUST MESSAGE
        ====================================================== */}

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#eadfc9] bg-[#fbf8f1] px-5 py-4 sm:flex-row sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <ShieldCheck
                size={17}
                className="text-[#b88b32]"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Your investment deserves clarity.
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Talk to our property experts before making your decision.
              </p>
            </div>

          </div>

          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-slate-800"
          >
            Talk To An Expert
          </a>

        </div>

      </div>
    </section>
  );
}

export default WhyChooseInvestorise;