import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditEducationClient from "./EditEducationClient"

export const dynamic = "force-dynamic"

export default async function EditEducation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const education = await prisma.education.findFirst({ where: { id } })
  if (!education) notFound()

  return <EditEducationClient education={education} />
}