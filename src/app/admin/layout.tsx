import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  FolderGit2,
  Settings,
  Briefcase,
  Award,
  FileDown,
  BookOpen,
  Shield,
} from "lucide-react";
import { ToastProvider } from "../components/ToastProvider";
import AdminMobileMenu from "../components/AdminMobileMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen pb-20">
        {/* Sidebar - Desktop */}
        <aside className="w-64 border-r bg-card hidden md:block">
          <div className="flex h-16 items-center px-6 border-b">
            <Link
              href="/admin"
              className="font-heading font-bold tracking-tight"
            >
              Admin Panel
            </Link>
          </div>
          <nav className="flex flex-col gap-2 px-4 py-6">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <FolderGit2 className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              Blogs
            </Link>
            <Link
              href="/admin/experience"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              Experience
            </Link>
            <Link
              href="/admin/certificates"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <Award className="h-4 w-4" />
              Certificates
            </Link>
            <Link
              href="/admin/publications"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Publications
            </Link>
            <Link
              href="/admin/hki"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <Shield className="h-4 w-4" />
              HKI
            </Link>
            <div className="mt-8">
              <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Settings
              </h4>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                General
              </Link>
              <Link
                href="/admin/cv"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <FileDown className="h-4 w-4" />
                CV Management
              </Link>
              <form action="/api/auth/logout" method="POST" className="mt-2">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium shadow-sm border border-red-500/20 text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-muted/30">
          {/* Mobile Header with Menu */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 border-b bg-background md:hidden">
            <Link
              href="/admin"
              className="font-heading font-bold tracking-tight"
            >
              Admin Panel
            </Link>
            <AdminMobileMenu />
          </div>
          <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
