"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  showBackButton = true,
  backButtonText = "Back",
  backButtonHref,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backButtonHref) {
      router.push(backButtonHref)
    } else {
      router.back()
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-purple-900/20 border-b border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm mb-4" aria-label="Breadcrumb">
            <Link
              href="/"
              className="flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-500 mx-2" />
                {item.current ? (
                  <span className="text-blue-400 font-medium">{item.label}</span>
                ) : (
                  <Link href={item.href} className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backButtonText}
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {title}
              </h1>
              {description && <p className="text-slate-400 mt-2">{description}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
