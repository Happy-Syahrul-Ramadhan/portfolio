"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function upsertProfile(formData: FormData) {
  const data = {
    name: formData.get("name") as string || "",
    title: formData.get("title") as string || "",
    bio: formData.get("bio") as string || "",
    location: formData.get("location") as string || "",
    email: formData.get("email") as string || "",
    avatarUrl: formData.get("avatarUrl") as string || null,
    github: formData.get("github") as string || "",
    linkedin: formData.get("linkedin") as string || "",
    twitter: formData.get("twitter") as string || "",
    website: formData.get("website") as string || "",
  }

  await prisma.profile.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  })

  revalidatePath("/")
  revalidatePath("/admin/settings")
}

export async function getProfile() {
  return await prisma.profile.findUnique({ where: { id: "singleton" } })
}

export async function updateCV(formData: FormData) {
  try {
    const file = formData.get("cv") as File
    
    if (!file) {
      throw new Error("No file uploaded")
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed")
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      throw new Error("File too large (max 10MB)")
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Use fixed filename to replace old CV
    const filename = "Happy Syahrul Ramadhan-resume.pdf"
    const filepath = join(process.cwd(), "public", filename)

    // Write file to public folder (will replace if exists)
    await writeFile(filepath, buffer)

    // Update database with CV path
    const cvUrl = `/${filename}`
    await prisma.profile.upsert({
      where: { id: "singleton" },
      create: { id: "singleton", cvUrl },
      update: { cvUrl },
    })

    revalidatePath("/")
    revalidatePath("/admin/cv")

    return { success: true, cvUrl }
  } catch (error) {
    console.error("CV upload error:", error)
    throw error
  }
}
