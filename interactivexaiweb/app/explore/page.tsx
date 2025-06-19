"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Database, BarChart3, Eye, Zap, Activity, ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample data for demonstration
const sampleData = [
  { id: 1, age: 22, sex: "male", embarked: "S", fare: 7.25, survived: 0, selected: false },
  { id: 2, age: 38, sex: "female", embarked: "C", fare: 71.28, survived: 1, selected: false },
  { id: 3, age: 26, sex: "female", embarked: "S", fare: 7.92, survived: 1, selected: false },
  { id: 4, age: 35, sex: "female", embarked: "S", fare: 53.1, survived: 1, selected: false },
  { id: 5, age: 35, sex: "male", embarked: "S", fare: 8.05, survived: 0, selected: false },
  { id: 6, age: 54, sex: "male", embarked: "S", fare: 51.86, survived: 0, selected: false },
  { id: 7, age: 2, sex: "male", embarked: "S", fare: 21.08, survived: 0, selected: false },
  { id: 8, age: 27, sex: "female", embarked: "S", fare: 11.13, survived: 1, selected: false },
]

export default function ExplorePage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Minimalist Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft geometric shapes */}
        <div className="absolute top-32 right-16 w-36 h-36 bg-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-60 left-20 w-28 h-28 bg-orange-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 right-1/4 w-44 h-44 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 left-1/3 w-32 h-32 bg-blue-200/20 rounded-full blur-lg"></div>

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
              href="/upload"
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium"
            >
              Upload
            </Link>
            <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-200 font-medium">
              Step 2: Explore
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  2
                </div>
                <span className="font-medium text-pink-600">Select Data</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-gray-500">Generate Explanations</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="text-gray-500">Review Results</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Data Table */}
            <div
              className={`lg:col-span-3 transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Database className="mr-2 h-5 w-5 text-orange-500" />
                    Dataset: Titanic Survival Prediction
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Select data points to generate explanations for model predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-orange-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-orange-200 bg-orange-50">
                          <TableHead className="w-12 text-orange-700 font-medium">Select</TableHead>
                          <TableHead className="text-orange-700 font-medium">ID</TableHead>
                          <TableHead className="text-orange-700 font-medium">Age</TableHead>
                          <TableHead className="text-orange-700 font-medium">Sex</TableHead>
                          <TableHead className="text-orange-700 font-medium">Embarked</TableHead>
                          <TableHead className="text-orange-700 font-medium">Fare</TableHead>
                          <TableHead className="text-orange-700 font-medium">Survived</TableHead>
                          <TableHead className="text-orange-700 font-medium">Prediction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleData.map((row, index) => (
                          <TableRow
                            key={row.id}
                            className={`border-b border-orange-100 hover:bg-orange-50 transition-all duration-300 ${
                              selectedRows.includes(row.id) ? "bg-orange-100 shadow-sm" : ""
                            }`}
                          >
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => toggleRowSelection(row.id)}
                                className="rounded border-orange-300 text-orange-500 focus:ring-orange-400 focus:ring-offset-0"
                              />
                            </TableCell>
                            <TableCell className="font-medium text-gray-800">{row.id}</TableCell>
                            <TableCell className="text-gray-700">{row.age}</TableCell>
                            <TableCell>
                              <Badge
                                variant={row.sex === "female" ? "secondary" : "outline"}
                                className={
                                  row.sex === "female"
                                    ? "bg-pink-100 text-pink-700 border-pink-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                                }
                              >
                                {row.sex}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700">{row.embarked}</TableCell>
                            <TableCell className="text-gray-700">${row.fare}</TableCell>
                            <TableCell>
                              <Badge
                                variant={row.survived ? "default" : "destructive"}
                                className={
                                  row.survived
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                                }
                              >
                                {row.survived ? "Yes" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={row.survived ? "default" : "destructive"}
                                className={
                                  row.survived
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                                }
                              >
                                {row.survived ? "Survived" : "Did not survive"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-orange-600 flex items-center font-medium">
                      <Activity className="mr-2 h-4 w-4" />
                      {selectedRows.length} of {sampleData.length} rows selected
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                      >
                        Select All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-700 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-500" />
                    Model Selection
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose the model to generate explanations for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-white border-purple-200 text-gray-800">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-purple-200">
                      <SelectItem value="random-forest" className="text-gray-800 hover:bg-purple-50">
                        Random Forest Classifier
                      </SelectItem>
                      <SelectItem value="logistic-regression" className="text-gray-800 hover:bg-purple-50">
                        Logistic Regression
                      </SelectItem>
                      <SelectItem value="gradient-boosting" className="text-gray-800 hover:bg-purple-50">
                        Gradient Boosting
                      </SelectItem>
                      <SelectItem value="neural-network" className="text-gray-800 hover:bg-purple-50">
                        Neural Network
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {selectedModel && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700 flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        <strong>Model loaded:</strong> {selectedModel.replace("-", " ")}
                      </p>
                      <p className="text-xs text-green-600 mt-1">Accuracy: 84.2% | F1-Score: 0.79</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Dataset Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Total Rows", value: "891" },
                    { label: "Features", value: "8" },
                    { label: "Target", value: "Survived" },
                    { label: "Missing Values", value: "177" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-all duration-300"
                    >
                      <span className="text-sm text-gray-700">{item.label}:</span>
                      <span className="text-sm font-medium text-orange-600">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">XAI Methods</CardTitle>
                  <CardDescription className="text-gray-600">Available explanation techniques</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 p-2 rounded bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all duration-300">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-700 font-medium">SHAP (TreeExplainer)</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded bg-green-50 border border-green-100 hover:bg-green-100 transition-all duration-300">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-700 font-medium">LIME (Tabular)</span>
                  </div>
                </CardContent>
              </Card>

              {selectedRows.length > 0 && selectedModel && (
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <BarChart3 className="mx-auto h-12 w-12 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-700">Ready for Analysis!</h3>
                        <p className="text-sm text-green-600">
                          {selectedRows.length} data points selected with {selectedModel.replace("-", " ")} model
                        </p>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                      >
                        <Link href="/explanations" className="flex items-center">
                          Generate Explanations
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
