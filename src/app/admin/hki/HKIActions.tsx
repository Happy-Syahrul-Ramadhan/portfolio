"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteHKI } from "@/app/actions/intellectualProperty"
import { useToast } from "@/app/components/ToastProvider"

interface HKIActionsProps {
  hkiId: string
  title: string
}

export default function HKIActions({ hkiId, title }: HKIActionsProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleDelete = () => {
    if (!confirm(`Delete "${title}"?`)) return
    startTransition(async () => {
      try {
        await deleteHKI(hkiId)
        showToast(`"${title}" deleted`, "success")
      } catch {
        showToast("Failed to delete HKI entry", "error")
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete"
      className="inline-flex items-center justify-center rounded-md transition-colors hover:bg-destructive/10 text-destructive h-9 w-9 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
