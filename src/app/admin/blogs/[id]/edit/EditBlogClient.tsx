"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
import ImageUploader from "@/app/components/ImageUploader"

const TiptapEditor = dynamic(() => import("@/app/components/TiptapEditor"), { ssr: false })

interface EditBlogClientProps {
  blog: {
    id: string
    title: string
    excerpt: string
    content: string
    slug: string
    imageUrl: string | null
    published: boolean
    hashtags: string | null
  }
}

export default function EditBlogClient({ blog }: EditBlogClientProps) {
  const [content, setContent] = useState(blog.content)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set("content", content)

    if (!content || content === "<p><br></p>") {
      setError("Content is required")
      return
    }

    startTransition(async () => {
      const { updateBlog } = await import("@/app/actions/blog")
      await updateBlog(blog.id, formData)
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card border rounded-xl p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">Title</label>
          <input id="title" name="title" required defaultValue={blog.title}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={blog.slug}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" required defaultValue={blog.excerpt}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <ImageUploader name="imageUrl" label="Thumbnail / Cover Image" defaultValue={blog.imageUrl || ""} />

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="hashtags">Hashtags (comma separated, e.g: webdev,nextjs,typescript)</label>
          <input id="hashtags" name="hashtags" defaultValue={blog.hashtags || ""}
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
            defaultChecked={blog.published}
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
