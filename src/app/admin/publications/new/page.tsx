"use client"

import { createPublication } from "@/app/actions/publication"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/app/components/ToastProvider"

const currentYear = new Date().getFullYear()

export default function NewPublication() {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await createPublication(formData)
        showToast("Publication created successfully!", "success")
        setTimeout(() => router.push("/admin/publications"), 1000)
      } catch {
        showToast("Failed to create publication", "error")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/publications"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Add Publication</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="title">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="authors">
            Authors <span className="text-destructive">*</span>
          </label>
          <input
            id="authors"
            name="authors"
            type="text"
            required
            placeholder="e.g., A. Name, B. Name, C. Name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="journal">
            Journal / Conference / Proceeding <span className="text-destructive">*</span>
          </label>
          <input
            id="journal"
            name="journal"
            type="text"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="volume">
            Volume / Issue / Pages
          </label>
          <input
            id="volume"
            name="volume"
            type="text"
            placeholder="e.g., vol. 10, no. 1, pp. 1–10"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="year">
            Year <span className="text-destructive">*</span>
          </label>
          <input
            id="year"
            name="year"
            type="number"
            required
            defaultValue={currentYear}
            min={1900}
            max={currentYear + 5}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="doi">
            DOI
          </label>
          <input
            id="doi"
            name="doi"
            type="text"
            placeholder="e.g., 10.1109/..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="text"
            placeholder="https://..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="abstract">
            Abstract
          </label>
          <textarea
            id="abstract"
            name="abstract"
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="order">
            Order
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={0}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="hidden"
            value="true"
          />
          <input
            id="publishedCheckbox"
            type="checkbox"
            defaultChecked
            onChange={(e) => {
              const hidden = document.getElementById("published") as HTMLInputElement
              if (hidden) hidden.value = e.target.checked ? "true" : "false"
            }}
            className="h-4 w-4 rounded border border-input"
          />
          <label className="text-sm font-medium" htmlFor="publishedCheckbox">
            Published
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 mt-2 disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Publication"}
        </button>
      </form>
    </div>
  )
}
