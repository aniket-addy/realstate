import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  const exploreLinks = [
    "Buy Properties",
    "Rent Properties",
    "Commercial",
    "New Projects",
    "Locations",
  ];

  const companyLinks = [
    "About Us",
    "Our Agents",
    "Careers",
    "Contact Us",
    "News & Media",
  ];

  const resourceLinks = [
    "Blog",
    "Market Insights",
    "Buying Guide",
    "Selling Guide",
    "FAQs",
  ];

  const supportLinks = [
    "Help Center",
    "Privacy Policy",
    "Terms & Conditions",
    "Cookie Policy",
    "Disclaimer",
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-site">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="grid grid-cols-1 gap-9 py-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1.4fr] lg:gap-8">

          {/* ===================================================
              BRAND
          =================================================== */}
          <div className="min-w-0">

            {/* Logo */}
            <a
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-secondary">
                <span className="text-[17px] font-bold text-secondary">
                  H
                </span>
              </div>

              <div className="leading-none">

                <div className="text-[16px] font-bold tracking-wide text-white">
                  HOMETRUE
                </div>

                <div className="mt-1 text-[7px] tracking-[0.08em] text-white/65">
                  Find Your True Home
                </div>

              </div>
            </a>


            {/* Description */}
            <p className="mt-4 max-w-[230px] text-[10px] leading-[1.6] text-white/65">
              Discover verified properties, new projects and
              perfect spaces that match your lifestyle.
            </p>


            {/* =================================================
                SOCIAL ICONS
            ================================================= */}
            <div className="mt-5 flex items-center gap-4">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/80 transition-colors duration-200 hover:text-secondary"
              >
                <FacebookIcon />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/80 transition-colors duration-200 hover:text-secondary"
              >
                <InstagramIcon />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white/80 transition-colors duration-200 hover:text-secondary"
              >
                <LinkedinIcon />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="text-white/80 transition-colors duration-200 hover:text-secondary"
              >
                <YoutubeIcon />
              </a>

            </div>

          </div>


          {/* ===================================================
              EXPLORE
          =================================================== */}
          <FooterColumn
            title="Explore"
            links={exploreLinks}
          />


          {/* ===================================================
              COMPANY
          =================================================== */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />


          {/* ===================================================
              RESOURCES
          =================================================== */}
          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />


          {/* ===================================================
              SUPPORT
          =================================================== */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />


          {/* ===================================================
              CONTACT
          =================================================== */}
          <div className="min-w-0">

            <h3 className="text-[12px] font-semibold text-white">
              Contact Us
            </h3>

            <div className="mt-4 space-y-3">

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-start gap-2.5 text-[10px] leading-5 text-white/70 transition-colors duration-200 hover:text-secondary"
              >
                <Phone
                  size={14}
                  strokeWidth={1.8}
                  className="mt-[3px] shrink-0"
                />

                <span>
                  +91 98765 43210
                </span>
              </a>


              {/* Email */}
              <a
                href="mailto:hello@hometrue.com"
                className="flex items-start gap-2.5 break-all text-[10px] leading-5 text-white/70 transition-colors duration-200 hover:text-secondary"
              >
                <Mail
                  size={14}
                  strokeWidth={1.8}
                  className="mt-[3px] shrink-0"
                />

                <span>
                  hello@hometrue.com
                </span>
              </a>


              {/* Address */}
              <div className="flex items-start gap-2.5 text-[10px] leading-5 text-white/70">

                <MapPin
                  size={14}
                  strokeWidth={1.8}
                  className="mt-[3px] shrink-0"
                />

                <span>
                  123, Golf Course Road,
                  <br />
                  Gurugram, Haryana 122001
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}


/* =============================================================
   FOOTER COLUMN
============================================================= */

function FooterColumn({
  title,
  links,
}) {
  return (
    <div>

      {/* Heading */}
      <h3 className="text-[12px] font-semibold text-white">
        {title}
      </h3>


      {/* Links */}
      <ul className="mt-4 space-y-3">

        {links.map((link) => (
          <li key={link}>

            <a
              href="#"
              className="text-[11px] leading-4 text-white/70 transition-colors duration-200 hover:text-secondary"
            >
              {link}
            </a>

          </li>
        ))}

      </ul>

    </div>
  );
}


/* =============================================================
   FACEBOOK
============================================================= */

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z" />
    </svg>
  );
}


/* =============================================================
   INSTAGRAM
============================================================= */

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


/* =============================================================
   LINKEDIN
============================================================= */

function LinkedinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.4h3.8V21H3.3V9.4ZM9.5 9.4h3.6V11c.5-1 1.7-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-3.8v-5.3c0-1.3 0-3-1.9-3-1.9 0-2.2 1.5-2.2 2.9V21H9.5V9.4Z" />
    </svg>
  );
}


/* =============================================================
   YOUTUBE
============================================================= */

function YoutubeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

export default Footer;