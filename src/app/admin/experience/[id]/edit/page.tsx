import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditExperienceClient from "./EditExperienceClient"

export const dynamic = "force-dynamic"

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exp = await prisma.workExperience.findFirst({ where: { id } })
  if (!exp) notFound()

  return <EditExperienceClient experience={exp} />
}
