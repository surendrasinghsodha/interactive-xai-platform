"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BrainCircuit, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"

export default function TrainPage() {
  const { file, uploadResponse, isTraining, setIsTraining, setTrainResponse, trainingProgress, setTrainingProgress } =
    useContext(AppContext)
  const [selectedModel, setSelectedModel] = useState("")
  const [targetColumn, setTargetColumn] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const breadcrumbs = [
    { label: "Upload Data", href: "/upload" },
    { label: "Train Model", href: "/train", current: true },
  ]

  useEffect(() => {
    if (!file || !uploadResponse) {
      toast({ variant: "destructive", title: "No data found", description: "Please upload a dataset first." })
      router.push("/upload")
    }
  }, [file, uploadResponse, router, toast])

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

    const formData = new FormData()
    formData.append("file", file)
    formData.append("model_type", selectedModel)
    formData.append("target_column", targetColumn)

    try {
      const res = await fetch("http://127.0.0.1:8000/train", { method: "POST", body: formData })
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
      toast({ variant: "destructive", title: "Training Failed", description: error.message })
      setTrainingProgress(0)
    } finally {
      setIsTraining(false)
      setTimeout(() => setTrainingProgress(0), 4000)
    }
  }

  if (!uploadResponse) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BrainCircuit className="mr-2 h-6 w-6" />
                Training Configuration
              </CardTitle>
              <CardDescription className="text-slate-400">
                Select your model type and target variable. The problem type (Classification/Regression) will be
                auto-detected.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="model-type" className="text-white">
                    Model Type
                  </Label>
                  <Select onValueChange={setSelectedModel}>
                    <SelectTrigger id="model-type" className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="random_forest">Random Forest</SelectItem>
                      <SelectItem value="decision_tree">Decision Tree</SelectItem>
                      <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
                      <SelectItem value="svm">SVM</SelectItem>
                      <SelectItem value="linear_regression">Linear Regression</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target-column" className="text-white">
                    Target Column
                  </Label>
                  <Select onValueChange={setTargetColumn}>
                    <SelectTrigger id="target-column" className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select target column" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {uploadResponse.columns.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleTrain}
                disabled={isTraining || !selectedModel || !targetColumn}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
              {isTraining && <Progress value={trainingProgress} className="w-full mt-4" />}
              {trainingProgress === 100 && (
                <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium text-green-300">Training Complete!</span>
                  </div>
                  <Button
                    asChild
                    className="mt-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
  )
}
