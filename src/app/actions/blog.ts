"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const published = formData.get("published") === "true"
  const hashtags = formData.get("hashtags") as string
  let slug = formData.get("slug") as string

  if (!title || !excerpt || !content) return { error: "Title, excerpt, and content are required" }
  if (!slug) slug = generateSlug(title)

  await prisma.blog.create({
    data: { title, excerpt, content, slug, imageUrl, published, hashtags },
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  return { success: true }
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const published = formData.get("published") === "true"
  const hashtags = formData.get("hashtags") as string
  let slug = formData.get("slug") as string

  if (!title || !excerpt || !content) return { error: "Title, excerpt, and content are required" }
  if (!slug) slug = generateSlug(title)

  await prisma.blog.update({
    where: { id },
    data: { title, excerpt, content, slug, imageUrl, published, hashtags },
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  return { success: true }
}

export async function toggleBlogPublish(id: string, published: boolean) {
  await prisma.blog.update({
    where: { id },
    data: { published: !published },
  })
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } })
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
}
