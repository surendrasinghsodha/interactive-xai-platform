"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Upload,
  BrainCircuit,
  BarChart2,
  Users,
  Shield,
  Zap,
  Sparkles,
  Play,
  Eye,
  BookOpen,
  MessageSquare,
  Github,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

// Floating card component
function FloatingCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-float-card" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden">
      <Navigation />
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center mt-16">
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge
              variant="secondary"
              className="mb-8 px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 animate-pulse-glow"
            >
              <Sparkles className="w-4 h-4 mr-2" />🚀 Interactive XAI Platform - Now Live
            </Badge>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              Explainable AI
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Made Simple
              </span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Upload your data, train models, and get instant explanations with{" "}
              <span className="text-blue-400 font-semibold">SHAP</span> and{" "}
              <span className="text-purple-400 font-semibold">LIME</span>. Make your AI decisions transparent and
              trustworthy.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              size="lg"
              asChild
              className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <Link href="/upload">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 bg-transparent border-2 border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/5 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-slate-400">Jump right into the platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">1. Upload Data</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 mb-6">Upload your CSV dataset and let our platform analyze it</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <Link href="/upload">Start Upload</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">2. Train Model</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 mb-6">Configure and train your machine learning model</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href="/train">Train Model</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">3. Get Explanations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 mb-6">Generate SHAP and LIME explanations for your predictions</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 to-emerald-700"
                >
                  <Link href="/explanations">View Explanations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Why Choose InterWeb-XAI?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our platform bridges the gap between complex AI models and human understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Easy Upload & Training",
                description:
                  "Simply upload your CSV dataset and train machine learning models with just a few clicks. No coding required.",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0,
              },
              {
                icon: BrainCircuit,
                title: "SHAP & LIME Integration",
                description:
                  "Get instant explanations using industry-standard SHAP and LIME algorithms. Understand feature importance and model decisions.",
                gradient: "from-purple-500 to-pink-500",
                delay: 200,
              },
              {
                icon: BarChart2,
                title: "Interactive Visualizations",
                description:
                  "Explore your model's behavior through interactive charts and graphs. Make data-driven decisions with confidence.",
                gradient: "from-green-500 to-emerald-500",
                delay: 400,
              },
              {
                icon: Users,
                title: "User-Friendly Interface",
                description:
                  "Designed for both technical and non-technical users. Intuitive workflow from upload to explanation.",
                gradient: "from-orange-500 to-red-500",
                delay: 600,
              },
              {
                icon: Shield,
                title: "Reliability Scoring",
                description:
                  "Built-in reliability assessment through perturbation testing and user feedback collection.",
                gradient: "from-indigo-500 to-purple-500",
                delay: 800,
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                description: "Fast model training and explanation generation. Get insights in seconds, not hours.",
                gradient: "from-yellow-500 to-orange-500",
                delay: 1000,
              },
            ].map((feature, index) => (
              <FloatingCard key={index} delay={feature.delay}>
                <Card className="relative overflow-hidden border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <CardHeader className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-slate-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Resources Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Platform Resources
            </h2>
            <p className="text-lg text-slate-400">Learn more about XAI and get support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">XAI Concepts</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 text-sm mb-4">Learn about SHAP, LIME, and explainable AI</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-400 text-blue-400 hover:bg-blue-400/10 bg-transparent"
                >
                  <Link href="/xai-concepts">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <MessageSquare className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Feedback</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 text-sm mb-4">Share your experience and help us improve</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-green-400 text-green-400 hover:bg-green-400/10 bg-transparent"
                >
                  <Link href="/feedback">Give Feedback</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Our Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 text-sm mb-4">Meet the ClusterMind team behind the platform</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                >
                  <Link href="/colloborations">Meet Team</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <Github className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">GitHub</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-300 text-sm mb-4">View source code and contribute</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10 bg-transparent"
                >
                  <a
                    href="https://github.com/surendrasinghsodha/interactive-xai-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">Four simple steps to explainable AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Upload Data",
                description: "Upload your CSV dataset to our secure platform",
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: 2,
                title: "Train Model",
                description: "Select and train your preferred ML model",
                color: "from-purple-500 to-pink-500",
              },
              {
                step: 3,
                title: "Select Data Point",
                description: "Choose a specific prediction to explain",
                color: "from-green-500 to-emerald-500",
              },
              {
                step: 4,
                title: "Get Explanations",
                description: "View SHAP and LIME explanations instantly",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-2xl group-hover:scale-110 transition-all duration-300 animate-pulse-glow`}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Ready to Make Your AI Explainable?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Join researchers and practitioners who trust InterWeb-XAI for transparent AI decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <Link href="/upload">
                Start Explaining Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-12 py-6 bg-transparent border-2 border-slate-600 text-slate-300 hover:border-purple-400 hover:text-purple-400 hover:bg-purple-400/5 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group backdrop-blur-sm"
            >
              <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              View Features
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
