import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

async function main() {
  const projects = await prisma.project.findMany()

  console.log(`Found ${projects.length} projects`)

  for (const project of projects) {
    // Skip if already has slug
    if (project.slug) {
      console.log(`Project "${project.title}" already has slug: ${project.slug}`)
      continue
    }

    let slug = generateSlug(project.title)
    
    // Check if slug already exists
    const existingProject = await prisma.project.findFirst({ where: { slug } })
    if (existingProject && existingProject.id !== project.id) {
      let counter = 1
      let newSlug = `${slug}-${counter}`
      while (await prisma.project.findFirst({ where: { slug: newSlug } })) {
        counter++
        newSlug = `${slug}-${counter}`
      }
      slug = newSlug
    }

    await prisma.project.update({
      where: { id: project.id },
      data: { slug },
    })

    console.log(`✓ Updated "${project.title}" with slug: ${slug}`)
  }

  console.log("\nAll projects updated successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
