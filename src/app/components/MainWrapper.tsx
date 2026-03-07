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
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
      {children}
    </main>
  )
}
