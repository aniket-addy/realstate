import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  PhoneCall,
  XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  New: {
    label: "New",
    icon: Clock3,
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },

  Contacted: {
    label: "Contacted",
    icon: PhoneCall,
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },

  "Follow Up": {
    label: "Follow Up",
    icon: MessageCircle,
    className: "bg-purple-50 text-purple-600 border-purple-100",
  },

  Qualified: {
    label: "Qualified",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },

  Closed: {
    label: "Closed",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600 border-green-100",
  },

  Lost: {
    label: "Lost",
    icon: XCircle,
    className: "bg-red-50 text-red-600 border-red-100",
  },
};

function LeadStatus({
  status = "New",
  onChange,
  editable = false,
}) {
  const config =
    STATUS_CONFIG[status] || STATUS_CONFIG.New;

  const Icon = config.icon;

  // =========================================================
  // EDITABLE STATUS
  // =========================================================

  if (editable) {
    return (
      <div className="relative inline-flex">
        <select
          value={status}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          className={`
            cursor-pointer
            appearance-none
            rounded-full
            border
            py-1.5
            pl-3
            pr-8
            text-[10px]
            font-bold
            outline-none
            transition
            focus:ring-2
            focus:ring-[#d6a84f]/20
            ${config.className}
          `}
        >
          {Object.keys(STATUS_CONFIG).map(
            (statusOption) => (
              <option
                key={statusOption}
                value={statusOption}
                className="bg-white text-slate-800"
              >
                {STATUS_CONFIG[statusOption].label}
              </option>
            )
          )}
        </select>

        <span
          className="
            pointer-events-none
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            text-current
          "
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    );
  }

  // =========================================================
  // NORMAL STATUS BADGE
  // =========================================================

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-bold
        ${config.className}
      `}
    >
      <Icon
        size={12}
        strokeWidth={2}
      />

      {config.label}
    </span>
  );
}

export default LeadStatus;