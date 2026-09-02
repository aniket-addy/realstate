import {
  ArrowRight,
  Building2,
  FileCheck2,
  Handshake,
  MapPinned,
  SearchCheck,
  TrendingUp,
  CheckCircle2,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FloatingActions from "../components/floating-actions/FloatingActions";

/* =========================================================
   SERVICES DATA
========================================================= */

const services = [
  {
    id: 1,
    icon: SearchCheck,
    number: "01",
    title: "Property Discovery",
    description:
      "Find residential, commercial and land opportunities that match your requirements.",
    features: [
      "Verified property options",
      "Location-based recommendations",
      "Requirement-based property search",
    ],
  },
  {
    id: 2,
    icon: TrendingUp,
    number: "02",
    title: "Investment Advisory",
    description:
      "Get guidance on locations, projects and opportunities based on your investment goals.",
    features: [
      "Investment-focused guidance",
      "Location insights",
      "Project comparison",
    ],
  },
  {
    id: 3,
    icon: MapPinned,
    number: "03",
    title: "Site Visit Assistance",
    description:
      "Plan and coordinate property visits so you can experience projects before deciding.",
    features: [
      "Site visit coordination",
      "Project walkthrough",
      "Location assistance",
    ],
  },
  {
    id: 4,
    icon: FileCheck2,
    number: "04",
    title: "Documentation Support",
    description:
      "Get assistance throughout the documentation and property buying process.",
    features: [
      "Documentation guidance",
      "Buying process support",
      "Transaction coordination",
    ],
  },
  {
    id: 5,
    icon: Handshake,
    number: "05",
    title: "Deal Assistance",
    description:
      "Our team helps you move from property selection to a smoother transaction.",
    features: [
      "Deal coordination",
      "Property selection support",
      "Transaction assistance",
    ],
  },
  {
    id: 6,
    icon: Building2,
    number: "06",
    title: "Project Consultation",
    description:
      "Understand project details, amenities, location advantages and investment potential.",
    features: [
      "Project details",
      "Amenities & location insights",
      "Investment potential discussion",
    ],
  },
];

/* =========================================================
   SERVICES PAGE
========================================================= */

function Services() {
  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      <main>

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-slate-950">

          {/* Background */}
          <div className="absolute inset-0">

            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
              alt="Real estate services"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-slate-950/75" />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

          </div>

          {/* Hero Content */}

          <div className="relative mx-auto max-w-[1240px] px-4 py-28 sm:px-6 sm:py-32 lg:px-8 lg:py-36">

            <div className="max-w-[720px]">

              {/* Eyebrow */}

              <div className="mb-5 flex items-center gap-2">

                <span className="h-px w-8 bg-[#d6a84f]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e0b65c] sm:text-[11px]">
                  Our Services
                </span>

              </div>

              {/* Heading */}

              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">

                Real Estate
                <br />

                <span className="text-[#e0b65c]">
                  Services
                </span>

                <br />

                Built Around You.

              </h1>

              {/* Description */}

              <p className="mt-6 max-w-[580px] text-sm leading-7 text-slate-300 sm:text-base">
                From finding the right property to completing your
                investment journey, Investorise provides end-to-end
                real estate support designed around your requirements.
              </p>

              {/* CTA */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/contact"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#d6a84f]
                    px-6
                    py-3.5
                    text-xs
                    font-extrabold
                    text-slate-950
                    transition
                    hover:bg-[#e3bb67]
                  "
                >
                  Talk To Our Experts

                  <ArrowRight size={15} />
                </Link>

                <a
                  href="tel:+919876543210"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    px-6
                    py-3.5
                    text-xs
                    font-bold
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white/15
                  "
                >
                  <Phone size={15} />

                  Call Us Now
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="bg-white py-16 sm:py-20 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

              {/* Left */}

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#d6a84f]" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                    Why Investorise
                  </span>

                </div>

                <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.035em] text-slate-900 sm:text-4xl">
                  More Than Just
                  <span className="block text-[#b88b32]">
                    Property Listings.
                  </span>
                </h2>

              </div>

              {/* Right */}

              <div>

                <p className="text-sm leading-7 text-slate-500 sm:text-base">
                  Real estate decisions involve more than finding a
                  property. Our services are designed to help you
                  understand opportunities, compare projects and move
                  forward with greater clarity.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                  Whether you are buying your first property or looking
                  for an investment opportunity, our team is here to
                  support you throughout the journey.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">

          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

            {/* Header */}

            <div className="max-w-[680px]">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-px w-7 bg-[#d6a84f]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                  What We Do
                </span>

              </div>

              <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-900 sm:text-4xl">
                Complete Real Estate
                <span className="text-[#b88b32]">
                  {" "}Support
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Explore our services designed to make your property
                journey simpler and more confident.
              </p>

            </div>

            {/* Grid */}

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              {services.map((service) => {

                const Icon = service.icon;

                return (
                  <article
                    key={service.id}
                    className="
                      group
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-6
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#d6a84f]/40
                      hover:shadow-xl
                      sm:p-7
                    "
                  >

                    {/* Top */}

                    <div className="flex items-start justify-between">

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#f7f0e2]
                        "
                      >
                        <Icon
                          size={21}
                          strokeWidth={1.8}
                          className="text-[#b88b32]"
                        />
                      </div>

                      <span className="text-sm font-extrabold text-slate-200">
                        {service.number}
                      </span>

                    </div>

                    {/* Content */}

                    <h3 className="mt-6 text-lg font-extrabold text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    {/* Features */}

                    <div className="mt-5 space-y-2.5">

                      {service.features.map(
                        (feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >

                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-[#b88b32]"
                            />

                            <span className="text-xs font-medium text-slate-600">
                              {feature}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                    {/* Bottom */}

                    <div className="mt-7 border-t border-slate-100 pt-5">

                      <Link
                        to="/contact"
                        className="
                          group/link
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-extrabold
                          text-slate-900
                          transition
                          hover:text-[#b88b32]
                        "
                      >
                        Get Assistance

                        <ArrowRight
                          size={14}
                          className="
                            transition-transform
                            group-hover/link:translate-x-1
                          "
                        />
                      </Link>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>

        </section>

        {/* =====================================================
            CTA SECTION
        ====================================================== */}

        <section className="bg-white py-16 sm:py-20">

          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-10 lg:px-16">

              {/* Decorative */}

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d6a84f]/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#d6a84f]/10 blur-3xl" />

              <div className="relative">

                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e0b65c]">
                  Let's Talk
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Looking For The Right
                  <span className="text-[#e0b65c]">
                    {" "}Property?
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
                  Tell us what you are looking for and our team will
                  help you explore the right opportunities.
                </p>

                <Link
                  to="/contact"
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#d6a84f]
                    px-6
                    py-3.5
                    text-xs
                    font-extrabold
                    text-slate-950
                    transition
                    hover:bg-[#e3bb67]
                  "
                >
                  Contact Our Team

                  <ArrowRight size={15} />
                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          FLOATING ACTIONS
      ====================================================== */}

      <FloatingActions />

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}

export default Services;