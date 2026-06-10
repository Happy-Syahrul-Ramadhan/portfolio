import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MainWrapper } from "./components/MainWrapper";
import CursorFollower from "./components/CursorFollower";
import { TopLoader } from "./components/TopLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const siteUrl = "https://syahrul-seven.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Happy Syahrul Ramadhan - Data Engineer",
  description: "portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopLoader />
          <CursorFollower />
          <Navbar />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
