"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  published: boolean
  createdAt: Date
}

interface BlogSectionProps {
  blogs: Blog[]
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id")
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [blogs])

  const setItemRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      itemRefs.current.set(id, element)
    } else {
      itemRefs.current.delete(id)
    }
  }

  if (blogs.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Latest posts
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          See all posts
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {blogs.map((blog, index) => {
          const isVisible = visibleItems.has(blog.id)

          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              ref={(el) => setItemRef(blog.id, el)}
              data-id={blog.id}
              className={`
                group relative flex items-center justify-between gap-4 p-5 rounded-xl border bg-card
                hover:bg-accent hover:border-foreground/20 transition-all duration-300
                ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base leading-tight mb-1.5 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {blog.excerpt}
                </p>
              </div>
              
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
