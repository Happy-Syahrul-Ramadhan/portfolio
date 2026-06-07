import { BookMarked, ExternalLink } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  volume: string | null;
  year: number;
  doi: string | null;
  url: string | null;
  abstract: string | null;
  order: number;
  published: boolean;
}

export default function PublicationsSection({
  publications,
}: {
  publications: Publication[];
}) {
  if (publications.length === 0) return null;

  const getLink = (pub: Publication) => {
    if (pub.url) return pub.url;
    if (pub.doi) return `https://doi.org/${pub.doi}`;
    return null;
  };

  return (
    <section className="min-w-0">
      <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
        <BookMarked className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <h2 className="text-xl font-bold font-heading">Publications</h2>
      </div>

      <ol className="flex flex-col gap-5">
        {publications.map((pub, index) => {
          const link = getLink(pub);
          return (
            <li key={pub.id} className="flex min-w-0 gap-3">
              <span className="mt-0.5 w-5 flex-shrink-0 text-right font-mono text-xs text-muted-foreground">
                {index + 1}.
              </span>

              <div className="flex min-w-0 flex-col gap-1">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-w-0 items-start gap-1 text-sm font-medium leading-snug transition-colors hover:text-primary"
                  >
                    <span className="break-words">{pub.title}</span>
                    <ExternalLink className="mt-0.5 h-3 w-3 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                  </a>
                ) : (
                  <span className="break-words text-sm font-medium leading-snug">
                    {pub.title}
                  </span>
                )}

                <p className="break-words text-xs italic leading-relaxed text-muted-foreground">
                  {pub.authors}
                </p>

                <p className="break-words text-xs text-muted-foreground">
                  <span className="font-medium not-italic text-foreground/70">
                    {pub.journal}
                  </span>
                  {pub.volume && ` • ${pub.volume}`}
                  {` • ${pub.year}`}
                </p>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit break-all text-[11px] text-primary/80 transition-colors hover:text-primary"
                  >
                    DOI: {pub.doi}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
