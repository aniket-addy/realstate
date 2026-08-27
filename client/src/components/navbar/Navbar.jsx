import { useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ variant = "dark" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    {
      label: "Buy",
      path: "#",
    },
    {
      label: "Rent",
      path: "#",
    },
    {
      label: "Commercial",
      path: "#",
    },
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Locations",
      path: "#",
    },
  ];

  const isLight = variant === "light";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          absolute
          left-0
          top-0
          z-[100]
          w-full

          ${
isLight
  ? "bg-white"
  : "bg-primary"
          }
        `}
      >

        <div className="container-site">

          <nav
            className="
              flex
              h-[64px]
              items-center
              justify-between
              gap-4

              sm:h-[70px]

              lg:h-[78px]
            "
          >

            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >

              {/* Logo Box */}

              <div
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-[9px]
                  border

                  sm:h-10
                  sm:w-10

                  ${
                    isLight
                      ? "border-primary"
                      : "border-secondary"
                  }
                `}
              >

                <span
                  className="
                    text-[16px]
                    font-bold
                    !text-secondary

                    sm:text-lg
                  "
                >
                  H
                </span>

              </div>


              {/* Logo Name */}

              <div className="leading-none">

                <div
                  className={`
                    text-[13px]
                    font-bold
                    tracking-wide

                    sm:text-[16px]

                    ${
                      isLight
                        ? "!text-primary"
                        : "!text-white"
                    }
                  `}
                >
                  HOMETRUE
                </div>


                <div
                  className={`
                    mt-1
                    text-[6px]
                    tracking-[0.10em]

                    sm:text-[7px]

                    ${
                      isLight
                        ? "!text-text-secondary"
                        : "!text-white/75"
                    }
                  `}
                >
                  Find Your True Home
                </div>

              </div>

            </Link>


            {/* =================================================
                DESKTOP NAVIGATION

                lg and above
            ================================================= */}

            <div
              className="
                hidden
                items-center
                gap-7

                lg:flex
                lg:gap-8
              "
            >

              {navLinks.map((item) => {

                const isActive =
                  item.path !== "#" &&
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`
                      relative
                      py-2
                      text-[13px]
                      font-medium
                      transition-colors
                      duration-200

                      ${
                        isActive
                          ? "!text-secondary"
                          : isLight
                            ? "!text-primary hover:!text-secondary"
                            : "!text-white hover:!text-secondary"
                      }
                    `}
                  >

                    {item.label}


                    {/* Active Line */}

                    {isActive && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-full
                          rounded-full
                          bg-secondary
                        "
                      />
                    )}

                  </Link>
                );

              })}

            </div>


            {/* =================================================
                DESKTOP CONTACT

                Only desktop
            ================================================= */}

            <a
              href="tel:+919999999999"
              aria-label="Call Hometrue"
              className={`
                hidden
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-2
                transition-all
                duration-200

                sm:px-4
                sm:py-2.5

                lg:flex

                ${
                  isLight
                    ? `
                      border-primary/20
                      bg-white
                      !text-primary
                      hover:border-primary
                      hover:bg-background-secondary
                    `
                    : `
                      border-white/40
                      bg-primary/50
                      !text-white
                      backdrop-blur-sm
                      hover:border-secondary
                    `
                }
              `}
            >

              {/* Phone Circle */}

              <span
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  ${
                    isLight
                      ? "bg-primary !text-white"
                      : "bg-secondary !text-white"
                  }
                `}
              >

                <PhoneCall
                  size={16}
                  strokeWidth={2}
                  className="!text-white"
                />

              </span>


              {/* Contact Text */}

              <span
                className={`
                  text-[12px]
                  font-semibold

                  ${
                    isLight
                      ? "!text-primary"
                      : "!text-white"
                  }
                `}
              >
                Contact
              </span>

            </a>


            {/* =================================================
                MOBILE / TABLET RIGHT SIDE
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-2

                lg:hidden
              "
            >

              {/* =================================================
                  MOBILE PHONE BUTTON
              ================================================= */}

              <a
                href="tel:+919999999999"
                aria-label="Call Hometrue"
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-200

                  ${
                    isLight
                      ? `
                        border-primary
                        bg-primary
                        !text-white
                        hover:bg-primary/90
                      `
                      : `
                        border-white/50
                        bg-primary/70
                        !text-white
                        hover:bg-primary
                      `
                  }
                `}
              >

                <PhoneCall
                  size={16}
                  strokeWidth={2}
                  className="!text-white"
                />

              </a>


              {/* =================================================
                  HAMBURGER
              ================================================= */}

              <button
                type="button"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={() =>
                  setMobileMenuOpen(
                    (previous) => !previous
                  )
                }
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-200

                  ${
                    isLight
                      ? `
                        border-primary/20
                        bg-white
                        !text-primary
                        hover:bg-background-secondary
                      `
                      : `
                        border-white/50
                        bg-primary/60
                        !text-white
                        hover:bg-primary
                      `
                  }
                `}
              >

                {mobileMenuOpen ? (
                  <X
                    size={19}
                    strokeWidth={2}
                    className={
                      isLight
                        ? "!text-primary"
                        : "!text-white"
                    }
                  />
                ) : (
                  <Menu
                    size={19}
                    strokeWidth={2}
                    className={
                      isLight
                        ? "!text-primary"
                        : "!text-white"
                    }
                  />
                )}

              </button>

            </div>

          </nav>

        </div>


        {/* =====================================================
            NAVBAR BORDER
        ===================================================== */}

        <div
          className={`
            h-px
            w-full

            ${
              isLight
                ? "bg-primary/10"
                : "bg-white/15"
            }
          `}
        />


        {/* =====================================================
            MOBILE / TABLET MENU
        ===================================================== */}

        {mobileMenuOpen && (

          <div
            className={`
              border-t
              shadow-lg

              ${
                isLight
                  ? `
                    border-primary/10
                    bg-white
                  `
                  : `
                    border-white/10
                    bg-primary
                  `
              }
            `}
          >

            <div
              className="
                container-site
                px-4
                pb-3
                pt-2
              "
            >

              <div className="flex flex-col">

                {navLinks.map((item) => {

                  const isActive =
                    item.path !== "#" &&
                    location.pathname === item.path;

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`
                        flex
                        min-h-[46px]
                        items-center
                        border-b
                        text-[13px]
                        font-medium
                        transition-colors
                        duration-200

                        ${
                          isLight
                            ? `
                              border-primary/10
                              !text-primary
                              hover:!text-secondary
                            `
                            : `
                              border-white/10
                              !text-white
                              hover:!text-secondary
                            `
                        }

                        ${
                          isActive
                            ? "!text-secondary"
                            : ""
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );

                })}

              </div>

            </div>

          </div>

        )}

      </header>
    </>
  );
}

export default Navbar;