"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

interface Breadcrumb {
  label: string
  href: string
  current?: boolean
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  backButtonHref?: string
  backButtonText?: string
  showBackButton?: boolean
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  backButtonHref,
  backButtonText = "Back",
  showBackButton = true,
}: PageHeaderProps) {
  return (
    <div className="relative pt-20 pb-8 px-4">
      {/* Enhanced background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-slate-400">/</span>}
                  {crumb.current ? (
                    <span className="text-white font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200 px-3 py-1 rounded-full hover:bg-white/10 backdrop-blur-sm"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Back Button */}
        {showBackButton && (
          <div className="mb-6">
            {backButtonHref ? (
              <Button
                asChild
                variant="outline"
                className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300"
              >
                <Link href={backButtonHref}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backButtonText}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            )}
          </div>
        )}

        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl text-shadow-lg">{title}</h1>
          {description && (
            <p className="text-xl text-slate-200 max-w-3xl leading-relaxed drop-shadow-lg text-shadow-md">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
