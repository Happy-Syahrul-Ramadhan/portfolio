"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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
