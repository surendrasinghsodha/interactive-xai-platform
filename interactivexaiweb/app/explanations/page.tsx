"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BarChart2, Lightbulb, Star, Send, TrendingUp, BrainCircuit } from "lucide-react"
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
} from "recharts"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"

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

      // Reset feedback form
      setRating(0)
      setComment("")
      setExplanationType("both")
    } catch (error: any) {
      toast({ variant: "destructive", title: "Feedback Failed", description: error.message })
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  const formatShapData = () => {
    if (!explanation?.shap) return []
    return explanation.shap.features
      .map((feature, i) => ({ name: feature, "SHAP Value": explanation.shap.shap_values[i] }))
      .sort((a, b) => Math.abs(b["SHAP Value"]) - Math.abs(a["SHAP Value"]))
      .slice(0, 15)
  }

  const formatLimeData = () => {
    if (!explanation?.lime) return []
    return Object.entries(explanation.lime.lime_explanation)
      .map(([feature, value]) => ({ name: feature, "LIME Weight": value }))
      .sort((a, b) => Math.abs(b["LIME Weight"]) - Math.abs(a["LIME Weight"]))
      .slice(0, 15)
  }

  const getReliabilityColor = (score: number) => {
    if (score >= 0.7) return "text-green-500"
    if (score >= 0.4) return "text-yellow-500"
    return "text-red-500"
  }

  const getReliabilityText = (score: number) => {
    if (score >= 0.7) return "High"
    if (score >= 0.4) return "Medium"
    return "Low"
  }

  if (!trainResponse) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <PageHeader
        title="Step 3: Get Explanations"
        description="Interpret your model's predictions with SHAP and LIME."
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

          {/* Rest of the existing content remains the same */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Data Point</CardTitle>
                  <CardDescription>Choose a row from your dataset to explain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Select a Row</Label>
                  <Select onValueChange={(val) => setSelectedRow(JSON.parse(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a data row" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainResponse.sample_data.map((row, i) => (
                        <SelectItem key={i} value={JSON.stringify(row)}>
                          Row {i + 1}: {Object.values(row).slice(0, 3).join(", ")}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleExplain} disabled={isLoading || !selectedRow} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Explanation"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Feedback Section */}
              {showFeedback && explanation && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="mr-2 h-5 w-5" />
                      Rate This Explanation
                    </CardTitle>
                    <CardDescription>Your feedback helps improve explanation quality.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Overall Rating</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer transition-colors ${
                              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Explanation Type</Label>
                      <Select value={explanationType} onValueChange={setExplanationType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="both">Both SHAP & LIME</SelectItem>
                          <SelectItem value="shap">SHAP Only</SelectItem>
                          <SelectItem value="lime">LIME Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Comments (Optional)</Label>
                      <Textarea
                        placeholder="What did you think about the explanation? Any suggestions for improvement?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      onClick={handleFeedbackSubmit}
                      disabled={isSubmittingFeedback || rating === 0}
                      className="w-full"
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
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Feedback Processed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-green-600">{feedbackResponse.message}</p>
                    {feedbackResponse.updated_reliability && (
                      <p className="text-sm">
                        <strong>Updated Reliability:</strong> {(feedbackResponse.updated_reliability * 100).toFixed(1)}%
                      </p>
                    )}
                    {feedbackResponse.improvement_suggestions && (
                      <div>
                        <strong className="text-sm">Improvements:</strong>
                        <ul className="text-sm mt-1 space-y-1">
                          {feedbackResponse.improvement_suggestions.map((suggestion, i) => (
                            <li key={i} className="text-green-600">
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

            <div className="lg:col-span-2 space-y-8">
              {/* Reliability Overview */}
              {explanation?.overall_reliability && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2" />
                      Explanation Reliability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span>Overall Reliability Score:</span>
                      <span className={`font-bold ${getReliabilityColor(explanation.overall_reliability)}`}>
                        {getReliabilityText(explanation.overall_reliability)} (
                        {(explanation.overall_reliability * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2" />
                    SHAP Explanation
                    {explanation?.shap?.reliability_score && (
                      <span className={`ml-2 text-sm ${getReliabilityColor(explanation.shap.reliability_score)}`}>
                        ({getReliabilityText(explanation.shap.reliability_score)})
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>Shows the contribution of each feature to the prediction.</CardDescription>
                </CardHeader>
                <CardContent>
                  {explanation?.shap ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart
                        layout="vertical"
                        data={formatShapData()}
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="SHAP Value" fill="#8884d8" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center py-16 text-muted-foreground">Explanation will appear here.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2" />
                    LIME Explanation
                    {explanation?.lime?.reliability_score && (
                      <span className={`ml-2 text-sm ${getReliabilityColor(explanation.lime.reliability_score)}`}>
                        ({getReliabilityText(explanation.lime.reliability_score)})
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>Approximates the model locally with a simpler one.</CardDescription>
                </CardHeader>
                <CardContent>
                  {explanation?.lime ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        layout="vertical"
                        data={formatLimeData()}
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="LIME Weight" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center py-16 text-muted-foreground">Explanation will appear here.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
