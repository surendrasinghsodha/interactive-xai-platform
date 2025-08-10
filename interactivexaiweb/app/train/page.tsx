"use client"

import { useState, useEffect, useRef } from "react"
import { useApp } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BrainCircuit, CheckCircle, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import SpaceBackground from "@/components/space-background"

export default function TrainPage() {
  const { file, uploadResponse, isTraining, setIsTraining, setTrainResponse, trainingProgress, setTrainingProgress } =
    useApp()
  const [selectedModel, setSelectedModel] = useState("")
  const [targetColumn, setTargetColumn] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const abortControllerRef = useRef<AbortController | null>(null)

  const breadcrumbs = [
    { label: "Upload Data", href: "/upload" },
    { label: "Train Model", href: "/train", current: true },
  ]

  useEffect(() => {
    if (!uploadResponse) {
      toast({ variant: "destructive", title: "No data found", description: "Please upload a dataset first." })
      router.push("/upload")
    }
  }, [uploadResponse, router, toast])

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const handleCancelTraining = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsTraining(false)
      setTrainingProgress(0)
      toast({ title: "Training Cancelled", description: "The training process has been stopped." })
    }
  }

  const handleTrain = async () => {
    if (!file || !selectedModel || !targetColumn) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a model and a target column.",
      })
      return
    }

    setIsTraining(true)
    setTrainingProgress(0)
    const progressInterval = setInterval(() => setTrainingProgress((p) => Math.min(p + 5, 95)), 300)

    const controller = new AbortController()
    abortControllerRef.current = controller

    const formData = new FormData()
    formData.append("file", file)
    formData.append("model_type", selectedModel)
    formData.append("target_column", targetColumn)

    try {
      const res = await fetch("http://127.0.0.1:8000/train", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearInterval(progressInterval)

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || `Server error: ${res.statusText}`)
      }

      const data = await res.json()
      setTrainResponse(data)
      setTrainingProgress(100)
      toast({ title: "Success", description: "Model trained successfully!" })
    } catch (error: any) {
      clearInterval(progressInterval)
      if (error.name !== "AbortError") {
        toast({ variant: "destructive", title: "Training Failed", description: error.message })
        setTrainingProgress(0)
      }
    } finally {
      setIsTraining(false)
      abortControllerRef.current = null
      if (trainingProgress === 100) {
        // Let success progress bar stay for a bit
        setTimeout(() => setTrainingProgress(0), 4000)
      }
    }
  }

  if (!uploadResponse) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>
        <div className="relative z-20">
          <PageHeader
            title="Step 2: Train Your Model"
            description="Configure and train a model on your uploaded data."
            breadcrumbs={breadcrumbs}
            backButtonHref="/upload"
            backButtonText="Back to Upload"
          />
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="space-y-8">
              <PageNavigation
                currentStep="/train"
                previousStep={{
                  href: "/upload",
                  label: "Upload Data",
                  icon: Upload,
                  description: "Upload your dataset",
                }}
                nextStep={{
                  href: "/explanations",
                  label: "Get Explanations",
                  icon: CheckCircle,
                  description: "Generate model explanations",
                }}
              />
              <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-white text-shadow-lg">
                    <BrainCircuit className="mr-2 h-6 w-6 animate-pulse-glow" />
                    Training Configuration
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-shadow-md">
                    Select your model type and target variable. The problem type (Classification/Regression) will be
                    auto-detected.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="model-type" className="text-white text-shadow-sm">
                        Model Type
                      </Label>
                      <Select onValueChange={setSelectedModel} value={selectedModel}>
                        <SelectTrigger
                          id="model-type"
                          className="bg-black/60 border-white/30 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                        >
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-white/30 backdrop-blur-md">
                          <SelectItem value="random_forest" className="text-white hover:bg-white/10">
                            Random Forest
                          </SelectItem>
                          <SelectItem value="decision_tree" className="text-white hover:bg-white/10">
                            Decision Tree
                          </SelectItem>
                          <SelectItem value="logistic_regression" className="text-white hover:bg-white/10">
                            Logistic Regression
                          </SelectItem>
                          <SelectItem value="svm" className="text-white hover:bg-white/10">
                            SVM
                          </SelectItem>
                          <SelectItem value="linear_regression" className="text-white hover:bg-white/10">
                            Linear Regression
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="target-column" className="text-white text-shadow-sm">
                        Target Column
                      </Label>
                      <Select onValueChange={setTargetColumn} value={targetColumn}>
                        <SelectTrigger
                          id="target-column"
                          className="bg-black/60 border-white/30 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                        >
                          <SelectValue placeholder="Select target column" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-white/30 backdrop-blur-md">
                          {uploadResponse.columns.map((c) => (
                            <SelectItem key={c} value={c} className="text-white hover:bg-white/10">
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button
                      onClick={handleTrain}
                      disabled={isTraining || !selectedModel || !targetColumn}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-shadow-sm"
                    >
                      {isTraining ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Training in Progress...
                        </>
                      ) : (
                        "Train Model"
                      )}
                    </Button>
                    {isTraining && (
                      <div className="space-y-3">
                        <Progress value={trainingProgress} className="w-full bg-black/60" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Training Progress: {trainingProgress}%</span>
                          <Button
                            onClick={handleCancelTraining}
                            disabled={isCancelling}
                            variant="outline"
                            size="sm"
                            className="text-red-400 border-red-400/50 hover:bg-red-400/10 hover:text-red-300 bg-transparent"
                          >
                            <X className="mr-2 h-3 w-3" />
                            Cancel Training
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {trainingProgress === 100 && (
                    <div className="mt-6 p-4 bg-green-900/40 rounded-lg border border-green-500/40 backdrop-blur-sm">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 animate-pulse-glow" />
                        <span className="font-medium text-green-300 text-shadow-sm">Training Complete!</span>
                      </div>
                      <Button
                        asChild
                        className="mt-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                        size="sm"
                      >
                        <Link href="/explanations">Proceed to Step 3: Get Explanations →</Link>
                      </Button>
                    </div>
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
