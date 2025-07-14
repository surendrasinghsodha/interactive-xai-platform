"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BarChart2, Lightbulb } from "lucide-react"
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

export default function ExplanationsPage() {
  const { trainResponse, explanation, setExplanation, isLoading, setIsLoading } = useContext(AppContext)
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null)
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
      toast({ title: "Success", description: "Explanations generated." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Explanation Failed", description: error.message })
    } finally {
      setIsLoading(false)
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

  if (!trainResponse) return null

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Step 3: Get Explanations</h1>
          <p className="text-xl text-muted-foreground">Interpret your model's predictions with SHAP and LIME.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
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
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2" />
                  SHAP Explanation
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
  )
}
