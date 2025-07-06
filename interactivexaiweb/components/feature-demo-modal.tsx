"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, RotateCcw, Volume2, Maximize, Minimize } from "lucide-react"

interface FeatureInfo {
  title: string
  description: string
  demoType: string
  character: string
  comicText: string
}

interface FeatureDemoModalProps {
  isOpen: boolean
  onClose: () => void
  feature: FeatureInfo | null
}

export function FeatureDemoModal({ isOpen, onClose, feature }: FeatureDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [replayKey, setReplayKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const duration = 25 // Duration for animations

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const stopProgressInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    stopProgressInterval()
    if (isOpen && isPlaying && progress < 100) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            stopProgressInterval()
            setIsPlaying(false)
            return 100
          }
          return prev + 100 / (duration * 10)
        })
      }, 100)
    }
    return stopProgressInterval
  }, [isOpen, isPlaying, replayKey, duration])

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
      setIsPlaying(true)
      setReplayKey((prev) => prev + 1)
      setIsFullscreen(false) // Reset fullscreen when modal opens
    }
  }, [isOpen, feature])

  // Handle fullscreen functionality
  const toggleFullscreen = async () => {
    if (!modalRef.current) return

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (modalRef.current.requestFullscreen) {
          await modalRef.current.requestFullscreen()
        } else if ((modalRef.current as any).webkitRequestFullscreen) {
          await (modalRef.current as any).webkitRequestFullscreen()
        } else if ((modalRef.current as any).msRequestFullscreen) {
          await (modalRef.current as any).msRequestFullscreen()
        }
        setIsFullscreen(true)
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Fullscreen error:", error)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (progress >= 100) {
      replay()
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const replay = () => {
    setProgress(0)
    setIsPlaying(true)
    setReplayKey((prev) => prev + 1)
  }

  const renderDemo = () => {
    if (!feature) return null

    switch (feature.demoType) {
      case "upload":
        return <UploadDemo key={replayKey} progress={progress} />
      case "explanations":
        return <ExplanationsDemo key={replayKey} progress={progress} />
      case "charts":
        return <ChartsDemo key={replayKey} progress={progress} />
      case "user-friendly":
        return <UserFriendlyDemo key={replayKey} progress={progress} />
      case "reliability":
        return <ReliabilityDemo key={replayKey} progress={progress} />
      case "compare":
        return <CompareDemo key={replayKey} progress={progress} />
      case "shap":
        return <ShapDemo key={replayKey} progress={progress} onClose={onClose} isFullscreen={isFullscreen} />
      case "lime":
        return <LimeDemo key={replayKey} progress={progress} onClose={onClose} isFullscreen={isFullscreen} />
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce-gentle">🚧</div>
              <p className="text-gray-600 font-medium">Demo Coming Soon!</p>
              <p className="text-sm text-gray-500">Feature: {feature.demoType}</p>
            </div>
          </div>
        )
    }
  }

  if (!feature) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className={`${
          isFullscreen
            ? "fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 rounded-none border-0"
            : "max-w-[95vw] w-full h-[95vh]"
        } p-0 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 transition-all duration-300`}
      >
        {/* Header */}
        <DialogHeader
          className={`${isFullscreen ? "p-8 pb-6" : "p-6 pb-4"} bg-white/90 backdrop-blur-sm border-b border-slate-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${isFullscreen ? "text-4xl" : "text-3xl"} animate-bounce-gentle`}>
                {feature.character}
              </div>
              <div>
                <DialogTitle
                  className={`${isFullscreen ? "text-3xl" : "text-2xl"} font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent`}
                >
                  {feature.title} Demo
                </DialogTitle>
                <p className={`text-slate-600 mt-1 ${isFullscreen ? "text-lg" : ""}`}>{feature.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-200 rounded-full p-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Demo Content */}
        <div className={`flex-1 ${isFullscreen ? "p-8" : "p-4"} overflow-auto`}>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden h-full min-h-[600px]">
            {renderDemo()}
          </div>
        </div>

        {/* Controls */}
        <div
          className={`${isFullscreen ? "p-8 pt-6" : "p-6 pt-4"} bg-white/90 backdrop-blur-sm border-t border-slate-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={togglePlay} className="hover:bg-slate-100">
                {isPlaying && progress < 100 ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={replay} className="hover:bg-slate-100">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Sound: Off</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`${isFullscreen ? "w-48" : "w-32"} h-2 bg-slate-200 rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-slate-600 font-mono">{Math.round(progress)}%</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-slate-100"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// SHAP DEMO - The Fair Share Explainer
function ShapDemo({
  progress,
  onClose,
  isFullscreen,
}: { progress: number; onClose: () => void; isFullscreen?: boolean }) {
  const [stage, setStage] = useState(0)
  const [comicText, setComicText] = useState("")

  useEffect(() => {
    if (progress < 20) {
      setStage(0)
      setComicText("Meet the AI Judge!")
    } else if (progress < 40) {
      setStage(1)
      setComicText("Weighing Evidence!")
    } else if (progress < 60) {
      setStage(2)
      setComicText("Fair Shares!")
    } else if (progress < 80) {
      setStage(3)
      setComicText("Balanced Decision!")
    } else {
      setStage(4)
      setComicText("Justice Served!")
    }
  }, [progress])

  return (
    <div
      className={`h-full ${isFullscreen ? "max-h-none p-8" : "max-h-[calc(100vh-200px)] p-4"} bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`${isFullscreen ? "text-4xl" : "text-2xl"} font-bold text-gray-800 mb-2`}>
          SHAP: The Fair Share Explainer
        </h2>
        <p className={`text-gray-600 ${isFullscreen ? "text-xl" : "text-lg"}`}>
          Like a wise judge, SHAP gives each feature a fair score for its contribution
        </p>
      </div>

      {/* Comic Speech Bubble */}
      {comicText && (
        <div className={`absolute ${isFullscreen ? "top-8 right-8" : "top-4 right-4"} z-30 hidden md:block`}>
          <div className="relative">
            <div
              className={`bg-blue-300 border-4 border-black rounded-2xl ${isFullscreen ? "px-6 py-4" : "px-4 py-2"} shadow-xl animate-bounce-gentle`}
            >
              <span className={`${isFullscreen ? "text-2xl" : "text-xl"} font-black text-black`}>{comicText}</span>
            </div>
            <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-300"></div>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-2 gap-${isFullscreen ? "8" : "4"} ${isFullscreen ? "min-h-[600px] max-h-[700px]" : "min-h-[400px] max-h-[500px]"}`}
      >
        {/* Left Side - The Courtroom */}
        <div className={`bg-white rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}>
          <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-4 text-center`}>
            The AI Courtroom
          </h3>

          {/* Judge Character */}
          <div className="text-center mb-6">
            <div className={`${isFullscreen ? "text-8xl" : "text-6xl"} animate-bounce-gentle`}>⚖️</div>
            <p className={`${isFullscreen ? "text-xl" : "text-lg"} font-bold text-blue-600 mt-2`}>Judge SHAP</p>
            <p className={`${isFullscreen ? "text-base" : "text-sm"} text-gray-600`}>Ensuring fair decisions</p>
          </div>

          {/* The Case */}
          <div className={`bg-gray-50 rounded-lg ${isFullscreen ? "p-6" : "p-3"} mb-4`}>
            <h4 className={`font-bold text-gray-700 mb-2 ${isFullscreen ? "text-lg" : ""}`}>
              🏠 The Case: House Price Prediction
            </h4>
            <div className={`${isFullscreen ? "text-base" : "text-sm"} text-gray-600 space-y-1`}>
              <div>📍 Location: Downtown</div>
              <div>📏 Size: 2,400 sq ft</div>
              <div>📅 Age: 5 years</div>
              <div>⭐ Condition: Excellent</div>
            </div>
          </div>

          {/* Base Value */}
          {stage >= 1 && (
            <div className={`bg-yellow-50 border border-yellow-200 rounded-lg ${isFullscreen ? "p-6" : "p-3"} mb-4`}>
              <div className="text-center">
                <div className={`${isFullscreen ? "text-base" : "text-sm"} text-yellow-700`}>
                  Starting Point (Base Value)
                </div>
                <div className={`${isFullscreen ? "text-3xl" : "text-2xl"} font-bold text-yellow-800`}>$350,000</div>
                <div className={`${isFullscreen ? "text-sm" : "text-xs"} text-yellow-600`}>Average house price</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - The Balancing Scale */}
        <div className={`bg-white rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}>
          <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-4 text-center`}>
            The Balancing Scale
          </h3>

          {/* Scale Visualization */}
          <div className={`relative ${isFullscreen ? "h-64" : "h-48"} flex items-center justify-center`}>
            {/* Scale Base */}
            <div className={`absolute bottom-0 ${isFullscreen ? "w-40 h-6" : "w-32 h-4"} bg-gray-600 rounded`}></div>
            <div
              className={`absolute ${isFullscreen ? "bottom-6 w-3 h-24" : "bottom-4 w-2 h-20"} left-1/2 transform -translate-x-1/2 bg-gray-600`}
            ></div>

            {/* Scale Beam */}
            <div
              className={`absolute ${isFullscreen ? "w-60 h-3" : "w-48 h-2"} bg-gray-700 rounded transform transition-all duration-1000 ${
                stage >= 2 ? "rotate-3" : "rotate-0"
              }`}
              style={{ top: isFullscreen ? "80px" : "60px" }}
            >
              {/* Left Pan (Negative) */}
              <div
                className={`absolute ${isFullscreen ? "-left-10 -top-8 w-20 h-16" : "-left-8 -top-6 w-16 h-12"} bg-red-200 border-2 border-red-400 rounded-lg flex items-center justify-center`}
              >
                {stage >= 2 && (
                  <div className="text-center">
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} text-red-700 font-bold`}>Age</div>
                    <div className={`${isFullscreen ? "text-base" : "text-sm"} text-red-800`}>-$15k</div>
                  </div>
                )}
              </div>

              {/* Right Pan (Positive) */}
              <div
                className={`absolute ${isFullscreen ? "-right-10 -top-8 w-20 h-16" : "-right-8 -top-6 w-16 h-12"} bg-green-200 border-2 border-green-400 rounded-lg`}
              >
                {stage >= 2 && (
                  <div className={`text-center ${isFullscreen ? "text-sm" : "text-xs"} space-y-1`}>
                    <div className="text-green-700 font-bold">Size: +$45k</div>
                    <div className="text-green-700 font-bold">Location: +$35k</div>
                    <div className="text-green-700 font-bold">Condition: +$10k</div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Features */}
            {stage >= 1 && (
              <>
                {/* Size Feature */}
                <div className={`absolute ${isFullscreen ? "top-6 right-12" : "top-4 right-8"} animate-float-slow`}>
                  <div
                    className={`bg-green-100 border border-green-300 rounded-lg ${isFullscreen ? "p-3" : "p-2"} text-center`}
                  >
                    <div className={`${isFullscreen ? "text-3xl" : "text-2xl"}`}>📏</div>
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} font-bold text-green-700`}>Large Size</div>
                  </div>
                </div>

                {/* Location Feature */}
                <div
                  className={`absolute ${isFullscreen ? "top-20 right-20" : "top-16 right-16"} animate-float-slow`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <div
                    className={`bg-blue-100 border border-blue-300 rounded-lg ${isFullscreen ? "p-3" : "p-2"} text-center`}
                  >
                    <div className={`${isFullscreen ? "text-3xl" : "text-2xl"}`}>📍</div>
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} font-bold text-blue-700`}>Downtown</div>
                  </div>
                </div>

                {/* Age Feature */}
                <div
                  className={`absolute ${isFullscreen ? "top-6 left-12" : "top-4 left-8"} animate-float-slow`}
                  style={{ animationDelay: "1s" }}
                >
                  <div
                    className={`bg-red-100 border border-red-300 rounded-lg ${isFullscreen ? "p-3" : "p-2"} text-center`}
                  >
                    <div className={`${isFullscreen ? "text-3xl" : "text-2xl"}`}>📅</div>
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} font-bold text-red-700`}>5 Years Old</div>
                  </div>
                </div>

                {/* Condition Feature */}
                <div
                  className={`absolute ${isFullscreen ? "top-20 left-20" : "top-16 left-16"} animate-float-slow`}
                  style={{ animationDelay: "1.5s" }}
                >
                  <div
                    className={`bg-purple-100 border border-purple-300 rounded-lg ${isFullscreen ? "p-3" : "p-2"} text-center`}
                  >
                    <div className={`${isFullscreen ? "text-3xl" : "text-2xl"}`}>⭐</div>
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} font-bold text-purple-700`}>Excellent</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* SHAP Values */}
          {stage >= 3 && (
            <div className="mt-6 space-y-3">
              <h4 className={`font-bold text-gray-700 text-center ${isFullscreen ? "text-lg" : ""}`}>
                Fair Share Contributions:
              </h4>
              {[
                { name: "House Size", value: 45000, color: "green" },
                { name: "Location", value: 35000, color: "blue" },
                { name: "Condition", value: 10000, color: "purple" },
                { name: "Age", value: -15000, color: "red" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between ${isFullscreen ? "p-3" : "p-2"} bg-gray-50 rounded`}
                >
                  <span className={`${isFullscreen ? "text-base" : "text-sm"} font-medium`}>{feature.name}</span>
                  <span className={`${isFullscreen ? "text-base" : "text-sm"} font-bold text-${feature.color}-600`}>
                    {feature.value > 0 ? "+" : ""}${(feature.value / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Final Verdict */}
      {stage >= 4 && (
        <div
          className={`mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}
        >
          <div className="text-center">
            <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-2`}>⚖️ Final Verdict</h3>
            <div className={`${isFullscreen ? "text-xl" : "text-lg"} text-gray-700 mb-2`}>
              Base Value: $350,000 + Contributions: +$75,000 =
            </div>
            <div className={`${isFullscreen ? "text-4xl" : "text-2xl"} font-bold text-green-600`}>$425,000</div>
            <p className={`text-gray-600 mt-2 ${isFullscreen ? "text-lg" : ""}`}>
              Judge SHAP has fairly distributed credit to each feature based on their true contribution!
            </p>

            {/* Close Demo Button */}
            <div className={`mt-6 pt-6 border-t border-gray-200`}>
              <Button
                onClick={onClose}
                className={`bg-blue-500 hover:bg-blue-600 text-white ${isFullscreen ? "px-8 py-3 text-lg" : "px-6 py-2"} rounded-lg font-medium transition-colors`}
              >
                Close Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// LIME DEMO - The Local Detective
function LimeDemo({
  progress,
  onClose,
  isFullscreen,
}: { progress: number; onClose: () => void; isFullscreen?: boolean }) {
  const [stage, setStage] = useState(0)
  const [comicText, setComicText] = useState("")

  useEffect(() => {
    if (progress < 20) {
      setStage(0)
      setComicText("Detective on the case!")
    } else if (progress < 40) {
      setStage(1)
      setComicText("Investigating locally!")
    } else if (progress < 60) {
      setStage(2)
      setComicText("Found the clues!")
    } else if (progress < 80) {
      setStage(3)
      setComicText("Case solved!")
    } else {
      setStage(4)
      setComicText("Elementary!")
    }
  }, [progress])

  return (
    <div
      className={`h-full ${isFullscreen ? "max-h-none p-8" : "max-h-[calc(100vh-200px)] p-4"} bg-gradient-to-br from-orange-50 to-yellow-50 overflow-auto`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`${isFullscreen ? "text-4xl" : "text-2xl"} font-bold text-gray-800 mb-2`}>
          LIME: The Local Detective
        </h2>
        <p className={`text-gray-600 ${isFullscreen ? "text-xl" : "text-lg"}`}>
          Like a detective with a spotlight, LIME focuses on one specific case at a time
        </p>
      </div>

      {/* Comic Speech Bubble */}
      {comicText && (
        <div className={`absolute ${isFullscreen ? "top-8 right-8" : "top-4 right-4"} z-30 hidden md:block`}>
          <div className="relative">
            <div
              className={`bg-orange-300 border-4 border-black rounded-2xl ${isFullscreen ? "px-6 py-4" : "px-4 py-2"} shadow-xl animate-bounce-gentle`}
            >
              <span className={`${isFullscreen ? "text-2xl" : "text-xl"} font-black text-black`}>{comicText}</span>
            </div>
            <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-300"></div>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-2 gap-${isFullscreen ? "8" : "4"} ${isFullscreen ? "min-h-[600px] max-h-[700px]" : "min-h-[400px] max-h-[500px]"}`}
      >
        {/* Left Side - Detective Office */}
        <div className={`bg-white rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}>
          <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-4 text-center`}>
            Detective LIME's Office
          </h3>

          {/* Detective Character */}
          <div className="text-center mb-6">
            <div className="relative">
              <div className={`${isFullscreen ? "text-8xl" : "text-6xl"} animate-bounce-gentle`}>🕵️‍♂️</div>
              <div className={`absolute -top-2 -right-2 ${isFullscreen ? "text-4xl" : "text-3xl"} animate-spin-slow`}>
                🔦
              </div>
            </div>
            <p className={`${isFullscreen ? "text-xl" : "text-lg"} font-bold text-orange-600 mt-2`}>Detective LIME</p>
            <p className={`${isFullscreen ? "text-base" : "text-sm"} text-gray-600`}>Local Investigation Expert</p>
          </div>

          {/* Case File */}
          <div className={`bg-gray-50 rounded-lg ${isFullscreen ? "p-6" : "p-3"} mb-4`}>
            <h4 className={`font-bold text-gray-700 mb-2 ${isFullscreen ? "text-lg" : ""}`}>📋 Case File #2024-001</h4>
            <div className={`${isFullscreen ? "text-base" : "text-sm"} text-gray-600 space-y-1`}>
              <div>
                <strong>Subject:</strong> One specific house
              </div>
              <div>
                <strong>Mission:</strong> Why THIS prediction?
              </div>
              <div>
                <strong>Method:</strong> Local neighborhood analysis
              </div>
            </div>
          </div>

          {/* Evidence Board */}
          {stage >= 1 && (
            <div className={`bg-yellow-50 border border-yellow-200 rounded-lg ${isFullscreen ? "p-6" : "p-3"}`}>
              <h4 className={`font-bold text-yellow-700 mb-2 ${isFullscreen ? "text-lg" : ""}`}>🔍 Evidence Board</h4>
              <div
                className={`grid grid-cols-2 gap-${isFullscreen ? "4" : "2"} ${isFullscreen ? "text-sm" : "text-xs"}`}
              >
                <div className={`bg-white ${isFullscreen ? "p-4" : "p-2"} rounded border`}>
                  <div className="font-bold">Target House</div>
                  <div>Size: 2,400 sq ft</div>
                  <div>Location: Downtown</div>
                </div>
                <div className={`bg-white ${isFullscreen ? "p-4" : "p-2"} rounded border`}>
                  <div className="font-bold">Similar Houses</div>
                  <div>Found: 50 nearby</div>
                  <div>Range: $380k-$450k</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Investigation Scene */}
        <div className={`bg-white rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}>
          <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-4 text-center`}>
            The Investigation
          </h3>

          {/* Spotlight Effect */}
          <div className={`relative ${isFullscreen ? "h-64" : "h-48"} bg-gray-900 rounded-lg overflow-hidden`}>
            {/* Dark Background */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-gray-900"></div>

            {/* Spotlight */}
            {stage >= 1 && (
              <div className="absolute inset-0">
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isFullscreen ? "w-40 h-40" : "w-32 h-32"} bg-gradient-radial from-yellow-200/80 to-transparent rounded-full animate-pulse`}
                ></div>
              </div>
            )}

            {/* Target House in Spotlight */}
            {stage >= 1 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`${isFullscreen ? "text-6xl" : "text-4xl"} mb-2`}>🏠</div>
                <div className={`text-white ${isFullscreen ? "text-base" : "text-sm"} font-bold`}>Target House</div>
                <div className={`text-yellow-200 ${isFullscreen ? "text-sm" : "text-xs"}`}>Under Investigation</div>
              </div>
            )}

            {/* Neighboring Houses (Dimmed) */}
            {stage >= 2 && (
              <>
                {[
                  { x: "20%", y: "30%", emoji: "🏘️" },
                  { x: "80%", y: "25%", emoji: "🏘️" },
                  { x: "15%", y: "70%", emoji: "🏘️" },
                  { x: "85%", y: "75%", emoji: "🏘️" },
                ].map((house, i) => (
                  <div
                    key={i}
                    className={`absolute ${isFullscreen ? "text-3xl" : "text-2xl"} opacity-40 animate-float-slow`}
                    style={{
                      left: house.x,
                      top: house.y,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {house.emoji}
                  </div>
                ))}
              </>
            )}

            {/* Investigation Lines */}
            {stage >= 2 && (
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="investigationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {[
                  { x1: "50%", y1: "50%", x2: "20%", y2: "30%" },
                  { x1: "50%", y1: "50%", x2: "80%", y2: "25%" },
                  { x1: "50%", y1: "50%", x2: "15%", y2: "70%" },
                  { x1: "50%", y1: "50%", x2: "85%", y2: "75%" },
                ].map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#investigationGradient)"
                    strokeWidth={isFullscreen ? "3" : "2"}
                    strokeDasharray="5,5"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </svg>
            )}
          </div>

          {/* Investigation Results */}
          {stage >= 3 && (
            <div className="mt-6 space-y-3">
              <h4 className={`font-bold text-gray-700 text-center ${isFullscreen ? "text-lg" : ""}`}>
                🔍 Local Rules Discovered:
              </h4>
              {[
                { rule: "IF size > 2000 sq ft", impact: "THEN +$45k", confidence: "95%" },
                { rule: "IF location = Downtown", impact: "THEN +$35k", confidence: "88%" },
                { rule: "IF age < 10 years", impact: "THEN +$20k", confidence: "92%" },
              ].map((rule, i) => (
                <div
                  key={i}
                  className={`bg-orange-50 border border-orange-200 rounded ${isFullscreen ? "p-4" : "p-2"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`${isFullscreen ? "text-base" : "text-sm"}`}>
                      <span className="font-medium text-orange-700">{rule.rule}</span>
                      <br />
                      <span className="text-orange-600">{rule.impact}</span>
                    </div>
                    <div className={`${isFullscreen ? "text-sm" : "text-xs"} text-orange-500 font-bold`}>
                      {rule.confidence}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Case Closed */}
      {stage >= 4 && (
        <div
          className={`mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl ${isFullscreen ? "p-8" : "p-4"} shadow-lg border border-gray-200`}
        >
          <div className="text-center">
            <h3 className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold text-gray-800 mb-2`}>🔦 Case Closed!</h3>
            <div className={`${isFullscreen ? "text-xl" : "text-lg"} text-gray-700 mb-2`}>
              Local Prediction for THIS house:
            </div>
            <div className={`${isFullscreen ? "text-4xl" : "text-2xl"} font-bold text-orange-600`}>$420,000</div>
            <div className={`${isFullscreen ? "text-base" : "text-sm"} text-orange-500 mt-1`}>Confidence: 89%</div>
            <p className={`text-gray-600 mt-2 ${isFullscreen ? "text-lg" : ""}`}>
              Detective LIME solved this specific case by analyzing the local neighborhood patterns!
            </p>

            {/* Close Demo Button */}
            <div className={`mt-6 pt-6 border-t border-gray-200`}>
              <Button
                onClick={onClose}
                className={`bg-orange-500 hover:bg-orange-600 text-white ${isFullscreen ? "px-8 py-3 text-lg" : "px-6 py-2"} rounded-lg font-medium transition-colors`}
              >
                Close Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Keep all other demo functions unchanged...
// [Previous demo functions remain the same - they don't need fullscreen support since they're not SHAP/LIME specific]

// UPLOAD DEMO - Shows actual file upload process
function UploadDemo({ progress }: { progress: number }) {
  const [stage, setStage] = useState(0)
  const [statusText, setStatusText] = useState("")

  useEffect(() => {
    if (progress < 20) {
      setStage(0)
      setStatusText("Ready to upload datasets")
    } else if (progress < 40) {
      setStage(1)
      setStatusText("Uploading dataset...")
    } else if (progress < 60) {
      setStage(2)
      setStatusText("Validating data format...")
    } else if (progress < 80) {
      setStage(3)
      setStatusText("Analyzing dataset structure...")
    } else {
      setStage(4)
      setStatusText("Dataset ready for analysis!")
    }
  }, [progress])

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dataset Upload System</h2>
        <p className="text-gray-600">Upload datasets of various sizes - we'll handle the AI models</p>
      </div>

      {/* Main Upload Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Upload Zone */}
          <div
            className={`relative border-4 border-dashed rounded-xl p-12 text-center transition-all duration-500 ${
              stage >= 1 ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
          >
            {/* Upload Icon */}
            <div className="mb-6">
              {stage === 0 && <div className="text-6xl text-gray-400">📁</div>}
              {stage >= 1 && stage < 4 && <div className="text-6xl text-blue-500 animate-bounce-gentle">⬆️</div>}
              {stage === 4 && <div className="text-6xl text-green-500 animate-bounce-gentle">✅</div>}
            </div>

            {/* Status Text */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{statusText}</h3>

            {/* File Types */}
            {stage === 0 && (
              <div className="text-gray-600 mb-6">
                <p>Drag and drop your datasets here or click to browse</p>
                <p className="text-sm mt-2">Supported: CSV, JSON, Excel, Parquet, TSV</p>
              </div>
            )}

            {/* Progress Bar */}
            {stage >= 1 && (
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* File Preview */}
            {stage >= 1 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Large Dataset */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📊</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">housing_data.csv</p>
                      <p className="text-sm text-gray-500">2.3 MB • 15,000 rows</p>
                      {stage >= 2 && (
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-600">Validated</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medium Dataset */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📈</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">sales_data.json</p>
                      <p className="text-sm text-gray-500">850 KB • 5,200 records</p>
                      {stage >= 2 && (
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-600">Validated</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Small Dataset */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📋</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">customer_survey.xlsx</p>
                      <p className="text-sm text-gray-500">125 KB • 800 responses</p>
                      {stage >= 3 && (
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-600">Analyzed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Large Dataset */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🗃️</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">transaction_log.parquet</p>
                      <p className="text-sm text-gray-500">12.7 MB • 50,000 entries</p>
                      {stage >= 3 && (
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-600">Analyzed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {stage === 4 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  Datasets uploaded successfully! Ready for XAI analysis with built-in models.
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {stage === 0 && (
            <div className="text-center mt-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Choose Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// EXPLANATIONS DEMO - Shows SHAP and LIME in action
function ExplanationsDemo({ progress }: { progress: number }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (progress < 25) setStage(0)
    else if (progress < 50) setStage(1)
    else if (progress < 75) setStage(2)
    else setStage(3)
  }, [progress])

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-green-50 to-blue-50 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Explanation Methods</h2>
        <p className="text-gray-600">Understanding how AI makes decisions with SHAP and LIME</p>
      </div>

      <div className="grid grid-cols-2 gap-8 h-full">
        {/* SHAP Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <h3 className="text-xl font-bold text-gray-800">SHAP Analysis</h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">Shows how each feature contributes to the prediction globally</p>

          {/* SHAP Visualization */}
          {stage >= 1 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Feature Importance:</h4>
              {[
                { name: "House Size", value: 0.35, color: "bg-green-500" },
                { name: "Location", value: 0.25, color: "bg-blue-500" },
                { name: "Age", value: -0.15, color: "bg-red-500" },
                { name: "Condition", value: 0.2, color: "bg-purple-500" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className="text-sm w-20 text-gray-700">{feature.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full ${feature.color} transition-all duration-1000 flex items-center justify-end pr-2`}
                      style={{
                        width: `${Math.abs(feature.value) * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      <span className="text-xs text-white font-medium">
                        {feature.value > 0 ? "+" : ""}
                        {feature.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage >= 2 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Prediction:</strong> $425,000 (15% above base value)
              </p>
            </div>
          )}
        </div>

        {/* LIME Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              L
            </div>
            <h3 className="text-xl font-bold text-gray-800">LIME Analysis</h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">Explains individual predictions by analyzing local neighborhoods</p>

          {/* LIME Visualization */}
          {stage >= 2 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Local Explanation for this house:</h4>

              {/* Sample Data Point */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Size: 2,400 sq ft</div>
                  <div>Location: Downtown</div>
                  <div>Age: 5 years</div>
                  <div>Condition: Excellent</div>
                </div>
              </div>

              {/* LIME Rules */}
              <div className="space-y-2">
                {[
                  { rule: "IF size > 2000 sq ft", impact: "+$45k", color: "text-green-600" },
                  { rule: "IF location = Downtown", impact: "+$35k", color: "text-green-600" },
                  { rule: "IF age < 10 years", impact: "+$20k", color: "text-green-600" },
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <span className="text-sm text-gray-700">{rule.rule}</span>
                    <span className={`text-sm font-medium ${rule.color}`}>{rule.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage >= 3 && (
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Local Prediction:</strong> $420,000 (High confidence: 89%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison */}
      {stage >= 3 && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">Key Differences:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-600">SHAP:</strong> Global model behavior, all features ranked
            </div>
            <div>
              <strong className="text-orange-600">LIME:</strong> Local explanation, specific instance rules
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// CHARTS DEMO - Shows actual data visualization
function ChartsDemo({ progress }: { progress: number }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (progress < 33) setStage(0)
    else if (progress < 66) setStage(1)
    else setStage(2)
  }, [progress])

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Interactive Visualizations</h2>
        <p className="text-gray-600">Dynamic charts powered by Plotly.js for better understanding</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100%-120px)]">
        {/* Feature Importance Bar Chart */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 text-center">Feature Importance</h3>
          <div className="h-48 flex items-end justify-around space-x-2">
            {[
              { name: "Size", value: 85, color: "bg-blue-500" },
              { name: "Location", value: 70, color: "bg-green-500" },
              { name: "Age", value: 45, color: "bg-yellow-500" },
              { name: "Condition", value: 60, color: "bg-purple-500" },
              { name: "Garage", value: 30, color: "bg-red-500" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`${item.color} rounded-t transition-all duration-1000 w-full flex items-end justify-center pb-1`}
                  style={{
                    height: stage >= 1 ? `${item.value}%` : "0%",
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {stage >= 1 && <span className="text-xs text-white font-medium">{item.value}%</span>}
                </div>
                <span className="text-xs text-gray-600 mt-1 text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SHAP Force Plot */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 text-center">SHAP Force Plot</h3>
          {stage >= 1 && (
            <div className="space-y-4">
              {/* Base Value */}
              <div className="text-center">
                <div className="text-sm text-gray-600">Base Value</div>
                <div className="text-lg font-bold text-gray-800">$350,000</div>
              </div>

              {/* Force Plot Visualization */}
              <div className="relative h-32 bg-gradient-to-r from-red-200 via-gray-100 to-green-200 rounded-lg overflow-hidden">
                {/* Prediction Line */}
                <div className="absolute top-1/2 left-1/2 w-1 h-full bg-black transform -translate-x-1/2"></div>

                {/* Feature Contributions */}
                {[
                  { name: "Size", value: 45, side: "right", color: "bg-green-500" },
                  { name: "Location", value: 30, side: "right", color: "bg-blue-500" },
                  { name: "Age", value: -20, side: "left", color: "bg-red-500" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={`absolute top-1/2 ${feature.side === "right" ? "left-1/2" : "right-1/2"} ${
                      feature.color
                    } h-6 flex items-center justify-center text-xs text-white font-medium transform -translate-y-1/2 transition-all duration-1000`}
                    style={{
                      width: `${Math.abs(feature.value)}px`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {feature.name}
                  </div>
                ))}
              </div>

              {/* Final Prediction */}
              <div className="text-center">
                <div className="text-sm text-gray-600">Final Prediction</div>
                <div className="text-lg font-bold text-green-600">$405,000</div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Plot */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 text-center">Summary Plot</h3>
          {stage >= 2 && (
            <div className="space-y-3">
              {[
                { feature: "House Size", points: 12, color: "bg-blue-500" },
                { feature: "Location", points: 10, color: "bg-green-500" },
                { feature: "Age", points: 8, color: "bg-yellow-500" },
                { feature: "Condition", points: 6, color: "bg-purple-500" },
                { feature: "Garage", points: 4, color: "bg-red-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className="text-sm w-20 text-gray-700">{item.feature}</span>
                  <div className="flex-1 flex items-center space-x-1">
                    {[...Array(item.points)].map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 h-2 ${item.color} rounded-full transition-all duration-300`}
                        style={{
                          animationDelay: `${i * 0.2 + j * 0.1}s`,
                          opacity: stage >= 2 ? 1 : 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Features */}
      {stage >= 2 && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">Interactive Features:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>🖱️ Hover for detailed values</div>
            <div>🔍 Zoom and pan capabilities</div>
            <div>📊 Export charts as images</div>
          </div>
        </div>
      )}
    </div>
  )
}

// USER-FRIENDLY DEMO - Shows the actual workflow
function UserFriendlyDemo({ progress }: { progress: number }) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (progress < 25) setCurrentStep(0)
    else if (progress < 50) setCurrentStep(1)
    else if (progress < 75) setCurrentStep(2)
    else setCurrentStep(3)
  }, [progress])

  const steps = [
    {
      title: "Upload Your Data",
      description: "Simply drag and drop your dataset and model files",
      icon: "📁",
      details: ["Support for CSV, JSON, Excel", "Pre-trained models (.pkl, .h5)", "Automatic validation"],
    },
    {
      title: "Select Analysis Type",
      description: "Choose between SHAP, LIME, or both for explanations",
      icon: "🎯",
      details: ["Global explanations with SHAP", "Local explanations with LIME", "Comparison mode available"],
    },
    {
      title: "Configure Settings",
      description: "Customize the analysis parameters easily",
      icon: "⚙️",
      details: ["Select target features", "Set explanation depth", "Choose visualization style"],
    },
    {
      title: "View Results",
      description: "Interactive charts and clear explanations",
      icon: "📊",
      details: ["Interactive visualizations", "Downloadable reports", "Share with your team"],
    },
  ]

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-blue-50 to-green-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User-Friendly Workflow</h2>
        <p className="text-gray-600">Designed for users of all technical backgrounds</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${
                  i <= currentStep ? "bg-blue-500 text-white shadow-lg scale-110" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < currentStep ? "✓" : i + 1}
              </div>

              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all duration-500 ${
                    i < currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Details */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-600 text-lg">{steps[currentStep].description}</p>
          </div>

          {/* Step Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps[currentStep].details.map((detail, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-lg p-4 text-center transition-all duration-500"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-blue-600 font-medium">{detail}</div>
              </div>
            ))}
          </div>

          {/* Mock Interface Preview */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-800 mb-4">Interface Preview:</h4>
            <div className="bg-white rounded border border-gray-200 p-4">
              {currentStep === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-600">Drag files here or click to browse</p>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked readOnly />
                    <label className="text-gray-700">SHAP Analysis (Global explanations)</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" />
                    <label className="text-gray-700">LIME Analysis (Local explanations)</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" />
                    <label className="text-gray-700">Both SHAP and LIME</label>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Feature</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2">
                      <option>House Price</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Features</label>
                    <input type="range" className="w-full" min="5" max="20" defaultValue="10" />
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <p className="text-sm text-blue-800">Interactive Charts</p>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <div className="text-2xl mb-1">📋</div>
                    <p className="text-sm text-green-800">Detailed Report</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// RELIABILITY DEMO - Shows trust metrics and validation
function ReliabilityDemo({ progress }: { progress: number }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (progress < 33) setStage(0)
    else if (progress < 66) setStage(1)
    else setStage(2)
  }, [progress])

  const reliabilityScore = Math.min(95, Math.floor(progress))

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-green-50 to-teal-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reliability Assessment</h2>
        <p className="text-gray-600">Ensuring trustworthy AI explanations through validation</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100%-120px)]">
        {/* Stability Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
              1
            </div>
            Stability Analysis
          </h3>

          {stage >= 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Testing explanation consistency across data perturbations</p>

              {/* Stability Tests */}
              <div className="space-y-3">
                {[
                  { test: "Feature Permutation", score: 92, status: "passed" },
                  { test: "Noise Injection", score: 88, status: "passed" },
                  { test: "Sample Variation", score: 94, status: "passed" },
                ].map((test, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{test.test}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-1000"
                          style={{
                            width: `${test.score}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-green-600 font-medium">{test.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Consistency Checks */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
              2
            </div>
            Consistency Checks
          </h3>

          {stage >= 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Comparing SHAP and LIME explanations for agreement</p>

              {/* Consistency Metrics */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Feature Ranking Agreement</span>
                    <span className="text-sm text-green-600 font-bold">87%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: "87%" }} />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Direction Agreement</span>
                    <span className="text-sm text-green-600 font-bold">93%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: "93%" }} />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Magnitude Correlation</span>
                    <span className="text-sm text-green-600 font-bold">81%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: "81%" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overall Trust Score */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
              3
            </div>
            Trust Score
          </h3>

          {stage >= 2 && (
            <div className="text-center space-y-4">
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - reliabilityScore / 100)}`}
                    className="text-green-500 transition-all duration-2000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{reliabilityScore}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-green-600 text-lg">Highly Reliable</p>
                <p className="text-sm text-gray-600">
                  Explanations show strong consistency and stability across multiple validation tests.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg">✅</div>
                  <p className="text-xs text-green-800">Stable</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg">🔒</div>
                  <p className="text-xs text-green-800">Consistent</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg">🎯</div>
                  <p className="text-xs text-green-800">Accurate</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg">🛡️</div>
                  <p className="text-xs text-green-800">Robust</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {stage >= 2 && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">Reliability Summary:</h3>
          <p className="text-gray-600 text-sm">
            The AI explanations demonstrate high reliability with consistent results across multiple validation methods.
            You can trust these insights for decision-making.
          </p>
        </div>
      )}
    </div>
  )
}

// COMPARE DEMO - Shows actual model comparison
function CompareDemo({ progress }: { progress: number }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (progress < 25) setStage(0)
    else if (progress < 50) setStage(1)
    else if (progress < 75) setStage(2)
    else setStage(3)
  }, [progress])

  const models = [
    {
      name: "Random Forest",
      accuracy: 87.5,
      precision: 89.2,
      recall: 85.8,
      features: ["House Size", "Location", "Age", "Condition"],
      color: "blue",
    },
    {
      name: "Neural Network",
      accuracy: 91.3,
      precision: 92.1,
      recall: 90.5,
      features: ["House Size", "Location", "Neighborhood", "Market Trends"],
      color: "purple",
    },
  ]

  return (
    <div className="h-full min-h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Model Comparison</h2>
        <p className="text-gray-600">Compare multiple AI models side by side</p>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-2 gap-8 mb-6 h-[calc(50%-60px)]">
        {models.map((model, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-500 ${
              stage >= 1 ? `border-${model.color}-500 shadow-${model.color}-500/20` : "border-gray-200"
            }`}
          >
            <div className="text-center mb-4">
              <h3 className={`text-xl font-bold text-${model.color}-600`}>{model.name}</h3>
              <div className="text-4xl mt-2">{i === 0 ? "🌳" : "🧠"}</div>
            </div>

            {/* Performance Metrics */}
            {stage >= 1 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Performance Metrics:</h4>
                {[
                  { metric: "Accuracy", value: model.accuracy },
                  { metric: "Precision", value: model.precision },
                  { metric: "Recall", value: model.recall },
                ].map((metric, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${model.color}-500 transition-all duration-1000`}
                          style={{
                            width: `${metric.value}%`,
                            animationDelay: `${j * 0.2}s`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{metric.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Top Features */}
            {stage >= 2 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Top Features:</h4>
                <div className="space-y-1">
                  {model.features.map((feature, j) => (
                    <div
                      key={j}
                      className={`text-sm bg-${model.color}-50 text-${model.color}-800 px-2 py-1 rounded transition-all duration-500`}
                      style={{ animationDelay: `${j * 0.1}s` }}
                    >
                      {j + 1}. {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Results */}
      {stage >= 3 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Comparison Results</h3>

          <div className="grid grid-cols-3 gap-6">
            {/* Winner */}
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-bold text-purple-600">Best Overall</h4>
              <p className="text-lg font-medium text-gray-800">Neural Network</p>
              <p className="text-sm text-gray-600">Higher accuracy and precision</p>
            </div>

            {/* Feature Comparison */}
            <div className="text-center">
              <div className="text-4xl mb-2">🔍</div>
              <h4 className="font-bold text-blue-600">Feature Analysis</h4>
              <p className="text-sm text-gray-600">
                Both models agree on <strong>House Size</strong> and <strong>Location</strong> as top features
              </p>
            </div>

            {/* Recommendation */}
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <h4 className="font-bold text-green-600">Recommendation</h4>
              <p className="text-sm text-gray-600">
                Use <strong>Neural Network</strong> for production with Random Forest as backup
              </p>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Metric</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-blue-700">Random Forest</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-purple-700">Neural Network</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { metric: "Accuracy", rf: "87.5%", nn: "91.3%", winner: "NN" },
                  { metric: "Training Time", rf: "2 min", nn: "15 min", winner: "RF" },
                  { metric: "Interpretability", rf: "High", nn: "Medium", winner: "RF" },
                  { metric: "Scalability", rf: "Good", nn: "Excellent", winner: "NN" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">{row.metric}</td>
                    <td className="px-4 py-2 text-sm text-center text-blue-600">{row.rf}</td>
                    <td className="px-4 py-2 text-sm text-center text-purple-600">{row.nn}</td>
                    <td className="px-4 py-2 text-sm text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          row.winner === "NN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {row.winner === "NN" ? "Neural Network" : "Random Forest"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
