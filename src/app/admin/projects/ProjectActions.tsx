"use client"

import { useTransition } from "react"
import { Eye, EyeOff, Trash2 } from "lucide-react"
import { deleteProject, toggleProjectPublish } from "@/app/actions/project"
import { useToast } from "@/app/components/ToastProvider"

interface ProjectActionsProps {
  projectId: string
  projectTitle: string
  isPublished: boolean
}

export default function ProjectActions({ projectId, projectTitle, isPublished }: ProjectActionsProps) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleTogglePublish = () => {
    startTransition(async () => {
      try {
        await toggleProjectPublish(projectId, isPublished)
        showToast(
          isPublished ? `"${projectTitle}" unpublished` : `"${projectTitle}" published`,
          "success"
        )
      } catch (error) {
        showToast("Failed to update project", "error")
      }
    })
  }

  const handleDelete = () => {
    if (!confirm(`Delete "${projectTitle}"?`)) return

    startTransition(async () => {
      try {
        await deleteProject(projectId)
        showToast(`"${projectTitle}" deleted`, "success")
      } catch (error) {
        showToast("Failed to delete project", "error")
      }
    })
  }

  return (
    <>
      <button
        onClick={handleTogglePublish}
        disabled={isPending}
        title={isPublished ? "Unpublish" : "Publish"}
        className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-accent h-9 w-9 text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        {isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>

      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Delete"
        className="inline-flex items-center justify-center rounded-md text-sm transition-colors hover:bg-destructive/10 text-destructive h-9 w-9 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  )
}
