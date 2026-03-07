"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const link = formData.get("link") as string
  const published = formData.get("published") === "true"
  const hashtags = formData.get("hashtags") as string
  let slug = (formData.get("slug") as string) || generateSlug(title)

  if (!title || !description) throw new Error("Title and description are required")

  // Check if slug already exists, if yes add number suffix
  const existingProject = await prisma.project.findUnique({ where: { slug } })
  if (existingProject) {
    let counter = 1
    let newSlug = `${slug}-${counter}`
    while (await prisma.project.findUnique({ where: { slug: newSlug } })) {
      counter++
      newSlug = `${slug}-${counter}`
    }
    slug = newSlug
  }

  await prisma.project.create({
    data: { title, description, content, slug, imageUrl, link, published, hashtags },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/project")
  revalidatePath("/")
  return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const link = formData.get("link") as string
  const published = formData.get("published") === "true"
  const hashtags = formData.get("hashtags") as string
  let slug = (formData.get("slug") as string) || generateSlug(title)

  if (!title || !description) throw new Error("Title and description are required")

  // Check if slug already exists (except current project)
  const existingProject = await prisma.project.findUnique({ where: { slug } })
  if (existingProject && existingProject.id !== id) {
    let counter = 1
    let newSlug = `${slug}-${counter}`
    while (true) {
      const check = await prisma.project.findUnique({ where: { slug: newSlug } })
      if (!check || check.id === id) break
      counter++
      newSlug = `${slug}-${counter}`
    }
    slug = newSlug
  }

  await prisma.project.update({
    where: { id },
    data: { title, description, content, slug, imageUrl, link, published, hashtags },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/project")
  revalidatePath("/")
  return { success: true }
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
