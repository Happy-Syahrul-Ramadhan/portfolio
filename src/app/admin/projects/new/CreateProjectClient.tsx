"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
import ImageUploader from "@/app/components/ImageUploader"
import { useToast } from "@/app/components/ToastProvider"

const TiptapEditor = dynamic(() => import("@/app/components/TiptapEditor"), { ssr: false })

export default function CreateProjectClient() {
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set("content", content)

    startTransition(async () => {
      try {
        const { createProject } = await import("@/app/actions/project")
        await createProject(formData)
        showToast("Project created successfully!", "success")
        setTimeout(() => router.push("/admin/projects"), 1000)
      } catch (err) {
        showToast("Failed to create project", "error")
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
        <h1 className="text-3xl font-bold tracking-tight font-heading">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Project Title" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">Slug (URL-friendly, leave empty to auto-generate)</label>
          <input id="slug" name="slug"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="my-project-slug" />
          <p className="text-xs text-muted-foreground">Will be auto-generated from title if left empty</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="description">Short Description</label>
          <textarea id="description" name="description" required
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Brief overview..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="link">Project URL (Optional)</label>
          <input id="link" name="link" type="url"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="https://example.com" />
        </div>

        <ImageUploader name="imageUrl" label="Thumbnail Image (Optional)" />

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="hashtags">Hashtags (comma separated, e.g: webdev,react,portfolio)</label>
          <input id="hashtags" name="hashtags"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="webdev,react,nextjs" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Details / Content (Optional)</label>
          <TiptapEditor value={content} onChange={setContent} />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" value="true"
            className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
        </div>

        <button type="submit" disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 disabled:opacity-50">
          {isPending ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  )
}
