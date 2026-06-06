interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string | null;
  logoUrl: string | null;
  current: boolean;
  order: number;
  skills: string | null;
}

export default function ExperienceList({
  experiences,
}: {
  experiences: Experience[];
}) {
  if (experiences.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 border rounded-2xl border-dashed">
        <p className="text-muted-foreground">
          No work experience data available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-0 ml-2">
      {/* Vertical timeline line */}
      <div className="absolute left-0 top-2 bottom-2 w-px bg-border/70" />

      {experiences.map((exp) => (
        <div key={exp.id} className="relative pl-8 pb-10 last:pb-0">
          {/* Timeline dot */}
          <div className="absolute left-[-4px] top-[8px] w-[9px] h-[9px] rounded-full bg-background border-2 border-primary/50" />

          <div className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
            {/* Role + Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-lg leading-tight">{exp.role}</h3>
              {exp.current && (
                <span className="status-badge-success text-xs font-semibold">
                  Current Position
                </span>
              )}
            </div>

            {/* Company + Period */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <div className="flex items-center gap-2">
                {exp.logoUrl && (
                  <img
                    src={exp.logoUrl}
                    alt={exp.company}
                    className="w-5 h-5 rounded object-contain"
                  />
                )}
                <span className="font-semibold text-foreground/90">
                  {exp.company}
                </span>
              </div>
              <span className="text-border hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Description (render HTML from editor) */}
            {exp.description && (
              <div
                className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed text-justify border-t border-border/50 pt-3"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}

            {/* Skills */}
            {exp.skills && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skills.split(",").map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
