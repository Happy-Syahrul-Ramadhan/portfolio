import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Download,
  User,
} from "lucide-react";
import Link from "next/link";
import WorkExperienceSection from "./components/WorkExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";
import PublicationsSection from "./components/PublicationsSection";
import HKISection from "./components/HKISection";

// ISR: revalidate every hour; admin actions call revalidatePath("/") for immediate updates
export const revalidate = 3600;

export default async function Home() {
  const [profile, experiences, publications, hkis, projects, blogs] =
    await Promise.all([
      prisma.profile.findUnique({ where: { id: "singleton" } }),
      prisma.workExperience.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
      prisma.publication.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { year: "desc" }],
      }),
      prisma.intellectualProperty.findMany({
        orderBy: [{ order: "asc" }, { year: "desc" }],
      }),
      prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
    ]);

  const name = profile?.name || "Your Name";
  const title = profile?.title || "Software Engineer";
  const bio = profile?.bio;
  const location = profile?.location;
  const email = profile?.email;
  const avatarUrl = profile?.avatarUrl;
  const cvUrl = profile?.cvUrl || "/Happy Syahrul Ramadhan-resume.pdf";
  const { github, linkedin, twitter, website } = profile || {};

  // Split title into tags if comma-separated (e.g. "Data Engineer, Researcher")
  const titleTags = title
    .split(/[,/|]/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[268px_1fr] gap-8 mt-6 mb-24 items-start">
      {/* ── LEFT: Sticky Profile Sidebar ─────────────────────── */}
      <aside className="lg:sticky lg:top-[88px] flex flex-col gap-4 w-full">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center gap-3 p-6 bg-card border border-border/60 rounded-2xl">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-2 border-border shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-border flex items-center justify-center shadow">
              <span className="text-3xl font-bold text-muted-foreground font-heading">
                {name.charAt(0)}
              </span>
            </div>
          )}

          <div>
            <h1 className="text-xl font-bold font-heading leading-tight">
              {name}
            </h1>
          </div>

          {/* Title tags */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {titleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio (truncated in sidebar) */}
          {bio && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 text-left mt-1">
              {bio}
            </p>
          )}
        </div>

        {/* Contact */}
        {(location || email) && (
          <div className="p-4 bg-card border border-border/60 rounded-2xl flex flex-col gap-2.5">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Kontak
            </h3>
            {location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{location}</span>
              </div>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{email}</span>
              </a>
            )}
          </div>
        )}

        {/* Social links */}
        {(github || linkedin || twitter || website) && (
          <div className="p-4 bg-card border border-border/60 rounded-2xl flex flex-col gap-2.5">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Profil
            </h3>
            {github && (
              <Link
                href={github}
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5 flex-shrink-0" />
                <span>GitHub</span>
              </Link>
            )}
            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5 flex-shrink-0" />
                <span>LinkedIn</span>
              </Link>
            )}
            {twitter && (
              <Link
                href={twitter}
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Twitter / X</span>
              </Link>
            )}
            {website && (
              <Link
                href={website}
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Website</span>
              </Link>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <a
            href={cvUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
          >
            <Download className="h-4 w-4" />
            Unduh CV
          </a>
          <Link
            href="/project"
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors border border-border hover:bg-accent h-10 px-4"
          >
            Lihat Proyek
          </Link>
        </div>
      </aside>

      {/* ── RIGHT: Content Sections ───────────────────────────── */}
      <div className="flex flex-col gap-10 min-w-0">
        {/* About (full bio on right, only shown if bio exists) */}
        {bio && (
          <section>
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
              <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <h2 className="text-xl font-bold font-heading">Tentang Saya</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line text-justify">
              {bio}
            </p>
          </section>
        )}

        {/* Work Experience */}
        <WorkExperienceSection experiences={experiences} />

        {/* Publications */}
        <PublicationsSection publications={publications} />

        {/* HKI */}
        <HKISection hkis={hkis} />

        {/* Projects */}
        <ProjectsSection projects={projects} />

        {/* Blog */}
        <BlogSection blogs={blogs} />
      </div>
    </div>
  );
}
