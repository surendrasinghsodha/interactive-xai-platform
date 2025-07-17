"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BrainCircuit } from "lucide-react"
import Link from "next/link"
import Sidebar from "./sidebar"

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="sr-only">InterWeb-XAI</span>
        </Link>
        <h1 className="text-lg font-semibold">Interactive XAI Platform</h1>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
