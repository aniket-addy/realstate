import {
  MessageCircle,
  Phone,
} from "lucide-react";

function FloatingActions() {
  const phoneNumber = "919876543210";

  const whatsappMessage =
    "Hello Investorise, I am interested in your property projects.";

  return (
    <>
      {/* =====================================================
          DESKTOP / TABLET FLOATING ACTIONS
      ====================================================== */}

      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 sm:flex">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noreferrer"
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

        {/* Call */}
        <a
          href={`tel:+${phoneNumber}`}
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
        </a>

      </div>

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white p-2 shadow-2xl sm:hidden">

        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-xs font-bold text-white"
        >
          <MessageCircle
            size={16}
            className="fill-white"
          />

          WhatsApp
        </a>

        <div className="w-2" />

        <a
          href={`tel:+${phoneNumber}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-xs font-bold text-white"
        >
          <Phone
            size={15}
            className="fill-white"
          />

          Call Now
        </a>

      </div>
    </>
  );
}

export default FloatingActions;