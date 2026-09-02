import { useEffect, useRef, useState } from "react";

import {
  CalendarDays,
  Check,
  ChevronDown,
  Grid2X2,
  MapPin,
  Search,
  SlidersHorizontal,
  WalletCards,
  X,
} from "lucide-react";

function ProjectFilters({
  filters,
  updateFilter,
  clearFilters,
}) {
  const locationOptions = [
    "Any Location",
    "Gurgaon",
    "Noida",
    "Delhi NCR",
  ];

  const priceOptions = [
    "Any Price",
    "₹50 Lakh - ₹1 Cr",
    "₹1 Cr - ₹2 Cr",
    "₹2 Cr+",
  ];

  const configurationOptions = [
    "Any Configuration",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "2 & 3 BHK",
    "2, 3 & 4 BHK",
  ];

  const statusOptions = [
    "Any Status",
    "New Launch",
    "Under Construction",
    "Ready to Move",
  ];

  return (
    <div className="w-full">
      {/* =====================================================
          FILTER GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3

          sm:grid-cols-2
          sm:gap-3

          lg:grid-cols-[1fr_1fr_1fr_1fr]
          lg:gap-3
        "
      >
        {/* LOCATION */}

        <FilterSelect
          icon={MapPin}
          label="Location"
          value={filters?.location || "Any Location"}
          options={locationOptions}
          onChange={(value) =>
            updateFilter("location", value)
          }
        />

        {/* PRICE */}

        <FilterSelect
          icon={WalletCards}
          label="Price"
          value={filters?.price || "Any Price"}
          options={priceOptions}
          onChange={(value) =>
            updateFilter("price", value)
          }
        />

        {/* CONFIGURATION */}

        <FilterSelect
          icon={Grid2X2}
          label="Configuration"
          value={
            filters?.configuration ||
            "Any Configuration"
          }
          options={configurationOptions}
          onChange={(value) =>
            updateFilter("configuration", value)
          }
        />

        {/* STATUS */}

        <FilterSelect
          icon={CalendarDays}
          label="Status"
          value={filters?.status || "Any Status"}
          options={statusOptions}
          onChange={(value) =>
            updateFilter("status", value)
          }
        />
      </div>

      {/* =====================================================
          MOBILE / TABLET ACTIONS
      ===================================================== */}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-center
          sm:justify-center

          lg:hidden
        "
      >
        {/* APPLY FILTERS */}

        <button
          type="button"
          className="
            flex
            min-h-[46px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#0b1f3a]
            px-5
            text-[13px]
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(11,31,58,0.15)]
            transition-all
            duration-200
            hover:bg-[#122d50]
            active:scale-[0.98]

            sm:w-auto
            sm:min-w-[180px]
          "
        >
          <Search
            size={15}
            strokeWidth={2}
          />

          Apply Filters
        </button>

        {/* MORE FILTERS */}

        <button
          type="button"
          className="
            flex
            min-h-[44px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#dce3ec]
            bg-white
            px-5
            text-[13px]
            font-medium
            text-[#0b1f3a]
            transition-all
            duration-200
            hover:bg-[#f7f9fc]
            active:scale-[0.98]

            sm:w-auto
            sm:min-w-[150px]
          "
        >
          <SlidersHorizontal
            size={15}
            strokeWidth={1.8}
          />

          More Filters
        </button>
      </div>

      {/* =====================================================
          CLEAR FILTERS
      ===================================================== */}

      {hasActiveFilters(filters) && (
        <div className="mt-4 flex justify-center lg:justify-start">
          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              px-2
              py-1
              text-[11px]
              font-medium
              text-[#0b1f3a]
              transition-colors
              hover:bg-[#f3f5f8]
              hover:text-[#b8892f]
            "
          >
            <X
              size={13}
              strokeWidth={2}
            />

            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}


/* =============================================================
   CUSTOM FILTER SELECT
============================================================= */

function FilterSelect({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =========================================================
     SELECT OPTION
  ========================================================= */

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`
        relative
        min-w-0
        ${open ? "z-[100]" : "z-10"}
      `}
    >
      {/* =====================================================
          MAIN BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          group
          relative
          flex
          h-[76px]
          w-full
          items-center
          rounded-[15px]
          border
          bg-white
          text-left
          outline-none
          transition-all
          duration-200

          ${
            open
              ? "border-[#0b1f3a] shadow-[0_0_0_3px_rgba(11,31,58,0.06)]"
              : "border-[#d9e0e9] shadow-none hover:border-[#b9c4d2]"
          }
        `}
      >
        {/* ICON */}

        <span
          className="
            absolute
            left-4
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            bg-[#f7f3ea]
            text-[#b8892f]
            transition-colors
            duration-200
            group-hover:bg-[#f4eddf]
          "
        >
          <Icon
            size={17}
            strokeWidth={1.8}
          />
        </span>

        {/* LABEL */}

        <span
          className="
            absolute
            left-[66px]
            top-[13px]
            text-[10px]
            font-semibold
            leading-none
            text-[#64748b]
          "
        >
          {label}
        </span>

        {/* VALUE */}

        <span
          className="
            absolute
            left-[66px]
            right-12
            top-[35px]
            truncate
            text-[15px]
            font-medium
            leading-5
            text-[#172b4d]
          "
        >
          {value}
        </span>

        {/* CHEVRON */}

        <span
          className="
            absolute
            right-4
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-[#172b4d]
            transition-colors
            duration-200
          "
        >
          <ChevronDown
            size={18}
            strokeWidth={1.8}
            className={`
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </span>
      </button>


      {/* =====================================================
          CUSTOM DROPDOWN
      ===================================================== */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+8px)]
            z-[999]
            overflow-hidden
            rounded-[14px]
            border
            border-[#e1e6ed]
            bg-white
            p-1.5
            shadow-[0_18px_45px_rgba(15,23,42,0.16)]
            animate-[dropdownIn_0.15s_ease-out]
          "
          role="listbox"
        >
          {options.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() =>
                  handleSelect(option)
                }
                className={`
                  flex
                  min-h-[44px]
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-[10px]
                  px-3.5
                  py-2.5
                  text-left
                  text-[13px]
                  transition-all
                  duration-150

                  ${
                    selected
                      ? "bg-[#0b1f3a] text-white"
                      : "text-[#334155] hover:bg-[#f5f7fa] hover:text-[#0b1f3a]"
                  }
                `}
              >
                <span className="truncate">
                  {option}
                </span>

                {selected && (
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#d6a84f]
                      text-[#0b1f3a]
                    "
                  >
                    <Check
                      size={12}
                      strokeWidth={2.5}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


/* =============================================================
   ACTIVE FILTER CHECK
============================================================= */

function hasActiveFilters(filters) {
  if (!filters) {
    return false;
  }

  return (
    filters.location !== "Any Location" ||
    filters.price !== "Any Price" ||
    filters.configuration !==
      "Any Configuration" ||
    filters.status !== "Any Status"
  );
}


export default ProjectFilters;