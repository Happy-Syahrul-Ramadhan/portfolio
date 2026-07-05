"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
import ImageUploader from "@/app/components/ImageUploader"
import { useToast } from "@/app/components/ToastProvider"

const TiptapEditor = dynamic(() => import("@/app/components/TiptapEditor"), { ssr: false })

interface Project {
  id: string
  title: string
  slug: string
  description: string
  link: string | null
  imageUrl: string | null
  content: string | null
  published: boolean
  hashtags: string | null
  pinOrder: number | null
}

export default function EditProjectClient({ project }: { project: Project }) {
  const [content, setContent] = useState(project.content || "")
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set("content", content)

    startTransition(async () => {
      try {
        const { updateProject } = await import("@/app/actions/project")
        await updateProject(project.id, formData)
        showToast("Project updated successfully!", "success")
        setTimeout(() => router.push("/admin/projects"), 1000)
      } catch {
        showToast("Failed to update project", "error")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required defaultValue={project.title}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">Slug (URL-friendly)</label>
          <input id="slug" name="slug" defaultValue={project.slug || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="my-project-slug" />
          <p className="text-xs text-muted-foreground">Will be auto-generated from title if left empty</p>
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
          <label className="text-sm font-medium" htmlFor="hashtags">Hashtags (comma separated, e.g: webdev,react,portfolio)</label>
          <input id="hashtags" name="hashtags" defaultValue={project.hashtags || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="webdev,react,nextjs" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="pinOrder">Pin Order (Optional)</label>
          <input
            id="pinOrder"
            name="pinOrder"
            type="number"
            min={1}
            defaultValue={project.pinOrder ?? ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Kosongkan jika tidak ingin dipin"
          />
          <p className="text-xs text-muted-foreground">Kosong berarti tidak dipin. Angka lebih kecil akan tampil lebih dulu di halaman publik.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Details / Content (Optional)</label>
          <TiptapEditor value={content} onChange={setContent} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" value="true"
            defaultChecked={project.published}
            className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="published" className="text-sm font-medium">Published</label>
        </div>

        <button type="submit" disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 disabled:opacity-50">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
