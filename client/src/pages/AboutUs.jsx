import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import {
  Building2,
  Target,
  Eye,
  Users,
  CheckCircle2,
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar variant="light" />

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#0b1f3a]">

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_80%_20%,rgba(200,160,70,0.18),transparent_35%)]
            "
          />

          <div className="relative mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-10 bg-[#d6a84f]" />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#d6a84f]
                  "
                >
                  About Investorise
                </span>

              </div>
<h1
  className="
    mt-8
    max-w-4xl
    text-4xl
    font-extrabold
    leading-[1.05]
    tracking-[-0.04em]
    !text-white
    sm:text-5xl
    lg:text-6xl
    xl:text-[68px]
  "
>
  <span className="!text-white">
    More Than Property.
  </span>

  <span className="block !text-[#d6a84f]">
    We Build Confidence.
  </span>
</h1>
              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/70

                  sm:text-base
                "
              >
                Investorise is a real estate advisory platform helping
                buyers and investors discover trusted properties,
                projects and locations for smarter real estate decisions.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            COMPANY PROFILE
        ===================================================== */}

        <section className="bg-white py-16 sm:py-20 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

              {/* Image */}

              <div className="overflow-hidden rounded-3xl">

                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
                  alt="Investorise company profile"
                  className="
                    h-[380px]
                    w-full
                    object-cover

                    sm:h-[500px]
                  "
                />

              </div>


              {/* Content */}

              <div>

                <SectionLabel text="Company Profile" />

                <h2
                  className="
                    mt-4
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-[#0b1f3a]

                    sm:text-4xl
                  "
                >
                  Helping You Make
                  <span className="block text-[#b88b32]">
                    Smarter Property Decisions
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  Investorise brings together carefully selected real
                  estate opportunities and practical property guidance
                  to make the buying and investment journey easier.
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  We focus on authority-led developments, trusted builder
                  projects and high-growth locations while keeping the
                  property discovery experience simple and transparent.
                </p>

                <div className="mt-7 space-y-3">

                  {[
                    "Curated real estate opportunities",
                    "Transparent project information",
                    "Location-focused property research",
                    "Personalized buyer guidance",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="text-[#b88b32]"
                      />

                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-700
                        "
                      >
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            MISSION & VISION
        ===================================================== */}

        <section className="bg-[#f8f9fb] py-16 sm:py-20">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-2xl text-center">

              <SectionLabel
                text="Our Purpose"
                center
              />

              <h2
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[#0b1f3a]

                  sm:text-4xl
                "
              >
                Driven By Trust.
                <span className="text-[#b88b32]">
                  {" "}Built For Growth.
                </span>
              </h2>

            </div>


            <div className="mt-12 grid gap-6 md:grid-cols-2">

              {/* Mission */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#faf6ed]
                  "
                >

                  <Target
                    size={22}
                    className="text-[#b88b32]"
                  />

                </div>

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-[#0b1f3a]
                  "
                >
                  Our Mission
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  To make real estate decisions simpler, clearer and
                  more rewarding by providing transparent information,
                  curated opportunities and dependable guidance.
                </p>

              </div>


              {/* Vision */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#faf6ed]
                  "
                >

                  <Eye
                    size={22}
                    className="text-[#b88b32]"
                  />

                </div>

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-[#0b1f3a]
                  "
                >
                  Our Vision
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  To become a trusted destination for smart real estate
                  investments, connecting people with opportunities that
                  support long-term growth and confidence.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TEAM
        ===================================================== */}

        <section className="bg-white py-16 sm:py-20 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div className="text-center">

              <SectionLabel
                text="Our Team"
                center
              />

              <h2
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  text-[#0b1f3a]

                  sm:text-4xl
                "
              >
                People Behind
                <span className="text-[#b88b32]">
                  {" "}Investorise
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Our team combines property knowledge, market understanding
                and customer-focused guidance to help clients make
                confident real estate decisions.
              </p>

            </div>


            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <TeamCard
                name="Leadership Team"
                role="Strategic Direction"
                icon={<Building2 size={24} />}
              />

              <TeamCard
                name="Property Advisors"
                role="Real Estate Advisory"
                icon={<Users size={24} />}
              />

              <TeamCard
                name="Customer Support"
                role="Client Assistance"
                icon={<Target size={24} />}
              />

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}


/* =============================================================
   SECTION LABEL
============================================================= */

function SectionLabel({ text, center = false }) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        ${center ? "justify-center" : ""}
      `}
    >

      <span className="h-px w-8 bg-[#d6a84f]" />

      <span
        className="
          text-[10px]
          font-extrabold
          uppercase
          tracking-[0.2em]
          text-[#b88b32]
        "
      >
        {text}
      </span>

      {center && (
        <span className="h-px w-8 bg-[#d6a84f]" />
      )}

    </div>
  );
}


/* =============================================================
   TEAM CARD
============================================================= */

function TeamCard({ name, role, icon }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        text-center
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#faf6ed]
          text-[#b88b32]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-5
          text-base
          font-bold
          text-[#0b1f3a]
        "
      >
        {name}
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-slate-500
        "
      >
        {role}
      </p>

    </div>
  );
}

export default About;