"use client"

import { createExperience } from "@/app/actions/experience"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ImageUploader from "@/app/components/ImageUploader"
import { useToast } from "@/app/components/ToastProvider"

export default function NewExperience() {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await createExperience(formData)
        showToast("Experience created successfully!", "success")
        setTimeout(() => router.push("/admin/experience"), 1000)
      } catch (error) {
        showToast("Failed to create experience", "error")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/experience"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Add Experience</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company">Company</label>
            <input id="company" name="company" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Acme Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="role">Role / Position</label>
            <input id="role" name="role" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Senior Developer" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="period">Period</label>
            <input id="period" name="period" required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Jan 2022 – Present" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="order">Display Order</label>
            <input id="order" name="order" type="number" defaultValue="0"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            placeholder="Describe your responsibilities and achievements..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="skills">Related Skills</label>
          <input id="skills" name="skills" type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="e.g., React, Node.js, TypeScript (comma-separated)" />
        </div>

        <div className="space-y-2">
          <ImageUploader name="logoUrl" label="Company Logo" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="current" name="current" value="true" className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="current" className="text-sm font-medium">This is my current position</label>
        </div>

        <button type="submit" disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2 disabled:opacity-50">
          {isPending ? "Adding..." : "Add Experience"}
        </button>
      </form>
    </div>
  )
}
