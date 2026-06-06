export default function ProjectLoading() {
  return (
    <div className="flex flex-col gap-8 mt-12 mb-20 animate-pulse">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <div className="h-9 w-40 bg-muted rounded-lg" />
        <div className="h-5 w-64 bg-muted rounded" />
      </div>

      {/* Card grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-card border border-border/60 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="h-44 bg-muted" />
            <div className="p-5 flex flex-col gap-2">
              <div className="h-5 w-3/4 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-14 bg-muted rounded-full" />
                <div className="h-5 w-18 bg-muted rounded-full" />
                <div className="h-5 w-12 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
