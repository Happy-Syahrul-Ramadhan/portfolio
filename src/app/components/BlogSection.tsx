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
    <section>
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <h2 className="text-xl font-bold font-heading">Tulisan Terbaru</h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Lihat semua →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-card hover:bg-accent hover:border-border transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {blog.excerpt}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
    </section>
  );
}
