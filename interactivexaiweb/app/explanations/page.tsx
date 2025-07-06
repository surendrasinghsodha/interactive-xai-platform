"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, BarChart3, Eye, ArrowRight, Download, Share2, Zap, Activity, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock data for SHAP values
const shapData = [
  { feature: "Sex_female", value: 0.45, color: "green", bgColor: "bg-green-500" },
  { feature: "Fare", value: 0.23, color: "green", bgColor: "bg-green-400" },
  { feature: "Age", value: -0.18, color: "red", bgColor: "bg-red-400" },
  { feature: "Pclass_3", value: -0.31, color: "red", bgColor: "bg-red-500" },
  { feature: "Embarked_S", value: -0.12, color: "red", bgColor: "bg-red-300" },
]

// Mock data for LIME values
const limeData = [
  { feature: "Sex = female", value: 0.42, confidence: 0.89 },
  { feature: "Fare > 30", value: 0.28, confidence: 0.76 },
  { feature: "Age <= 35", value: -0.15, confidence: 0.82 },
  { feature: "Pclass = 3", value: -0.33, confidence: 0.91 },
  { feature: "Embarked = S", value: -0.09, confidence: 0.65 },
]

export default function ExplanationsPage() {
  const [activeTab, setActiveTab] = useState("shap")
  const [reliabilityScore] = useState(87)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Minimalist Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft geometric shapes */}
        <div className="absolute top-24 left-16 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-48 right-24 w-32 h-32 bg-purple-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-48 right-16 w-28 h-28 bg-orange-200/20 rounded-full blur-lg"></div>

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
      <header className="border-b border-orange-200/50 bg-white/80 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
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
            <Link
              href="/explore"
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium"
            >
              Explore
            </Link>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 font-medium">
              Step 3: Explanations
            </Badge>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 opacity-75">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  ✓
                </div>
                <span className="text-green-600 font-medium">Upload Data</span>
              </div>
              <div className="flex items-center space-x-2 opacity-75">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  ✓
                </div>
                <span className="text-green-600 font-medium">Select Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  3
                </div>
                <span className="font-medium text-purple-600">Generate Explanations</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="text-gray-500">Review Results</span>
              </div>
            </div>
          </div>

          {/* Prediction Summary */}
          <Card
            className={`mb-8 bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-orange-500" />
                Prediction Summary
              </CardTitle>
              <CardDescription className="text-gray-600">
                Analysis for Passenger ID: 2 (Female, Age 38, First Class)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-all duration-300">
                  <div className="text-4xl font-bold text-green-600 mb-2">Survived</div>
                  <p className="text-sm text-green-700 font-medium">Model Prediction</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                    92%
                    <Zap className="ml-2 h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-blue-700 font-medium">Confidence Score</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-all duration-300">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{reliabilityScore}%</div>
                  <p className="text-sm text-purple-700 font-medium">Reliability Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Explanations */}
            <div
              className={`lg:col-span-3 transition-all duration-1000 delay-700 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-orange-500" />
                    AI Explanations
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Understanding how the model made its prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-orange-50 border border-orange-200">
                      <TabsTrigger
                        value="shap"
                        className="flex items-center data-[state=active]:bg-white data-[state=active]:text-orange-600 text-gray-600 font-medium transition-all duration-300"
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        SHAP Analysis
                      </TabsTrigger>
                      <TabsTrigger
                        value="lime"
                        className="flex items-center data-[state=active]:bg-white data-[state=active]:text-green-600 text-gray-600 font-medium transition-all duration-300"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        LIME Analysis
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="shap" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-600 flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          SHAP Feature Importance
                        </h3>
                        <div className="space-y-4">
                          {shapData.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-4 p-3 rounded-lg bg-orange-50 border border-orange-100 hover:border-orange-200 transition-all duration-500`}
                            >
                              <div className="w-32 text-sm font-medium text-right text-orange-700">{item.feature}</div>
                              <div className="flex-1 relative">
                                <div className="h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                  <div
                                    className={`h-full ${item.bgColor} transition-all duration-1000 ease-out relative overflow-hidden`}
                                    style={{
                                      width: `${Math.abs(item.value) * 100}%`,
                                      marginLeft: item.value < 0 ? `${50 + item.value * 100}%` : "50%",
                                    }}
                                  ></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-sm font-bold text-gray-800">
                                    {item.value > 0 ? "+" : ""}
                                    {item.value.toFixed(3)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center justify-center space-x-8 text-sm">
                          <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-50 border border-red-200">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-red-700 font-medium">Decreases Survival Probability</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 border border-green-200">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-green-700 font-medium">Increases Survival Probability</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Brain className="mr-2 h-4 w-4" />
                          SHAP Interpretation
                        </h4>
                        <p className="text-sm text-blue-600">
                          Being female (+0.45) and paying a higher fare (+0.23) are the strongest positive factors for
                          survival. Being in 3rd class (-0.31) and older age (-0.18) decrease the survival probability.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="lime" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center">
                          <Eye className="mr-2 h-5 w-5" />
                          LIME Local Explanation
                        </h3>
                        <div className="space-y-4">
                          {limeData.map((item, index) => (
                            <div
                              key={index}
                              className={`border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-all duration-500`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-medium text-green-700">{item.feature}</span>
                                <Badge
                                  variant={item.value > 0 ? "default" : "destructive"}
                                  className={
                                    item.value > 0
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : "bg-red-100 text-red-700 border-red-200"
                                  }
                                >
                                  {item.value > 0 ? "+" : ""}
                                  {item.value.toFixed(3)}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600">Confidence:</span>
                                <Progress
                                  value={item.confidence * 100}
                                  className="flex-1 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500"
                                />
                                <span className="text-sm font-medium text-green-600">
                                  {(item.confidence * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-700 mb-2 flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          LIME Interpretation
                        </h4>
                        <p className="text-sm text-green-600">
                          LIME confirms that being female is the most important factor (0.42) for this prediction,
                          followed by the higher fare. The model is highly confident in these feature contributions.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-900 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-purple-500" />
                    Reliability Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-600">Explanation stability and confidence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700">Overall Reliability</span>
                      <span className="text-sm font-medium text-purple-600">{reliabilityScore}%</span>
                    </div>
                    <Progress
                      value={reliabilityScore}
                      className="bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500"
                    />
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "SHAP Stability", value: "91%" },
                      { label: "LIME Consistency", value: "83%" },
                      { label: "Feature Agreement", value: "89%" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm p-2 rounded bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-all duration-300"
                      >
                        <span className="text-gray-700">{item.label}:</span>
                        <span className="font-medium text-purple-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Export & Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Model Comparison</CardTitle>
                  <CardDescription className="text-gray-600">Compare explanations across models</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                  >
                    Compare Models
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Brain className="mx-auto h-12 w-12 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-700">Analysis Complete!</h3>
                      <p className="text-sm text-blue-600">Review the explanations and provide feedback</p>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/feedback" className="flex items-center">
                        Provide Feedback
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
