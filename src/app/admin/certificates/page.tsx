import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import CertificatesList from "./CertificatesList"

export const dynamic = "force-dynamic"

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Certificates</h1>
          <p className="text-muted-foreground">Create and manage your certificates</p>
        </div>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Certificate
        </Link>
      </div>

      <CertificatesList certificates={certificates} />
    </div>
  )
}
