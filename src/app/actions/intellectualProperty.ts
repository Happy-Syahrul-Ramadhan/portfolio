"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createHKI(formData: FormData) {
  const registrationNo = formData.get("registrationNo") as string
  const title = formData.get("title") as string
  const description = (formData.get("description") as string) || null
  const type = (formData.get("type") as string) || "Hak Cipta"
  const year = parseInt(formData.get("year") as string)
  const issuer = (formData.get("issuer") as string) || "Kemenkumham RI"
  const url = (formData.get("url") as string) || null
  const order = parseInt(formData.get("order") as string || "0")

  if (!registrationNo || !title || isNaN(year)) {
    throw new Error("Registration number, title, and year are required")
  }

  await prisma.intellectualProperty.create({
    data: { registrationNo, title, description, type, year, issuer, url, order },
  })

  revalidatePath("/")
  revalidatePath("/admin/hki")
  return { success: true }
}

export async function updateHKI(id: string, formData: FormData) {
  const registrationNo = formData.get("registrationNo") as string
  const title = formData.get("title") as string
  const description = (formData.get("description") as string) || null
  const type = (formData.get("type") as string) || "Hak Cipta"
  const year = parseInt(formData.get("year") as string)
  const issuer = (formData.get("issuer") as string) || "Kemenkumham RI"
  const url = (formData.get("url") as string) || null
  const order = parseInt(formData.get("order") as string || "0")

  await prisma.intellectualProperty.update({
    where: { id },
    data: { registrationNo, title, description, type, year, issuer, url, order },
  })

  revalidatePath("/")
  revalidatePath("/admin/hki")
  return { success: true }
}

export async function deleteHKI(id: string) {
  await prisma.intellectualProperty.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/hki")
}
