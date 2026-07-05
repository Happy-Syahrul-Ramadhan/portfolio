"use client"

import { useState } from "react"
import { updateCertificate } from "@/app/actions/certificate"
import ImageUploader from "@/app/components/ImageUploader"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Certificate = {
  id: string
  title: string
  description: string
  imageUrl: string
  issuer: string | null
  issueDate: Date | null
  credentialUrl: string | null
  credentialId: string | null
  skills: string | null
  published: boolean
  order: number
  pinOrder: number | null
}

export default function EditCertificateClient({ certificate }: { certificate: Certificate }) {
  const [imageUrl, setImageUrl] = useState(certificate.imageUrl)

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/certificates"
          className="rounded-lg p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Certificate</h1>
          <p className="text-muted-foreground">Update certificate details</p>
        </div>
      </div>

      <form action={updateCertificate.bind(null, certificate.id)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={certificate.title}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="Certificate name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={certificate.description}
            className="rounded-lg border bg-background px-3 py-2 text-sm resize-none"
            placeholder="Brief description of the certificate"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Certificate Image *</label>
          <ImageUploader value={imageUrl} onChange={setImageUrl} />
          <input type="hidden" name="imageUrl" value={imageUrl} required />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="issuer" className="text-sm font-medium">
              Issued By
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              defaultValue={certificate.issuer || ""}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Organization name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="issueDate" className="text-sm font-medium">
              Issue Date
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              defaultValue={
                certificate.issueDate
                  ? new Date(certificate.issueDate).toISOString().split("T")[0]
                  : ""
              }
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="credentialUrl" className="text-sm font-medium">
            Credential URL
          </label>
          <input
            type="url"
            id="credentialUrl"
            name="credentialUrl"
            defaultValue={certificate.credentialUrl || ""}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <p className="text-xs text-muted-foreground">
            Link to verify the certificate (optional)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="credentialId" className="text-sm font-medium">
            Credential ID
          </label>
          <input
            type="text"
            id="credentialId"
            name="credentialId"
            defaultValue={certificate.credentialId || ""}
            className="rounded-lg border bg-background px-3 py-2 text-sm font-mono"
            placeholder="ABC123XYZ"
          />
          <p className="text-xs text-muted-foreground">
            Certificate identification number (optional)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="skills" className="text-sm font-medium">
            Related Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            defaultValue={certificate.skills || ""}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="JavaScript, React, Node.js"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated list of related skills (optional)
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="pinOrder" className="text-sm font-medium">
              Pin Order
            </label>
            <input
              type="number"
              id="pinOrder"
              name="pinOrder"
              min={1}
              defaultValue={certificate.pinOrder ?? ""}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Kosongkan jika tidak ingin dipin"
            />
            <p className="text-xs text-muted-foreground">
              Kosong berarti tidak dipin. Angka lebih kecil akan muncul lebih dulu.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="order" className="text-sm font-medium">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              name="order"
              defaultValue={certificate.order}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="published"
              name="published"
              value="true"
              defaultChecked={certificate.published}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Publish certificate
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!imageUrl}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Certificate
          </button>
          <Link
            href="/admin/certificates"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
