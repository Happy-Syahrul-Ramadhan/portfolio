"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCertificate(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const issuer = formData.get("issuer") as string
  const issueDate = formData.get("issueDate") as string
  const credentialUrl = formData.get("credentialUrl") as string
  const credentialId = formData.get("credentialId") as string
  const skills = formData.get("skills") as string
  const published = formData.get("published") === "true"
  const order = parseInt(formData.get("order") as string) || 0

  if (!title || !description || !imageUrl) {
    throw new Error("Title, description, and image are required")
  }

  await prisma.certificate.create({
    data: {
      title,
      description,
      imageUrl,
      issuer: issuer || null,
      issueDate: issueDate ? new Date(issueDate) : null,
      credentialUrl: credentialUrl || null,
      credentialId: credentialId || null,
      skills: skills || null,
      published,
      order,
    },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/certificates")
  redirect("/admin/certificates")
}

export async function updateCertificate(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const issuer = formData.get("issuer") as string
  const issueDate = formData.get("issueDate") as string
  const credentialUrl = formData.get("credentialUrl") as string
  const credentialId = formData.get("credentialId") as string
  const skills = formData.get("skills") as string
  const published = formData.get("published") === "true"
  const order = parseInt(formData.get("order") as string) || 0

  if (!title || !description || !imageUrl) {
    throw new Error("Title, description, and image are required")
  }

  await prisma.certificate.update({
    where: { id },
    data: {
      title,
      description,
      imageUrl,
      issuer: issuer || null,
      issueDate: issueDate ? new Date(issueDate) : null,
      credentialUrl: credentialUrl || null,
      credentialId: credentialId || null,
      skills: skills || null,
      published,
      order,
    },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/certificates")
  redirect("/admin/certificates")
}

export async function toggleCertificatePublish(id: string, published: boolean) {
  await prisma.certificate.update({
    where: { id },
    data: { published: !published },
  })
  revalidatePath("/admin/certificates")
  revalidatePath("/certificates")
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } })
  revalidatePath("/admin/certificates")
  revalidatePath("/certificates")
}
