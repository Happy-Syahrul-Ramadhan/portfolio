import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateProject } from "@/app/actions/project"
import ImageUploader from "@/app/components/ImageUploader"

export const dynamic = "force-dynamic"

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findFirst({ where: { id } })
  if (!project) notFound()

  const update = updateProject.bind(null, project.id)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Project</h1>
      </div>

      <form action={update} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required defaultValue={project.title}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="description">Short Description</label>
          <textarea id="description" name="description" required defaultValue={project.description}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="link">Project URL (Optional)</label>
          <input id="link" name="link" type="url" defaultValue={project.link || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="https://example.com" />
        </div>

        <ImageUploader name="imageUrl" label="Thumbnail Image" defaultValue={project.imageUrl || ""} />

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="content">Details / Content (Optional)</label>
          <textarea id="content" name="content" defaultValue={project.content || ""}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="published" name="published" value="true"
            defaultChecked={project.published}
            className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="published" className="text-sm font-medium">Published</label>
        </div>

        <button type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2">
          Save Changes
        </button>
      </form>
    </div>
  )
}
