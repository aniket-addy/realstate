import {
  MessageCircle,
  Phone,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  callClient,
  CONTACT_CONFIG,
} from "../config/contact";

function FloatingActions() {
  const navigate = useNavigate();

  // =========================================================
  // WHATSAPP MESSAGE
  // =========================================================

  const whatsappMessage =
    "Hello Investorise, I am interested in your property projects.";

  // =========================================================
  // CALL HANDLER
  // =========================================================

  const handleCallClick = () => {
    const called = callClient();

    // Agar phone number configured nahi hai
    // to Contact page par bhejo
    if (!called) {
      navigate("/contact");
    }
  };

  // =========================================================
  // WHATSAPP HANDLER
  // =========================================================

  const handleWhatsAppClick = (event) => {
    // WhatsApp number configured nahi hai
    if (!CONTACT_CONFIG.whatsapp) {
      event.preventDefault();
      navigate("/contact");
    }
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / TABLET FLOATING ACTIONS
      ====================================================== */}

      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 sm:flex">

        {/* =================================================
            WHATSAPP
        ================================================== */}

        <a
          href={
            CONTACT_CONFIG.whatsapp
              ? `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage
                )}`
              : "/contact"
          }
          target={
            CONTACT_CONFIG.whatsapp
              ? "_blank"
              : undefined
          }
          rel={
            CONTACT_CONFIG.whatsapp
              ? "noreferrer"
              : undefined
          }
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <MessageCircle
            size={21}
            className="fill-white"
          />

          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </a>

        {/* =================================================
            CALL
        ================================================== */}

        <button
          type="button"
          onClick={handleCallClick}
          aria-label="Call Investorise"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <Phone
            size={19}
            className="fill-white"
          />

          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            Call Now
          </span>
        </button>

      </div>

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white p-2 shadow-2xl sm:hidden">

        {/* =================================================
            MOBILE WHATSAPP
        ================================================== */}

        <a
          href={
            CONTACT_CONFIG.whatsapp
              ? `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage
                )}`
              : "/contact"
          }
          target={
            CONTACT_CONFIG.whatsapp
              ? "_blank"
              : undefined
          }
          rel={
            CONTACT_CONFIG.whatsapp
              ? "noreferrer"
              : undefined
          }
          onClick={handleWhatsAppClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold text-white"
        >
          <MessageCircle
            size={16}
            className="fill-white"
          />

          WhatsApp
        </a>

        <div className="w-2" />

        {/* =================================================
            MOBILE CALL
        ================================================== */}

        <button
          type="button"
          onClick={handleCallClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-xs font-bold text-white"
        >
          <Phone
            size={15}
            className="fill-white"
          />

          Call Now
        </button>

      </div>
    </>
  );
}

export default FloatingActions;