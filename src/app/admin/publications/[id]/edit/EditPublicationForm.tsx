"use client"

import { updatePublication } from "@/app/actions/publication"
import { useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/components/ToastProvider"

interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  volume: string | null
  year: number
  doi: string | null
  url: string | null
  abstract: string | null
  order: number
  published: boolean
}

interface Props {
  publication: Publication
}

export default function EditPublicationForm({ publication }: Props) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()
  const publishedRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await updatePublication(publication.id, formData)
        showToast("Publication updated successfully!", "success")
        setTimeout(() => router.push("/admin/publications"), 1000)
      } catch {
        showToast("Failed to update publication", "error")
      }
    })
  }

  return (
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
          defaultValue={publication.title}
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
          defaultValue={publication.authors}
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
          defaultValue={publication.journal}
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
          defaultValue={publication.volume ?? ""}
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
          defaultValue={publication.year}
          min={1900}
          max={new Date().getFullYear() + 5}
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
          defaultValue={publication.doi ?? ""}
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
          defaultValue={publication.url ?? ""}
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
          defaultValue={publication.abstract ?? ""}
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
          defaultValue={publication.order}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={publishedRef}
          id="published"
          name="published"
          type="hidden"
          defaultValue={publication.published ? "true" : "false"}
        />
        <input
          id="publishedCheckbox"
          type="checkbox"
          defaultChecked={publication.published}
          onChange={(e) => {
            if (publishedRef.current) {
              publishedRef.current.value = e.target.checked ? "true" : "false"
            }
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
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
}
