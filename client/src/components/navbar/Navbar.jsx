import { useState } from "react";

import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  callClient,
  CONTACT_CONFIG,
} from "../config/contact";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // ACTIVE ROUTE
  // =========================================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // =========================================================
  // PROJECT ROUTES ACTIVE
  // =========================================================

  const isProjectsActive =
    location.pathname.startsWith("/authority-projects") ||
    location.pathname.startsWith("/builder-projects");

  // =========================================================
  // CENTRAL CALL HANDLER
  // =========================================================

  const handleCallClick = () => {
    const called = callClient();

    // Agar phone number configured nahi hai
    // to Contact page par bhej do
    if (!called) {
      navigate("/contact");
    }
  };

  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setProjectsOpen(false);
  };

  // =========================================================
  // CLOSE PROJECT DROPDOWN
  // =========================================================

  const closeProjectsDropdown = () => {
    setProjectsOpen(false);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-slate-200/80
        bg-white/95
        backdrop-blur-xl
      "
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[72px]
          max-w-[1440px]
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-10
        "
      >
        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="
            group
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          {/* Logo Mark */}

          <div
            className="
              relative
              flex
              h-11
              w-11
              items-end
              justify-center
              overflow-hidden
              rounded-lg
              bg-slate-900
            "
          >
            <div
              className="
                absolute
                bottom-0
                left-[7px]
                h-7
                w-[7px]
                rounded-t-sm
                bg-white
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
                bg-white
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
                bg-white
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
              "
            />
          </div>

          {/* Brand Name */}

          <div className="leading-none">
            <div
              className="
                text-[19px]
                font-extrabold
                tracking-[0.08em]
                text-slate-900
              "
            >
              INVESTORISE
            </div>

            <div
              className="
                mt-1
                text-[8px]
                font-medium
                tracking-[0.12em]
                text-slate-500
              "
            >
              INVEST IN BETTER TOMORROW
            </div>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-7
            lg:flex
          "
        >
          {/* =================================================
              HOME
          ================================================== */}

          <Link
            to="/"
            className={`
              relative
              py-7
              text-[13px]
              font-semibold
              transition
              ${
                isActive("/")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            Home

            {isActive("/") && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#d6a84f]
                "
              />
            )}
          </Link>

          {/* =================================================
              PROJECTS DROPDOWN
          ================================================== */}

          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setProjectsOpen((prev) => !prev);
              }}
              className={`
                relative
                flex
                items-center
                gap-1
                py-7
                text-[13px]
                font-semibold
                transition
                ${
                  isProjectsActive
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              Projects

              <ChevronDown
                size={14}
                className={`
                  transition-transform
                  duration-200
                  ${projectsOpen ? "rotate-180" : ""}
                `}
              />

              {isProjectsActive && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    w-5
                    -translate-x-1/2
                    rounded-full
                    bg-[#d6a84f]
                  "
                />
              )}
            </button>

            {/* =================================================
                PROJECT DROPDOWN
            ================================================== */}

            {projectsOpen && (
              <div
                className="
                  absolute
                  left-1/2
                  top-[58px]
                  w-[270px]
                  -translate-x-1/2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-2
                  shadow-xl
                  shadow-slate-900/10
                "
              >
                {/* =================================================
                    AUTHORITY PROJECTS
                ================================================== */}

                <Link
                  to="/authority-projects"
                  onClick={closeProjectsDropdown}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    px-4
                    py-3
                    transition
                    hover:bg-slate-50
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                    >
                      Authority Projects
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-slate-500
                      "
                    >
                      YEIDA, Dholera & more
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="
                      text-slate-400
                      transition
                      group-hover:translate-x-1
                      group-hover:text-[#b88b32]
                    "
                  />
                </Link>

                {/* =================================================
                    BUILDER PROJECTS
                ================================================== */}

                <Link
                  to="/builder-projects"
                  onClick={closeProjectsDropdown}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    px-4
                    py-3
                    transition
                    hover:bg-slate-50
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                    >
                      Builder Projects
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-slate-500
                      "
                    >
                      Residential, Commercial & more
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="
                      text-slate-400
                      transition
                      group-hover:translate-x-1
                      group-hover:text-[#b88b32]
                    "
                  />
                </Link>
              </div>
            )}
          </div>

          {/* =================================================
              SERVICES
          ================================================== */}

          <Link
            to="/services"
            className={`
              relative
              py-7
              text-[13px]
              font-semibold
              transition
              ${
                isActive("/services")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            Services

            {isActive("/services") && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#d6a84f]
                "
              />
            )}
          </Link>

          {/* =================================================
              ABOUT US
          ================================================== */}

          <Link
            to="/about"
            className={`
              relative
              py-7
              text-[13px]
              font-semibold
              transition
              ${
                isActive("/about")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            About Us

            {isActive("/about") && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#d6a84f]
                "
              />
            )}
          </Link>

          {/* =================================================
              BLOGS
          ================================================== */}

          <Link
            to="/blogs"
            className={`
              relative
              py-7
              text-[13px]
              font-semibold
              transition
              ${
                isActive("/blogs")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            Blogs

            {isActive("/blogs") && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#d6a84f]
                "
              />
            )}
          </Link>

          {/* =================================================
              CONTACT
          ================================================== */}

          <Link
            to="/contact"
            className={`
              relative
              py-7
              text-[13px]
              font-semibold
              transition
              ${
                isActive("/contact")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            Contact

            {isActive("/contact") && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#d6a84f]
                "
              />
            )}
          </Link>
        </nav>

        {/* =====================================================
            DESKTOP CALL CTA
        ====================================================== */}

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={handleCallClick}
            className="
              group
              flex
              items-center
              gap-2.5
              rounded-lg
              bg-slate-900
              px-4
              py-2.5
              text-white
              shadow-lg
              shadow-slate-900/10
              transition
              hover:bg-slate-800
            "
          >
            <Phone
              size={14}
              className="fill-current"
            />

            <span
              className="
                text-[12px]
                font-bold
                tracking-wide
              "
            >
              {CONTACT_CONFIG.phoneDisplay || "Call Us"}
            </span>
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-800
            transition
            hover:bg-slate-50
            lg:hidden
          "
        >
          {mobileMenuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* =======================================================
          MOBILE NAVIGATION
      ======================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            border-t
            border-slate-200
            bg-white
            lg:hidden
          "
        >
          <div
            className="
              mx-auto
              max-w-[1440px]
              px-4
              py-4
              sm:px-6
            "
          >
            {/* =================================================
                HOME
            ================================================== */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                font-semibold
                text-slate-800
                hover:bg-slate-50
              "
            >
              Home
            </Link>

            {/* =================================================
                MOBILE PROJECTS
            ================================================== */}

            <div className="border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setProjectsOpen((prev) => !prev);
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  text-slate-800
                  hover:bg-slate-50
                "
              >
                <span>Projects</span>

                <ChevronDown
                  size={16}
                  className={`
                    transition-transform
                    ${
                      projectsOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {projectsOpen && (
                <div
                  className="
                    mb-2
                    ml-3
                    border-l
                    border-slate-200
                    pl-3
                  "
                >
                  {/* Authority Projects */}

                  <Link
                    to="/authority-projects"
                    onClick={closeMobileMenu}
                    className="
                      block
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      hover:text-slate-900
                    "
                  >
                    Authority Projects
                  </Link>

                  {/* Builder Projects */}

                  <Link
                    to="/builder-projects"
                    onClick={closeMobileMenu}
                    className="
                      block
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      text-slate-600
                      transition
                      hover:bg-slate-50
                      hover:text-slate-900
                    "
                  >
                    Builder Projects
                  </Link>
                </div>
              )}
            </div>

            {/* =================================================
                SERVICES
            ================================================== */}

            <Link
              to="/services"
              onClick={closeMobileMenu}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                font-semibold
                text-slate-800
                hover:bg-slate-50
              "
            >
              Services
            </Link>

            {/* =================================================
                ABOUT US
            ================================================== */}

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                font-semibold
                text-slate-800
                hover:bg-slate-50
              "
            >
              About Us
            </Link>

            {/* =================================================
                BLOGS
            ================================================== */}

            <Link
              to="/blogs"
              onClick={closeMobileMenu}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                font-semibold
                text-slate-800
                hover:bg-slate-50
              "
            >
              Blogs
            </Link>

            {/* =================================================
                CONTACT
            ================================================== */}

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                font-semibold
                text-slate-800
                hover:bg-slate-50
              "
            >
              Contact
            </Link>

            {/* =================================================
                MOBILE CALL CTA
            ================================================== */}

            <button
              type="button"
              onClick={handleCallClick}
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-slate-900
                px-4
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              <Phone
                size={16}
                className="fill-current"
              />

              {CONTACT_CONFIG.phoneDisplay || "Call Us"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;