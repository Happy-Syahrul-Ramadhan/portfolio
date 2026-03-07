import { prisma } from "@/lib/prisma"
import { MapPin, Mail, Github, Linkedin, Twitter, Globe, User } from "lucide-react"
import Link from "next/link"
import WorkExperienceSection from "./components/WorkExperienceSection"
import ProjectsSection from "./components/ProjectsSection"
import BlogSection from "./components/BlogSection"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [profile, experiences, projects, blogs] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.workExperience.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }], take: 5 }),
    prisma.project.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.blog.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 6 }),
  ])

  const name = profile?.name || "Your Name"
  const title = profile?.title || "Software Engineer"
  const bio = profile?.bio
  const location = profile?.location
  const email = profile?.email
  const avatarUrl = profile?.avatarUrl
  const { github, linkedin, twitter, website } = profile || {}

  return (
    <div className="flex flex-col gap-20 mt-12 mb-20">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-border shadow-lg" />
          ) : (
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-muted border-2 border-border flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-muted-foreground font-heading">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-1">Hello, I am</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-heading">{name}</h1>
            <p className="text-xl text-muted-foreground mt-1 font-medium">{title}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            {location && <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{location}</span>}
            {email && <a href={`mailto:${email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"><Mail className="h-3.5 w-3.5" />{email}</a>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {github && <Link href={github} target="_blank" className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border hover:bg-accent transition-colors"><Github className="h-4 w-4" /></Link>}
            {linkedin && <Link href={linkedin} target="_blank" className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border hover:bg-accent transition-colors"><Linkedin className="h-4 w-4" /></Link>}
            {twitter && <Link href={twitter} target="_blank" className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border hover:bg-accent transition-colors"><Twitter className="h-4 w-4" /></Link>}
            {website && <Link href={website} target="_blank" className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border hover:bg-accent transition-colors"><Globe className="h-4 w-4" /></Link>}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Link href="/project" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-6">View Projects</Link>
            <Link href="/blog" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-border bg-transparent hover:bg-accent h-10 px-6">Read Blog</Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      {bio && (
        <section className="relative bg-card p-8 rounded-2xl border border-border/50 flex flex-col gap-4 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              About Me
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line relative z-10">{bio}</p>
        </section>
      )}

      {/* ── WORK EXPERIENCE ───────────────────────────────── */}
      <WorkExperienceSection experiences={experiences} />

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <ProjectsSection projects={projects} />

      {/* ── BLOG ──────────────────────────────────────────── */}
      <BlogSection blogs={blogs} />
    </div>
  )
}
