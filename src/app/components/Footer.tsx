"use client"

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Syahrul. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
