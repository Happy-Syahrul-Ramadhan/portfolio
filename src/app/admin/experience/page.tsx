import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import ExperienceActions from "./ExperienceActions"

export const dynamic = "force-dynamic"

export default async function ManageExperience() {
  const experiences = await prisma.workExperience.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading">Work Experience</h1>
        <Link href="/admin/experience/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2">
          <Plus className="h-4 w-4" /> Add Experience
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {experiences.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No work experience entries yet.
          </div>
        ) : (
          <div className="divide-y">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{exp.role}</span>
                    {exp.current && <span className="px-2 py-0.5 text-xs font-medium bg-green-500/15 text-green-600 dark:text-green-400 rounded-full">Current</span>}
                  </div>
                  <span className="text-sm text-muted-foreground">{exp.company} · {exp.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/experience/${exp.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <ExperienceActions
                    experienceId={exp.id}
                    role={exp.role}
                    company={exp.company}
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
