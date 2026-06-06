"use client"

import { updateHKI } from "@/app/actions/intellectualProperty"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/components/ToastProvider"

interface IntellectualProperty {
  id: string
  registrationNo: string
  title: string
  description: string | null
  type: string
  year: number
  issuer: string
  url: string | null
  order: number
}

interface Props {
  hki: IntellectualProperty
}

export default function EditHKIForm({ hki }: Props) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await updateHKI(hki.id, formData)
        showToast("HKI entry updated successfully!", "success")
        setTimeout(() => router.push("/admin/hki"), 1000)
      } catch {
        showToast("Failed to update HKI entry", "error")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card border rounded-xl p-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="registrationNo">
          Registration No. <span className="text-destructive">*</span>
        </label>
        <input
          id="registrationNo"
          name="registrationNo"
          type="text"
          required
          defaultValue={hki.registrationNo}
          placeholder="e.g., EC00202007198"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="title">
          Title <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={hki.title}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="type">
          Type <span className="text-destructive">*</span>
        </label>
        <select
          id="type"
          name="type"
          defaultValue={hki.type}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="Hak Cipta">Hak Cipta</option>
          <option value="Paten">Paten</option>
          <option value="Merek Dagang">Merek Dagang</option>
          <option value="Desain Industri">Desain Industri</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={hki.description ?? ""}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
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
          defaultValue={hki.year}
          min={1900}
          max={new Date().getFullYear() + 5}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="issuer">
          Issuer <span className="text-destructive">*</span>
        </label>
        <input
          id="issuer"
          name="issuer"
          type="text"
          required
          defaultValue={hki.issuer}
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
          defaultValue={hki.url ?? ""}
          placeholder="https://..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          defaultValue={hki.order}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
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
