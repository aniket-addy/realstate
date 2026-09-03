import { useState } from "react";

import {
  ArrowUp,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  callClient,
  CONTACT_CONFIG,
} from "../config/contact";

// =========================================================
// COMPANY LINKS
// =========================================================

const companyLinks = [
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Our Services",
    path: "/services",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Contact Us",
    path: "/contact#contact-form",
  },
];

// =========================================================
// PROJECT LINKS
// =========================================================

const projectLinks = [
  {
    label: "Authority Projects",
    path: "/projects/authority",
  },
  {
    label: "Builder Projects",
    path: "/projects/builder",
  },
];

function Footer() {
  const navigate = useNavigate();

  // =========================================================
  // DROPDOWN STATES
  // =========================================================

  const [companyOpen, setCompanyOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  // =========================================================
  // BACK TO TOP
  // =========================================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CENTRAL CALL HANDLER
  // =========================================================

  const handleCallClick = () => {
    const called = callClient();

    if (!called) {
      navigate("/contact");
    }
  };

  return (
    <footer className="bg-slate-950 text-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-12">

          {/* =================================================
              BRAND / CONTACT
          ================================================== */}

          <div>

            {/* BRAND */}

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              {/* LOGO */}

              <div className="relative flex h-11 w-11 items-end justify-center overflow-hidden rounded-lg bg-white sm:h-12 sm:w-12">

                <div
                  className="
                    absolute
                    bottom-0
                    left-[7px]
                    h-7
                    w-[7px]
                    rounded-t-sm
                    bg-slate-900
                    sm:left-[8px]
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-[17px]
                    h-9
                    w-[7px]
                    rounded-t-sm
                    bg-slate-900
                    sm:left-[19px]
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    right-[7px]
                    h-6
                    w-[7px]
                    rounded-t-sm
                    bg-slate-900
                    sm:right-[8px]
                  "
                />

                <div
                  className="
                    absolute
                    left-[15px]
                    top-[4px]
                    h-2
                    w-2
                    rotate-45
                    bg-[#d6a84f]
                    sm:left-[17px]
                  "
                />

              </div>

              {/* BRAND TEXT */}

              <div className="leading-none">

                <div className="text-[18px] font-extrabold tracking-[0.08em] sm:text-[20px]">
                  INVESTORISE
                </div>

                <div className="mt-1 text-[7px] font-medium tracking-[0.12em] text-slate-500 sm:text-[8px]">
                  INVEST IN BETTER TOMORROW
                </div>

              </div>

            </Link>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-sm text-xs leading-6 text-slate-400 sm:text-sm">
              A modern real estate advisory platform helping you discover
              trusted projects, properties and investment opportunities.
            </p>

            {/* =================================================
                CONTACT DETAILS
            ================================================== */}

            <div className="mt-6 space-y-3">

              {/* PHONE */}

              <button
                type="button"
                onClick={handleCallClick}
                className="
                  flex
                  items-center
                  gap-2.5
                  text-xs
                  text-slate-300
                  transition
                  hover:text-white
                  sm:text-sm
                "
              >
                <Phone
                  size={15}
                  className="shrink-0 text-[#e0b65c]"
                />

                <span>
                  {CONTACT_CONFIG.phoneDisplay || "Call Us"}
                </span>
              </button>

              {/* EMAIL */}

              <a
                href={
                  CONTACT_CONFIG.email
                    ? `mailto:${CONTACT_CONFIG.email}`
                    : "/contact"
                }
                className="
                  flex
                  items-center
                  gap-2.5
                  text-xs
                  text-slate-300
                  transition
                  hover:text-white
                  sm:text-sm
                "
              >
                <Mail
                  size={15}
                  className="shrink-0 text-[#e0b65c]"
                />

                <span>
                  {CONTACT_CONFIG.email || "Contact Us"}
                </span>
              </a>

              {/* LOCATION */}

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-xs
                  text-slate-300
                  sm:text-sm
                "
              >
                <MapPin
                  size={15}
                  className="shrink-0 text-[#e0b65c]"
                />

                <span>
                  Delhi NCR, India
                </span>
              </div>

            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <div className="mt-6 flex gap-2">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  text-xs
                  font-bold
                  text-slate-400
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  text-xs
                  font-bold
                  text-slate-400
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                IG
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  text-xs
                  font-bold
                  text-slate-400
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                in
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  text-xs
                  font-bold
                  text-slate-400
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                ▶
              </a>

            </div>

          </div>


          {/* =================================================
              COMPANY + PROJECTS
          ================================================== */}

          <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2 lg:gap-12">

            {/* =================================================
                COMPANY
            ================================================== */}

            <div>

              {/* COMPANY HEADER */}

              <button
                type="button"
                onClick={() => setCompanyOpen((prev) => !prev)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                  text-left
                "
              >

                <span className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
                  Company
                </span>

                <ChevronDown
                  size={17}
                  className={`
                    shrink-0
                    text-[#e0b65c]
                    transition-transform
                    duration-300

                    ${
                      companyOpen
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  `}
                />

              </button>

              {/* COMPANY LINKS */}

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-300

                  ${
                    companyOpen
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >

                <ul className="mt-5 space-y-4">

                  {companyLinks.map((link) => (
                    <li key={link.label}>

                      <Link
                        to={link.path}
                        className="
                          text-xs
                          text-slate-400
                          transition
                          hover:text-[#e0b65c]
                          sm:text-sm
                        "
                      >
                        {link.label}
                      </Link>

                    </li>
                  ))}

                </ul>

              </div>

            </div>


            {/* =================================================
                PROJECTS
            ================================================== */}

            <div>

              {/* PROJECTS HEADER */}

              <button
                type="button"
                onClick={() => setProjectsOpen((prev) => !prev)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                  text-left
                "
              >

                <span className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
                  Projects
                </span>

                <ChevronDown
                  size={17}
                  className={`
                    shrink-0
                    text-[#e0b65c]
                    transition-transform
                    duration-300

                    ${
                      projectsOpen
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  `}
                />

              </button>

              {/* PROJECT LINKS */}

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-300

                  ${
                    projectsOpen
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >

                <ul className="mt-5 space-y-4">

                  {projectLinks.map((link) => (
                    <li key={link.label}>

                      <Link
                        to={link.path}
                        className="
                          text-xs
                          text-slate-400
                          transition
                          hover:text-[#e0b65c]
                          sm:text-sm
                        "
                      >
                        {link.label}
                      </Link>

                    </li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            CTA
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-5
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-5

            sm:mt-12
            sm:p-6

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* CTA CONTENT */}

          <div>

            <p className="text-sm font-bold text-white sm:text-base">
              Looking for your next property?
            </p>

            <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400 sm:text-xs">
              Talk to our experts and discover opportunities matching your
              requirements.
            </p>

          </div>

          {/* CTA BUTTON */}

          <button
            type="button"
            onClick={handleCallClick}
            className="
              inline-flex
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#d6a84f]
              px-5
              py-3
              text-xs
              font-extrabold
              text-slate-950
              transition
              hover:bg-[#e0b65c]

              sm:w-auto
            "
          >
            Talk To An Expert

            <ArrowUp
              size={14}
              className="rotate-45"
            />
          </button>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-white/10">

        <div
          className="
            mx-auto
            flex
            max-w-[1240px]
            flex-col
            gap-4
            px-4
            py-5

            sm:px-6

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >

          {/* COPYRIGHT */}

          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} Investorise. All rights reserved.
          </p>

          {/* LEGAL LINKS */}

          <div className="flex flex-wrap items-center gap-4">

            <Link
              to="/privacy-policy"
              className="
                text-[10px]
                text-slate-500
                transition
                hover:text-white
              "
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="
                text-[10px]
                text-slate-500
                transition
                hover:text-white
              "
            >
              Terms & Conditions
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="
                flex
                items-center
                gap-1
                text-[10px]
                font-bold
                text-slate-400
                transition
                hover:text-white
              "
            >
              Back to Top

              <ArrowUp size={12} />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;