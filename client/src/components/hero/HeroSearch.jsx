import {
  Building2,
  ChevronDown,
  Home,
  MapPin,
} from "lucide-react";

function HeroSearch() {
  return (
    <div className="relative z-20 w-full">

      {/* =====================================================
          MAIN SEARCH CARD
      ===================================================== */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-[16px]
          bg-white
          shadow-[0_10px_30px_rgba(0,0,0,0.18)]

          sm:rounded-[18px]
        "
      >

        {/* ===================================================
            TABS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-3
            border-b
            border-border-primary
          "
        >

          {/* BUY */}

          <button
            type="button"
            className="
              flex
              h-[44px]
              items-center
              justify-center
              gap-1.5
              rounded-tl-[16px]
              bg-primary
              px-2
              text-[12px]
              font-semibold
              text-white

              sm:h-[50px]
              sm:text-[13px]

              lg:h-[56px]
              lg:text-sm
            "
          >
            <Home
              size={16}
              strokeWidth={1.8}
            />

            <span>Buy</span>
          </button>


          {/* RENT */}

          <button
            type="button"
            className="
              flex
              h-[44px]
              items-center
              justify-center
              gap-1.5
              px-2
              text-[12px]
              font-semibold
              text-text-primary
              hover:bg-background-secondary

              sm:h-[50px]
              sm:text-[13px]

              lg:h-[56px]
              lg:text-sm
            "
          >
            <Home
              size={16}
              strokeWidth={1.8}
            />

            <span>Rent</span>
          </button>


          {/* COMMERCIAL */}

          <button
            type="button"
            className="
              flex
              h-[44px]
              items-center
              justify-center
              gap-1.5
              rounded-tr-[16px]
              px-1
              text-[12px]
              font-semibold
              text-text-primary
              hover:bg-background-secondary

              sm:h-[50px]
              sm:text-[13px]

              lg:h-[56px]
              lg:text-sm
            "
          >
            <Building2
              size={16}
              strokeWidth={1.8}
            />

            <span className="truncate">
              Commercial
            </span>
          </button>

        </div>


        {/* ===================================================
            FILTER AREA
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-2.5
            p-3

            sm:grid-cols-2
            sm:gap-3
            sm:p-4

            lg:grid-cols-[1.25fr_1fr_1fr_0.85fr_auto]
            lg:items-end
            lg:gap-4
            lg:p-5
          "
        >

          {/* =================================================
              LOCATION
          ================================================= */}

          <div
            className="
              min-w-0

              sm:col-span-2

              lg:col-span-1
            "
          >

            <label
              className="
                mb-1
                block
                text-[9px]
                font-medium
                text-text-secondary

                sm:text-[10px]

                lg:mb-2
                lg:text-[11px]
              "
            >
              Location
            </label>

            <div
              className="
                flex
                h-[42px]
                w-full
                items-center
                gap-2
                rounded-lg
                border
                border-border-primary
                bg-white
                px-3

                sm:h-[46px]

                lg:h-[48px]
              "
            >

              <input
                type="text"
                placeholder="Search city, locality or project"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-[11px]
                  text-text-primary
                  outline-none
                  placeholder:text-text-muted

                  sm:text-[12px]

                  lg:text-[12px]
                "
              />

              <MapPin
                size={16}
                strokeWidth={1.8}
                className="
                  shrink-0
                  text-text-secondary
                "
              />

            </div>

          </div>


          {/* =================================================
              PROPERTY TYPE
          ================================================= */}

          <div className="min-w-0">

            <label
              className="
                mb-1
                block
                text-[9px]
                font-medium
                text-text-secondary

                sm:text-[10px]

                lg:mb-2
                lg:text-[11px]
              "
            >
              Property Type
            </label>

            <button
              type="button"
              className="
                flex
                h-[42px]
                w-full
                items-center
                justify-between
                rounded-lg
                border
                border-border-primary
                bg-white
                px-3
                text-left
                text-[11px]
                text-text-primary

                sm:h-[46px]
                sm:text-[12px]

                lg:h-[48px]
              "
            >

              <span className="truncate">
                Any Type
              </span>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="
                  shrink-0
                  text-text-secondary
                "
              />

            </button>

          </div>


          {/* =================================================
              BUDGET
          ================================================= */}

          <div className="min-w-0">

            <label
              className="
                mb-1
                block
                text-[9px]
                font-medium
                text-text-secondary

                sm:text-[10px]

                lg:mb-2
                lg:text-[11px]
              "
            >
              Budget
            </label>

            <button
              type="button"
              className="
                flex
                h-[42px]
                w-full
                items-center
                justify-between
                rounded-lg
                border
                border-border-primary
                bg-white
                px-3
                text-left
                text-[11px]
                text-text-primary

                sm:h-[46px]
                sm:text-[12px]

                lg:h-[48px]
              "
            >

              <span className="truncate">
                ₹50 Lakh - ₹2 Cr
              </span>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="
                  shrink-0
                  text-text-secondary
                "
              />

            </button>

          </div>


          {/* =================================================
              BHK
          ================================================= */}

          <div className="min-w-0">

            <label
              className="
                mb-1
                block
                text-[9px]
                font-medium
                text-text-secondary

                sm:text-[10px]

                lg:mb-2
                lg:text-[11px]
              "
            >
              BHK
            </label>

            <button
              type="button"
              className="
                flex
                h-[42px]
                w-full
                items-center
                justify-between
                rounded-lg
                border
                border-border-primary
                bg-white
                px-3
                text-left
                text-[11px]
                text-text-primary

                sm:h-[46px]
                sm:text-[12px]

                lg:h-[48px]
              "
            >

              <span>
                Any BHK
              </span>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="
                  shrink-0
                  text-text-secondary
                "
              />

            </button>

          </div>


          {/* =================================================
              SEARCH BUTTON
          ================================================= */}

          <button
            type="button"
            className="
              flex
              h-[42px]
              w-full
              items-center
              justify-center
              rounded-lg
              bg-secondary
              px-4
              text-[11px]
              font-semibold
              text-white
              shadow-sm
              transition-all

              hover:bg-secondary-dark
              active:scale-[0.98]

              sm:col-span-2
              sm:h-[44px]

              lg:col-span-1
              lg:h-[48px]
              lg:px-6
              lg:text-[12px]
            "
          >
            Search Properties
          </button>

        </div>

      </div>

    </div>
  );
}

export default HeroSearch;