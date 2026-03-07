"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteExperience } from "@/app/actions/experience"
import { useToast } from "@/app/components/ToastProvider"

interface ExperienceActionsProps {
  experienceId: string
  role: string
  company: string
}

export default function ExperienceActions({ experienceId, role, company }: ExperienceActionsProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleDelete = () => {
    if (!confirm(`Delete "${role} at ${company}"?`)) return

    startTransition(async () => {
      try {
        await deleteExperience(experienceId)
        showToast(`"${role}" deleted`, "success")
      } catch (error) {
        showToast("Failed to delete experience", "error")
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
