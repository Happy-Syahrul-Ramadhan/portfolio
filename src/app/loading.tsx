// Skeleton for the home page (two-column layout)
export default function HomeLoading() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[268px_1fr] gap-8 mt-6 mb-24 items-start animate-pulse">
      {/* Left sidebar skeleton */}
      <div className="flex flex-col gap-4 w-full">
        <div className="p-6 bg-card border border-border/60 rounded-2xl flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-muted" />
          <div className="h-5 w-32 bg-muted rounded-md" />
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
          <div className="w-full flex flex-col gap-2 mt-1">
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-4/5 bg-muted rounded" />
            <div className="h-3 w-3/5 bg-muted rounded" />
          </div>
        </div>
        <div className="p-4 bg-card border border-border/60 rounded-2xl flex flex-col gap-2.5">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-4 w-48 bg-muted rounded" />
        </div>
        <div className="h-10 w-full bg-muted rounded-xl" />
        <div className="h-10 w-full bg-muted rounded-xl" />
      </div>

      {/* Right content skeleton */}
      <div className="flex flex-col gap-10 w-full">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <div className="w-5 h-5 bg-muted rounded" />
              <div className="h-5 w-40 bg-muted rounded" />
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-2 pl-6 pb-6 border-l border-border/60 ml-2">
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="h-3 w-32 bg-muted rounded" />
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-4/5 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
