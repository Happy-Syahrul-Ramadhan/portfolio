import { Shield, ExternalLink } from "lucide-react";

interface IntellectualProperty {
  id: string;
  registrationNo: string;
  title: string;
  description: string | null;
  type: string;
  year: number;
  issuer: string;
  url: string | null;
  order: number;
}

export default function HKISection({
  hkis,
}: {
  hkis: IntellectualProperty[];
}) {
  if (hkis.length === 0) return null;

  return (
    <section className="min-w-0">
      <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
        <Shield className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <h2 className="text-xl font-bold font-heading">
          Intellectual Property
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {hkis.map((hki) => (
          <div
            key={hki.id}
            className="flex min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-card p-4"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="break-all rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {hki.registrationNo}
                </span>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                  {hki.type}
                </span>
              </div>

              <h3 className="break-words text-sm font-medium leading-snug">
                {hki.title}
              </h3>

              {hki.description && (
                <p className="break-words text-xs leading-relaxed text-muted-foreground">
                  {hki.description}
                </p>
              )}

              <p className="break-words text-xs text-muted-foreground">
                {hki.issuer} · {hki.year}
              </p>
            </div>

            {hki.url && (
              <a
                href={hki.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-muted-foreground transition-colors hover:text-primary"
                title="View document"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
