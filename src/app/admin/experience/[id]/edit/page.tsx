import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateExperience } from "@/app/actions/experience"

export const dynamic = "force-dynamic"

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exp = await prisma.workExperience.findFirst({ where: { id } })
  if (!exp) notFound()

  const update = updateExperience.bind(null, exp.id)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/experience"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Experience</h1>
      </div>

      <form action={update} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company">Company</label>
            <input id="company" name="company" required defaultValue={exp.company}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="role">Role / Position</label>
            <input id="role" name="role" required defaultValue={exp.role}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="period">Period</label>
            <input id="period" name="period" required defaultValue={exp.period}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="order">Display Order</label>
            <input id="order" name="order" type="number" defaultValue={exp.order}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} defaultValue={exp.description}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="current" name="current" value="true" defaultChecked={exp.current} className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="current" className="text-sm font-medium">This is my current position</label>
        </div>

        <button type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2">
          Save Changes
        </button>
      </form>
    </div>
  )
}
