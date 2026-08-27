import {
  CalendarDays,
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

  /*
    IMPORTANT:

    Ye options backend project data ke saath match hone chahiye.

    Abhi hum common options rakh rahe hain.
    Agar backend se exact different values aati hain,
    to unko yahan update kar sakte ho.
  */

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
    <div
      className="
        w-full
        rounded-2xl
        border
        border-border-primary
        bg-white
        p-3
        shadow-[0_10px_35px_rgba(0,0,0,0.12)]

        sm:p-4

        lg:rounded-[18px]
        lg:p-4
      "
    >

      {/* =====================================================
          FILTER GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-2.5

          sm:grid-cols-2
          sm:gap-3

          lg:grid-cols-[1fr_1fr_1fr_1fr_auto]
          lg:items-center
          lg:gap-3
        "
      >

        {/* ===================================================
            LOCATION
        =================================================== */}

        <FilterSelect
          icon={MapPin}
          label="Location"
          value={filters.location}
          options={locationOptions}
          onChange={(value) =>
            updateFilter("location", value)
          }
        />


        {/* ===================================================
            PRICE
        =================================================== */}

        <FilterSelect
          icon={WalletCards}
          label="Price"
          value={filters.price}
          options={priceOptions}
          onChange={(value) =>
            updateFilter("price", value)
          }
        />


        {/* ===================================================
            CONFIGURATION
        =================================================== */}

        <FilterSelect
          icon={Grid2X2}
          label="Configuration"
          value={filters.configuration}
          options={configurationOptions}
          onChange={(value) =>
            updateFilter("configuration", value)
          }
        />


        {/* ===================================================
            STATUS
        =================================================== */}

        <FilterSelect
          icon={CalendarDays}
          label="Status"
          value={filters.status}
          options={statusOptions}
          onChange={(value) =>
            updateFilter("status", value)
          }
        />


        {/* ===================================================
            DESKTOP APPLY
        =================================================== */}

        <button
          type="button"
          className="
            hidden
            h-[60px]
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            text-[12px]
            font-semibold
            text-white
            transition-all
            duration-200

            hover:bg-primary/90
            active:scale-[0.98]

            lg:flex
          "
        >
          <Search
            size={16}
            strokeWidth={2}
          />

          Apply Filters

        </button>

      </div>


      {/* =====================================================
          MOBILE / TABLET ACTIONS
      ===================================================== */}

      <div
        className="
          mt-3
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-center
          sm:justify-center

          lg:hidden
        "
      >

        {/* Apply Filters */}

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
            bg-primary
            px-4
            text-[12px]
            font-semibold
            text-white
            transition-all
            duration-200

            hover:bg-primary/90
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


        {/* More Filters */}

        <button
          type="button"
          className="
            flex
            min-h-[42px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-border-primary
            bg-white
            px-4
            text-[12px]
            font-medium
            text-primary
            transition-all
            duration-200

            hover:bg-background-secondary

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

        <div className="mt-3 flex justify-center lg:justify-start">

          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-primary
              transition-colors

              hover:text-secondary
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
   FILTER SELECT
============================================================= */

function FilterSelect({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}) {

  return (
    <div
      className="
        relative
        min-w-0
      "
    >

      {/* =================================================
          ICON
      ================================================= */}

      <span
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          z-10
          flex
          -translate-y-1/2
          items-center
          justify-center
          text-primary
        "
      >
        <Icon
          size={16}
          strokeWidth={1.8}
        />
      </span>


      {/* =================================================
          LABEL
      ================================================= */}

      <span
        className="
          pointer-events-none
          absolute
          left-[43px]
          top-[9px]
          z-10
          text-[8px]
          font-semibold
          leading-3
          text-primary

          sm:text-[9px]
        "
      >
        {label}
      </span>


      {/* =================================================
          SELECT
      ================================================= */}

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-[60px]
          w-full
          cursor-pointer
          appearance-none
          rounded-xl
          border
          border-border-primary
          bg-white
          pl-[43px]
          pr-9
          pt-4
          text-[11px]
          text-text-secondary
          outline-none
          transition-all
          duration-200

          hover:border-primary/30

          focus:border-primary
          focus:ring-2
          focus:ring-secondary/20

          sm:text-[12px]
        "
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>


      {/* =================================================
          CHEVRON
      ================================================= */}

      <ChevronDown
        size={15}
        strokeWidth={1.8}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-text-secondary
        "
      />

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
    filters.configuration !== "Any Configuration" ||
    filters.status !== "Any Status"
  );
}


export default ProjectFilters;