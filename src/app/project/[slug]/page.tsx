import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import ProjectContent from "./ProjectContent"
import ShareButtons from "@/app/components/ShareButtons"

const siteUrl = "https://syahrul-seven.vercel.app"

export const dynamic = "force-dynamic"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const project = await prisma.project.findUnique({
    where: { slug },
  })

  if (!project || !project.published) {
    notFound()
  }

  return (
    <article className="flex flex-col gap-8 mt-8 mb-20 max-w-3xl mx-auto w-full">
      <Link href="/project" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {project.imageUrl && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-heading leading-tight">
          {project.title}
        </h1>
        <time className="text-muted-foreground text-sm">
          {new Date(project.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <p className="text-lg text-muted-foreground mt-2 break-words">{project.description}</p>
        
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2 w-fit"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Project
          </a>
        )}
      </header>

      <ShareButtons 
        title={project.title} 
        url={`${siteUrl}/project/${project.slug}`}
        hashtags={project.hashtags || undefined}
      />

      {project.content && (
        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border break-words overflow-wrap-anywhere"
        >
          <ProjectContent content={project.content} />
        </div>
      )}
    </article>
  )
}
