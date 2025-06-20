"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, Sparkles, Video, ArrowRight, Laugh, Search, Scale } from "lucide-react"
import Link from "next/link"
import { VideoModal } from "@/components/video-modal"
import { FeatureDemoModal } from "@/components/feature-demo-modal" // Import FeatureDemoModal

export default function XAIConceptsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoSrc: "", title: "", description: "" })
  const [featureDemoModal, setFeatureDemoModal] = useState({ isOpen: false, feature: null as any }) // State for FeatureDemoModal

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openVideoModal = (videoSrc: string, title: string, description: string) => {
    setVideoModal({ isOpen: true, videoSrc, title, description })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoSrc: "", title: "", description: "" })
  }

  const openFeatureDemoModal = (feature: any) => {
    setFeatureDemoModal({ isOpen: true, feature })
  }

  const closeFeatureDemoModal = () => {
    setFeatureDemoModal({ isOpen: false, feature: null })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Minimalist Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-200/20 rounded-full blur-lg"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-orange-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center space-x-3 transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              <Brain className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                InterWeb-XAI
              </h1>
              <p className="text-xs text-orange-600/70 font-medium">AI Made Simple</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium">
              Home
            </Link>
            <Link href="/upload" className="text-gray-700 hover:text-pink-500 transition-all duration-300 font-medium">
              Upload
            </Link>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 font-medium">
              XAI Concepts
            </Badge>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1
            className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6 animate-gradient leading-tight transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Understanding AI Explanations
          </h1>
          <p
            className={`text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Demystifying SHAP and LIME: Learn how these powerful techniques help us understand why AI makes certain
            decisions, even if you're not a tech wizard!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SHAP Section */}
          <Card
            className={`bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up`}
            style={{ animationDelay: "700ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 text-3xl">
                <Scale className="mr-3 h-8 w-8 text-purple-500" />
                SHAP: The "Fair Share" Explainer
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Understanding how each factor contributes to the AI's overall decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Imagine a team project where everyone contributes, and you want to know exactly how much each person's
                effort (positive or negative) influenced the final grade. SHAP (SHapley Additive exPlanations) does
                something similar for AI! It breaks down a prediction and tells you how much each "feature" (like age,
                income, or location) pushed the prediction up or down from a baseline. It's like giving each feature a
                fair score for its impact.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start space-x-3">
                <Lightbulb className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Think of it like:</h4>
                  <p className="text-sm text-purple-600">
                    A balancing scale! Each feature adds weight, tilting the scale towards one prediction or another.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() =>
                  openFeatureDemoModal({
                    title: "SHAP Explained",
                    description: "Watch how SHAP breaks down AI predictions by showing each feature's contribution!",
                    demoType: "shap",
                    character: "⚖️",
                    comicText: "BALANCE!",
                  })
                }
              >
                <Video className="mr-2 h-5 w-5" />
                Watch Funny SHAP Demo
                <Laugh className="ml-2 h-5 w-5 text-yellow-500" />
              </Button>
            </CardContent>
          </Card>

          {/* LIME Section */}
          <Card
            className={`bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up`}
            style={{ animationDelay: "900ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 text-3xl">
                <Search className="mr-3 h-8 w-8 text-blue-500" />
                LIME: The "Local Detective"
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Focusing on why a *single* specific prediction was made.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Imagine you're a detective investigating a single, unique case. You don't care about all crimes ever,
                just *this one*. LIME (Local Interpretable Model-agnostic Explanations) works like that for AI. When the
                AI makes a prediction for one specific person or item, LIME creates a simple, "local" explanation to
                show which features were most important for *that particular decision*. It's great for understanding
                individual cases.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <Lightbulb className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-700 mb-1">Think of it like:</h4>
                  <p className="text-sm text-blue-600">
                    A spotlight! LIME shines a spotlight on the specific features that mattered most for one particular
                    AI decision, ignoring everything else.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() =>
                  openFeatureDemoModal({
                    title: "LIME Explained",
                    description: "See how LIME explains individual predictions by analyzing local neighborhoods!",
                    demoType: "lime",
                    character: "🔦",
                    comicText: "AHA!",
                  })
                }
              >
                <Video className="mr-2 h-5 w-5" />
                Watch Funny LIME Demo
                <Laugh className="ml-2 h-5 w-5 text-yellow-500" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white border-0 shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 group px-8 py-4 text-lg font-medium"
          >
            <Link href="/upload" className="flex items-center">
              <Sparkles className="mr-3 h-5 w-5 text-white animate-wiggle" />
              Start Your XAI Journey
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={closeVideoModal}
        videoSrc={videoModal.videoSrc}
        title={videoModal.title}
        description={videoModal.description}
      />
      {/* New FeatureDemoModal for SHAP/LIME animations */}
      <FeatureDemoModal
        isOpen={featureDemoModal.isOpen}
        onClose={closeFeatureDemoModal}
        feature={featureDemoModal.feature}
      />
    </div>
  )
}
