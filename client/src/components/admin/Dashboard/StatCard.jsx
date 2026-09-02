import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  trendLabel = "vs last month",
}) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#f7f0e2]
              text-[#b88b32]
            "
          >
            <Icon size={20} strokeWidth={1.8} />
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {trendValue && (
          <span
            className={`
              inline-flex
              items-center
              gap-1
              rounded-full
              px-2
              py-1
              text-[11px]
              font-bold
              ${
                isPositive
                  ? "bg-emerald-50 text-emerald-600"
                  : isNegative
                  ? "bg-red-50 text-red-600"
                  : "bg-slate-100 text-slate-500"
              }
            `}
          >
            {isPositive ? (
              <ArrowUpRight size={13} />
            ) : isNegative ? (
              <ArrowDownRight size={13} />
            ) : (
              <Minus size={13} />
            )}

            {trendValue}
          </span>
        )}

        <span className="text-[11px] text-slate-400">
          {trendLabel}
        </span>
      </div>

      {description && (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;