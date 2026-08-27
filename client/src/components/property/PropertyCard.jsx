import {
  Heart,
  MapPin,
} from "lucide-react";

function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-[12px] border border-border-primary bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* =================================================
          PROPERTY IMAGE
      ================================================= */}
      <div className="relative h-[175px] overflow-hidden">

        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Status */}
        {property.status && (
          <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-white">
            {property.status}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add property to wishlist"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm transition-all hover:bg-secondary hover:text-white"
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

        <h3 className="truncate text-[13px] font-semibold text-text-primary">
          {property.title}
        </h3>

        {/* Location */}
        {property.location && (
          <div className="mt-1 flex items-center gap-1 text-[9px] text-text-secondary">

            <MapPin
              size={11}
              strokeWidth={1.8}
            />

            <span className="truncate">
              {property.location}
            </span>

          </div>
        )}

        {/* BHK + Area */}
        <div className="mt-2 flex items-center gap-2 text-[9px] text-text-secondary">

          {property.bedrooms && (
            <>
              <span>
                {property.bedrooms} BHK
              </span>

              <span>
                •
              </span>
            </>
          )}

          {property.area && (
            <span>
              {property.area}
            </span>
          )}

        </div>

        {/* Price + Details */}
        <div className="mt-3 flex items-center justify-between gap-2">

          <span className="text-[13px] font-bold text-primary">
            {property.price}
          </span>

          <button
            type="button"
            className="text-[9px] font-semibold text-text-secondary transition-colors hover:text-secondary"
          >
            View Details →
          </button>

        </div>

      </div>

    </article>
  );
}

export default PropertyCard;