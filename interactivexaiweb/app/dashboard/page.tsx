"use client"

import type React from "react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, BrainCircuit, BarChart2, FileText } from "lucide-react"
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

export default function DashboardPage() {
  const {
    file,
    setFile,
    isLoading,
    setIsLoading,
    uploadResponse,
    setUploadResponse,
    trainResponse,
    setTrainResponse,
    selectedModel,
    setSelectedModel,
    targetColumn,
    setTargetColumn,
    featureColumns,
    setFeatureColumns,
    problemType,
    setProblemType,
    selectedRow,
    setSelectedRow,
    explanation,
    setExplanation,
    trainingProgress,
    setTrainingProgress,
    isTraining,
    setIsTraining,
  } = useContext(AppContext)

  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({ variant: "destructive", title: "No file selected", description: "Please select a CSV file to upload." })
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-data", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`)
      const data = await res.json()
      setUploadResponse(data)
      setTargetColumn(data.columns[data.columns.length - 1]) // Default to last column
      setFeatureColumns(data.columns.slice(0, -1)) // Default to all other columns
      toast({ title: "Success", description: "Dataset uploaded and inspected." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrainModel = async () => {
    if (!uploadResponse || !selectedModel || !targetColumn || featureColumns.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please upload data and select model parameters.",
      })
      return
    }
    setIsTraining(true)
    setTrainingProgress(0)

    const progressInterval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    try {
      const res = await fetch("http://127.0.0.1:8000/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_type: selectedModel,
          target_column: targetColumn,
          feature_columns: featureColumns,
          problem_type: problemType,
        }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`)
      const data = await res.json()
      setTrainResponse(data)
      toast({ title: "Training Complete", description: `Model ${data.model_id} is ready.` })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Training Failed", description: error.message })
    } finally {
      clearInterval(progressInterval)
      setTrainingProgress(100)
      setIsTraining(false)
      setTimeout(() => setTrainingProgress(0), 2000)
    }
  }

  const handleExplain = async () => {
    if (!trainResponse || !selectedRow) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please train a model and select a data row.",
      })
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_id: trainResponse.model_id,
          data_point: selectedRow,
        }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`)
      const data = await res.json()
      setExplanation(data)
      toast({ title: "Explanation Generated", description: "SHAP and LIME explanations are ready." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Explanation Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const formatShapData = () => {
    if (!explanation?.shap) return []
    return explanation.shap.features.map((feature, i) => ({
      name: feature,
      "SHAP Value": explanation.shap.shap_values[i],
    }))
  }

  const formatLimeData = () => {
    if (!explanation?.lime) return []
    return Object.entries(explanation.lime.lime_explanation).map(([feature, value]) => ({
      name: feature,
      "LIME Weight": value,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2" /> 1. Upload Dataset
            </CardTitle>
            <CardDescription>Select a CSV file containing your data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <Button onClick={handleUpload} disabled={isLoading || !file}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Upload and Inspect
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BrainCircuit className="mr-2" /> 2. Train Model
            </CardTitle>
            <CardDescription>Configure and train a model on your uploaded data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Model Type</Label>
                <Select onValueChange={setSelectedModel} disabled={!uploadResponse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random_forest">Random Forest</SelectItem>
                    <SelectItem value="decision_tree">Decision Tree</SelectItem>
                    <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
                    <SelectItem value="svm">SVM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Problem Type</Label>
                <Select
                  onValueChange={(v) => setProblemType(v as "classification" | "regression")}
                  defaultValue="classification"
                  disabled={!uploadResponse}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select problem type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classification">Classification</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Target Column</Label>
              <Select onValueChange={setTargetColumn} value={targetColumn} disabled={!uploadResponse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {uploadResponse?.columns.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleTrainModel} disabled={isTraining || !uploadResponse || !selectedModel}>
              {isTraining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Train Model
            </Button>
            {isTraining && <Progress value={trainingProgress} className="w-full mt-2" />}
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> 3. Inspect & Select Data
            </CardTitle>
            <CardDescription>Select a data point to generate an explanation for.</CardDescription>
          </CardHeader>
          <CardContent>
            {trainResponse ? (
              <div className="space-y-4">
                <Label>Select a Row to Explain</Label>
                <Select onValueChange={(val) => setSelectedRow(JSON.parse(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data row" />
                  </SelectTrigger>
                  <SelectContent>
                    {uploadResponse?.sample_data.map((row, i) => (
                      <SelectItem key={i} value={JSON.stringify(row)}>
                        Row {i + 1}: {Object.values(row).slice(0, 3).join(", ")}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleExplain} disabled={isLoading || !selectedRow}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate Explanation
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Train a model to select data for explanation.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2" /> 4. Get Explanations
            </CardTitle>
            <CardDescription>Interpret the model's prediction with SHAP and LIME.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {explanation ? (
              <>
                <div>
                  <h3 className="font-semibold mb-2">SHAP Explanation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Base Value: {explanation.shap.base_value.toFixed(4)}
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart
                      layout="vertical"
                      data={formatShapData()}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="SHAP Value" fill="#8884d8" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">LIME Explanation</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={formatLimeData()}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="LIME Weight" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Explanation will appear here after generation.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
