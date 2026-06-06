import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import ProjectActions from "./ProjectActions"

export const dynamic = "force-dynamic"

export default async function ManageProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="admin-page-header">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No projects found. Create your first one.
          </div>
        ) : (
          <div className="divide-y">
            {projects.map((project) => (
              <div key={project.id} className="admin-list-item hover:bg-accent/50 transition-colors">
                <div className="admin-list-main flex items-start gap-3">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt="" className="h-12 w-20 object-cover rounded-md border border-border flex-shrink-0" />
                  )}
                  <div className="admin-list-main flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold break-words">{project.title}</h3>
                      <span className={project.published ? "status-badge-success" : "px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground"}>
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1">{project.description}</p>
                  </div>
                </div>
                <div className="admin-list-actions">
                  <ProjectActions
                    projectId={project.id}
                    projectTitle={project.title}
                    isPublished={project.published}
                  />
                  <Link href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
