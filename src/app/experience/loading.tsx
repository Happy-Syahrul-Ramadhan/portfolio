export default function ExperienceLoading() {
  return (
    <div className="flex flex-col gap-8 mt-12 mb-20 animate-pulse">
      {/* Page title */}
      <div className="flex flex-col gap-2">
        <div className="h-9 w-64 bg-muted rounded-lg" />
        <div className="h-5 w-80 bg-muted rounded" />
      </div>

      {/* Timeline skeleton */}
      <div className="relative flex flex-col gap-0 ml-2">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border/70" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative pl-8 pb-10 last:pb-0">
            <div className="absolute left-[-4px] top-[8px] w-[9px] h-[9px] rounded-full bg-muted border-2 border-border" />
            <div className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-48 bg-muted rounded" />
                {i === 1 && <div className="h-5 w-24 bg-muted rounded-full" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-36 bg-muted rounded" />
                <div className="h-4 w-28 bg-muted rounded" />
              </div>
              <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
                <div className="h-3 w-4/6 bg-muted rounded" />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-16 bg-muted rounded-full" />
                <div className="h-6 w-20 bg-muted rounded-full" />
                <div className="h-6 w-14 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
