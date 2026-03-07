"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const link = formData.get("link") as string
  const published = formData.get("published") === "true"

  if (!title || !description) throw new Error("Title and description are required")

  await prisma.project.create({
    data: { title, description, content, imageUrl, link, published },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/project")
  redirect("/admin/projects")
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const link = formData.get("link") as string
  const published = formData.get("published") === "true"

  if (!title || !description) throw new Error("Title and description are required")

  await prisma.project.update({
    where: { id },
    data: { title, description, content, imageUrl, link, published },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/project")
  redirect("/admin/projects")
}

export async function toggleProjectPublish(id: string, published: boolean) {
  await prisma.project.update({
    where: { id },
    data: { published: !published },
  })
  revalidatePath("/admin/projects")
  revalidatePath("/project")
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/admin/projects")
  revalidatePath("/project")
}
