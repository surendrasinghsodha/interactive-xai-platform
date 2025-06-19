"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Upload, BarChart3, Users, Shield, Zap, Github, ArrowRight, Sparkles, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-60">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-300/30 to-teal-300/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                background: `linear-gradient(45deg, ${
                  ["#f97316", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"][Math.floor(Math.random() * 5)]
                }, ${["#fbbf24", "#f472b6", "#a78bfa", "#22d3ee", "#34d399"][Math.floor(Math.random() * 5)]})`,
              }}
            />
          ))}
        </div>

        {/* Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-orange-200/20 to-transparent rounded-full pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-orange-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              <Brain className="h-8 w-8 text-orange-500 animate-bounce-gentle" />
              <div className="absolute inset-0 h-8 w-8 text-orange-400 animate-ping opacity-30">
                <Brain className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                InterWeb-XAI
              </h1>
              <p className="text-xs text-orange-600/70 font-medium">AI Made Simple</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 hover:glow-text font-medium"
            >
              Features
            </Link>
            <Link
              href="/upload"
              className="text-gray-700 hover:text-pink-500 transition-all duration-300 hover:glow-text font-medium"
            >
              Get Started
            </Link>
          </nav>
          <Button
            asChild
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white border-0 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 font-medium"
          >
            <Link href="/upload" className="flex items-center">
              Launch Platform
              <Sparkles className="ml-2 h-4 w-4 animate-wiggle" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto text-center max-w-5xl">
          <div
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Badge
              variant="secondary"
              className="mb-6 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border-orange-200 hover:from-orange-200 hover:to-pink-200 transition-all duration-300 animate-bounce-gentle px-4 py-2 text-sm font-medium"
            >
              <Star className="mr-2 h-4 w-4 text-yellow-500 animate-wiggle" />
              Making AI Understandable for Everyone
            </Badge>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-8 animate-gradient leading-tight">
              Interactive XAI Platform
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-2xl text-orange-600 mb-4 font-medium">Discover How AI Makes Decisions</p>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Whether you're an AI expert or just curious about how artificial intelligence works, our platform makes
              complex AI models easy to understand through beautiful, interactive explanations.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white border-0 shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 group px-8 py-4 text-lg font-medium"
            >
              <Link href="/upload" className="flex items-center">
                <Heart className="mr-3 h-5 w-5 text-white animate-bounce-gentle" />
                Start Exploring
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105 group px-8 py-4 text-lg font-medium"
            >
              <Link
                href="https://github.com/surendrasinghsodha/interactive-xai-platform"
                target="_blank"
                className="flex items-center"
              >
                <Github className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                View Source Code
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to understand and trust AI decisions, designed for both beginners and experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Easy Upload",
                desc: "Simply drag and drop your data files. No technical setup required!",
                color: "orange",
                bgColor: "from-orange-100 to-orange-50",
                iconColor: "text-orange-500",
                delay: "0",
              },
              {
                icon: BarChart3,
                title: "Smart Explanations",
                desc: "Get clear, visual explanations using advanced SHAP and LIME algorithms",
                color: "pink",
                bgColor: "from-pink-100 to-pink-50",
                iconColor: "text-pink-500",
                delay: "200",
              },
              {
                icon: Zap,
                title: "Interactive Charts",
                desc: "Explore your data with beautiful, interactive visualizations that anyone can understand",
                color: "purple",
                bgColor: "from-purple-100 to-purple-50",
                iconColor: "text-purple-500",
                delay: "400",
              },
              {
                icon: Users,
                title: "User Friendly",
                desc: "Built for everyone - from AI researchers to curious students and business professionals",
                color: "blue",
                bgColor: "from-blue-100 to-blue-50",
                iconColor: "text-blue-500",
                delay: "600",
              },
              {
                icon: Shield,
                title: "Reliable Results",
                desc: "Trust your insights with our reliability scoring and stability analysis",
                color: "green",
                bgColor: "from-green-100 to-green-50",
                iconColor: "text-green-500",
                delay: "800",
              },
              {
                icon: Brain,
                title: "Compare Models",
                desc: "Side-by-side comparisons help you choose the best AI model for your needs",
                color: "indigo",
                bgColor: "from-indigo-100 to-indigo-50",
                iconColor: "text-indigo-500",
                delay: "1000",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-2 border-${feature.color}-200 bg-gradient-to-br ${feature.bgColor} hover:border-${feature.color}-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-${feature.color}-500/20 group animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <CardHeader className="text-center p-8">
                  <div
                    className={`mx-auto mb-6 p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon
                      className={`h-8 w-8 ${feature.iconColor} transition-all duration-300 group-hover:animate-bounce-gentle`}
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-3">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-base leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm border-y border-orange-200/50">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-bounce-gentle">Ready to Understand AI?</h2>
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who are making AI more transparent and trustworthy
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white border-0 shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-110 group px-10 py-5 text-xl font-medium"
          >
            <Link href="/upload" className="flex items-center">
              <Sparkles className="mr-3 h-6 w-6 animate-wiggle" />
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm text-gray-700 py-16 px-4 border-t border-orange-200/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-8 w-8 text-orange-500 animate-bounce-gentle" />
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                  InterWeb-XAI
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Making artificial intelligence explainable and accessible to everyone through beautiful, interactive
                visualizations.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-orange-600 text-xl">Project Info</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  COMP47250: Team Software Project
                </li>
                <li className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-pink-500" />
                  University College Dublin
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-purple-600 text-xl">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://github.com/surendrasinghsodha/interactive-xai-platform"
                    className="text-gray-600 hover:text-orange-500 transition-colors duration-300 hover:glow-text flex items-center text-lg"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-300 hover:glow-text flex items-center text-lg"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-200 mt-12 pt-8 text-center text-gray-500">
            <p className="text-lg">
              &copy; 2024 InterWeb-XAI. Built with{" "}
              <Heart className="inline h-4 w-4 text-red-500 animate-bounce-gentle" /> for education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
