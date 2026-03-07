import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function checkBlogs() {
  console.log("📋 Listing all blogs:\n")

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  })

  if (blogs.length === 0) {
    console.log("No blogs found!")
    return
  }

  blogs.forEach((blog, index) => {
    console.log(`${index + 1}. "${blog.title}"`)
    console.log(`   ID: ${blog.id}`)
    console.log(`   Slug: ${blog.slug}`)
    console.log(`   Published: ${blog.published}`)
    console.log(`   URL: /blog/${blog.slug}`)
    console.log(`   Edit URL: /admin/blogs/${blog.id}/edit`)
    console.log("")
  })

  console.log(`Total: ${blogs.length} blog(s)\n`)
}

checkBlogs()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
