import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import HKIActions from "./HKIActions"

export const dynamic = "force-dynamic"

export default async function ManageHKI() {
  const hkiList = await prisma.intellectualProperty.findMany({
    orderBy: [{ order: "asc" }, { year: "desc" }],
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="admin-page-header">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Intellectual Property (HKI)</h1>
        <Link
          href="/admin/hki/new"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2"
        >
          <Plus className="h-4 w-4" /> Add HKI
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {hkiList.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No intellectual property entries yet.</div>
        ) : (
          <div className="divide-y">
            {hkiList.map((hki) => (
              <div key={hki.id} className="admin-list-item hover:bg-accent/50 transition-colors">
                <div className="admin-list-main flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold break-words">{hki.title}</span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-full">
                      {hki.type}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground break-words">
                    {hki.registrationNo} · {hki.year}
                  </span>
                  <span className="text-xs text-muted-foreground break-words">{hki.issuer}</span>
                </div>
                <div className="admin-list-actions">
                  <Link
                    href={`/admin/hki/${hki.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <HKIActions hkiId={hki.id} title={hki.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
