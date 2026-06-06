import { BookMarked, ExternalLink } from "lucide-react"

interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  volume: string | null
  year: number
  doi: string | null
  url: string | null
  abstract: string | null
  order: number
  published: boolean
}

export default function PublicationsSection({
  publications,
}: {
  publications: Publication[]
}) {
  if (publications.length === 0) return null

  const getLink = (pub: Publication) => {
    if (pub.url) return pub.url
    if (pub.doi) return `https://doi.org/${pub.doi}`
    return null
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
        <BookMarked className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <h2 className="text-xl font-bold font-heading">Publikasi Ilmiah</h2>
      </div>

      <ol className="flex flex-col gap-5">
        {publications.map((pub, index) => {
          const link = getLink(pub)
          return (
            <li key={pub.id} className="flex gap-3">
              {/* Number */}
              <span className="flex-shrink-0 text-xs text-muted-foreground font-mono mt-0.5 w-5 text-right">
                {index + 1}.
              </span>

              <div className="flex flex-col gap-1 min-w-0">
                {/* Title */}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium leading-snug hover:text-primary transition-colors inline-flex items-start gap-1 group"
                  >
                    <span>{pub.title}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-sm font-medium leading-snug">{pub.title}</span>
                )}

                {/* Authors */}
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  {pub.authors}
                </p>

                {/* Journal + Volume + Year */}
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium not-italic text-foreground/70">{pub.journal}</span>
                  {pub.volume && ` • ${pub.volume}`}
                  {` • ${pub.year}`}
                </p>

                {/* DOI badge */}
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary/80 hover:text-primary transition-colors w-fit"
                  >
                    DOI: {pub.doi}
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
