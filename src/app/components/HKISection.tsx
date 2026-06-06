import { Shield, ExternalLink } from "lucide-react"

interface IntellectualProperty {
  id: string
  registrationNo: string
  title: string
  description: string | null
  type: string
  year: number
  issuer: string
  url: string | null
  order: number
}

export default function HKISection({
  hkis,
}: {
  hkis: IntellectualProperty[]
}) {
  if (hkis.length === 0) return null

  return (
    <section>
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
        <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <h2 className="text-xl font-bold font-heading">Hak Kekayaan Intelektual</h2>
      </div>

      <div className="flex flex-col gap-3">
        {hkis.map((hki) => (
          <div
            key={hki.id}
            className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-card"
          >
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              {/* Registration No + Type badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                  {hki.registrationNo}
                </span>
                <span className="text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  {hki.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium leading-snug">{hki.title}</h3>

              {/* Description */}
              {hki.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {hki.description}
                </p>
              )}

              {/* Issuer + Year */}
              <p className="text-xs text-muted-foreground">
                {hki.issuer} &middot; {hki.year}
              </p>
            </div>

            {/* External link */}
            {hki.url && (
              <a
                href={hki.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                title="Lihat dokumen"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
