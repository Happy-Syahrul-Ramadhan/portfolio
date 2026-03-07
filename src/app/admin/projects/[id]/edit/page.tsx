import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProjectClient from "./EditProjectClient"

export const dynamic = "force-dynamic"

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findFirst({ where: { id } })
  if (!project) notFound()

  return <EditProjectClient project={project} />
}
