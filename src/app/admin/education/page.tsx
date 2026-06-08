import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import EducationActions from "./EducationActions"

export const dynamic = "force-dynamic"

export default async function ManageEducation() {
  const educations = await prisma.education.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="admin-page-header">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Education</h1>
        <Link
          href="/admin/education/new"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2"
        >
          <Plus className="h-4 w-4" /> Add Education
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {educations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No education entries yet.
          </div>
        ) : (
          <div className="divide-y">
            {educations.map((education) => (
              <div key={education.id} className="admin-list-item hover:bg-accent/50 transition-colors">
                <div className="admin-list-main flex flex-col gap-0.5">
                  <span className="font-semibold break-words">{education.degree}</span>
                  <span className="text-sm text-muted-foreground break-words">
                    {education.institution} · {education.major}
                  </span>
                  {education.location && (
                    <span className="text-xs text-muted-foreground break-words">{education.location}</span>
                  )}
                </div>
                <div className="admin-list-actions">
                  <Link
                    href={`/admin/education/${education.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <EducationActions
                    educationId={education.id}
                    degree={education.degree}
                    institution={education.institution}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}