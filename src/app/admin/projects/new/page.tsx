"use client"

import { createProject } from "@/app/actions/project"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ImageUploader from "@/app/components/ImageUploader"
import { useRef } from "react"

export default function NewProject() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">New Project</h1>
      </div>

      <form action={createProject} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Project Title" />
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
          <label className="text-sm font-medium" htmlFor="content">Details / Content (Optional)</label>
          <textarea id="content" name="content"
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Detailed project description..." />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="published" name="published" value="true"
            className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
        </div>

        <button type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2">
          Create Project
        </button>
      </form>
    </div>
  )
}
