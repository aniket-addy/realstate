import {
  Bath,
  BedDouble,
  Car,
  Dumbbell,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Trees,
  Waves,
} from "lucide-react";

import { useState } from "react";

const AMENITY_OPTIONS = [
  {
    name: "Swimming Pool",
    icon: Waves,
  },
  {
    name: "Gym",
    icon: Dumbbell,
  },
  {
    name: "Parking",
    icon: Car,
  },
  {
    name: "24x7 Security",
    icon: ShieldCheck,
  },
  {
    name: "Garden",
    icon: Trees,
  },
  {
    name: "Club House",
    icon: Sparkles,
  },
  {
    name: "Kids Play Area",
    icon: BedDouble,
  },
  {
    name: "Modern Bathrooms",
    icon: Bath,
  },
];

function ProjectAmenities({
  value = [],
  onChange,
}) {
  const [customAmenity, setCustomAmenity] =
    useState("");

  const amenities = Array.isArray(value)
    ? value
    : [];

  // =========================================================
  // TOGGLE AMENITY
  // =========================================================

  const toggleAmenity = (amenityName) => {
    const exists =
      amenities.includes(amenityName);

    const updatedAmenities = exists
      ? amenities.filter(
          (item) => item !== amenityName
        )
      : [...amenities, amenityName];

    if (onChange) {
      onChange(updatedAmenities);
    }
  };

  // =========================================================
  // ADD CUSTOM AMENITY
  // =========================================================

  const addCustomAmenity = () => {
    const valueToAdd =
      customAmenity.trim();

    if (!valueToAdd) {
      return;
    }

    if (
      amenities.some(
        (item) =>
          item.toLowerCase() ===
          valueToAdd.toLowerCase()
      )
    ) {
      setCustomAmenity("");
      return;
    }

    if (onChange) {
      onChange([
        ...amenities,
        valueToAdd,
      ]);
    }

    setCustomAmenity("");
  };

  // =========================================================
  // REMOVE AMENITY
  // =========================================================

  const removeAmenity = (amenityName) => {
    const updatedAmenities =
      amenities.filter(
        (item) => item !== amenityName
      );

    if (onChange) {
      onChange(updatedAmenities);
    }
  };

  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomAmenity();
    }
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2
          border-b
          border-slate-200
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2 className="text-sm font-extrabold text-slate-950">
            Project Amenities
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Select amenities available in this project
          </p>
        </div>

        <span
          className="
            w-fit
            rounded-full
            bg-[#f7f0e2]
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-[#9a7428]
          "
        >
          {amenities.length} Selected
        </span>
      </div>

      {/* =====================================================
          PREDEFINED AMENITIES
      ====================================================== */}

      <div className="p-5">
        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {AMENITY_OPTIONS.map(
            (amenity) => {
              const Icon = amenity.icon;

              const selected =
                amenities.includes(
                  amenity.name
                );

              return (
                <button
                  key={amenity.name}
                  type="button"
                  onClick={() =>
                    toggleAmenity(
                      amenity.name
                    )
                  }
                  className={`
                    group
                    flex
                    min-h-[64px]
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3.5
                    py-3
                    text-left
                    transition
                    ${
                      selected
                        ? "border-[#d6a84f] bg-[#fdf8ed]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }
                  `}
                >
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition
                      ${
                        selected
                          ? "bg-[#d6a84f] text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-[#f7f0e2] group-hover:text-[#b88b32]"
                      }
                    `}
                  >
                    <Icon size={16} />
                  </div>

                  <span
                    className={`
                      flex-1
                      text-xs
                      font-bold
                      ${
                        selected
                          ? "text-slate-900"
                          : "text-slate-600"
                      }
                    `}
                  >
                    {amenity.name}
                  </span>

                  <span
                    className={`
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      text-[10px]
                      font-bold
                      ${
                        selected
                          ? "border-[#d6a84f] bg-[#d6a84f] text-white"
                          : "border-slate-300 text-transparent"
                      }
                    `}
                  >
                    ✓
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* ===================================================
            CUSTOM AMENITY
        ==================================================== */}

        <div className="mt-6 border-t border-slate-100 pt-5">
          <label
            htmlFor="customAmenity"
            className="text-xs font-bold text-slate-700"
          >
            Add Custom Amenity
          </label>

          <div
            className="
              mt-2
              flex
              flex-col
              gap-2
              sm:flex-row
            "
          >
            <input
              id="customAmenity"
              type="text"
              value={customAmenity}
              onChange={(event) =>
                setCustomAmenity(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder="e.g. EV Charging Station"
              className="
                h-11
                flex-1
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3.5
                text-sm
                font-medium
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#d6a84f]
                focus:ring-2
                focus:ring-[#d6a84f]/10
              "
            />

            <button
              type="button"
              onClick={addCustomAmenity}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-950
                px-5
                text-xs
                font-bold
                text-white
                transition
                hover:bg-slate-800
                active:scale-[0.98]
              "
            >
              <Plus size={15} />

              Add
            </button>
          </div>
        </div>

        {/* ===================================================
            SELECTED AMENITIES
        ==================================================== */}

        {amenities.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
              Selected Amenities
            </p>

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-2
              "
            >
              {amenities.map(
                (amenity) => (
                  <div
                    key={amenity}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-[#d6a84f]/30
                      bg-[#fdf8ed]
                      px-3
                      py-2
                    "
                  >
                    <span className="text-[11px] font-bold text-slate-700">
                      {amenity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeAmenity(
                          amenity
                        )
                      }
                      className="
                        text-slate-400
                        transition
                        hover:text-red-500
                      "
                      title={`Remove ${amenity}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectAmenities;