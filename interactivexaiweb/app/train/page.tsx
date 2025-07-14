"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BrainCircuit, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function TrainPage() {
  const { file, uploadResponse, isTraining, setIsTraining, setTrainResponse, trainingProgress, setTrainingProgress } =
    useContext(AppContext)
  const [selectedModel, setSelectedModel] = useState("")
  const [targetColumn, setTargetColumn] = useState("")
  const { toast } = useToast()
  const router = useRouter()

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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Step 2: Train Your Model</h1>
          <p className="text-xl text-muted-foreground">Configure and train a model on your uploaded data.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BrainCircuit className="mr-2 h-6 w-6" />
              Training Configuration
            </CardTitle>
            <CardDescription>
              Select your model type and target variable. The problem type (Classification/Regression) will be
              auto-detected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="model-type">Model Type</Label>
                <Select onValueChange={setSelectedModel}>
                  <SelectTrigger id="model-type">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random_forest">Random Forest</SelectItem>
                    <SelectItem value="decision_tree">Decision Tree</SelectItem>
                    <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
                    <SelectItem value="svm">SVM</SelectItem>
                    <SelectItem value="linear_regression">Linear Regression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="target-column">Target Column</Label>
                <Select onValueChange={setTargetColumn}>
                  <SelectTrigger id="target-column">
                    <SelectValue placeholder="Select target column" />
                  </SelectTrigger>
                  <SelectContent>
                    {uploadResponse.columns.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleTrain} disabled={isTraining || !selectedModel || !targetColumn} className="w-full">
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
                <Button asChild className="mt-2 w-full" size="sm">
                  <Link href="/explanations">Proceed to Step 3: Get Explanations →</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
