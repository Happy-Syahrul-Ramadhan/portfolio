"use client"

import { useTransition } from "react"
import Link from "next/link"
import { Plus, Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { toggleCertificatePublish, deleteCertificate } from "@/app/actions/certificate"
import { useToast } from "@/app/components/ToastProvider"

type Certificate = {
  id: string
  title: string
  description: string
  imageUrl: string
  issuer: string | null
  published: boolean
}

export default function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const [isPending, startTransition] = useTransition()
  const { showToast } = useToast()

  const handleTogglePublish = (id: string, title: string, isPublished: boolean) => {
    startTransition(async () => {
      try {
        await toggleCertificatePublish(id, isPublished)
        showToast(
          isPublished ? `"${title}" unpublished` : `"${title}" published`,
          "success"
        )
      } catch (error) {
        showToast("Failed to update certificate", "error")
      }
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return

    startTransition(async () => {
      try {
        await deleteCertificate(id)
        showToast(`"${title}" deleted`, "success")
      } catch (error) {
        showToast("Failed to delete certificate", "error")
      }
    })
  }

  if (certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No certificates yet</p>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="h-4 w-4" />
          Create your first certificate
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {certificates.map((cert) => (
        <div key={cert.id} className="admin-list-item rounded-lg border bg-card">
          <div className="h-24 w-full sm:w-32 flex-shrink-0 overflow-hidden rounded border bg-muted">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="admin-list-main flex-1">
            <h3 className="font-semibold truncate">{cert.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {cert.description}
            </p>
            {cert.issuer && (
              <p className="text-xs text-muted-foreground mt-1">
                Issued by: {cert.issuer}
              </p>
            )}
          </div>

          <div className="admin-list-actions gap-2">
            <button
              onClick={() => handleTogglePublish(cert.id, cert.title, cert.published)}
              disabled={isPending}
              className={`rounded-lg p-2 text-sm transition-colors disabled:opacity-50 ${
                cert.published
                  ? "bg-[#14532d] text-white hover:bg-[#0f3f22] dark:bg-[#14532d] dark:text-white dark:hover:bg-[#0f3f22]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              title={cert.published ? "Published" : "Unpublished"}
            >
              {cert.published ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>

            <Link
              href={`/admin/certificates/${cert.id}/edit`}
              className="rounded-lg p-2 text-sm bg-muted hover:bg-muted/80 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </Link>

            <button
              onClick={() => handleDelete(cert.id, cert.title)}
              disabled={isPending}
              className="rounded-lg p-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
