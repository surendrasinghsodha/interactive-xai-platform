"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Upload,
  BarChart3,
  Users,
  Shield,
  Zap,
  Github,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { FeatureDemoModal } from "@/components/feature-demo-modal"
import { SparkleBackground } from "@/components/sparkle-background"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [demoModal, setDemoModal] = useState({ isOpen: false, feature: null as any })

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      desc: "Effortlessly upload datasets (CSV, JSON, Excel) and pre-trained models (.pkl, .h5, ONNX) via a secure drag-and-drop interface or direct file selection. No complex configurations needed.",
      color: "orange",
      bgColor: "from-orange-100 to-orange-50",
      iconColor: "text-orange-500",
      delay: "0",
      character: "🚀",
      comicText: "WHOOSH!",
      funnyAnimation: "animate-rocket-launch",
      hoverEffect: "hover:animate-bounce-crazy",
      demoType: "upload",
      description: "Watch how easy it is to upload your data files with our drag-and-drop interface!",
    },
    {
      icon: BarChart3,
      title: "Smart Explanations",
      desc: "Uncover model predictions with industry-standard SHAP (SHapley Additive exPlanations) and LIME (Local Interpretable Model-agnostic Explanations) for both global and local feature importance.",
      color: "pink",
      bgColor: "from-pink-100 to-pink-50",
      iconColor: "text-pink-500",
      delay: "200",
      character: "🧠",
      comicText: "EUREKA!",
      funnyAnimation: "animate-brain-think",
      hoverEffect: "hover:animate-wiggle-crazy",
      demoType: "explanations",
      description: "See how SHAP and LIME work together to explain AI decisions!",
    },
    {
      icon: Zap,
      title: "Interactive Charts",
      desc: "Visualize feature impacts and model behavior through dynamic, Plotly.js-powered charts like force plots, bar charts, and summary plots, enabling intuitive data exploration.",
      color: "purple",
      bgColor: "from-purple-100 to-purple-50",
      iconColor: "text-purple-500",
      delay: "400",
      character: "⚡",
      comicText: "ZAP!",
      funnyAnimation: "animate-electric-dance",
      hoverEffect: "hover:animate-shake-crazy",
      demoType: "charts",
      description: "Experience dynamic charts and visualizations in action!",
    },
    {
      icon: Users,
      title: "User Friendly",
      desc: "Navigate a streamlined, step-by-step workflow designed for users of all technical backgrounds, from data scientists to business analysts, ensuring a seamless XAI experience.",
      color: "blue",
      bgColor: "from-blue-100 to-blue-50",
      iconColor: "text-blue-500",
      delay: "600",
      character: "👥",
      comicText: "AMAZING!",
      funnyAnimation: "animate-group-cheer",
      hoverEffect: "hover:animate-party-time",
      demoType: "user-friendly",
      description: "See how our interface works for users of all skill levels!",
    },
    {
      icon: Shield,
      title: "Reliable Results",
      desc: "Assess the trustworthiness of explanations with built-in reliability metrics, including perturbation-based stability analysis and consistency checks between XAI methods.",
      color: "green",
      bgColor: "from-green-100 to-green-50",
      iconColor: "text-green-500",
      delay: "800",
      character: "🛡️",
      comicText: "SECURE!",
      funnyAnimation: "animate-shield-protect",
      hoverEffect: "hover:animate-fortress-mode",
      demoType: "reliability",
      description: "Watch how we ensure trustworthy AI explanations!",
    },
    {
      icon: Brain,
      title: "Compare Models",
      desc: "Evaluate multiple AI models simultaneously by comparing their explanations for the same data points, facilitating informed model selection and understanding of differing behaviors.",
      color: "indigo",
      bgColor: "from-indigo-100 to-indigo-50",
      iconColor: "text-indigo-500",
      delay: "1000",
      character: "🤖",
      comicText: "BEEP!",
      funnyAnimation: "animate-robot-dance",
      hoverEffect: "hover:animate-transform",
      demoType: "compare",
      description: "See AI models battle it out in our comparison demo!",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-60">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-300/30 to-teal-300/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <SparkleBackground />
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
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 hover:animate-text-glow font-medium"
            >
              Features
            </Link>
            <Link
              href="/xai-concepts"
              className="text-gray-700 hover:text-purple-500 transition-all duration-300 hover:animate-text-glow font-medium"
            >
              XAI Concepts
            </Link>
            <Link
              href="/upload"
              className="text-gray-700 hover:text-pink-500 transition-all duration-300 hover:animate-text-glow font-medium"
            >
              Get Started
            </Link>
          </nav>
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white border-0 shadow-lg font-medium px-6 py-3 rounded-xl hover:animate-button-glow transition-all duration-300 hover:scale-105"
          >
            <Link href="/upload" className="flex items-center">
              Launch Platform
              <Sparkles className="ml-2 h-4 w-4 animate-spin-slow" />
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
              variant="default"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white border-0 shadow-xl group px-8 py-4 text-lg font-medium rounded-xl hover:animate-button-glow transition-all duration-300 hover:scale-105"
            >
              <Link href="/upload" className="flex items-center">
                <Heart className="mr-3 h-5 w-5 text-white animate-bounce-gentle" />
                Start Exploring
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 group px-8 py-4 text-lg font-medium rounded-xl hover:animate-pulse-neon transition-all duration-300 hover:scale-105"
            >
              <Link
                href="https://github.com/surendrasinghsodha/interactive-xai-platform"
                target="_blank"
                className="flex items-center"
              >
                <Github className="mr-3 h-5 w-5 animate-spin-slow" />
                View Source Code
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white/50 backdrop-blur-sm relative overflow-hidden">
        {/* Comic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Comic Burst Effects */}
          <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
            <div className="comic-burst animate-spin-slow text-yellow-400">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50,10 L60,40 L90,40 L70,60 L80,90 L50,70 L20,90 L30,60 L10,40 L40,40 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 opacity-15">
            <div className="comic-pow animate-bounce text-pink-400">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 opacity-10">
            <div className="comic-zap animate-pulse text-purple-400">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20,20 L80,20 L60,50 L90,50 L30,80 L50,50 L20,50 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent mb-6 relative z-10">
                Powerful Features
              </h2>
              {/* Comic Speech Bubble */}
              <div className="absolute -top-8 -right-16 w-20 h-12 opacity-30">
                <div className="comic-bubble animate-bounce-gentle text-yellow-400">
                  <svg viewBox="0 0 100 60" className="w-full h-full">
                    <ellipse cx="50" cy="25" rx="45" ry="20" fill="currentColor" />
                    <path d="M30,40 L25,55 L40,45 Z" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-orange-600">
                    WOW!
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to understand and trust AI decisions, designed for both beginners and experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`border-2 border-${feature.color}-200 bg-gradient-to-br ${feature.bgColor} hover:border-${feature.color}-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-${feature.color}-500/20 group animate-fade-in-up cursor-pointer relative overflow-hidden ${feature.hoverEffect}`}
                style={{ animationDelay: `${feature.delay}ms` }}
                onClick={(e) => {
                  e.stopPropagation()
                  setDemoModal({
                    isOpen: true,
                    feature: feature,
                  })
                }}
              >
                {/* Futuristic Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                {/* Comic Character */}
                <div className="absolute -top-4 -right-4 text-4xl z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12">
                  <div className={`${feature.funnyAnimation}`}>{feature.character}</div>
                </div>

                {/* Comic Text Bubble */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 z-20">
                  <div className="relative">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border-2 border-yellow-400 shadow-lg animate-bounce-gentle">
                      <span className="text-xs font-bold text-gray-800">{feature.comicText}</span>
                    </div>
                    <div className="absolute -bottom-1 left-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
                  </div>
                </div>

                {/* Holographic Border Effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 animate-gradient-x"></div>
                </div>

                {/* Demo Video Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-center justify-center">
                  <div className="text-center space-y-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm animate-pulse-neon">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium text-sm px-4 animate-text-glow">Watch Demo</p>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 backdrop-blur-sm hover:animate-button-glow"
                    >
                      <Rocket className="mr-2 h-3 w-3 animate-spin-slow" />
                      Play Demo
                    </Button>
                  </div>
                </div>

                {/* Particle Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <CardHeader className="text-center p-8 relative z-0">
                  <div
                    className={`mx-auto mb-6 p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative overflow-hidden`}
                  >
                    {/* Icon Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <feature.icon
                      className={`h-8 w-8 ${feature.iconColor} transition-all duration-300 group-hover:animate-bounce-gentle relative z-10`}
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-3 relative">
                    {feature.title}
                    {/* Futuristic Underline */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-500"></div>
                  </CardTitle>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-base leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-full h-full border-l-2 border-t-2 border-cyan-400 animate-corner-glow"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-full h-full border-r-2 border-b-2 border-purple-400 animate-corner-glow"></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Floating Comic Elements */}
          <div className="absolute top-1/2 left-8 opacity-20 animate-float-slow">
            <div className="text-6xl">💫</div>
          </div>
          <div className="absolute top-1/3 right-12 opacity-15 animate-float-reverse">
            <div className="text-5xl">🎯</div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 opacity-10 animate-spin-very-slow">
            <div className="text-7xl">⚡</div>
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
            variant="default"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white border-0 shadow-xl group px-10 py-5 text-xl font-medium rounded-xl hover:animate-button-glow transition-all duration-300 hover:scale-105"
          >
            <Link href="/upload" className="flex items-center">
              <Sparkles className="mr-3 h-6 w-6 animate-spin-slow" />
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
                    className="text-gray-600 hover:text-orange-500 transition-colors duration-300 hover:animate-text-glow flex items-center text-lg"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-300 hover:animate-text-glow flex items-center text-lg"
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

      {/* Feature Demo Modal */}
      <FeatureDemoModal
        isOpen={demoModal.isOpen}
        onClose={() => setDemoModal({ isOpen: false, feature: null as any })}
        feature={demoModal.feature}
      />
    </div>
  )
}
