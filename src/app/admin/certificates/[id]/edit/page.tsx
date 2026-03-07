import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditCertificateClient from "./EditCertificateClient"

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const certificate = await prisma.certificate.findUnique({
    where: { id },
  })

  if (!certificate) {
    notFound()
  }

  return <EditCertificateClient certificate={certificate} />
}
