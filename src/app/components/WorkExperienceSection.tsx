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
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
        <Briefcase className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <h2 className="text-xl font-bold font-heading">Pengalaman Kerja</h2>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0 ml-1.5">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border/60" />

        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 pb-7 last:pb-0">
            {/* Dot */}
            <div className="absolute left-[-3px] top-[7px] w-[7px] h-[7px] rounded-full bg-background border-2 border-muted-foreground/40" />

            <div className="flex flex-col gap-1.5">
              {/* Role + Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-base leading-tight">
                  {exp.role}
                </h3>
                {exp.current && (
                  <span className="px-2 py-0.5 text-[11px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-full">
                    Saat ini
                  </span>
                )}
              </div>

              {/* Company + Period */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt={exp.company}
                    className="w-4 h-4 rounded object-contain"
                  />
                ) : null}
                <span className="font-medium text-foreground/80">
                  {exp.company}
                </span>
                <span className="text-border">·</span>
                <span>{exp.period}</span>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 text-justify">
                  {exp.description}
                </p>
              )}

              {/* Skills */}
              {exp.skills && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {exp.skills.split(",").map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-medium bg-primary/8 text-foreground/70 rounded border border-border/60"
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

      <div className="mt-4 pl-6">
        <Link
          href="/experience"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Lihat semua pengalaman
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
