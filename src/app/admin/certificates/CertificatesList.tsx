"use client"

import Link from "next/link"
import { Plus, Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { toggleCertificatePublish, deleteCertificate } from "@/app/actions/certificate"

type Certificate = {
  id: string
  title: string
  description: string
  imageUrl: string
  issuer: string | null
  published: boolean
}

export default function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return
    }
    const formData = new FormData(e.currentTarget)
    await deleteCertificate(id)
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
        <div
          key={cert.id}
          className="flex items-center gap-4 rounded-lg border bg-card p-4"
        >
          <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded border bg-muted">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
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

          <div className="flex items-center gap-2">
            <form action={toggleCertificatePublish.bind(null, cert.id, cert.published)}>
              <button
                type="submit"
                className={`rounded-lg p-2 text-sm transition-colors ${
                  cert.published
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
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
            </form>

            <Link
              href={`/admin/certificates/${cert.id}/edit`}
              className="rounded-lg p-2 text-sm bg-muted hover:bg-muted/80 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </Link>

            <form onSubmit={(e) => handleDelete(e, cert.id)}>
              <button
                type="submit"
                className="rounded-lg p-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
