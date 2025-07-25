import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import SpaceBackground from "@/components/space-background"
import { AppProvider } from "@/context/AppContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InterWeb-XAI",
  description: "Interactive Explainable AI Web Platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-black", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppProvider>
            <SpaceBackground />
            <Navigation />
            <main className="pt-16">{children}</main>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
