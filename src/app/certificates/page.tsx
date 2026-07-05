import { prisma } from "@/lib/prisma"
import CertificatesList from "./CertificatesList"

export const dynamic = "force-dynamic"

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    where: { published: true },
    orderBy: [{ pinOrder: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  })

  return <CertificatesList certificates={certificates} />
}
