function SectionHeader({
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">

      <div>
        <h2 className="text-[24px] font-semibold leading-tight text-text-primary sm:text-[28px]">
          {title}
        </h2>

        {description && (
          <p className="mt-1.5 max-w-[650px] text-[11px] leading-5 text-text-secondary sm:text-[12px]">
            {description}
          </p>
        )}
      </div>

      {buttonText && (
        <button
          type="button"
          onClick={onButtonClick}
          className="hidden shrink-0 items-center gap-2 rounded-md border border-border-primary bg-white px-3.5 py-2 text-[10px] font-semibold text-text-primary shadow-sm transition-all duration-200 hover:border-secondary hover:text-secondary sm:flex"
        >
          {buttonText}

          <span>
            →
          </span>
        </button>
      )}

    </div>
  );
}

export default SectionHeader;