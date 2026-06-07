import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";

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

export default function WorkExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  if (experiences.length === 0) return null;

  return (
    <section className="min-w-0">
      <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
        <Briefcase className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <h2 className="text-xl font-bold font-heading">Work Experience</h2>
      </div>

      <div className="relative ml-1.5 flex min-w-0 flex-col gap-0">
        <div className="absolute top-2 bottom-2 left-0 w-px bg-border/60" />

        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative min-w-0 pl-5 pb-7 last:pb-0 sm:pl-6"
          >
            <div className="absolute top-[7px] left-[-3px] h-[7px] w-[7px] rounded-full border-2 border-muted-foreground/40 bg-background" />

            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words text-base font-semibold leading-tight">
                  {exp.role}
                </h3>
                {exp.current && (
                  <span className="status-badge-success text-[11px]">
                    Current
                  </span>
                )}
              </div>

              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt={exp.company}
                    className="h-4 w-4 rounded object-contain"
                  />
                ) : null}
                <span className="break-words font-medium text-foreground/80">
                  {exp.company}
                </span>
                <span className="text-border">·</span>
                <span className="break-words">{exp.period}</span>
              </div>

              {exp.description && (
                <div
                  className="prose prose-sm prose-neutral mt-0.5 max-w-none text-sm leading-relaxed text-muted-foreground dark:prose-invert sm:text-justify"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}

              {exp.skills && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {exp.skills.split(",").map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-border/60 bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-foreground/70"
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

      <div className="mt-4 pl-5 sm:pl-6">
        <Link
          href="/experience"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all work experience
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
