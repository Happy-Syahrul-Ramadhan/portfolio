"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateEducation } from "@/app/actions/education"
import { useToast } from "@/app/components/ToastProvider"

interface EditEducationClientProps {
  education: {
    id: string
    degree: string
    institution: string
    major: string
    location: string | null
    order: number
  }
}

export default function EditEducationClient({ education }: EditEducationClientProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await updateEducation(education.id, formData)
        showToast("Education updated successfully!", "success")
        setTimeout(() => router.push("/admin/education"), 1000)
      } catch (error) {
        showToast("Failed to update education entry", "error")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/education" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Education</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="degree">Degree / Title</label>
            <input id="degree" name="degree" required defaultValue={education.degree} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="major">Major / Field of Study</label>
            <input id="major" name="major" required defaultValue={education.major} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="institution">Institution Name</label>
            <input id="institution" name="institution" required defaultValue={education.institution} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="location">Location</label>
            <input id="location" name="location" defaultValue={education.location || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="order">Display Order</label>
          <input id="order" name="order" type="number" defaultValue={education.order} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <button type="submit" disabled={isPending} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2 disabled:opacity-50">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}