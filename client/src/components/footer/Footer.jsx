import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Properties", path: "/properties" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact Us", path: "/contact" },
];

const projectLinks = [
  { label: "Authority Projects", path: "/projects/authority" },
  { label: "Builder Projects", path: "/projects/builder" },
  { label: "Residential Projects", path: "/projects/residential" },
  { label: "Commercial Projects", path: "/projects/commercial" },
];

const propertyLinks = [
  { label: "Residential", path: "/properties/residential" },
  { label: "Commercial", path: "/properties/commercial" },
  { label: "Plots", path: "/properties/plots" },
  { label: "Villas", path: "/properties/villas" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* =================================================
              BRAND
          ================================================== */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              {/* Logo */}
              <div className="relative flex h-11 w-11 items-end justify-center overflow-hidden rounded-lg bg-white">

                <div className="absolute bottom-0 left-[7px] h-7 w-[7px] rounded-t-sm bg-slate-900" />

                <div className="absolute bottom-0 left-[17px] h-9 w-[7px] rounded-t-sm bg-slate-900" />

                <div className="absolute bottom-0 right-[7px] h-6 w-[7px] rounded-t-sm bg-slate-900" />

                <div className="absolute left-[15px] top-[4px] h-2 w-2 rotate-45 bg-[#d6a84f]" />

              </div>

              <div className="leading-none">

                <div className="text-[19px] font-extrabold tracking-[0.08em]">
                  INVESTORISE
                </div>

                <div className="mt-1 text-[8px] font-medium tracking-[0.12em] text-slate-500">
                  INVEST IN BETTER TOMORROW
                </div>

              </div>

            </Link>

            {/* Description */}
            <p className="mt-5 max-w-sm text-xs leading-6 text-slate-400">
              A modern real estate advisory platform helping you discover
              trusted projects, properties and investment opportunities.
            </p>

            {/* =================================================
                CONTACT DETAILS
            ================================================== */}

            <div className="mt-6 space-y-3">

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-xs text-slate-300 transition hover:text-white"
              >
                <Phone
                  size={14}
                  className="text-[#e0b65c]"
                />

                <span>
                  +91 98765 43210
                </span>
              </a>

              <a
                href="mailto:hello@investorise.com"
                className="flex items-center gap-2.5 text-xs text-slate-300 transition hover:text-white"
              >
                <Mail
                  size={14}
                  className="text-[#e0b65c]"
                />

                <span>
                  hello@investorise.com
                </span>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">

                <MapPin
                  size={14}
                  className="text-[#e0b65c]"
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

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[13px] font-bold text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[12px] font-bold text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                IG
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                in
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[9px] font-bold text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                ▶
              </a>

            </div>

          </div>

          {/* =================================================
              COMPANY
          ================================================== */}

          <div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              {companyLinks.map((link) => (
                <li key={link.label}>

                  <Link
                    to={link.path}
                    className="text-xs text-slate-400 transition hover:text-[#e0b65c]"
                  >
                    {link.label}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =================================================
              PROJECTS
          ================================================== */}

          <div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Projects
            </h3>

            <ul className="mt-5 space-y-3">

              {projectLinks.map((link) => (
                <li key={link.label}>

                  <Link
                    to={link.path}
                    className="text-xs text-slate-400 transition hover:text-[#e0b65c]"
                  >
                    {link.label}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =================================================
              PROPERTIES
          ================================================== */}

          <div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Properties
            </h3>

            <ul className="mt-5 space-y-3">

              {propertyLinks.map((link) => (
                <li key={link.label}>

                  <Link
                    to={link.path}
                    className="text-xs text-slate-400 transition hover:text-[#e0b65c]"
                  >
                    {link.label}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>

            <p className="text-sm font-bold text-white">
              Looking for your next property?
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Talk to our experts and discover opportunities matching your
              requirements.
            </p>

          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6a84f] px-5 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-[#e0b65c]"
          >
            Talk To An Expert

            <ArrowUp
              size={14}
              className="rotate-45"
            />
          </Link>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} Investorise. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/privacy-policy"
              className="text-[10px] text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-[10px] text-slate-500 transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-400 transition hover:text-white"
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