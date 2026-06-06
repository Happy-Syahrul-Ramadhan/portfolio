import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import PublicationActions from "./PublicationActions"

export const dynamic = "force-dynamic"

export default async function ManagePublications() {
  const publications = await prisma.publication.findMany({
    orderBy: [{ order: "asc" }, { year: "desc" }],
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="admin-page-header">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Publications</h1>
        <Link
          href="/admin/publications/new"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2"
        >
          <Plus className="h-4 w-4" /> Add Publication
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {publications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No publications yet.</div>
        ) : (
          <div className="divide-y">
            {publications.map((pub) => (
              <div key={pub.id} className="admin-list-item hover:bg-accent/50 transition-colors">
                <div className="admin-list-main flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold break-words">{pub.title}</span>
                    {!pub.published && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground break-words">{pub.authors}</span>
                  <span className="text-xs text-muted-foreground break-words">
                    {pub.journal} · {pub.year}
                  </span>
                </div>
                <div className="admin-list-actions">
                  <Link
                    href={`/admin/publications/${pub.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <PublicationActions publicationId={pub.id} title={pub.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
