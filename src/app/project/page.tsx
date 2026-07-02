import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Layers, ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProjectPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col gap-8 mt-12 mb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading flex items-center gap-3">
          <Layers className="h-8 w-8" /> Projects
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          A collection of my recent work and side projects.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex items-center justify-center p-12 py-24 border rounded-xl border-dashed">
          <p className="text-muted-foreground">No projects have been published yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 scale-150 rounded-full bg-primary/5 blur-3xl" />
                    <span className="relative z-10 text-5xl font-bold font-heading text-primary/40">{project.title.charAt(0)}</span>
                    <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-background/80 backdrop-blur-sm">
                      <Layers className="h-6 w-6 text-primary/60" />
                    </div>
                  </div>
                )}
                {project.link && (
                  <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 z-10">
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary">{project.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                {project.link && (
                  <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors hover:text-primary">
                    View Live Project
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
