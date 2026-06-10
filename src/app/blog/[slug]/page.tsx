import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BlogContent from "./BlogContent"
import ShareButtons from "@/app/components/ShareButtons"

const siteUrl = "https://syahrul-seven.vercel.app"

export const dynamic = "force-dynamic"

async function getBlogPost(slug: string) {
  return prisma.blog.findFirst({
    where: { slug, published: true },
  })
}

function getAbsoluteImageUrl(imageUrl: string | null) {
  if (!imageUrl) return undefined

  try {
    return new URL(imageUrl, siteUrl).toString()
  } catch {
    return undefined
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogPost(slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  const blogUrl = `${siteUrl}/blog/${blog.slug}`
  const imageUrl = getAbsoluteImageUrl(blog.imageUrl)
  const previewImageUrl = imageUrl ?? "/blog-preview-default.svg"

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: blogUrl,
      siteName: "Syahrul Ramadhan",
      type: "article",
      images: [
        {
          url: previewImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [previewImageUrl],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const blog = await getBlogPost(slug)

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

      <header className="flex flex-col gap-3">
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

      <ShareButtons 
        title={blog.title} 
        url={`${siteUrl}/blog/${blog.slug}`}
        hashtags={blog.hashtags || undefined}
      />

      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border"
      >
        <BlogContent content={blog.content} />
      </div>
    </article>
  )
}
