"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createEducation(formData: FormData) {
  const degree = formData.get("degree") as string
  const institution = formData.get("institution") as string
  const major = formData.get("major") as string
  const location = (formData.get("location") as string) || null
  const order = parseInt((formData.get("order") as string) || "0")

  if (!degree || !institution || !major) {
    throw new Error("Degree, institution, and major are required")
  }

  await prisma.education.create({
    data: { degree, institution, major, location, order },
  })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/admin/education")
}

export async function updateEducation(id: string, formData: FormData) {
  const degree = formData.get("degree") as string
  const institution = formData.get("institution") as string
  const major = formData.get("major") as string
  const location = (formData.get("location") as string) || null
  const order = parseInt((formData.get("order") as string) || "0")

  if (!degree || !institution || !major) {
    throw new Error("Degree, institution, and major are required")
  }

  await prisma.education.update({
    where: { id },
    data: { degree, institution, major, location, order },
  })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/admin/education")
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/admin/education")
}