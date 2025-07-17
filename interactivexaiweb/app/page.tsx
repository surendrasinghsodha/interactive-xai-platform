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
import SpaceBackground from "@/components/space-background"

// Enhanced floating card component
function FloatingCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-float-card gpu-accelerated stellar-drift" style={{ animationDelay: `${delay}ms` }}>
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      <SpaceBackground />

      {/* Content overlay with enhanced styling */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 px-4 text-center mt-16">
          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`transition-all duration-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge
                variant="secondary"
                className="mb-8 px-8 py-3 text-sm font-medium glass-card text-white hover:bg-black/60 transition-all duration-500 drop-shadow-cosmic text-crisp"
              >
                <Sparkles className="w-4 h-4 mr-2 animate-pulse-glow" />🚀 Interactive XAI Platform - Now Live
              </Badge>
            </div>

            <div
              className={`transition-all duration-1500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight drop-shadow-stellar cosmic-text text-crisp">
                Explainable AI
                <br />
                <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent animate-gradient-x">
                  Made Simple
                </span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1500 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-cosmic text-crisp">
                Upload your data, train models, and get instant explanations with{" "}
                <span className="text-white font-semibold animate-pulse-glow">SHAP</span> and{" "}
                <span className="text-gray-100 font-semibold animate-pulse-glow">LIME</span>. Make your AI decisions
                transparent and trustworthy.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1500 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button
                size="lg"
                asChild
                className="text-lg px-12 py-6 glass-card hover:bg-black/70 shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group gpu-accelerated text-crisp"
              >
                <Link href="/upload">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-12 py-6 glass-card border-2 border-white/30 text-white hover:border-white/60 hover:text-white hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg text-crisp bg-transparent"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-stellar text-crisp">
                Get Started in 3 Steps
              </h2>
              <p className="text-lg text-gray-300 drop-shadow-cosmic text-crisp">Jump right into the platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 shadow-lg animate-pulse-glow">
                    <Upload className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-white text-crisp">1. Upload Data</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-6 text-crisp">
                    Upload your CSV dataset and let our platform analyze it
                  </p>
                  <Button
                    asChild
                    className="w-full glass-card hover:bg-white/20 shadow-lg transition-all duration-300 text-crisp"
                  >
                    <Link href="/upload">Start Upload</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 shadow-lg animate-pulse-glow">
                    <BrainCircuit className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-white text-crisp">2. Train Model</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-6 text-crisp">Configure and train your machine learning model</p>
                  <Button
                    asChild
                    className="w-full glass-card hover:bg-white/20 shadow-lg transition-all duration-300 text-crisp"
                  >
                    <Link href="/train">Train Model</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 shadow-lg animate-pulse-glow">
                    <BarChart2 className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-white text-crisp">3. Get Explanations</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-6 text-crisp">
                    Generate SHAP and LIME explanations for your predictions
                  </p>
                  <Button
                    asChild
                    className="w-full glass-card hover:bg-white/20 shadow-lg transition-all duration-300 text-crisp"
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
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-stellar text-crisp">
                Why Choose InterWeb-XAI?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-cosmic text-crisp">
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
                  gradient: "from-gray-400 to-white",
                  delay: 0,
                },
                {
                  icon: BrainCircuit,
                  title: "SHAP & LIME Integration",
                  description:
                    "Get instant explanations using industry-standard SHAP and LIME algorithms. Understand feature importance and model decisions.",
                  gradient: "from-gray-500 to-gray-200",
                  delay: 200,
                },
                {
                  icon: BarChart2,
                  title: "Interactive Visualizations",
                  description:
                    "Explore your model's behavior through interactive charts and graphs. Make data-driven decisions with confidence.",
                  gradient: "from-gray-300 to-white",
                  delay: 400,
                },
                {
                  icon: Users,
                  title: "User-Friendly Interface",
                  description:
                    "Designed for both technical and non-technical users. Intuitive workflow from upload to explanation.",
                  gradient: "from-gray-600 to-gray-300",
                  delay: 600,
                },
                {
                  icon: Shield,
                  title: "Reliability Scoring",
                  description:
                    "Built-in reliability assessment through perturbation testing and user feedback collection.",
                  gradient: "from-gray-400 to-gray-100",
                  delay: 800,
                },
                {
                  icon: Zap,
                  title: "Real-time Processing",
                  description: "Fast model training and explanation generation. Get insights in seconds, not hours.",
                  gradient: "from-gray-500 to-white",
                  delay: 1000,
                },
              ].map((feature, index) => (
                <FloatingCard key={index} delay={feature.delay}>
                  <Card className="relative overflow-hidden border-white/20 glass-card hover:bg-black/60 transition-all duration-700 transform hover:scale-105 hover:-translate-y-3 group shadow-2xl gpu-accelerated">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60"></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                    ></div>

                    <CardHeader className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg animate-pulse-glow`}
                      >
                        <feature.icon className="h-8 w-8 text-black" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500 text-crisp">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-300 text-base leading-relaxed text-crisp">
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-stellar text-crisp">
                Platform Resources
              </h2>
              <p className="text-lg text-gray-300 drop-shadow-cosmic text-crisp">
                Learn more about XAI and get support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center pb-4">
                  <BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-2 group-hover:text-white transition-colors duration-300" />
                  <CardTitle className="text-white text-lg text-crisp">XAI Concepts</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-sm mb-4 text-crisp">Learn about SHAP, LIME, and explainable AI</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-400 text-gray-300 hover:bg-white/10 bg-transparent glass-card text-crisp"
                  >
                    <Link href="/xai-concepts">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center pb-4">
                  <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2 group-hover:text-white transition-colors duration-300" />
                  <CardTitle className="text-white text-lg text-crisp">Feedback</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-sm mb-4 text-crisp">Share your experience and help us improve</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-400 text-gray-300 hover:bg-white/10 bg-transparent glass-card text-crisp"
                  >
                    <Link href="/feedback">Give Feedback</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center pb-4">
                  <Users className="h-8 w-8 text-gray-300 mx-auto mb-2 group-hover:text-white transition-colors duration-300" />
                  <CardTitle className="text-white text-lg text-crisp">Our Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-sm mb-4 text-crisp">Meet the ClusterMind team behind the platform</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-400 text-gray-300 hover:bg-white/10 bg-transparent glass-card text-crisp"
                  >
                    <Link href="/colloborations">Meet Team</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card hover:bg-black/60 transition-all duration-500 group shadow-2xl gpu-accelerated">
                <CardHeader className="text-center pb-4">
                  <Github className="h-8 w-8 text-gray-300 mx-auto mb-2 group-hover:text-white transition-colors duration-300" />
                  <CardTitle className="text-white text-lg text-crisp">GitHub</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-sm mb-4 text-crisp">View source code and contribute</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-400 text-gray-300 hover:bg-white/10 bg-transparent glass-card text-crisp"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-stellar text-crisp">
                How It Works
              </h2>
              <p className="text-xl text-gray-300 drop-shadow-cosmic text-crisp">Four simple steps to explainable AI</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Upload Data",
                  description: "Upload your CSV dataset to our secure platform",
                  color: "from-gray-400 to-white",
                },
                {
                  step: 2,
                  title: "Train Model",
                  description: "Select and train your preferred ML model",
                  color: "from-gray-500 to-gray-200",
                },
                {
                  step: 3,
                  title: "Select Data Point",
                  description: "Choose a specific prediction to explain",
                  color: "from-gray-300 to-white",
                },
                {
                  step: 4,
                  title: "Get Explanations",
                  description: "View SHAP and LIME explanations instantly",
                  color: "from-gray-600 to-gray-300",
                },
              ].map((item, index) => (
                <div key={index} className="text-center group stellar-drift gpu-accelerated">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl shadow-2xl group-hover:scale-125 transition-all duration-500 border border-white/20 animate-pulse-glow`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500 drop-shadow-cosmic text-crisp">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed drop-shadow-sm text-crisp">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-sm"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-stellar cosmic-text text-crisp">
              Ready to Make Your AI Explainable?
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed drop-shadow-cosmic text-crisp">
              Join researchers and practitioners who trust InterWeb-XAI for transparent AI decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                asChild
                className="text-lg px-12 py-6 glass-card hover:bg-black/70 shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group gpu-accelerated text-crisp"
              >
                <Link href="/upload">
                  Start Explaining Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-12 py-6 glass-card border-2 border-white/30 text-white hover:border-white/60 hover:text-white hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group shadow-lg text-crisp bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                View Features
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
