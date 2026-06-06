import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import EditHKIForm from "./EditHKIForm"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditHKIPage({ params }: Props) {
  const { id } = await params
  const hki = await prisma.intellectualProperty.findUnique({ where: { id } })
  if (!hki) notFound()

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/hki"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 w-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Edit HKI</h1>
      </div>
      <EditHKIForm hki={hki} />
    </div>
  )
}
