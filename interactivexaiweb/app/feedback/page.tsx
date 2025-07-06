"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Brain, Star, MessageSquare, ThumbsUp, Send, Sparkles, Zap, Heart } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const [overallRating, setOverallRating] = useState([4])
  const [clarityRating, setClarityRating] = useState([4])
  const [usefulnessRating, setUsefulnessRating] = useState([4])
  const [trustRating, setTrustRating] = useState([4])
  const [preferredMethod, setPreferredMethod] = useState("")
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Subtle Minimalist Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-green-200 shadow-xl relative z-10">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <ThumbsUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Thank You!
            </h2>
            <p className="text-gray-600">
              Your feedback has been submitted successfully. It will help us improve the platform.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white border-0 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
            >
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Minimalist Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft geometric shapes */}
        <div className="absolute top-28 right-20 w-38 h-38 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-52 left-24 w-30 h-30 bg-pink-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-36 right-1/3 w-42 h-42 bg-orange-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-34 h-34 bg-blue-200/20 rounded-full blur-lg"></div>

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
              href="/explanations"
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium"
            >
              Explanations
            </Link>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
              Step 4: Feedback
            </Badge>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
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
              <div className="flex items-center space-x-2 opacity-75">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  ✓
                </div>
                <span className="text-green-600 font-medium">Generate Explanations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  4
                </div>
                <span className="font-medium text-blue-600">Review Results</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feedback Form */}
            <div
              className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />
                    Feedback & Evaluation
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Help us improve the platform by sharing your experience with the AI explanations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Rating */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-800 flex items-center">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      Overall Experience
                    </Label>
                    <div className="space-y-2">
                      <Slider
                        value={overallRating}
                        onValueChange={setOverallRating}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full [&>span]:bg-gradient-to-r [&>span]:from-purple-500 [&>span]:to-pink-500"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Poor</span>
                        <span className="text-purple-600 font-medium">Excellent ({overallRating[0]}/5)</span>
                      </div>
                    </div>
                  </div>

                  {/* Specific Ratings */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Clarity", value: clarityRating, setValue: setClarityRating, color: "orange" },
                      { label: "Usefulness", value: usefulnessRating, setValue: setUsefulnessRating, color: "green" },
                      { label: "Trustworthiness", value: trustRating, setValue: setTrustRating, color: "blue" },
                    ].map((rating, index) => (
                      <div
                        key={index}
                        className={`space-y-2 p-3 rounded-lg bg-${rating.color}-50 border border-${rating.color}-200 hover:bg-${rating.color}-100 transition-all duration-300`}
                      >
                        <Label className={`text-sm font-medium text-${rating.color}-700`}>{rating.label}</Label>
                        <Slider
                          value={rating.value}
                          onValueChange={rating.setValue}
                          max={5}
                          min={1}
                          step={1}
                          className={`[&>span]:bg-gradient-to-r [&>span]:from-${rating.color}-500 [&>span]:to-${rating.color}-400`}
                        />
                        <div className={`text-center text-sm text-${rating.color}-600 font-medium`}>
                          {rating.value[0]}/5
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preferred Method */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-800 flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                      Which explanation method did you find more helpful?
                    </Label>
                    <RadioGroup value={preferredMethod} onValueChange={setPreferredMethod} className="space-y-3">
                      {[
                        { value: "shap", label: "SHAP - Feature importance with positive/negative contributions" },
                        { value: "lime", label: "LIME - Local interpretable explanations with confidence scores" },
                        { value: "both", label: "Both methods were equally helpful" },
                        { value: "neither", label: "Neither method was particularly helpful" },
                      ].map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="border-purple-300 text-purple-500"
                          />
                          <Label
                            htmlFor={option.value}
                            className="text-gray-700 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Text Feedback */}
                  <div className="space-y-3">
                    <Label htmlFor="feedback" className="text-base font-medium text-gray-800 flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-orange-500" />
                      Additional Comments (Optional)
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Please share any specific feedback, suggestions for improvement, or issues you encountered..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="bg-white border-orange-200 text-gray-800 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-700 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Your Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Dataset", value: "Titanic" },
                    { label: "Model", value: "Random Forest" },
                    { label: "Prediction", value: "Survived", badge: true },
                    { label: "Confidence", value: "92%" },
                    { label: "Reliability", value: "87%" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-all duration-300"
                    >
                      <span className="text-sm text-gray-700">{item.label}:</span>
                      {item.badge ? (
                        <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                          {item.value}
                        </Badge>
                      ) : (
                        <span className="text-sm font-medium text-orange-600">{item.value}</span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Why Your Feedback Matters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Star,
                      title: "Improve Explanations",
                      desc: "Help us make AI more interpretable",
                      color: "yellow",
                    },
                    {
                      icon: ThumbsUp,
                      title: "Enhance User Experience",
                      desc: "Shape the platform's future development",
                      color: "green",
                    },
                    {
                      icon: Brain,
                      title: "Advance XAI Research",
                      desc: "Contribute to explainable AI progress",
                      color: "blue",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-lg bg-${item.color}-50 border border-${item.color}-200 hover:bg-${item.color}-100 transition-all duration-300`}
                    >
                      <item.icon className={`h-5 w-5 text-${item.color}-500 mt-0.5`} />
                      <div>
                        <p className={`text-sm font-medium text-${item.color}-700`}>{item.title}</p>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="relative">
                      <MessageSquare className="mx-auto h-10 w-10 text-blue-500" />
                    </div>
                    <h3 className="font-medium text-blue-700">Thank You!</h3>
                    <p className="text-sm text-blue-600">
                      Your feedback helps make AI more transparent and trustworthy for everyone.
                    </p>
                    <Heart className="mx-auto h-4 w-4 text-red-500" />
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
