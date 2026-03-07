"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, LayoutDashboard, FileText, FolderGit2, Settings, Briefcase, Award, Menu, X, FileDown } from "lucide-react"

export default function AdminMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-accent rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r z-50 md:hidden">
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <Link href="/admin" className="font-heading font-bold tracking-tight" onClick={() => setIsOpen(false)}>
                Admin Panel
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-4 py-6">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <FolderGit2 className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/admin/blogs"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <FileText className="h-4 w-4" />
                Blogs
              </Link>
              <Link
                href="/admin/experience"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                Experience
              </Link>
              <Link
                href="/admin/certificates"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
              >
                <Award className="h-4 w-4" />
                Certificates
              </Link>
              <div className="mt-8">
                <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Settings
                </h4>
                <Link
                  href="/admin/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  General
                </Link>
                <Link
                  href="/admin/cv"
                  onClick={() => setIsOpen(false)}
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
        </>
      )}
    </>
  )
}
