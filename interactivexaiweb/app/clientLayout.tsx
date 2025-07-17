"use client"

import type React from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/train", label: "Train" },
  { href: "/explanations", label: "Explanations" },
  { href: "/xai-concepts", label: "XAI Concepts" },
  { href: "/feedback", label: "Feedback" },
]

function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <BrainCircuit className="h-8 w-8 text-primary" />
            InterWeb-XAI
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <AppProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
