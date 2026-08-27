function LoadingCard() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-border-primary bg-white">

      <div className="h-[165px] animate-pulse bg-background-secondary" />

      <div className="space-y-3 p-4">

        <div className="h-4 w-3/4 animate-pulse rounded bg-background-secondary" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-background-secondary" />

        <div className="h-3 w-2/3 animate-pulse rounded bg-background-secondary" />

        <div className="h-4 w-1/3 animate-pulse rounded bg-background-secondary" />

      </div>

    </div>
  );
}

export default LoadingCard;