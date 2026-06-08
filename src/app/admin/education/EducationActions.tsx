"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteEducation } from "@/app/actions/education"
import { useToast } from "@/app/components/ToastProvider"

interface EducationActionsProps {
  educationId: string
  degree: string
  institution: string
}

export default function EducationActions({ educationId, degree, institution }: EducationActionsProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleDelete = () => {
    if (!confirm(`Delete "${degree} at ${institution}"?`)) return

    startTransition(async () => {
      try {
        await deleteEducation(educationId)
        showToast(`"${degree}" deleted`, "success")
      } catch (error) {
        showToast("Failed to delete education entry", "error")
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