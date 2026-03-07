import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditBlogClient from "./EditBlogClient"

export const dynamic = "force-dynamic"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await prisma.blog.findFirst({ where: { id } })
  if (!blog) notFound()

  return <EditBlogClient blog={blog} />
}
