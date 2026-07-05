import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
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

// Always render fresh — ensures frontend reflects admin changes immediately
export const dynamic = "force-dynamic";

type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  major: string;
  location: string | null;
};

export default async function Home() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
  });
  const experiences = await prisma.workExperience.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  const publications = await prisma.publication.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });
  const educations: EducationEntry[] = await (prisma as any).education.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  const hkis = await prisma.intellectualProperty.findMany({
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ pinOrder: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const name = profile?.name || "Your Name";
  const title = profile?.title || "Software Engineer";
  const bio = profile?.bio;
  const location = profile?.location;
  const email = profile?.email;
  const avatarUrl = profile?.avatarUrl;
  const cvUrl = profile?.cvUrl || "/Happy Syahrul Ramadhan-resume.pdf";
  const { github, linkedin, googleScholar, website } = profile || {};

  // Split title into tags if comma-separated (e.g. "Data Engineer, Researcher")
  const titleTags = title
    .split(/[,/|]/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="mt-6 mb-24 flex min-w-0 w-full max-w-full flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start">
      {/* ── LEFT: Sticky Profile Sidebar ─────────────────────── */}
      <aside className="flex w-full max-w-full min-w-0 flex-col gap-4 lg:sticky lg:top-[88px]">
        {/* Avatar + Name */}
        <div className="flex max-w-full flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center sm:p-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-24 w-24 rounded-full border-2 border-border object-cover shadow"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-muted shadow">
              <span className="text-3xl font-bold text-muted-foreground font-heading">
                {name.charAt(0)}
              </span>
            </div>
          )}

          <div className="min-w-0">
            <h1 className="break-words text-xl font-bold font-heading leading-tight">
              {name}
            </h1>
          </div>

          {/* Title tags */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {titleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs rounded-full bg-[#14532d] text-white font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Educational background (truncated in sidebar) */}
          {educations.length > 0 ? (
            <div className="mt-5 flex w-full flex-col gap-2 text-left">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground tracking-wider">
                <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
                Educational Background
              </span>
              {educations.map((education) => (
                <div key={education.id} className="w-full border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                  <p className="break-words text-sm font-semibold leading-snug text-muted-foreground">
                    {education.degree}
                  </p>
                  <p className="mt-1 break-words text-xs leading-relaxed text-emerald-400">
                    {education.institution}
                  </p>
                  <p className="mt-0.5 break-words text-xs leading-relaxed text-muted-foreground">
                    {/* {education.major} */}
                  </p>
                  {education.location && (
                    <p className="mt-0.5 break-words text-[11px] text-muted-foreground">
                      {education.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : profile?.educationalBackground ? (
            <p className="mt-1 line-clamp-4 break-words text-left text-xs leading-relaxed text-muted-foreground">
              {profile.educationalBackground}
            </p>
          ) : null}
        </div>

        {/* Contact */}
        {(location || email) && (
          <div className="flex max-w-full flex-col gap-2.5 rounded-2xl border border-border/60 bg-card p-4">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Contact
            </h3>
            {location && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="break-words">{location}</span>
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
        {(github || linkedin || googleScholar || website) && (
          <div className="flex max-w-full flex-col gap-2.5 rounded-2xl border border-border/60 bg-card p-4">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Social Links
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
            {googleScholar && (
              <Link
                href={googleScholar}
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Google Scholar</span>
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
        <div className="flex max-w-full flex-col gap-2">
          <a
            href={cvUrl}
            download
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#14532d] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0f3f22]"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <Link
            href="/project"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            View Projects
          </Link>
        </div>
      </aside>

      {/* ── RIGHT: Content Sections ───────────────────────────── */}
      <div className="flex min-w-0 max-w-full flex-col gap-10">
        {/* About (full bio on right, only shown if bio exists) */}
        {bio && (
          <section className="min-w-0">
            <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
              <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <h2 className="text-xl font-bold font-heading">About Me</h2>
            </div>
            <p className="whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground sm:text-justify">
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
