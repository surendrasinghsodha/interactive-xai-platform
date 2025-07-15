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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Feedback Form</CardTitle>
              <CardDescription className="text-slate-400">
                Your feedback on the explanation quality is valuable for improving our reliability scores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-white">How would you rate the quality of the explanations?</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600 hover:text-slate-400"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="comment" className="text-white">
                  Additional Comments
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us more about your experience, what was helpful, or what could be improved."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-white">How reliable did you find the explanation? (0% - 100%)</Label>
                <div className="flex items-center gap-4">
                  <Slider value={reliability} onValueChange={setReliability} max={100} step={1} className="w-[90%]" />
                  <span className="font-semibold w-[10%] text-center text-white">{reliability[0]}%</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
