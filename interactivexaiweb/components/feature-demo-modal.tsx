"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Zap,
  Info,
  FileCode,
} from "lucide-react"

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
  const duration = 10 // Duration for animations

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
          return prev + 100 / (duration * 10) // 100 steps over duration
        })
      }, 100) // Update every 100ms
    }
    return stopProgressInterval
  }, [isOpen, isPlaying, replayKey, duration])

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
      setIsPlaying(true)
      setReplayKey((prev) => prev + 1)
    }
  }, [isOpen, feature])

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

  const formatTime = (seconds: number) => {
    const secs = Math.floor(seconds % 60)
    return `0:${secs.toString().padStart(2, "0")}`
  }

  const renderDemo = () => {
    if (!feature) return null
    const demoProps = { isPlaying: isPlaying && progress < 100, progress, duration }

    switch (feature.demoType) {
      case "upload":
        return <UploadDemo key={replayKey} {...demoProps} />
      case "explanations":
        return <ExplanationsDemo key={replayKey} {...demoProps} />
      case "charts":
        return <ChartsDemo key={replayKey} {...demoProps} />
      case "user-friendly":
        return <UserFriendlyDemo key={replayKey} {...demoProps} />
      case "reliability":
        return <ReliabilityDemo key={replayKey} {...demoProps} />
      case "compare":
        return <CompareDemo key={replayKey} {...demoProps} />
      default:
        return <div className="text-white text-2xl animate-pulse">Demo Coming Soon!</div>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full bg-gray-900/80 backdrop-blur-lg border-2 border-purple-500/50 text-white overflow-hidden shadow-2xl shadow-purple-500/20">
        <DialogHeader className="border-b border-purple-400/30 pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent flex items-center">
              <span className="text-3xl mr-3 animate-bounce-gentle">{feature?.character}</span>
              {feature?.title} Demo
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-purple-300 hover:bg-purple-500/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div
          className={`relative min-h-[500px] bg-black/50 rounded-lg overflow-hidden group ${!isPlaying && progress < 100 ? "demo-paused" : ""}`}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div className="absolute -top-10 -left-10 text-8xl text-yellow-500/20 opacity-50 animate-spin-slow transform-gpu">
            💥
          </div>
          <div className="absolute -bottom-10 -right-10 text-7xl text-pink-500/20 opacity-50 animate-ping-slow transform-gpu">
            ✨
          </div>

          <div className="h-full flex items-center justify-center p-8">{renderDemo()}</div>

          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${isPlaying && progress < 100 ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
          >
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-3">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 rounded-full"
                style={{ width: `${progress}%`, transition: progress > 0 ? "width 0.1s linear" : "none" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
                >
                  {isPlaying && progress < 100 ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={replay}
                  className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
              <div className="text-white text-sm font-mono">
                {formatTime((progress / 100) * duration)} / {formatTime(duration)}
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- DEMO COMPONENTS ---
interface DemoComponentProps {
  isPlaying: boolean
  progress: number
  duration: number
}

const DemoTextOverlay = ({ text, isVisible }: { text: string; isVisible: boolean }) => (
  <div
    className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-max max-w-[90%] p-3 bg-black/70 border border-purple-400/50 rounded-lg shadow-xl text-center text-sm md:text-base text-purple-200 transition-all duration-500 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`}
    style={{ backdropFilter: "blur(3px)" }}
  >
    <Info className="inline-block h-4 w-4 mr-2 text-purple-300" />
    {text}
  </div>
)

// v27 UploadDemo - Replace your existing UploadDemo with this
function UploadDemo({ isPlaying, progress }: DemoComponentProps) {
  const portalMaterializes = progress > 5
  const dataPacketAppears = progress > 15
  const dataPacketMoves = progress > 25
  const portalSuctionActive = progress > 45 && progress < 70
  const dataPacketAbsorbed = progress >= 70
  const absorptionEffectActive = progress >= 70 && progress < 80
  const comicTextPop = progress >= 70 && progress < 78
  const successPulse = progress >= 78 && progress < 88
  const finalMessageVisible = progress > 85
  const textOverlayVisible = progress > 30 && progress < 80

  // Data packet path: from top-right towards center portal
  const initialX = 80,
    initialY = 20 // Percentage
  const targetX = 50,
    targetY = 50 // Percentage

  let currentX = initialX
  let currentY = initialY
  let currentScale = 1

  if (dataPacketMoves && !dataPacketAbsorbed) {
    const moveProgress = Math.max(0, (progress - 25) / (70 - 25)) // Normalize progress for movement phase
    currentX = initialX + (targetX - initialX) * moveProgress
    currentY = initialY + (targetY - initialY) * moveProgress
    currentScale = 1 - 0.5 * moveProgress // Shrinks as it moves
  } else if (dataPacketAbsorbed) {
    currentX = targetX
    currentY = targetY
    currentScale = 0
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold relative overflow-hidden">
      {/* Portal */}
      <div
        className={`w-56 h-56 relative transition-opacity duration-500 ${portalMaterializes ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`w-full h-full rounded-full bg-purple-700/50 animate-portal-pulse-strong ${portalSuctionActive ? "animate-portal-suck-effect" : ""}`}
        >
          <div className="absolute inset-0 rounded-full bg-black/70 animate-vortex-swirl-fast opacity-80"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-radial from-transparent via-purple-900/80 to-purple-600"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-pulse-neon"></div>
        {/* Portal suction particles */}
        {portalSuctionActive &&
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full animate-portal-suction-particle"
              style={{ animationDelay: `${i * 0.05}s` }}
            ></div>
          ))}
        {/* Success Pulse */}
        {successPulse && (
          <div className="absolute inset-0 rounded-full bg-green-500/50 animate-success-pulse-emit"></div>
        )}
      </div>

      {/* Data Packet */}
      {dataPacketAppears && !dataPacketAbsorbed && (
        <div
          className="absolute transition-all duration-100 ease-in-out"
          style={{
            top: `${currentY}%`,
            left: `${currentX}%`,
            transform: `translate(-50%, -50%) scale(${currentScale})`,
          }}
        >
          <div className="relative w-20 h-20 animate-data-packet-float">
            <FileCode className="w-full h-full text-cyan-300 filter drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-data-bit-orbit"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
          {/* Data Trail */}
          {dataPacketMoves &&
            [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-data-trail-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                  opacity: Math.max(0, (progress - 25 - i * 2) / 30), // Fade in trail
                }}
              ></div>
            ))}
        </div>
      )}

      {/* Absorption Effect & Comic Text */}
      {absorptionEffectActive && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-12 bg-yellow-400 animate-data-packet-shatter"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) scaleY(0)`, // Initial scaleY(0)
                animationDelay: `${i * 0.02}s`,
              }}
            ></div>
          ))}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-yellow-300 animate-comic-text-pop ${comicTextPop ? "opacity-100" : "opacity-0"}`}
          >
            ZING!
          </div>
        </>
      )}

      {/* Final Success Message */}
      <div
        className={`text-4xl text-center mt-8 ${finalMessageVisible ? "animate-hologram-appear-strong" : "opacity-0"}`}
      >
        <p className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-300 bg-clip-text text-transparent">
          UPLOAD COMPLETE!
        </p>
        <p className="text-xl text-purple-300 mt-2">XAI Engine Primed!</p>
      </div>
      <DemoTextOverlay
        text="Securely Upload: Datasets (CSV, JSON) & Models (.pkl, .h5)"
        isVisible={textOverlayVisible}
      />
    </div>
  )
}

// --- Other Demo Components (ExplanationsDemo, ChartsDemo, etc.) ---
// These should remain largely the same as before v27, but ensure they
// also use the DemoTextOverlay component if you implemented that step.
// For brevity, I'm showing a simplified structure for them here.
// Make sure their content and specific animations are as you had them
// before the v27 UploadDemo revamp, plus the DemoTextOverlay.

function ExplanationsDemo({ isPlaying, progress }: DemoComponentProps) {
  const brainActive = progress > 5
  const showShap = progress > 25
  const showLime = progress > 45
  const showInsight = progress > 75
  const textVisible = progress > 50 && progress < 85 // Example timing

  return (
    <div className="w-full h-full flex flex-col items-center justify-around text-white font-bold relative">
      <div className={`relative mb-8 ${brainActive ? "animate-brain-scan" : "opacity-0"}`}>
        <BrainCircuit className="w-40 h-40 text-pink-400" />
        {brainActive &&
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-brain-activity"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        <div className="absolute -top-4 -right-4 text-2xl text-yellow-400 animate-pulse">⚡</div>
      </div>

      <div className="w-full max-w-2xl space-y-3">
        <div
          className={`p-3 rounded-lg border-2 border-pink-500/50 bg-black/40 backdrop-blur-sm transition-all duration-500 ${showShap ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-lg text-pink-300">SHAP Values</span>
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
          {[
            { label: "Age", val: -0.25, p: progress - 30 },
            { label: "Income", val: 0.6, p: progress - 35 },
          ].map((item) => (
            <div key={item.label} className="flex items-center text-sm my-1">
              <span className="w-20 text-gray-300">{item.label}:</span>
              <div className="w-full h-4 bg-gray-700 rounded-full mx-2">
                <div
                  className={`h-full rounded-full ${item.val > 0 ? "bg-green-500" : "bg-red-500"}`}
                  style={{
                    width: isPlaying && item.p > 0 ? `${Math.min(100, item.p * 2.5) * Math.abs(item.val)}%` : "0%",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
              <span className={`w-12 text-right ${item.val > 0 ? "text-green-400" : "text-red-400"}`}>
                {item.val.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`p-3 rounded-lg border-2 border-purple-500/50 bg-black/40 backdrop-blur-sm transition-all duration-500 ${showLime ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-lg text-purple-300">LIME Explanation</span>
            <Zap className="w-5 h-5 text-purple-400 animate-wiggle" />
          </div>
          {[
            { label: "Education", val: 0.35, p: progress - 50 },
            { label: "Location", val: -0.15, p: progress - 55 },
          ].map((item) => (
            <div key={item.label} className="flex items-center text-sm my-1">
              <span className="w-20 text-gray-300">{item.label}:</span>
              <div className="w-full h-4 bg-gray-700 rounded-full mx-2">
                <div
                  className={`h-full rounded-full ${item.val > 0 ? "bg-blue-500" : "bg-orange-500"}`}
                  style={{
                    width: isPlaying && item.p > 0 ? `${Math.min(100, item.p * 2.5) * Math.abs(item.val)}%` : "0%",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
              <span className={`w-12 text-right ${item.val > 0 ? "text-blue-400" : "text-orange-400"}`}>
                {item.val.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`mt-6 text-xl text-center ${showInsight ? "animate-hologram-appear" : "opacity-0"}`}>
        <p className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Key Insight: Income is a major factor!
        </p>
      </div>
      <DemoTextOverlay text="SHAP & LIME: Uncover AI's 'Why' - Global & Local Insights" isVisible={textVisible} />
    </div>
  )
}

function ChartsDemo({ isPlaying, progress }: DemoComponentProps) {
  const chartVisible = progress > 10
  const bars = [
    { height: 60, delay: 20, color: "bg-cyan-500" },
    { height: 80, delay: 28, color: "bg-pink-500" },
    { height: 45, delay: 36, color: "bg-purple-500" },
    { height: 90, delay: 44, color: "bg-yellow-500" },
    { height: 70, delay: 52, color: "bg-green-500" },
  ]
  const ufoActive = progress > 20
  const ufoPathProgress = Math.max(0, Math.min(1, (progress - 20) / 65))
  const textVisible = progress > 50 && progress < 90

  const ufoX = 50 + Math.cos(ufoPathProgress * Math.PI - Math.PI / 2) * 40
  const ufoY = 20 - Math.sin(ufoPathProgress * Math.PI) * 15

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold relative">
      {ufoActive && (
        <div
          className="absolute text-7xl animate-ufo-wobble"
          style={{ left: `${ufoX}%`, top: `${ufoY}%`, transform: "translate(-50%, -50%)" }}
        >
          🛸
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-8 bg-yellow-300/70 rounded-full blur-sm animate-ufo-beam"></div>
        </div>
      )}

      <div
        className={`w-4/5 h-3/5 flex items-end justify-around border-b-4 border-l-4 border-purple-500/50 p-4 relative ${chartVisible ? "opacity-100" : "opacity-0"}`}
      >
        {bars.map((bar, i) => (
          <div key={i} className="w-12 h-full flex items-end mx-1">
            <div
              className={`w-full rounded-t-lg ${bar.color} relative transition-all duration-1000 ease-out`}
              style={{
                height: isPlaying && progress > bar.delay ? `${bar.height}%` : "0%",
                boxShadow:
                  isPlaying && progress > bar.delay
                    ? `0 0 15px ${bar.color.replace("bg-", "").split("-")[0]}-400`
                    : "none",
              }}
            >
              <div
                className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-200 opacity-0 transition-opacity duration-500"
                style={{ opacity: isPlaying && progress > bar.delay + 8 ? 1 : 0 }}
              >
                {bar.height}%
              </div>
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-lg">
                <div
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-white/10 animate-chart-shine"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute -bottom-8 left-0 text-sm text-gray-400">Feature A</div>
        <div className="absolute -bottom-8 left-1/4 text-sm text-gray-400">Feature B</div>
        <div className="absolute -bottom-8 left-1/2 text-sm text-gray-400">Feature C</div>
        <div className="absolute -bottom-8 left-3/4 text-sm text-gray-400">Feature D</div>
        <div className="absolute -bottom-8 right-0 text-sm text-gray-400">Feature E</div>
        <div className="absolute -left-8 top-0 text-sm text-gray-400 transform -rotate-90 origin-bottom-left">
          Impact
        </div>
      </div>
      <p className={`mt-10 text-2xl text-cyan-300 ${progress > 70 ? "animate-hologram-appear" : "opacity-0"}`}>
        Dynamic Feature Analysis
      </p>
      <DemoTextOverlay text="Dynamic Visuals: Feature Impact & Model Behavior at a Glance" isVisible={textVisible} />
    </div>
  )
}

function UserFriendlyDemo({ isPlaying, progress }: DemoComponentProps) {
  const characters = [
    { char: "👨‍💼", name: "Analyst", delay: 10 },
    { char: "👩‍🎓", name: "Student", delay: 22 },
    { char: "🧑‍💻", name: "Developer", delay: 34 },
    { char: "🤔", name: "Curious User", delay: 46 },
  ]
  const platformVisible = progress > 5
  const allHappy = progress > 65
  const confettiActive = progress > 75
  const textVisible = progress > 50 && progress < 85

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold relative overflow-hidden">
      <div
        className={`w-3/4 h-1/2 bg-gray-800/50 border-2 border-blue-500 rounded-xl p-4 shadow-2xl relative transition-all duration-500 ${platformVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      >
        <div className="h-6 bg-gray-700 rounded-t-md flex items-center px-2 space-x-1.5">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-2xl text-blue-300 mb-4">InterWeb-XAI Interface</h3>
          <div className="flex justify-around items-end h-32">
            {[20, 40, 60, 30, 50].map((h, i) => (
              <div
                key={i}
                className="w-8 bg-blue-400 rounded-t-sm animate-ui-bars"
                style={{ height: `${h}%`, animationDelay: `${i * 0.1 + (progress / 100) * 0.5}s` }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className="absolute text-4xl animate-comic-cursor"
          style={{ left: `${10 + (progress / 100) * 70}%`, top: `${20 + Math.sin(progress / 10) * 10}%` }}
        >
          👆
        </div>
      </div>

      <div className="flex space-x-8 mt-10">
        {characters.map((user, i) => (
          <div
            key={i}
            className={`text-center transition-all duration-500 ${progress > user.delay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className={`text-7xl mb-2 ${isPlaying && allHappy ? "animate-user-bounce" : ""}`}>
              {allHappy ? "🥳" : user.char}
            </div>
            <p className="text-sm text-gray-300">{user.name}</p>
            {isPlaying && progress > user.delay + 8 && progress < 80 && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-0.5 rounded-full shadow-md animate-speech-bubble">
                {progress < 25 ? "Hmm..." : progress < 40 ? "Easy!" : progress < 60 ? "Cool!" : "Love it!"}
              </div>
            )}
          </div>
        ))}
      </div>

      {confettiActive &&
        [...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-2 h-3 rounded-sm animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${1 + Math.random() * 1}s`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            }}
          />
        ))}
      {allHappy && <div className="mt-6 text-3xl text-yellow-400 animate-hologram-appear">Accessible to Everyone!</div>}
      <DemoTextOverlay text="XAI for Everyone: Intuitive Workflow, Clear Results" isVisible={textVisible} />
    </div>
  )
}

function ReliabilityDemo({ isPlaying, progress }: DemoComponentProps) {
  const shieldActive = progress > 10
  const ringsActive = progress > 20
  const score = Math.min(100, Math.floor((progress / 85) * 97))
  const scoreVisible = progress > 55
  const checkmarkVisible = progress > 80
  const textVisible = progress > 60 && progress < 90

  return (
    <div className="w-full h-full flex items-center justify-center text-white font-bold relative">
      <div
        className={`relative w-72 h-72 transition-opacity duration-500 ${shieldActive ? "opacity-100" : "opacity-0"}`}
      >
        {ringsActive &&
          [0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-green-400 animate-reliability-ring"
              style={{ animationDelay: `${i * 0.5}s` }}
            ></div>
          ))}

        <div
          className={`absolute inset-0 flex items-center justify-center text-8xl ${isPlaying ? "animate-shield-strong-pulse" : ""}`}
        >
          <ShieldCheck className="w-56 h-56 text-green-500 opacity-80" />
        </div>

        <div
          className="absolute inset-10 grid grid-cols-3 gap-1 opacity-0"
          style={{ animation: isPlaying && progress > 30 ? "hex-grid-appear 1s forwards" : "none" }}
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-green-500/30 hex-shape animate-hex-pulse"
              style={{ animationDelay: `${i * 0.1 + (progress / 100) * 0.3}s` }}
            ></div>
          ))}
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-6xl text-white transition-all duration-500 ${scoreVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <span>{score}%</span>
          <span className="text-2xl text-green-300 mt-2">Reliability Score</span>
        </div>

        {checkmarkVisible && (
          <div className="absolute bottom-5 right-5 text-5xl text-yellow-400 animate-checkmark-pop">✔️</div>
        )}
      </div>
      {progress > 85 && (
        <p className="absolute bottom-10 text-2xl text-green-200 animate-hologram-appear">
          Trustworthy Insights Assured
        </p>
      )}
      <DemoTextOverlay text="Trustworthy AI: Stability Analysis & Consistency Checks" isVisible={textVisible} />
    </div>
  )
}

function CompareDemo({ isPlaying, progress }: DemoComponentProps) {
  const robotsAppear = progress > 10
  const vsAppears = progress > 20
  const battleStarts = progress > 35
  const modelAWins = progress > 70
  const textVisible = progress > 50 && progress < 85

  return (
    <div className="w-full h-full flex items-center justify-around text-white font-bold relative overflow-hidden">
      <div
        className={`text-center transition-all duration-500 ${robotsAppear ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
      >
        <div className={`text-8xl ${isPlaying ? "animate-robot-a-active" : ""}`}>🤖</div>
        <p className="text-xl text-blue-400 mt-2">Model Alpha</p>
        <p
          className={`text-3xl text-blue-300 ${battleStarts ? "animate-score-update" : "opacity-0"}`}
          style={{ animationDelay: "0.5s" }}
        >
          {modelAWins ? "92%" : "85%"}
        </p>
        {battleStarts && !modelAWins && progress < 70 && (
          <div
            className="absolute w-3 h-3 rounded-full bg-red-500 animate-hit-effect"
            style={{ left: "28%", top: "45%", animationDelay: `${Math.random() * 0.3}s` }}
          ></div>
        )}
      </div>

      <div
        className={`text-8xl font-black text-yellow-400 transition-all duration-300 ${vsAppears ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <span className={`${isPlaying && battleStarts ? "animate-vs-battle" : ""}`}>VS</span>
      </div>

      <div
        className={`text-center transition-all duration-500 ${robotsAppear ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
      >
        <div className={`text-8xl ${isPlaying ? "animate-robot-b-active" : ""}`}>🦾</div>
        <p className="text-xl text-purple-400 mt-2">Model Beta</p>
        <p
          className={`text-3xl text-purple-300 ${battleStarts ? "animate-score-update" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          {modelAWins ? "88%" : "90%"}
        </p>
        {battleStarts && modelAWins && progress < 70 && (
          <div
            className="absolute w-3 h-3 rounded-full bg-red-500 animate-hit-effect"
            style={{ right: "28%", top: "45%", animationDelay: `${Math.random() * 0.3 + 0.1}s` }}
          ></div>
        )}
      </div>

      {battleStarts && progress < 70 && (
        <>
          <div
            className="absolute w-1 h-full bg-blue-500/50 animate-laser-fire-a"
            style={{ clipPath: "polygon(0 0, 100% 20%, 100% 80%, 0% 100%)" }}
          ></div>
          <div
            className="absolute w-1 h-full bg-purple-500/50 animate-laser-fire-b"
            style={{ clipPath: "polygon(100% 0, 0 20%, 0 80%, 100% 100%)" }}
          ></div>
        </>
      )}

      <div
        className={`absolute bottom-10 text-center w-full transition-all duration-500 ${modelAWins ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <p className="text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-black animate-winner-text-glow">
          MODEL ALPHA WINS!
        </p>
        <p className="text-xl text-blue-200 mt-2">Superior Accuracy & Efficiency!</p>
        {[...Array(5)].map((_, i) => (
          <Sparkles
            key={i}
            className="inline-block text-yellow-400 animate-winner-sparkle"
            style={{ width: `${20 + i * 5}px`, height: `${20 + i * 5}px`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <DemoTextOverlay text="Model Showdown: Compare Explanations, Choose with Confidence" isVisible={textVisible} />
    </div>
  )
}
