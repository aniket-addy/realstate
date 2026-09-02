import {
  ArrowRight,
  CalendarDays,
  UserRound,
} from "lucide-react";

const leads = [
  {
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    requirement: "Residential Property",
    date: "31 Aug 2026",
    status: "New",
  },
  {
    name: "Amit Verma",
    phone: "+91 98123 45678",
    requirement: "Investment Project",
    date: "30 Aug 2026",
    status: "Contacted",
  },
  {
    name: "Neha Singh",
    phone: "+91 98989 12345",
    requirement: "Commercial Property",
    date: "29 Aug 2026",
    status: "Follow Up",
  },
  {
    name: "Raj Kumar",
    phone: "+91 99100 44556",
    requirement: "Plot",
    date: "28 Aug 2026",
    status: "Closed",
  },
];

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusStyle(status) {
  switch (status) {
    case "New":
      return "bg-blue-50 text-blue-600";

    case "Contacted":
      return "bg-amber-50 text-amber-600";

    case "Follow Up":
      return "bg-purple-50 text-purple-600";

    case "Closed":
      return "bg-emerald-50 text-emerald-600";

    default:
      return "bg-slate-50 text-slate-600";
  }
}


/* =========================================================
   RECENT LEADS
========================================================= */

function RecentLeads() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">

        <div>
          <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
            Recent Leads
          </h3>

          <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
            Latest enquiries from website visitors
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-900
            transition
            hover:text-[#b88b32]
          "
        >
          View All
          <ArrowRight size={15} />
        </button>

      </div>


      {/* =====================================================
          LEADS
      ====================================================== */}

      <div>

        {leads.map((lead, index) => (

          <div
            key={`${lead.name}-${index}`}
            className="
              grid
              grid-cols-[auto_minmax(0,1fr)_auto]
              items-center
              gap-3
              border-b
              border-slate-100
              px-5
              py-5
              last:border-b-0
              sm:px-6
            "
          >

            {/* =================================================
                AVATAR
            ================================================== */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#faf5e9]
                text-[#b88b32]
              "
            >
              <UserRound size={18} strokeWidth={1.8} />
            </div>


            {/* =================================================
                LEAD INFORMATION
            ================================================== */}

            <div className="min-w-0">

              {/* NAME */}

              <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                {lead.name}
              </p>


              {/* PHONE */}

              <p className="mt-1 truncate text-[10px] text-slate-400 sm:text-[11px]">
                {lead.phone}
              </p>


              {/* REQUIREMENT */}

              <p className="mt-2 truncate text-[10px] text-slate-500 sm:text-[11px]">

                <span className="font-semibold text-slate-400">
                  Requirement:
                </span>{" "}

                <span className="font-semibold text-slate-800">
                  {lead.requirement}
                </span>

              </p>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================== */}

            <div className="flex shrink-0 flex-col items-end gap-3">

              {/* DATE */}

              <div className="hidden items-center gap-1.5 text-[10px] text-slate-400 sm:flex">

                <CalendarDays
                  size={13}
                  className="text-slate-400"
                />

                <span>
                  {lead.date}
                </span>

              </div>


              {/* STATUS + ARROW */}

              <div className="flex items-center gap-2">

                <span
                  className={`
                    inline-flex
                    max-w-[78px]
                    items-center
                    justify-center
                    rounded-full
                    px-3
                    py-1.5
                    text-[9px]
                    font-bold
                    whitespace-normal
                    text-center
                    ${getStatusStyle(lead.status)}
                  `}
                >
                  {lead.status}
                </span>


                <button
                  type="button"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    transition
                    hover:border-[#d6a84f]
                    hover:text-[#b88b32]
                  "
                >
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default RecentLeads;