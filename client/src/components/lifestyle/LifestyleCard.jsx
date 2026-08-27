function LifestyleCard({ lifestyle }) {
  return (
    <article className="group relative h-[145px] overflow-hidden rounded-[10px]">

      {/* Admin/API Image */}
      <img
        src={lifestyle.image}
        alt={lifestyle.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">

        <h3 className="text-[13px] font-semibold text-white">
          {lifestyle.title}
        </h3>

        {lifestyle.subtitle && (
          <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-white/80">
            {lifestyle.subtitle}
          </p>
        )}

      </div>

    </article>
  );
}

export default LifestyleCard;