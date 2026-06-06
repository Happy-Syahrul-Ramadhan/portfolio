"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deletePublication } from "@/app/actions/publication"
import { useToast } from "@/app/components/ToastProvider"

interface PublicationActionsProps {
  publicationId: string
  title: string
}

export default function PublicationActions({ publicationId, title }: PublicationActionsProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleDelete = () => {
    if (!confirm(`Delete "${title}"?`)) return
    startTransition(async () => {
      try {
        await deletePublication(publicationId)
        showToast(`"${title}" deleted`, "success")
      } catch {
        showToast("Failed to delete publication", "error")
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
