import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { deleteProject, toggleProjectPublish } from "@/app/actions/project"

export const dynamic = "force-dynamic"

export default async function ManageProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2"
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
              <div key={project.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt="" className="h-12 w-20 object-cover rounded-md border border-border flex-shrink-0" />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${project.published ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Toggle publish */}
                  <form action={async () => {
                    "use server"
                    await toggleProjectPublish(project.id, project.published)
                  }}>
                    <button type="submit" title={project.published ? "Unpublish" : "Publish"}
                      className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground">
                      {project.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </form>
                  {/* Edit */}
                  <Link href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  {/* Delete */}
                  <form action={async () => {
                    "use server"
                    await deleteProject(project.id)
                  }}>
                    <button type="submit" title="Delete"
                      className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-destructive/10 text-destructive h-9 w-9">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
