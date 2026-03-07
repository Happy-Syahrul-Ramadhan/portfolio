import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import CursorFollower from "./components/CursorFollower"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "Happy Syahrul Ramadhan - Data Engineer",
  description: "portfolio website.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CursorFollower />
          <Navbar />
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
            <footer className="border-t py-6 md:py-0">
              <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © {new Date().getFullYear()} Syahrul. All rights reserved.
                </p>
              </div>
            </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
