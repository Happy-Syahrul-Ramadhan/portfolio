import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

async function fixBlogSlugs() {
  console.log("🔍 Checking blogs for missing or invalid slugs...")

  const blogs = await prisma.blog.findMany()

  console.log(`📊 Found ${blogs.length} blog(s)`)

  for (const blog of blogs) {
    if (!blog.slug || blog.slug.trim() === "") {
      const newSlug = generateSlug(blog.title)
      console.log(`⚠️  Blog "${blog.title}" has no slug. Generating: "${newSlug}"`)

      await prisma.blog.update({
        where: { id: blog.id },
        data: { slug: newSlug },
      })

      console.log(`✅ Updated blog ${blog.id} with slug: ${newSlug}`)
    } else {
      console.log(`✓ Blog "${blog.title}" has valid slug: "${blog.slug}"`)
    }
  }

  // Check for duplicate slugs
  const slugCounts = new Map<string, number>()
  const updatedBlogs = await prisma.blog.findMany()

  for (const blog of updatedBlogs) {
    const count = slugCounts.get(blog.slug) || 0
    slugCounts.set(blog.slug, count + 1)
  }

  const duplicates = Array.from(slugCounts.entries()).filter(([_, count]) => count > 1)

  if (duplicates.length > 0) {
    console.log("\n⚠️  WARNING: Found duplicate slugs:")
    duplicates.forEach(([slug, count]) => {
      console.log(`   - "${slug}" appears ${count} times`)
    })

    // Fix duplicates by appending number
    for (const [slug, _] of duplicates) {
      const blogsWithSlug = await prisma.blog.findMany({
        where: { slug },
        orderBy: { createdAt: "asc" },
      })

      for (let i = 1; i < blogsWithSlug.length; i++) {
        const newSlug = `${slug}-${i}`
        await prisma.blog.update({
          where: { id: blogsWithSlug[i].id },
          data: { slug: newSlug },
        })
        console.log(`   ✅ Renamed duplicate to: ${newSlug}`)
      }
    }
  }

  console.log("\n✅ All blog slugs are now valid and unique!")
}

fixBlogSlugs()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
