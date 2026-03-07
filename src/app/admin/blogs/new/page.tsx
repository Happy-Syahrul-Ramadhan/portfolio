"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
import ImageUploader from "@/app/components/ImageUploader"
import { useToast } from "@/app/components/ToastProvider"

const TiptapEditor = dynamic(() => import("@/app/components/TiptapEditor"), { ssr: false })

export default function NewBlog() {
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const router = useRouter()
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set("content", content)

    if (!content || content === "<p><br></p>") {
      setError("Content is required")
      return
    }

    startTransition(async () => {
      try {
        const { createBlog } = await import("@/app/actions/blog")
        const result = await createBlog(formData)
        if (result?.error) {
          showToast(result.error, "error")
        } else {
          showToast("Blog post created successfully!", "success")
          setTimeout(() => router.push("/admin/blogs"), 1000)
        }
      } catch (err) {
        showToast("Failed to create blog post", "error")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Post Title" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">Slug (auto-generated if empty)</label>
          <input id="slug" name="slug"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="my-awesome-post" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="excerpt">Excerpt (Short Summary)</label>
          <textarea id="excerpt" name="excerpt" required
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="A brief summary shown on the blog list..." />
        </div>

        <ImageUploader name="imageUrl" label="Thumbnail / Cover Image" />

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="hashtags">Hashtags (comma separated, e.g: webdev,nextjs,typescript)</label>
          <input id="hashtags" name="hashtags"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="webdev,nextjs,react" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <TiptapEditor value={content} onChange={setContent} />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" value="true"
            className="h-4 w-4 rounded border-gray-300" defaultChecked />
          <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
        </div>

        <button type="submit" disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 disabled:opacity-50">
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}
