import {
  Heart,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  // MongoDB ID
  const propertyId =
    property?._id || property?.id;

  /* ==========================================
     OPEN PROPERTY DETAILS
  ========================================== */

  const handlePropertyClick = () => {
    if (!propertyId) {
      console.error(
        "Property ID missing:",
        property
      );

      return;
    }

    console.log(
      "Opening property:",
      propertyId
    );

    navigate(`/projects/${propertyId}`);
  };

  return (
    <article
      onClick={handlePropertyClick}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-[12px]
        border
        border-border-primary
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* =================================================
          PROPERTY IMAGE
      ================================================= */}

      <div className="relative h-[175px] overflow-hidden">

        <img
          src={
            property?.propertyImage ||
            property?.image ||
            ""
          }
          alt={
            property?.title ||
            "Property"
          }
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Image Overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent
          "
        />

        {/* Status */}

        {property?.status && (
          <span
            className="
              absolute
              left-3
              top-3
              rounded-md
              bg-primary
              px-2
              py-1
              text-[8px]
              font-semibold
              text-white
            "
          >
            {property.status}
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          aria-label="Add property to wishlist"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="
            absolute
            right-3
            top-3
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-text-primary
            shadow-sm
            transition-all
            hover:bg-secondary
            hover:text-white
          "
        >
          <Heart
            size={14}
            strokeWidth={1.8}
          />
        </button>

      </div>


      {/* =================================================
          PROPERTY DETAILS
      ================================================= */}

      <div className="p-3.5">

        {/* TITLE */}

        <h3
          className="
            truncate
            text-[13px]
            font-semibold
            text-text-primary
          "
        >
          {property?.title ||
            "Untitled Property"}
        </h3>


        {/* LOCATION */}

        {property?.location && (
          <div
            className="
              mt-1
              flex
              items-center
              gap-1
              text-[9px]
              text-text-secondary
            "
          >
            <MapPin
              size={11}
              strokeWidth={1.8}
            />

            <span className="truncate">
              {property.location}
            </span>
          </div>
        )}


        {/* BHK + AREA */}

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
            text-[9px]
            text-text-secondary
          "
        >

          {/* Backend field = bhkType */}

          {property?.bhkType?.length > 0 && (
            <>
              <span>
                {Array.isArray(
                  property.bhkType
                )
                  ? property.bhkType.join(", ")
                  : property.bhkType}
              </span>

              {property?.size > 0 && (
                <span>•</span>
              )}
            </>
          )}


          {/* Backend field = size */}

          {property?.size > 0 && (
            <span>
              {property.size} sq.ft.
            </span>
          )}

        </div>


        {/* PRICE + DETAILS */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-2
          "
        >

          {/* PRICE */}

          <span
            className="
              text-[13px]
              font-bold
              text-primary
            "
          >
            {property?.price !== undefined &&
            property?.price !== null &&
            property?.price !== ""
              ? `₹${property.price} ${
                  property.priceType || ""
                }`
              : "Price on Request"}
          </span>


          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePropertyClick();
            }}
            className="
              flex
              items-center
              gap-1
              text-[9px]
              font-semibold
              text-text-secondary
              transition-colors
              hover:text-secondary
            "
          >
            View Details

            <ArrowRight
              size={12}
            />
          </button>

        </div>

      </div>

    </article>
  );
}

export default PropertyCard;