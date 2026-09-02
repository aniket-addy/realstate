import {
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function AboutCompany() {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate("/about");
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* =====================================================
              IMAGE SIDE
          ====================================================== */}

          <div className="relative">

            <div className="relative overflow-hidden rounded-3xl">

              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
                alt="Investorise real estate"
                className="
                  h-[420px]
                  w-full
                  object-cover
                  sm:h-[500px]
                "
                loading="lazy"
              />

              {/* Image Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-slate-950/70
                  via-transparent
                  to-transparent
                "
              />

              {/* Experience Card */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/95
                  p-4
                  shadow-xl
                  backdrop-blur-md

                  sm:bottom-7
                  sm:left-7
                "
              >

                <p
                  className="
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-slate-900
                  "
                >
                  10+
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Years of Experience
                </p>

              </div>

            </div>

            {/* Decorative Box */}

            <div
              className="
                absolute
                -bottom-5
                -right-4
                -z-0
                hidden
                h-28
                w-28
                rounded-2xl
                border
                border-[#d6a84f]/30
                bg-[#faf6ed]

                sm:block
              "
            />

          </div>


          {/* =====================================================
              CONTENT SIDE
          ====================================================== */}

          <div>

            {/* Section Label */}

            <div className="mb-3 flex items-center gap-2">

              <span className="h-px w-7 bg-[#d6a84f]" />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                  text-[#b88b32]
                "
              >
                About Investorise
              </span>

            </div>


            {/* Heading */}

            <h2
              className="
                max-w-xl
                text-3xl
                font-extrabold
                leading-tight
                tracking-[-0.03em]
                text-slate-900

                sm:text-4xl
              "
            >
              More Than Property.

              <span className="block text-[#b88b32]">
                We Build Confidence.
              </span>
            </h2>


            {/* Description */}

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-500
              "
            >
              Investorise is a real estate advisory platform focused on
              helping buyers and investors discover the right property,
              project and location for their goals.
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-slate-500
              "
            >
              From authority-led developments to trusted builder projects,
              our approach combines market understanding, project research
              and personalized guidance.
            </p>


            {/* =================================================
                HIGHLIGHTS
            ================================================== */}

            <div className="mt-6 space-y-3">

              {[
                "Curated projects across high-growth locations",
                "Transparent property information",
                "Personalized investment guidance",
                "Support throughout the buying journey",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CheckCircle2
                    size={17}
                    className="
                      shrink-0
                      text-[#b88b32]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-700
                    "
                  >
                    {item}
                  </span>

                </div>

              ))}

            </div>


            {/* =================================================
                MISSION / VISION
            ================================================== */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-2
              "
            >

              {/* Mission */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    shadow-sm
                  "
                >

                  <Target
                    size={17}
                    className="text-[#b88b32]"
                  />

                </div>

                <h3
                  className="
                    mt-3
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Our Mission
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-5
                    text-slate-500
                  "
                >
                  Make real estate decisions simpler, clearer and more
                  rewarding.
                </p>

              </div>


              {/* Vision */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    shadow-sm
                  "
                >

                  <Eye
                    size={17}
                    className="text-[#b88b32]"
                  />

                </div>

                <h3
                  className="
                    mt-3
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Our Vision
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-5
                    text-slate-500
                  "
                >
                  Become a trusted destination for smart real estate
                  investments.
                </p>

              </div>

            </div>


            {/* =================================================
                KNOW MORE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={handleKnowMore}
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-slate-900
                px-5
                py-3
                text-xs
                font-bold
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#b88b32]
                hover:shadow-lg
              "
            >
              Know More About Us

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutCompany;