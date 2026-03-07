import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { BookOpen, Calendar, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col gap-8 mt-12 mb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight font-heading flex items-center gap-3">
          <BookOpen className="h-8 w-8" /> Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, learnings, and experiences.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="flex items-center justify-center p-12 py-24 border rounded-xl border-dashed">
          <p className="text-muted-foreground">No posts have been published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative">
                {blog.imageUrl ? (
                  <div className="w-full aspect-video overflow-hidden">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150"></div>
                    <span className="text-5xl text-primary/40 font-heading font-bold relative z-10">{blog.title.charAt(0)}</span>
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <BookOpen className="h-6 w-6 text-primary/60" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(blog.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    5 min read
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
