"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrainCircuit, Home, Upload, BarChart2, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: Upload },
  { href: "/explanations", label: "XAI Concepts", icon: Lightbulb },
  { href: "/feedback", label: "Feedback", icon: BarChart2 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <div className="mb-8 flex items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-bold">InterWeb-XAI</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
              pathname === item.href && "bg-muted text-primary",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
