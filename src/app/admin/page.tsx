import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderGit2,
  FileText,
  Award,
  ArrowRight,
  BookOpen,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    projectCount,
    blogCount,
    certificateCount,
    publicationCount,
    hkiCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.certificate.count(),
    prisma.publication.count(),
    prisma.intellectualProperty.count(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-heading">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of your portfolio and blog content.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Projects
            </h3>
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-4">
              <Link
                href="/admin/projects"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Manage Projects <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* Blog Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Blogs</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{blogCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-4">
              <Link
                href="/admin/blogs"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Manage Blogs <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Certificates
            </h3>
            <Award className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{certificateCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-4">
              <Link
                href="/admin/certificates"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Manage Certificates <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* Publications Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Publications
            </h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{publicationCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-4">
              <Link
                href="/admin/publications"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Manage Publications <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* HKI Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total HKI</h3>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{hkiCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-4">
              <Link
                href="/admin/hki"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Manage HKI <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
