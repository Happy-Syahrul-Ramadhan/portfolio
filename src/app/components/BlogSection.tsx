import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
}

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  if (blogs.length === 0) return null;

  return (
    <section className="min-w-0">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpen className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          <h2 className="text-xl font-bold font-heading">Latest Posts</h2>
        </div>
        <Link
          href="/blog"
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-border hover:bg-accent"
          >
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 break-words text-sm font-medium leading-tight transition-colors group-hover:text-primary">
                {blog.title}
              </h3>
              <p className="line-clamp-2 break-words text-xs text-muted-foreground sm:line-clamp-1">
                {blog.excerpt}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
