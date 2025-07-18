"use client"

import { useState, useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, Star } from "lucide-react"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import SpaceBackground from "@/components/space-background"

export default function FeedbackPage() {
  const { trainResponse } = useContext(AppContext)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [reliability, setReliability] = useState([50])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const breadcrumbs = [
    { label: "Platform", href: "/upload" },
    { label: "Feedback", href: "/feedback", current: true },
  ]

  const handleSubmit = async () => {
    if (!trainResponse) {
      toast({ variant: "destructive", title: "No model selected", description: "Please train a model first." })
      return
    }
    if (rating === 0) {
      toast({ variant: "destructive", title: "No rating selected", description: "Please provide a rating." })
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: trainResponse.model_id, rating, comment }),
      })
      if (!res.ok) throw new Error("Failed to submit feedback")
      toast({ title: "Success", description: "Thank you for your feedback!" })
      setRating(0)
      setComment("")
    } catch (error: any) {
      toast({ variant: "destructive", title: "Submission Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-20">
          <PageHeader
            title="Provide Feedback"
            description="Help us improve the platform by sharing your experience."
            breadcrumbs={breadcrumbs}
            backButtonHref="/explanations"
            backButtonText="Back to Explanations"
          />

          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="space-y-8">
              <PageNavigation
                currentStep="/feedback"
                previousStep={{
                  href: "/explanations",
                  label: "Explanations",
                  icon: Star,
                  description: "View model explanations",
                }}
                showWorkflow={false}
              />

              <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white text-shadow-lg flex items-center gap-2">
                    <Star className="h-6 w-6 animate-pulse-glow" />
                    Feedback Form
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-shadow-md">
                    Your feedback on the explanation quality is valuable for improving our reliability scores.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-white text-shadow-sm">
                      How would you rate the quality of the explanations?
                    </Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 cursor-pointer transition-all duration-300 transform hover:scale-125 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400 animate-pulse-glow drop-shadow-stellar"
                              : "text-slate-600 hover:text-slate-400"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="comment" className="text-white text-shadow-sm">
                      Additional Comments
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Tell us more about your experience, what was helpful, or what could be improved."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-black/60 border-white/30 text-white placeholder:text-slate-400 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 text-shadow-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white text-shadow-sm">
                      How reliable did you find the explanation? (0% - 100%)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={reliability}
                        onValueChange={setReliability}
                        max={100}
                        step={1}
                        className="w-[90%] [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:animate-pulse-glow"
                      />
                      <span className="font-semibold w-[10%] text-center text-white text-shadow-sm bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                        {reliability[0]}%
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-shadow-sm"
                  >
                    {isLoading ? (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
