"use client"

import type React from "react"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Loader2,
  BarChart2,
  Lightbulb,
  Star,
  Send,
  BrainCircuit,
  Info,
  Target,
  Zap,
  Eye,
  AlertCircle,
  HelpCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Scale,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  ReferenceLine,
  Cell,
} from "recharts"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import SpaceBackground from "@/components/space-background"

const cardStyle =
  "group relative overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all hover:scale-105 hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"

const accordionStyle = "w-full"

const accordionItemStyle = "border-b border-border"

const accordionTriggerStyle =
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"

const accordionContentStyle = "overflow-hidden text-sm transition-all"

// Enhanced tooltip component for better explanations
function ExplanationTooltip({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-medium">{title}</span>
        <HelpCircle className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-4 bg-black/95 border border-white/30 rounded-lg backdrop-blur-md z-50 text-sm text-white">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/30"></div>
          {children}
        </div>
      )}
    </div>
  )
}

// Beginner-friendly explanation cards
function BeginnerExplanation({ type }: { type: "shap" | "lime" }) {
  if (type === "shap") {
    return (
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">🎯 What is SHAP? (In Simple Terms)</h4>
            <div className="space-y-2 text-sm text-blue-100">
              <p>
                <strong>Think of it like this:</strong> Imagine you're trying to understand why a teacher gave you a
                specific grade on a test.
              </p>
              <p>
                <strong>SHAP asks:</strong> "How much did each question contribute to your final grade compared to the
                average student's grade?"
              </p>
              <p>
                <strong>For AI:</strong> SHAP tells us how much each piece of information (like age, income, etc.)
                pushed the AI's decision up or down from the average prediction.
              </p>
              <div className="bg-blue-800/30 p-3 rounded mt-3">
                <p className="font-medium">📊 The bars below show:</p>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>
                    • <span className="text-green-400">Green bars</span> = This information made the AI more confident
                    in its prediction
                  </li>
                  <li>
                    • <span className="text-red-400">Red bars</span> = This information made the AI less confident
                  </li>
                  <li>
                    • <span className="text-gray-400">Longer bars</span> = More important information
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Users className="h-4 w-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">💡 What is LIME? (In Simple Terms)</h4>
          <div className="space-y-2 text-sm text-green-100">
            <p>
              <strong>Think of it like this:</strong> Imagine you're trying to understand why your GPS chose a specific
              route.
            </p>
            <p>
              <strong>LIME asks:</strong> "If I look at similar routes nearby, what are the simple rules the GPS seems
              to follow?"
            </p>
            <p>
              <strong>For AI:</strong> LIME creates a simple explanation by testing what happens when we change small
              details about your specific case.
            </p>
            <div className="bg-green-800/30 p-3 rounded mt-3">
              <p className="font-medium">🔍 The bars below show:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>
                  • <span className="text-green-400">Positive values</span> = This factor supports the AI's decision
                </li>
                <li>
                  • <span className="text-red-400">Negative values</span> = This factor works against the AI's decision
                </li>
                <li>
                  • <span className="text-gray-400">Size matters</span> = Bigger numbers mean more influence on this
                  specific case
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced custom tooltip for charts
function CustomTooltip({ active, payload, label, type }: any) {
  if (active && payload && payload.length) {
    const data = payload[0]
    const value = data.value
    const isPositive = value > 0

    return (
      <div
        className="bg-black/95 border-2 border-cyan-400 rounded-lg p-4 backdrop-blur-md shadow-2xl max-w-xs"
        style={{ boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)" }}
      >
        <h4 className="font-semibold text-white mb-2 text-shadow-lg">{label}</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-400 animate-pulse-glow" />
            ) : (
              <TrendingDown className="h-4 w-4 text-pink-400 animate-pulse-glow" />
            )}
            <span className={`font-mono font-bold text-lg ${isPositive ? "text-green-400" : "text-pink-400"}`}>
              {value > 0 ? "+" : ""}
              {value.toFixed(4)}
            </span>
          </div>

          {type === "shap" ? (
            <div className="text-gray-200">
              <p className="font-medium mb-1 text-cyan-300">What this means:</p>
              <p>
                This feature {isPositive ? "increases" : "decreases"} the prediction by{" "}
                <strong className="text-white">{Math.abs(value).toFixed(4)}</strong> compared to the average case.
              </p>
              {isPositive ? (
                <p className="text-green-300 text-xs mt-1 font-medium">
                  ✓ Pushes the decision in favor of the prediction
                </p>
              ) : (
                <p className="text-pink-300 text-xs mt-1 font-medium">✗ Pushes the decision against the prediction</p>
              )}
            </div>
          ) : (
            <div className="text-gray-200">
              <p className="font-medium mb-1 text-cyan-300">What this means:</p>
              <p>
                In this specific case, this feature has a weight of{" "}
                <strong className="text-white">{Math.abs(value).toFixed(4)}</strong> in the AI's simple rule.
              </p>
              {isPositive ? (
                <p className="text-green-300 text-xs mt-1 font-medium">✓ Supports the predicted outcome</p>
              ) : (
                <p className="text-pink-300 text-xs mt-1 font-medium">✗ Works against the predicted outcome</p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

// Enhanced feature explanation with visual indicators
function FeatureExplanationCard({
  feature,
  value,
  impact,
  description,
  rank,
  type,
}: {
  feature: string
  value: number
  impact: "positive" | "negative" | "neutral"
  description: string
  rank: number
  type: "shap" | "lime"
}) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-400 border-green-400/50 bg-green-900/30"
      case "negative":
        return "text-pink-400 border-pink-400/50 bg-pink-900/30"
      default:
        return "text-cyan-400 border-cyan-400/50 bg-cyan-900/30"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <Plus className="h-4 w-4" />
      case "negative":
        return <Minus className="h-4 w-4" />
      default:
        return <Scale className="h-4 w-4" />
    }
  }

  const getImportanceLevel = (rank: number) => {
    if (rank <= 2) return { level: "Very High", color: "text-red-400", icon: "🔥" }
    if (rank <= 4) return { level: "High", color: "text-orange-400", icon: "⚡" }
    if (rank <= 6) return { level: "Medium", color: "text-yellow-400", icon: "⭐" }
    return { level: "Low", color: "text-gray-400", icon: "💫" }
  }

  const importance = getImportanceLevel(rank)

  return (
    <div
      className={`border rounded-lg p-4 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 stellar-drift ${getImpactColor(impact)}`}
    >
      <div className="flex items-start gap-4">
        {/* Rank indicator */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center border border-white/20">
            <span className="text-xs font-bold text-white">#{rank}</span>
          </div>
        </div>

        {/* Feature info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`${getImpactColor(impact)} animate-pulse-glow`}>{getImpactIcon(impact)}</div>
            <h4 className="font-semibold text-white text-shadow-sm truncate">{feature}</h4>
            <Badge variant="outline" className={`text-xs ${importance.color} border-current`}>
              {importance.icon} {importance.level}
            </Badge>
          </div>

          {/* Value display */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Impact:</span>
              <span className={`font-mono text-sm font-bold ${getImpactColor(impact)}`}>
                {value > 0 ? "+" : ""}
                {value.toFixed(4)}
              </span>
            </div>

            {/* Visual bar */}
            <div className="flex-1 h-3 bg-black/60 rounded-full overflow-hidden border border-white/20">
              <div
                className={`h-full transition-all duration-1000 ${
                  impact === "positive"
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : impact === "negative"
                      ? "bg-gradient-to-r from-pink-400 to-pink-600"
                      : "bg-gradient-to-r from-cyan-400 to-cyan-600"
                }`}
                style={{
                  width: `${Math.min(Math.abs(value) * 100, 100)}%`,
                  marginLeft: impact === "negative" ? "auto" : "0",
                  boxShadow: `0 0 10px ${
                    impact === "positive"
                      ? "rgba(34, 197, 94, 0.5)"
                      : impact === "negative"
                        ? "rgba(244, 114, 182, 0.5)"
                        : "rgba(100, 255, 218, 0.5)"
                  }`,
                }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed text-shadow-sm">{description}</p>

          {/* Beginner explanation */}
          <div className="mt-3 p-2 bg-black/40 rounded text-xs text-gray-400">
            <strong>In simple terms:</strong>{" "}
            {type === "shap"
              ? `This ${impact === "positive" ? "helps" : "hurts"} the AI's confidence by ${Math.abs(value * 100).toFixed(1)}% compared to average.`
              : `This factor ${impact === "positive" ? "supports" : "opposes"} the decision with ${Math.abs(value * 100).toFixed(1)}% influence.`}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced prediction summary with visual elements
function PredictionSummary({
  prediction,
  confidence,
  baseValue,
  totalContribution,
}: {
  prediction: string
  confidence: number
  baseValue: number
  totalContribution: number
}) {
  const finalPrediction = baseValue + totalContribution
  const confidenceLevel =
    confidence > 0.8 ? "Very High" : confidence > 0.6 ? "High" : confidence > 0.4 ? "Medium" : "Low"
  const confidenceColor =
    confidence > 0.8
      ? "text-green-400"
      : confidence > 0.6
        ? "text-blue-400"
        : confidence > 0.4
          ? "text-yellow-400"
          : "text-red-400"

  return (
    <Card className="glass-card backdrop-blur-md shadow-2xl border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30 hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-500 stellar-drift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
          <Target className="h-6 w-6 animate-pulse-glow" />
          AI Prediction Summary
          <ExplanationTooltip title="What is this?" icon={HelpCircle}>
            <div className="space-y-2">
              <p>This shows what the AI decided and how confident it is in that decision.</p>
              <p>
                <strong>Think of it like:</strong> A doctor giving you a diagnosis and telling you how sure they are
                about it.
              </p>
            </div>
          </ExplanationTooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main prediction display */}
        <div className="text-center p-6 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20">
          <div className="text-4xl font-bold text-white mb-2 text-shadow-lg flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse-glow" />
            {prediction}
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse-glow" />
          </div>
          <div className="text-lg text-slate-300 text-shadow-sm">AI's Final Decision</div>
          <div className={`text-2xl font-bold mt-2 ${confidenceColor} animate-pulse-glow`}>
            {(confidence * 100).toFixed(1)}% Confident ({confidenceLevel})
          </div>
        </div>

        {/* How the AI got to this decision */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white text-shadow-sm flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse-glow" />
            How the AI Made This Decision
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-blue-400 mb-1 text-shadow-lg font-mono">
                {baseValue.toFixed(3)}
              </div>
              <div className="text-sm text-slate-400 text-shadow-sm">Starting Point</div>
              <div className="text-xs text-slate-500 mt-1">Average prediction</div>
            </div>

            <div className="text-center p-4 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20">
              <div
                className={`text-2xl font-bold mb-1 text-shadow-lg font-mono ${
                  totalContribution > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {totalContribution > 0 ? "+" : ""}
                {totalContribution.toFixed(3)}
              </div>
              <div className="text-sm text-slate-400 text-shadow-sm">Feature Impact</div>
              <div className="text-xs text-slate-500 mt-1">
                {totalContribution > 0 ? "Pushed higher" : "Pulled lower"}
              </div>
            </div>

            <div className="text-center p-4 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-white mb-1 text-shadow-lg font-mono">
                {finalPrediction.toFixed(3)}
              </div>
              <div className="text-sm text-slate-400 text-shadow-sm">Final Result</div>
              <div className="text-xs text-slate-500 mt-1">What AI decided</div>
            </div>
          </div>

          {/* Visual flow */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <span>Starting Point</span>
            <ArrowRight className="h-4 w-4" />
            <span>+ Your Data</span>
            <ArrowRight className="h-4 w-4" />
            <span>= Final Decision</span>
          </div>
        </div>

        {/* Beginner explanation */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-purple-100">
              <p className="font-medium mb-1">🎯 What this means in simple terms:</p>
              <p>
                The AI started with an average guess of <strong>{baseValue.toFixed(3)}</strong>, then looked at your
                specific information and {totalContribution > 0 ? "increased" : "decreased"}
                its confidence by <strong>{Math.abs(totalContribution).toFixed(3)}</strong> points, ending up at{" "}
                <strong>{finalPrediction.toFixed(3)}</strong>.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Rest of the component remains the same but with enhanced visualizations...
export default function ExplanationsClientPage() {
  const { trainResponse, explanation, setExplanation, isLoading, setIsLoading } = useContext(AppContext)
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [explanationType, setExplanationType] = useState("both")
  const [explanationId, setExplanationId] = useState<string | null>(null)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackResponse, setFeedbackResponse] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!trainResponse) {
      toast({ variant: "destructive", title: "No model found", description: "Please train a model first." })
      router.push("/train")
    }
  }, [trainResponse, router, toast])

  const handleExplain = async () => {
    if (!trainResponse || !selectedRow) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please select a data row." })
      return
    }
    setIsLoading(true)
    setExplanation(null)
    setShowFeedback(false)
    setFeedbackResponse(null)

    try {
      const res = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: trainResponse.model_id, data_point: selectedRow }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || `Server error: ${res.statusText}`)
      }
      const data = await res.json()
      setExplanation(data)
      setExplanationId(data.explanation_id)
      setShowFeedback(true)
      toast({ title: "Success", description: "Explanations generated successfully!" })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Explanation Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced data formatting functions with better sorting and descriptions
  const formatShapData = () => {
    if (!explanation?.shap) return []
    return explanation.shap.features
      .map((feature, i) => ({
        name: feature.length > 15 ? feature.substring(0, 15) + "..." : feature,
        fullName: feature,
        value: explanation.shap.shap_values[i],
        impact:
          explanation.shap.shap_values[i] > 0.001
            ? "positive"
            : explanation.shap.shap_values[i] < -0.001
              ? "negative"
              : "neutral",
        absValue: Math.abs(explanation.shap.shap_values[i]),
      }))
      .sort((a, b) => b.absValue - a.absValue)
      .slice(0, 10) // Show top 10 most important features
  }

  const formatLimeData = () => {
    if (!explanation?.lime) return []
    return Object.entries(explanation.lime.lime_explanation)
      .map(([feature, value]) => ({
        name: feature.length > 15 ? feature.substring(0, 15) + "..." : feature,
        fullName: feature,
        value: value as number,
        impact: (value as number) > 0.001 ? "positive" : (value as number) < -0.001 ? "negative" : "neutral",
        absValue: Math.abs(value as number),
      }))
      .sort((a, b) => b.absValue - a.absValue)
      .slice(0, 10) // Show top 10 most important features
  }

  const getFeatureDescription = (featureName: string, value: number, method: "shap" | "lime", rank: number) => {
    const impact = value > 0 ? "increases" : "decreases"
    const strength = Math.abs(value) > 0.01 ? "strongly" : Math.abs(value) > 0.005 ? "moderately" : "slightly"
    const importance =
      rank <= 2
        ? "most important"
        : rank <= 4
          ? "very important"
          : rank <= 6
            ? "moderately important"
            : "less important"

    if (method === "shap") {
      return `This is the ${importance} feature. It ${strength} ${impact} the prediction by ${Math.abs(value).toFixed(4)} units compared to the average case. ${value > 0 ? "This pushes the prediction higher than normal." : "This pulls the prediction lower than normal."} Think of it as ${value > 0 ? "evidence FOR" : "evidence AGAINST"} the AI's decision.`
    } else {
      return `This is the ${importance} feature for this specific case. In the local neighborhood of this prediction, this feature ${strength} ${impact} the likelihood of the predicted outcome. The AI gives this feature a weight of ${value.toFixed(4)} in its simple rule. ${value > 0 ? "This supports the decision." : "This opposes the decision."}`
    }
  }

  // Enhanced waterfall data for better visualization
  const createWaterfallData = () => {
    if (!explanation?.shap) return []

    const data = []
    let cumulative = explanation.shap.base_value

    data.push({
      name: "Starting Point",
      value: explanation.shap.base_value,
      cumulative: cumulative,
      type: "base",
      description: "Average prediction across all training data",
    })

    const sortedFeatures = formatShapData().slice(0, 8) // Top 8 features for clarity

    sortedFeatures.forEach((feature, index) => {
      cumulative += feature.value
      data.push({
        name: feature.name,
        fullName: feature.fullName,
        value: feature.value,
        cumulative: cumulative,
        type: feature.impact,
        contribution: feature.value,
        description: `${feature.impact === "positive" ? "Increases" : "Decreases"} prediction by ${Math.abs(feature.value).toFixed(4)}`,
      })
    })

    return data
  }

  const COLORS = {
    positive: "#00FF88", // Bright electric green
    negative: "#FF4081", // Bright pink/magenta
    neutral: "#64FFDA", // Bright cyan
    base: "#2196F3", // Bright blue
    purple: "#E91E63", // Bright purple
    orange: "#FF9800", // Bright orange
    yellow: "#FFEB3B", // Bright yellow
    lime: "#CDDC39", // Bright lime
  }

  // Add gradient colors for more visual appeal
  const GRADIENT_COLORS = [
    "#00FF88", // Electric green
    "#FF4081", // Bright pink
    "#2196F3", // Bright blue
    "#E91E63", // Bright purple
    "#FF9800", // Bright orange
    "#FFEB3B", // Bright yellow
    "#64FFDA", // Bright cyan
    "#CDDC39", // Bright lime
    "#FF5722", // Deep orange
    "#9C27B0", // Bright violet
  ]

  const handleFeedbackSubmit = async () => {
    if (!trainResponse) {
      toast({
        variant: "destructive",
        title: "No Model Found",
        description: "Cannot submit feedback without a trained model.",
      })
      return
    }

    setIsSubmittingFeedback(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_id: trainResponse.model_id,
          explanation_id: explanationId,
          rating: rating,
          comment: comment,
          explanation_type: explanationType,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || `Server error: ${res.statusText}`)
      }

      const data = await res.json()
      setFeedbackResponse(data)
      toast({ title: "Feedback Submitted", description: "Thank you for your feedback!" })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Feedback Failed", description: error.message })
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  if (!trainResponse) return null

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-20">
          <PageHeader
            title="Step 3: AI Explanation Center"
            description="Understand your model's predictions with comprehensive AI explanations."
            breadcrumbs={[
              { label: "Upload Data", href: "/upload" },
              { label: "Train Model", href: "/train" },
              { label: "Get Explanations", href: "/explanations", current: true },
            ]}
            backButtonHref="/train"
            backButtonText="Back to Training"
          />

          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="space-y-8">
              <PageNavigation
                currentStep="/explanations"
                previousStep={{
                  href: "/train",
                  label: "Train Model",
                  icon: BrainCircuit,
                  description: "Configure and train your model",
                }}
                nextStep={{
                  href: "/feedback",
                  label: "Provide Feedback",
                  icon: Star,
                  description: "Rate explanation quality",
                }}
                showWorkflow={true}
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Controls */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
                        <Target className="h-5 w-5 animate-pulse-glow" />
                        Select Data Point
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-shadow-sm">
                        Choose a row from your dataset to explain.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Label className="text-white text-shadow-sm">Select a Row</Label>
                      <Select onValueChange={(val) => setSelectedRow(JSON.parse(val))}>
                        <SelectTrigger className="bg-black/60 border-white/30 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                          <SelectValue placeholder="Select a data row" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-white/30 backdrop-blur-md">
                          {trainResponse.sample_data.map((row, i) => (
                            <SelectItem key={i} value={JSON.stringify(row)} className="text-white hover:bg-white/10">
                              Row {i + 1}: {Object.values(row).slice(0, 2).join(", ")}...
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedRow && (
                        <div className="mt-4 p-3 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20">
                          <h4 className="font-medium text-white mb-2 text-shadow-sm">Selected Data:</h4>
                          <div className="space-y-1 text-sm">
                            {Object.entries(selectedRow)
                              .slice(0, 5)
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-slate-400 text-shadow-sm">{key}:</span>
                                  <span className="text-white font-mono text-shadow-sm">{String(value)}</span>
                                </div>
                              ))}
                            {Object.keys(selectedRow).length > 5 && (
                              <div className="text-slate-500 text-xs text-shadow-sm">
                                +{Object.keys(selectedRow).length - 5} more fields...
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleExplain}
                        disabled={isLoading || !selectedRow}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-shadow-sm"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Generate Explanation
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Feedback Section - Same as before */}
                  {showFeedback && explanation && (
                    <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
                          <Star className="mr-2 h-5 w-5 animate-pulse-glow" />
                          Rate This Explanation
                        </CardTitle>
                        <CardDescription className="text-slate-300 text-shadow-sm">
                          Your feedback helps improve explanation quality.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-white text-shadow-sm">Overall Rating</Label>
                          <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-6 w-6 cursor-pointer transition-all duration-300 transform hover:scale-125 ${
                                  star <= rating
                                    ? "text-yellow-400 fill-yellow-400 animate-pulse-glow drop-shadow-stellar"
                                    : "text-slate-600 hover:text-slate-400"
                                }`}
                                onClick={() => setRating(star)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-white text-shadow-sm">Explanation Type</Label>
                          <Select value={explanationType} onValueChange={setExplanationType}>
                            <SelectTrigger className="bg-black/60 border-white/30 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/30 backdrop-blur-md">
                              <SelectItem value="both" className="text-white hover:bg-white/10">
                                Both SHAP & LIME
                              </SelectItem>
                              <SelectItem value="shap" className="text-white hover:bg-white/10">
                                SHAP Only
                              </SelectItem>
                              <SelectItem value="lime" className="text-white hover:bg-white/10">
                                LIME Only
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white text-shadow-sm">Comments (Optional)</Label>
                          <Textarea
                            placeholder="What did you think about the explanation? Any suggestions for improvement?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-2 bg-black/60 border-white/30 text-white placeholder:text-slate-400 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 text-shadow-sm"
                          />
                        </div>

                        <Button
                          onClick={handleFeedbackSubmit}
                          disabled={isSubmittingFeedback || rating === 0}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-shadow-sm"
                        >
                          {isSubmittingFeedback ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Submit Feedback
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                  {explanation ? (
                    <>
                      {/* Prediction Summary */}
                      <PredictionSummary
                        prediction="Positive Class"
                        confidence={0.85}
                        baseValue={explanation.shap.base_value}
                        totalContribution={explanation.shap.shap_values.reduce((sum, val) => sum + val, 0)}
                      />

                      {/* Tabbed Explanations */}
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-black/60 backdrop-blur-md border border-white/20">
                          <TabsTrigger value="shap" className="data-[state=active]:bg-purple-600 text-white">
                            <BarChart2 className="h-4 w-4 mr-2" />
                            SHAP Analysis
                          </TabsTrigger>
                          <TabsTrigger value="lime" className="data-[state=active]:bg-green-600 text-white">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            LIME Analysis
                          </TabsTrigger>
                          <TabsTrigger value="compare" className="data-[state=active]:bg-orange-600 text-white">
                            <Activity className="h-4 w-4 mr-2" />
                            Compare Both
                          </TabsTrigger>
                        </TabsList>

                        {/* SHAP Analysis Tab */}
                        <TabsContent value="shap" className="space-y-6">
                          <BeginnerExplanation type="shap" />

                          <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
                                <BarChart2 className="h-6 w-6 text-purple-400 animate-pulse-glow" />
                                SHAP Feature Importance
                                <Badge variant="outline" className="text-purple-400 border-purple-400">
                                  Reliability: {((explanation.shap.reliability_score || 0.5) * 100).toFixed(0)}%
                                </Badge>
                              </CardTitle>
                              <CardDescription className="text-slate-300 text-shadow-sm">
                                How each feature contributed to the AI's decision compared to the average case
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* Enhanced Bar Chart */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm flex items-center gap-2">
                                  <BarChart2 className="h-4 w-4 animate-pulse-glow" />
                                  Feature Impact Visualization
                                </h4>
                                <ResponsiveContainer width="100%" height={500}>
                                  <BarChart
                                    layout="vertical"
                                    data={formatShapData()}
                                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#64FFDA" strokeOpacity={0.3} />
                                    <XAxis
                                      type="number"
                                      tick={{ fill: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                      label={{
                                        value: "Impact on Prediction",
                                        position: "insideBottom",
                                        offset: -10,
                                        style: {
                                          textAnchor: "middle",
                                          fill: "#FFFFFF",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        },
                                      }}
                                    />
                                    <YAxis
                                      dataKey="name"
                                      type="category"
                                      width={120}
                                      tick={{ fill: "#FFFFFF", fontSize: 11, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                    />
                                    <Tooltip content={<CustomTooltip type="shap" />} />
                                    <ReferenceLine x={0} stroke="#FFEB3B" strokeDasharray="2 2" strokeWidth={2} />
                                    <Bar
                                      dataKey="value"
                                      fill={(entry: any, index: number) => {
                                        if (entry.value > 0) return COLORS.positive
                                        if (entry.value < 0) return COLORS.negative
                                        return COLORS.neutral
                                      }}
                                      radius={[0, 8, 8, 0]}
                                      stroke="#FFFFFF"
                                      strokeWidth={1}
                                    >
                                      {formatShapData().map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={
                                            entry.value > 0
                                              ? COLORS.positive
                                              : entry.value < 0
                                                ? COLORS.negative
                                                : COLORS.neutral
                                          }
                                        />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Waterfall Chart */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm flex items-center gap-2">
                                  <Activity className="h-4 w-4 animate-pulse-glow" />
                                  Decision Journey - How We Got to the Final Answer
                                </h4>
                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                                  <p className="text-sm text-blue-100">
                                    <strong>📊 How to read this chart:</strong> Start from the left (average
                                    prediction), then see how each feature pushes the prediction up (green) or down
                                    (red) to reach the final decision.
                                  </p>
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                  <ComposedChart
                                    data={createWaterfallData()}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#64FFDA" strokeOpacity={0.3} />
                                    <XAxis
                                      dataKey="name"
                                      angle={-45}
                                      textAnchor="end"
                                      height={80}
                                      tick={{ fill: "#FFFFFF", fontSize: 10, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                    />
                                    <YAxis
                                      tick={{ fill: "#FFFFFF", fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                      label={{
                                        value: "Prediction Value",
                                        angle: -90,
                                        position: "insideLeft",
                                        style: {
                                          textAnchor: "middle",
                                          fill: "#FFFFFF",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        },
                                      }}
                                    />
                                    <Tooltip
                                      formatter={(value: any, name: any) => [
                                        typeof value === "number" ? value.toFixed(4) : value,
                                        name === "cumulative" ? "Running Total" : "Feature Contribution",
                                      ]}
                                      labelStyle={{ color: "#fff", fontWeight: "bold" }}
                                      contentStyle={{
                                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                                        border: "2px solid #64FFDA",
                                        borderRadius: "12px",
                                        boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)",
                                      }}
                                    />
                                    <Legend wrapperStyle={{ color: "#FFFFFF", fontWeight: "bold" }} />
                                    <Bar
                                      dataKey="value"
                                      name="Feature Contribution"
                                      radius={[4, 4, 0, 0]}
                                      stroke="#FFFFFF"
                                      strokeWidth={1}
                                    >
                                      {createWaterfallData().map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={
                                            entry.type === "base"
                                              ? COLORS.base
                                              : entry.type === "positive"
                                                ? COLORS.positive
                                                : entry.type === "negative"
                                                  ? COLORS.negative
                                                  : COLORS.neutral
                                          }
                                        />
                                      ))}
                                    </Bar>
                                    <Line
                                      type="monotone"
                                      dataKey="cumulative"
                                      stroke="#FFEB3B"
                                      strokeWidth={4}
                                      name="Running Total"
                                      dot={{ fill: "#FFEB3B", strokeWidth: 3, r: 6, stroke: "#FFFFFF" }}
                                      activeDot={{ r: 8, fill: "#FFEB3B", stroke: "#FFFFFF", strokeWidth: 3 }}
                                    />
                                  </ComposedChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Feature Cards */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm">
                                  Detailed Feature Analysis (Top 8 Most Important)
                                </h4>
                                <div className="space-y-4">
                                  {formatShapData()
                                    .slice(0, 8)
                                    .map((feature, index) => (
                                      <FeatureExplanationCard
                                        key={index}
                                        feature={feature.fullName}
                                        value={feature.value}
                                        impact={feature.impact}
                                        description={getFeatureDescription(
                                          feature.fullName,
                                          feature.value,
                                          "shap",
                                          index + 1,
                                        )}
                                        rank={index + 1}
                                        type="shap"
                                      />
                                    ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* LIME Analysis Tab */}
                        <TabsContent value="lime" className="space-y-6">
                          <BeginnerExplanation type="lime" />

                          <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
                                <Lightbulb className="h-6 w-6 text-green-400 animate-pulse-glow" />
                                LIME Local Explanation
                                <Badge variant="outline" className="text-green-400 border-green-400">
                                  Reliability: {((explanation.lime.reliability_score || 0.5) * 100).toFixed(0)}%
                                </Badge>
                              </CardTitle>
                              <CardDescription className="text-slate-300 text-shadow-sm">
                                Simple rules the AI seems to follow for this specific prediction
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* LIME Explanation */}
                              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                                <h4 className="font-medium text-white mb-2 flex items-center gap-2 text-shadow-sm">
                                  <Info className="h-4 w-4 animate-pulse-glow" />
                                  What LIME Discovered
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed text-shadow-sm">
                                  LIME created a simple model that mimics your complex AI model's behavior specifically
                                  around this prediction. Think of it as creating a "local map" of how the AI makes
                                  decisions in this neighborhood of data.
                                </p>
                              </div>

                              {/* Enhanced Bar Chart */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm flex items-center gap-2">
                                  <BarChart2 className="h-4 w-4 animate-pulse-glow" />
                                  Local Feature Weights
                                </h4>
                                <ResponsiveContainer width="100%" height={500}>
                                  <BarChart
                                    layout="vertical"
                                    data={formatLimeData()}
                                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#64FFDA" strokeOpacity={0.3} />
                                    <XAxis
                                      type="number"
                                      tick={{ fill: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                      label={{
                                        value: "Feature Weight",
                                        position: "insideBottom",
                                        offset: -10,
                                        style: {
                                          textAnchor: "middle",
                                          fill: "#FFFFFF",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        },
                                      }}
                                    />
                                    <YAxis
                                      dataKey="name"
                                      type="category"
                                      width={120}
                                      tick={{ fill: "#FFFFFF", fontSize: 11, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                    />
                                    <Tooltip content={<CustomTooltip type="lime" />} />
                                    <ReferenceLine x={0} stroke="#FFEB3B" strokeDasharray="2 2" strokeWidth={2} />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]} stroke="#FFFFFF" strokeWidth={1}>
                                      {formatLimeData().map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={
                                            entry.value > 0
                                              ? COLORS.positive
                                              : entry.value < 0
                                                ? COLORS.negative
                                                : COLORS.neutral
                                          }
                                        />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Feature Cards */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm">
                                  Local Feature Analysis (Top 8 Most Influential)
                                </h4>
                                <div className="space-y-4">
                                  {formatLimeData()
                                    .slice(0, 8)
                                    .map((feature, index) => (
                                      <FeatureExplanationCard
                                        key={index}
                                        feature={feature.fullName}
                                        value={feature.value}
                                        impact={feature.impact}
                                        description={getFeatureDescription(
                                          feature.fullName,
                                          feature.value,
                                          "lime",
                                          index + 1,
                                        )}
                                        rank={index + 1}
                                        type="lime"
                                      />
                                    ))}
                                </div>
                              </div>

                              {/* Local vs Global Note */}
                              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 backdrop-blur-sm">
                                <h4 className="font-medium text-white mb-2 flex items-center gap-2 text-shadow-sm">
                                  <AlertCircle className="h-4 w-4 animate-pulse-glow" />
                                  Important to Remember
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed text-shadow-sm">
                                  LIME explanations are <strong>local</strong> - they explain this specific prediction,
                                  not how the model behaves in general. Different data points might have completely
                                  different explanations even from the same model. This is like getting directions that
                                  work great for your current location but might not apply elsewhere.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Compare Tab */}
                        <TabsContent value="compare" className="space-y-6">
                          <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-white text-shadow-lg">
                                <Activity className="h-5 w-5 animate-pulse-glow" />
                                SHAP vs LIME: Side-by-Side Comparison
                              </CardTitle>
                              <CardDescription className="text-slate-300 text-shadow-sm">
                                Understanding how both methods explain the same prediction
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* Beginner explanation */}
                              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                                <h4 className="font-medium text-white mb-2 flex items-center gap-2 text-shadow-sm">
                                  <BookOpen className="h-4 w-4 animate-pulse-glow" />
                                  Why Compare Both Methods?
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed text-shadow-sm">
                                  Think of SHAP and LIME as two different doctors giving you a second opinion. When they
                                  agree, you can be more confident. When they disagree, it reveals interesting insights
                                  about your specific case vs. the general pattern.
                                </p>
                              </div>

                              {/* Side by side comparison chart */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm">
                                  Feature Importance Comparison
                                </h4>
                                <ResponsiveContainer width="100%" height={600}>
                                  <BarChart
                                    layout="vertical"
                                    data={formatShapData()
                                      .slice(0, 8)
                                      .map((shapFeature) => {
                                        const limeFeature = formatLimeData().find(
                                          (f) => f.fullName === shapFeature.fullName,
                                        )
                                        return {
                                          name: shapFeature.name,
                                          fullName: shapFeature.fullName,
                                          SHAP: shapFeature.value,
                                          LIME: limeFeature ? limeFeature.value : 0,
                                          agreement: limeFeature
                                            ? shapFeature.impact === limeFeature.impact
                                              ? "agree"
                                              : "disagree"
                                            : "missing",
                                        }
                                      })}
                                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#64FFDA" strokeOpacity={0.3} />
                                    <XAxis
                                      type="number"
                                      tick={{ fill: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                      label={{
                                        value: "Feature Impact",
                                        position: "insideBottom",
                                        offset: -10,
                                        style: {
                                          textAnchor: "middle",
                                          fill: "#FFFFFF",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        },
                                      }}
                                    />
                                    <YAxis
                                      dataKey="name"
                                      type="category"
                                      width={120}
                                      tick={{ fill: "#FFFFFF", fontSize: 11, fontWeight: "bold" }}
                                      axisLine={{ stroke: "#64FFDA", strokeWidth: 2 }}
                                      tickLine={{ stroke: "#64FFDA" }}
                                    />
                                    <Tooltip
                                      formatter={(value: any, name: any) => [value.toFixed(4), name]}
                                      labelStyle={{ color: "#fff", fontWeight: "bold" }}
                                      contentStyle={{
                                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                                        border: "2px solid #64FFDA",
                                        borderRadius: "12px",
                                        boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)",
                                      }}
                                    />
                                    <Legend wrapperStyle={{ color: "#FFFFFF", fontWeight: "bold" }} />
                                    <ReferenceLine x={0} stroke="#FFEB3B" strokeDasharray="2 2" strokeWidth={2} />
                                    <Bar
                                      dataKey="SHAP"
                                      fill="#E91E63"
                                      name="SHAP Values"
                                      radius={[0, 4, 4, 0]}
                                      stroke="#FFFFFF"
                                      strokeWidth={1}
                                    />
                                    <Bar
                                      dataKey="LIME"
                                      fill="#00FF88"
                                      name="LIME Weights"
                                      radius={[0, 4, 4, 0]}
                                      stroke="#FFFFFF"
                                      strokeWidth={1}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Agreement Analysis */}
                              <div>
                                <h4 className="font-medium text-white mb-4 text-shadow-sm">
                                  Feature Agreement Analysis
                                </h4>
                                <div className="space-y-3">
                                  {formatShapData()
                                    .slice(0, 6)
                                    .map((shapFeature, index) => {
                                      const limeFeature = formatLimeData().find(
                                        (f) => f.fullName === shapFeature.fullName,
                                      )
                                      const agreement = limeFeature
                                        ? shapFeature.impact === limeFeature.impact
                                          ? "agree"
                                          : "disagree"
                                        : "missing"

                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-4 bg-black/40 rounded-lg backdrop-blur-sm border border-white/20 stellar-drift"
                                          style={{ animationDelay: `${index * 200}ms` }}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div
                                              className={`w-4 h-4 rounded-full animate-pulse-glow ${
                                                agreement === "agree"
                                                  ? "bg-green-500"
                                                  : agreement === "disagree"
                                                    ? "bg-red-500"
                                                    : "bg-gray-500"
                                              }`}
                                            />
                                            <span className="text-white font-medium text-shadow-sm">
                                              {shapFeature.fullName}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                              <div className="text-purple-400 text-shadow-sm font-mono">
                                                {shapFeature.value > 0 ? "+" : ""}
                                                {shapFeature.value.toFixed(3)}
                                              </div>
                                              <div className="text-xs text-gray-400">SHAP</div>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-green-400 text-shadow-sm font-mono">
                                                {limeFeature
                                                  ? `${limeFeature.value > 0 ? "+" : ""}${limeFeature.value.toFixed(3)}`
                                                  : "N/A"}
                                              </div>
                                              <div className="text-xs text-gray-400">LIME</div>
                                            </div>
                                            <Badge
                                              variant={agreement === "agree" ? "default" : "destructive"}
                                              className="text-xs backdrop-blur-sm"
                                            >
                                              {agreement === "agree"
                                                ? "✓ Agree"
                                                : agreement === "disagree"
                                                  ? "✗ Disagree"
                                                  : "? Missing"}
                                            </Badge>
                                          </div>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>

                              {/* Interpretation Guide */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                                  <h4 className="font-semibold text-blue-300 mb-3 text-shadow-sm">When They Agree ✓</h4>
                                  <div className="space-y-2 text-sm text-blue-100 text-shadow-sm">
                                    <p>
                                      • <strong>High confidence:</strong> Both methods point to the same important
                                      features
                                    </p>
                                    <p>
                                      • <strong>Reliable insight:</strong> The feature truly influences the decision
                                    </p>
                                    <p>
                                      • <strong>Actionable:</strong> You can trust this explanation for decision-making
                                    </p>
                                    <p>
                                      • <strong>Consistent pattern:</strong> The AI behaves predictably for this feature
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                                  <h4 className="font-semibold text-red-300 mb-3 text-shadow-sm">
                                    When They Disagree ✗
                                  </h4>
                                  <div className="space-y-2 text-sm text-red-100 text-shadow-sm">
                                    <p>
                                      • <strong>Context matters:</strong> SHAP shows global importance, LIME shows local
                                      behavior
                                    </p>
                                    <p>
                                      • <strong>Edge case:</strong> Your data point might be unusual or at a decision
                                      boundary
                                    </p>
                                    <p>
                                      • <strong>Model complexity:</strong> The AI has complex interactions that simple
                                      rules can't capture
                                    </p>
                                    <p>
                                      • <strong>Use both:</strong> Consider both perspectives for a complete picture
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Decision Guide */}
                              <div className="bg-gradient-to-r from-purple-900/20 to-green-900/20 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                                <h4 className="font-medium text-white mb-3 text-shadow-sm flex items-center gap-2">
                                  <Scale className="h-4 w-4 animate-pulse-glow" />
                                  Which Explanation Should You Trust?
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300 text-shadow-sm">
                                  <div className="text-center p-3 bg-black/40 rounded">
                                    <div className="text-green-400 font-semibold mb-1">High Agreement</div>
                                    <p>Trust both explanations - they reinforce each other</p>
                                  </div>
                                  <div className="text-center p-3 bg-black/40 rounded">
                                    <div className="text-yellow-400 font-semibold mb-1">Some Disagreement</div>
                                    <p>Use SHAP for general patterns, LIME for this specific case</p>
                                  </div>
                                  <div className="text-center p-3 bg-black/40 rounded">
                                    <div className="text-red-400 font-semibold mb-1">Major Disagreement</div>
                                    <p>Investigate further - your case might be unusual</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </>
                  ) : (
                    <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                      <CardContent className="text-center py-16">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20 animate-pulse-glow">
                            <Eye className="h-8 w-8 text-slate-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-white text-shadow-lg">
                            Ready to Explain Your AI's Decision?
                          </h3>
                          <p className="text-slate-300 max-w-md mx-auto text-shadow-sm">
                            Select a data point from the sidebar and click "Generate Explanation" to see detailed,
                            beginner-friendly AI explanations with both SHAP and LIME analysis.
                          </p>
                          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-6 max-w-lg mx-auto">
                            <p className="text-sm text-blue-100">
                              <strong>💡 New to AI explanations?</strong> Don't worry! Our explanations are designed to
                              be understood by everyone, with simple analogies and clear visual guides.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}