"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // For admin pages, render without constraints
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  // For public pages, render with max-width constraint
  return (
    <main className="flex-1 w-full min-w-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
      {children}
    </main>
  )
}
