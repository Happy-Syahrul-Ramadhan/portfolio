"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createExperience(formData: FormData) {
  const company = formData.get("company") as string
  const role = formData.get("role") as string
  const period = formData.get("period") as string
  const description = formData.get("description") as string
  const logoUrl = formData.get("logoUrl") as string || null
  const current = formData.get("current") === "true"
  const order = parseInt(formData.get("order") as string || "0")
  const skills = formData.get("skills") as string || null

  if (!company || !role || !period) throw new Error("Company, role, and period are required")

  await prisma.workExperience.create({
    data: { company, role, period, description, logoUrl, current, order, skills },
  })

  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/admin/experience")
  return { success: true }
}

export async function updateExperience(id: string, formData: FormData) {
  const company = formData.get("company") as string
  const role = formData.get("role") as string
  const period = formData.get("period") as string
  const description = formData.get("description") as string
  const logoUrl = formData.get("logoUrl") as string || null
  const current = formData.get("current") === "true"
  const order = parseInt(formData.get("order") as string || "0")
  const skills = formData.get("skills") as string || null

  await prisma.workExperience.update({
    where: { id },
    data: { company, role, period, description, logoUrl, current, order, skills },
  })

  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/admin/experience")
  return { success: true }
}

export async function deleteExperience(id: string) {
  await prisma.workExperience.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/admin/experience")
}
