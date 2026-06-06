import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import EditPublicationForm from "./EditPublicationForm"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPublicationPage({ params }: Props) {
  const { id } = await params
  const publication = await prisma.publication.findUnique({ where: { id } })
  if (!publication) notFound()

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/publications"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit Publication</h1>
      </div>
      <EditPublicationForm publication={publication} />
    </div>
  )
}
