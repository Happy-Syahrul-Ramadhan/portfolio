import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BlogContent from "./BlogContent"

export const dynamic = "force-dynamic"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // findFirst allows combining slug (unique) with published filter
  const blog = await prisma.blog.findFirst({
    where: { slug, published: true },
  })

  if (!blog) {
    notFound()
  }

  return (
    <article className="flex flex-col gap-8 mt-8 mb-20 max-w-3xl mx-auto w-full">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {blog.imageUrl && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="flex flex-col gap-3 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading leading-tight">
          {blog.title}
        </h1>
        <time className="text-muted-foreground text-sm">
          {new Date(blog.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <p className="text-lg text-muted-foreground mt-2">{blog.excerpt}</p>
      </header>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border"
      >
        <BlogContent content={blog.content} />
      </div>
    </article>
  )
}
