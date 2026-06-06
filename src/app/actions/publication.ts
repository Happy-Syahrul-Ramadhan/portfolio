"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPublication(formData: FormData) {
  const title = formData.get("title") as string
  const authors = formData.get("authors") as string
  const journal = formData.get("journal") as string
  const volume = (formData.get("volume") as string) || null
  const year = parseInt(formData.get("year") as string)
  const doi = (formData.get("doi") as string) || null
  const url = (formData.get("url") as string) || null
  const abstract = (formData.get("abstract") as string) || null
  const order = parseInt(formData.get("order") as string || "0")
  const published = formData.get("published") === "true"

  if (!title || !authors || !journal || isNaN(year)) {
    throw new Error("Title, authors, journal, and year are required")
  }

  await prisma.publication.create({
    data: { title, authors, journal, volume, year, doi, url, abstract, order, published },
  })

  revalidatePath("/")
  revalidatePath("/admin/publications")
  return { success: true }
}

export async function updatePublication(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const authors = formData.get("authors") as string
  const journal = formData.get("journal") as string
  const volume = (formData.get("volume") as string) || null
  const year = parseInt(formData.get("year") as string)
  const doi = (formData.get("doi") as string) || null
  const url = (formData.get("url") as string) || null
  const abstract = (formData.get("abstract") as string) || null
  const order = parseInt(formData.get("order") as string || "0")
  const published = formData.get("published") === "true"

  await prisma.publication.update({
    where: { id },
    data: { title, authors, journal, volume, year, doi, url, abstract, order, published },
  })

  revalidatePath("/")
  revalidatePath("/admin/publications")
  return { success: true }
}

export async function deletePublication(id: string) {
  await prisma.publication.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/publications")
}
