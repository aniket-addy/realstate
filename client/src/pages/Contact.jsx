import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ContactSection from "../components/contact/ContactSection";

import {
  CONTACT_CONFIG,
  callClient,
} from "../components/config/contact";

function Contact() {
  const navigate = useNavigate();

  /*
  ============================================================
  SCROLL TO CONTACT FORM
  ============================================================
  Handles:

  /contact
  /contact#contact-form

  Footer "Talk To An Expert" uses:

  /contact#contact-form
  ============================================================
  */

  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const timer = setTimeout(() => {
        const element = document.getElementById("contact-form");

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  /*
  ============================================================
  CALL US
  ============================================================
  */

  const handleCall = () => {
    const called = callClient();

    // Agar phone number config mein nahi hai
    // to contact form par le jayega.
    if (!called) {
      navigate("/contact#contact-form");
    }
  };

  /*
  ============================================================
  WHATSAPP
  ============================================================
  */

  const handleWhatsApp = () => {
    const whatsappNumber = CONTACT_CONFIG?.whatsapp;

    // Agar WhatsApp number configured nahi hai
    // to contact form par le jayega.
    if (!whatsappNumber) {
      navigate("/contact#contact-form");
      return;
    }

    // Number se +, spaces, -, brackets etc. remove
    const cleanNumber = whatsappNumber.replace(/\D/g, "");

    if (!cleanNumber) {
      navigate("/contact#contact-form");
      return;
    }

    window.open(
      `https://wa.me/${cleanNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#0b1b36]">

      {/* =====================================================
          STICKY NAVBAR
      ====================================================== */}

      <div className="sticky top-0 z-[100] w-full">
        <Navbar />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="w-full overflow-x-hidden">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative w-full overflow-hidden bg-[#0b1b36]">

          {/* Background decoration */}

          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#d6a84f]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              left-[-100px]
              h-[380px]
              w-[380px]
              rounded-full
              bg-blue-500/5
              blur-3xl
            "
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="max-w-4xl py-20 sm:py-24 lg:py-28">

              {/* Label */}

              <div className="mb-6 flex items-center gap-3">

                <span className="h-[2px] w-9 shrink-0 bg-[#d6a84f]" />

                <span
                  className="
                    text-[11px]
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#d6a84f]
                    sm:text-xs
                  "
                >
                  Contact Investorise
                </span>

              </div>

              {/* Heading */}

              <h1
                className="
                  m-0
                  max-w-4xl
                  text-4xl
                  font-extrabold
                  leading-[1.04]
                  tracking-[-0.045em]
                  sm:text-5xl
                  lg:text-7xl
                "
              >
                <span className="text-white">
                  Let's Talk About
                </span>

                <span className="block text-[#d6a84f]">
                  Your Investment.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/75
                  sm:text-base
                  sm:leading-8
                "
              >
                Have a question about a project, property or investment
                opportunity? Our team is here to help you make a smarter
                real estate decision.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}

        <section
          id="contact-form"
          className="w-full scroll-mt-20 bg-white py-10 sm:py-12 lg:py-14"
        >
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <ContactSection />
          </div>
        </section>

        {/* =====================================================
            MAP
        ====================================================== */}

        <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            {/* Heading */}

            <div className="mb-7">

              <div className="flex items-center gap-2">

                <span className="h-px w-8 bg-[#d6a84f]" />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#b88b32]
                  "
                >
                  Find Us
                </span>

              </div>

              <h2
                className="
                  mt-2
                  m-0
                  text-3xl
                  font-extrabold
                  tracking-[-0.03em]
                  text-[#0b1b36]
                  sm:text-4xl
                "
              >
                Visit Our Office
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Find our office in Noida and connect with our real estate
                advisory team.
              </p>

            </div>

            {/* Map */}

            <div
              className="
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-[0_12px_35px_rgba(11,27,54,0.07)]
              "
            >
              <iframe
                title="Investorise Office Location"
                src="https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed"
                className="
                  block
                  h-[320px]
                  w-full
                  border-0
                  sm:h-[400px]
                  lg:h-[470px]
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </section>

        {/* =====================================================
            CALL TO ACTION
        ====================================================== */}

        <section className="w-full bg-white py-12 sm:py-16">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-[#0b1b36]
                px-6
                py-10
                shadow-[0_15px_45px_rgba(11,27,54,0.12)]
                sm:px-10
                sm:py-12
                lg:px-14
                lg:py-14
              "
            >

              {/* Decorative circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  bg-[#d6a84f]/10
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  gap-8
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >

                {/* =================================================
                    CTA CONTENT
                ================================================== */}

                <div className="max-w-2xl">

                  <div className="mb-3 flex items-center gap-2">

                    <span className="h-px w-7 bg-[#d6a84f]" />

                    <span
                      className="
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.2em]
                        text-[#d6a84f]
                      "
                    >
                      Let's Build Your Future
                    </span>

                  </div>

                  <h2
                    className="
                      m-0
                      text-3xl
                      font-extrabold
                      leading-tight
                      tracking-[-0.03em]
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    <span className="text-white">
                      Ready to Make a Smarter{" "}
                    </span>

                    <span className="text-[#d6a84f]">
                      Property Decision?
                    </span>
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-7
                      text-white/70
                      sm:text-base
                    "
                  >
                    Connect with Investorise today and let our team help
                    you find the right property, project and location for
                    your goals.
                  </p>

                </div>

                {/* =================================================
                    CTA BUTTONS
                ================================================== */}

                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:w-auto
                    sm:flex-row
                    lg:shrink-0
                  "
                >

                  {/* =================================================
                      CALL US NOW
                  ================================================== */}

                  <button
                    type="button"
                    onClick={handleCall}
                    className="
                      inline-flex
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#d6a84f]
                      px-6
                      text-sm
                      font-extrabold
                      text-[#0b1b36]
                      transition
                      hover:bg-[#e2bb68]
                    "
                  >
                    <Phone size={17} />

                    <span className="text-[#0b1b36]">
                      Call Us Now
                    </span>

                    <ArrowRight size={17} />
                  </button>

                  {/* =================================================
                      WHATSAPP US
                  ================================================== */}

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="
                      inline-flex
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/30
                      bg-white/10
                      px-6
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-white/15
                    "
                  >
                    <MessageCircle size={17} />

                    <span className="text-white">
                      WhatsApp Us
                    </span>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="w-full overflow-hidden">
        <Footer />
      </div>

    </div>
  );
}

export default Contact;