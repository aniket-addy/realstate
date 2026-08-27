function EmptyState({
  message = "No data available.",
}) {
  return (
    <div className="col-span-full flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-border-primary bg-background-secondary">

      <p className="text-sm text-text-secondary">
        {message}
      </p>

    </div>
  );
}

export default EmptyState;