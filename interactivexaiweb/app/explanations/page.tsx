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
  CheckCircle,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  PieChart,
  Activity,
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
  Pie as RechartsPie, // Updated import
  Line,
  ReferenceLine,
  Cell, // Added import for Cell
} from "recharts"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"

// Enhanced explanation components
function ExplanationCard({
  title,
  description,
  children,
  icon: Icon,
  reliability,
}: {
  title: string
  description: string
  children: React.ReactNode
  icon: any
  reliability?: number
}) {
  const getReliabilityColor = (score: number) => {
    if (score >= 0.7) return "text-green-500"
    if (score >= 0.4) return "text-yellow-500"
    return "text-red-500"
  }

  const getReliabilityText = (score: number) => {
    if (score >= 0.7) return "High Confidence"
    if (score >= 0.4) return "Medium Confidence"
    return "Low Confidence"
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-xl">{title}</CardTitle>
              <CardDescription className="text-slate-400">{description}</CardDescription>
            </div>
          </div>
          {reliability && (
            <Badge variant="outline" className={`${getReliabilityColor(reliability)} border-current`}>
              {getReliabilityText(reliability)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function FeatureExplanation({
  feature,
  value,
  impact,
  description,
}: {
  feature: string
  value: number
  impact: "positive" | "negative" | "neutral"
  description: string
}) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <ArrowUp className="h-4 w-4" />
      case "negative":
        return <ArrowDown className="h-4 w-4" />
      default:
        return <ArrowUp className="h-4 w-4 opacity-50" />
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
      <div className={`${getImpactColor(impact)} mt-1`}>{getImpactIcon(impact)}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-white">{feature}</h4>
          <span className={`font-mono text-sm ${getImpactColor(impact)}`}>
            {value > 0 ? "+" : ""}
            {value.toFixed(4)}
          </span>
        </div>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>
  )
}

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
  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Target className="h-5 w-5" />
          Model Prediction Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{prediction}</div>
            <div className="text-sm text-slate-400">Predicted Outcome</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">{(confidence * 100).toFixed(1)}%</div>
            <div className="text-sm text-slate-400">Confidence Level</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Base Prediction:</span>
            <span className="text-white font-mono">{baseValue.toFixed(4)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Feature Contributions:</span>
            <span className="text-white font-mono">
              {totalContribution > 0 ? "+" : ""}
              {totalContribution.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium border-t border-slate-600 pt-2">
            <span className="text-slate-300">Final Prediction:</span>
            <span className="text-white font-mono">{(baseValue + totalContribution).toFixed(4)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExplanationsPage() {
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

  const handleFeedbackSubmit = async () => {
    if (!trainResponse || rating === 0) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please provide a rating." })
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
      toast({
        title: "Feedback Submitted",
        description: "Thank you! Your feedback will improve future explanations.",
      })

      setRating(0)
      setComment("")
      setExplanationType("both")
    } catch (error: any) {
      toast({ variant: "destructive", title: "Feedback Failed", description: error.message })
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  // Enhanced data formatting functions
  const formatShapData = () => {
    if (!explanation?.shap) return []
    return explanation.shap.features
      .map((feature, i) => ({
        name: feature,
        value: explanation.shap.shap_values[i],
        impact:
          explanation.shap.shap_values[i] > 0
            ? "positive"
            : explanation.shap.shap_values[i] < 0
              ? "negative"
              : "neutral",
        absValue: Math.abs(explanation.shap.shap_values[i]),
      }))
      .sort((a, b) => b.absValue - a.absValue)
      .slice(0, 15)
  }

  const formatLimeData = () => {
    if (!explanation?.lime) return []
    return Object.entries(explanation.lime.lime_explanation)
      .map(([feature, value]) => ({
        name: feature,
        value: value as number,
        impact: (value as number) > 0 ? "positive" : (value as number) < 0 ? "negative" : "neutral",
        absValue: Math.abs(value as number),
      }))
      .sort((a, b) => b.absValue - a.absValue)
      .slice(0, 15)
  }

  const getFeatureDescription = (featureName: string, value: number, method: "shap" | "lime") => {
    const impact = value > 0 ? "increases" : "decreases"
    const strength = Math.abs(value) > 0.01 ? "strongly" : Math.abs(value) > 0.005 ? "moderately" : "slightly"

    if (method === "shap") {
      return `This feature ${strength} ${impact} the prediction by ${Math.abs(value).toFixed(4)} units compared to the average case. ${value > 0 ? "This pushes the prediction higher." : "This pulls the prediction lower."}`
    } else {
      return `In the local neighborhood of this prediction, this feature ${strength} ${impact} the likelihood of the predicted outcome. The model relies on this feature with a weight of ${value.toFixed(4)}.`
    }
  }

  const createWaterfallData = () => {
    if (!explanation?.shap) return []

    const data = []
    let cumulative = explanation.shap.base_value

    data.push({
      name: "Base Value",
      value: explanation.shap.base_value,
      cumulative: cumulative,
      type: "base",
    })

    const sortedFeatures = formatShapData()

    sortedFeatures.forEach((feature, index) => {
      cumulative += feature.value
      data.push({
        name: feature.name,
        value: feature.value,
        cumulative: cumulative,
        type: feature.impact,
        contribution: feature.value,
      })
    })

    return data
  }

  const createFeatureImportancePie = () => {
    const shapData = formatShapData()
    const total = shapData.reduce((sum, item) => sum + item.absValue, 0)

    return shapData.slice(0, 8).map((item, index) => ({
      name: item.name,
      value: (item.absValue / total) * 100,
      impact: item.impact,
      originalValue: item.value,
    }))
  }

  const COLORS = {
    positive: "#10B981",
    negative: "#EF4444",
    neutral: "#6B7280",
    base: "#3B82F6",
  }

  if (!trainResponse) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5" />
                    Select Data Point
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Choose a row from your dataset to explain.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label className="text-white">Select a Row</Label>
                  <Select onValueChange={(val) => setSelectedRow(JSON.parse(val))}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select a data row" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {trainResponse.sample_data.map((row, i) => (
                        <SelectItem key={i} value={JSON.stringify(row)}>
                          Row {i + 1}: {Object.values(row).slice(0, 2).join(", ")}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedRow && (
                    <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Selected Data:</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(selectedRow)
                          .slice(0, 5)
                          .map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-slate-400">{key}:</span>
                              <span className="text-white font-mono">{String(value)}</span>
                            </div>
                          ))}
                        {Object.keys(selectedRow).length > 5 && (
                          <div className="text-slate-500 text-xs">
                            +{Object.keys(selectedRow).length - 5} more fields...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleExplain}
                    disabled={isLoading || !selectedRow}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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

              {/* Feedback Section */}
              {showFeedback && explanation && (
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Star className="mr-2 h-5 w-5" />
                      Rate This Explanation
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Your feedback helps improve explanation quality.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white">Overall Rating</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer transition-colors ${
                              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600 hover:text-slate-400"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Explanation Type</Label>
                      <Select value={explanationType} onValueChange={setExplanationType}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="both">Both SHAP & LIME</SelectItem>
                          <SelectItem value="shap">SHAP Only</SelectItem>
                          <SelectItem value="lime">LIME Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Comments (Optional)</Label>
                      <Textarea
                        placeholder="What did you think about the explanation? Any suggestions for improvement?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Button
                      onClick={handleFeedbackSubmit}
                      disabled={isSubmittingFeedback || rating === 0}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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

              {/* Feedback Response */}
              {feedbackResponse && (
                <Card className="border-green-500/30 bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-400">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Feedback Processed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-green-300">{feedbackResponse.message}</p>
                    {feedbackResponse.updated_reliability && (
                      <p className="text-sm text-white">
                        <strong>Updated Reliability:</strong> {(feedbackResponse.updated_reliability * 100).toFixed(1)}%
                      </p>
                    )}
                    {feedbackResponse.improvement_suggestions && (
                      <div>
                        <strong className="text-sm text-white">Improvements:</strong>
                        <ul className="text-sm mt-1 space-y-1">
                          {feedbackResponse.improvement_suggestions.map((suggestion, i) => (
                            <li key={i} className="text-green-300">
                              • {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                    <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                      <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                        <Eye className="h-4 w-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="shap" className="data-[state=active]:bg-purple-600">
                        <BarChart2 className="h-4 w-4 mr-2" />
                        SHAP Analysis
                      </TabsTrigger>
                      <TabsTrigger value="lime" className="data-[state=active]:bg-green-600">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        LIME Analysis
                      </TabsTrigger>
                      <TabsTrigger value="compare" className="data-[state=active]:bg-orange-600">
                        <Activity className="h-4 w-4 mr-2" />
                        Compare
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Key Insights */}
                        <Card className="bg-slate-800/50 border-slate-700/50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <Info className="h-5 w-5" />
                              Key Insights
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              {formatShapData()
                                .slice(0, 3)
                                .map((feature, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        feature.impact === "positive"
                                          ? "bg-green-500"
                                          : feature.impact === "negative"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                      }`}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium text-white">{feature.name}</div>
                                      <div className="text-sm text-slate-400">
                                        {feature.impact === "positive" ? "Increases" : "Decreases"} prediction
                                        confidence
                                      </div>
                                    </div>
                                    <div
                                      className={`font-mono text-sm ${
                                        feature.impact === "positive"
                                          ? "text-green-400"
                                          : feature.impact === "negative"
                                            ? "text-red-400"
                                            : "text-gray-400"
                                      }`}
                                    >
                                      {feature.value > 0 ? "+" : ""}
                                      {feature.value.toFixed(3)}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Feature Importance Pie Chart */}
                        <Card className="bg-slate-800/50 border-slate-700/50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <PieChart className="h-5 w-5" />
                              Feature Importance Distribution
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                              <RechartsPie
                                data={createFeatureImportancePie()}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                              >
                                {createFeatureImportancePie().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[entry.impact]} />
                                ))}
                              </RechartsPie>
                              <Tooltip
                                formatter={(value: any) => [`${value.toFixed(1)}%`, "Importance"]}
                                labelStyle={{ color: "#fff" }}
                                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                              />
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>

                      {/* How the Prediction Was Made */}
                      <Card className="bg-slate-800/50 border-slate-700/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <HelpCircle className="h-5 w-5" />
                            How This Prediction Was Made
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="prose prose-invert max-w-none">
                            <p className="text-slate-300 leading-relaxed">
                              The AI model analyzed your data and made this prediction by examining multiple features.
                              Here's a step-by-step breakdown of the decision process:
                            </p>

                            <div className="space-y-4 mt-6">
                              <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  1
                                </div>
                                <div>
                                  <h4 className="font-medium text-white mb-2">Starting Point (Base Value)</h4>
                                  <p className="text-slate-300 text-sm">
                                    The model starts with a base prediction of{" "}
                                    <code className="bg-slate-600 px-1 rounded">
                                      {explanation.shap.base_value.toFixed(4)}
                                    </code>
                                    . This represents the average prediction across all training data.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  2
                                </div>
                                <div>
                                  <h4 className="font-medium text-white mb-2">Feature Analysis</h4>
                                  <p className="text-slate-300 text-sm">
                                    The model then examines each feature in your data. The most influential feature is{" "}
                                    <strong className="text-white">{formatShapData()[0]?.name}</strong>, which{" "}
                                    {formatShapData()[0]?.impact === "positive" ? "increases" : "decreases"} the
                                    prediction.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  3
                                </div>
                                <div>
                                  <h4 className="font-medium text-white mb-2">Final Decision</h4>
                                  <p className="text-slate-300 text-sm">
                                    After considering all features, the model arrives at the final prediction of{" "}
                                    <code className="bg-slate-600 px-1 rounded">
                                      {(
                                        explanation.shap.base_value +
                                        explanation.shap.shap_values.reduce((sum, val) => sum + val, 0)
                                      ).toFixed(4)}
                                    </code>
                                    .
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* SHAP Analysis Tab */}
                    <TabsContent value="shap" className="space-y-6">
                      <ExplanationCard
                        title="SHAP (SHapley Additive exPlanations)"
                        description="Shows how each feature contributes to moving the prediction away from the base value"
                        icon={BarChart2}
                        reliability={explanation.shap.reliability_score}
                      >
                        <div className="space-y-6">
                          {/* Waterfall Chart */}
                          <div>
                            <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              Prediction Waterfall - How We Got to the Final Answer
                            </h4>
                            <ResponsiveContainer width="100%" height={400}>
                              <ComposedChart
                                data={createWaterfallData()}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                  dataKey="name"
                                  angle={-45}
                                  textAnchor="end"
                                  height={100}
                                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                />
                                <YAxis tick={{ fill: "#9CA3AF" }} />
                                <Tooltip
                                  formatter={(value: any, name: any) => [
                                    typeof value === "number" ? value.toFixed(4) : value,
                                    name === "cumulative" ? "Cumulative Value" : "Contribution",
                                  ]}
                                  labelStyle={{ color: "#fff" }}
                                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                                />
                                <Legend />
                                <Bar
                                  dataKey="value"
                                  fill={(entry: any) => COLORS[entry.type] || COLORS.neutral}
                                  name="Feature Contribution"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="cumulative"
                                  stroke="#60A5FA"
                                  strokeWidth={2}
                                  name="Cumulative Prediction"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Feature Explanations */}
                          <div>
                            <h4 className="font-medium text-white mb-4">Detailed Feature Analysis</h4>
                            <div className="space-y-3">
                              {formatShapData()
                                .slice(0, 8)
                                .map((feature, index) => (
                                  <FeatureExplanation
                                    key={index}
                                    feature={feature.name}
                                    value={feature.value}
                                    impact={feature.impact}
                                    description={getFeatureDescription(feature.name, feature.value, "shap")}
                                  />
                                ))}
                            </div>
                          </div>

                          {/* SHAP Bar Chart */}
                          <div>
                            <h4 className="font-medium text-white mb-4">Feature Importance Ranking</h4>
                            <ResponsiveContainer width="100%" height={400}>
                              <BarChart
                                layout="vertical"
                                data={formatShapData()}
                                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" tick={{ fill: "#9CA3AF" }} />
                                <YAxis
                                  dataKey="name"
                                  type="category"
                                  width={100}
                                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                />
                                <Tooltip
                                  formatter={(value: any) => [value.toFixed(4), "SHAP Value"]}
                                  labelStyle={{ color: "#fff" }}
                                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                                />
                                <ReferenceLine x={0} stroke="#6B7280" strokeDasharray="2 2" />
                                <Bar
                                  dataKey="value"
                                  fill={(entry: any) => (entry.value > 0 ? COLORS.positive : COLORS.negative)}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </ExplanationCard>
                    </TabsContent>

                    {/* LIME Analysis Tab */}
                    <TabsContent value="lime" className="space-y-6">
                      <ExplanationCard
                        title="LIME (Local Interpretable Model-agnostic Explanations)"
                        description="Shows how a simple model approximates the complex model's behavior for this specific prediction"
                        icon={Lightbulb}
                        reliability={explanation.lime.reliability_score}
                      >
                        <div className="space-y-6">
                          {/* LIME Explanation */}
                          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              What LIME Tells Us
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              LIME creates a simple, interpretable model that mimics your complex AI model's behavior
                              specifically around this prediction. Think of it as asking: "If I had to explain this
                              decision using only simple rules, what would those rules be?"
                            </p>
                          </div>

                          {/* Feature Explanations */}
                          <div>
                            <h4 className="font-medium text-white mb-4">Local Feature Importance</h4>
                            <div className="space-y-3">
                              {formatLimeData()
                                .slice(0, 8)
                                .map((feature, index) => (
                                  <FeatureExplanation
                                    key={index}
                                    feature={feature.name}
                                    value={feature.value}
                                    impact={feature.impact}
                                    description={getFeatureDescription(feature.name, feature.value, "lime")}
                                  />
                                ))}
                            </div>
                          </div>

                          {/* LIME Bar Chart */}
                          <div>
                            <h4 className="font-medium text-white mb-4">LIME Feature Weights</h4>
                            <ResponsiveContainer width="100%" height={400}>
                              <BarChart
                                layout="vertical"
                                data={formatLimeData()}
                                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" tick={{ fill: "#9CA3AF" }} />
                                <YAxis
                                  dataKey="name"
                                  type="category"
                                  width={100}
                                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                />
                                <Tooltip
                                  formatter={(value: any) => [value.toFixed(4), "LIME Weight"]}
                                  labelStyle={{ color: "#fff" }}
                                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                                />
                                <ReferenceLine x={0} stroke="#6B7280" strokeDasharray="2 2" />
                                <Bar
                                  dataKey="value"
                                  fill={(entry: any) => (entry.value > 0 ? COLORS.positive : COLORS.negative)}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Local vs Global */}
                          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Important Note
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              LIME explanations are <strong>local</strong> - they explain this specific prediction, not
                              how the model behaves in general. Different data points might have different explanations
                              even from the same model.
                            </p>
                          </div>
                        </div>
                      </ExplanationCard>
                    </TabsContent>

                    {/* Compare Tab */}
                    <TabsContent value="compare" className="space-y-6">
                      <Card className="bg-slate-800/50 border-slate-700/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <Activity className="h-5 w-5" />
                            SHAP vs LIME Comparison
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            Understanding the differences between explanation methods
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Side by side comparison */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-medium text-white flex items-center gap-2">
                                <BarChart2 className="h-4 w-4 text-purple-400" />
                                SHAP Approach
                              </h4>
                              <div className="space-y-2 text-sm text-slate-300">
                                <p>
                                  • <strong>Global perspective:</strong> Based on game theory
                                </p>
                                <p>
                                  • <strong>Consistent:</strong> Same feature always gets same importance
                                </p>
                                <p>
                                  • <strong>Additive:</strong> All contributions sum to final prediction
                                </p>
                                <p>
                                  • <strong>Fair:</strong> Distributes credit fairly among features
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium text-white flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-green-400" />
                                LIME Approach
                              </h4>
                              <div className="space-y-2 text-sm text-slate-300">
                                <p>
                                  • <strong>Local perspective:</strong> Focuses on this specific prediction
                                </p>
                                <p>
                                  • <strong>Intuitive:</strong> Creates simple rules that are easy to understand
                                </p>
                                <p>
                                  • <strong>Flexible:</strong> Works with any type of model
                                </p>
                                <p>
                                  • <strong>Contextual:</strong> Explanations change based on the data point
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Feature Agreement Analysis */}
                          <div>
                            <h4 className="font-medium text-white mb-4">Feature Agreement Analysis</h4>
                            <div className="space-y-3">
                              {formatShapData()
                                .slice(0, 5)
                                .map((shapFeature, index) => {
                                  const limeFeature = formatLimeData().find((f) => f.name === shapFeature.name)
                                  const agreement = limeFeature
                                    ? shapFeature.impact === limeFeature.impact
                                      ? "agree"
                                      : "disagree"
                                    : "missing"

                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-3 h-3 rounded-full ${
                                            agreement === "agree"
                                              ? "bg-green-500"
                                              : agreement === "disagree"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                          }`}
                                        />
                                        <span className="text-white font-medium">{shapFeature.name}</span>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="text-purple-400">
                                          SHAP: {shapFeature.value > 0 ? "+" : ""}
                                          {shapFeature.value.toFixed(3)}
                                        </div>
                                        <div className="text-green-400">
                                          LIME:{" "}
                                          {limeFeature
                                            ? `${limeFeature.value > 0 ? "+" : ""}${limeFeature.value.toFixed(3)}`
                                            : "N/A"}
                                        </div>
                                        <Badge
                                          variant={agreement === "agree" ? "default" : "destructive"}
                                          className="text-xs"
                                        >
                                          {agreement === "agree"
                                            ? "Agree"
                                            : agreement === "disagree"
                                              ? "Disagree"
                                              : "Missing"}
                                        </Badge>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>

                          {/* When to Trust Which */}
                          <div className="bg-slate-700/30 rounded-lg p-4">
                            <h4 className="font-medium text-white mb-3">Which Explanation Should You Trust?</h4>
                            <div className="space-y-2 text-sm text-slate-300">
                              <p>
                                • <strong>When they agree:</strong> High confidence - both methods point to the same
                                important features
                              </p>
                              <p>
                                • <strong>When they disagree:</strong> Consider the context - SHAP for overall model
                                behavior, LIME for this specific case
                              </p>
                              <p>
                                • <strong>For decision making:</strong> Use both perspectives to get a complete picture
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="text-center py-16">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                        <Eye className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">No Explanation Generated Yet</h3>
                      <p className="text-slate-400 max-w-md mx-auto">
                        Select a data point from the sidebar and click "Generate Explanation" to see detailed AI
                        explanations with SHAP and LIME analysis.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
