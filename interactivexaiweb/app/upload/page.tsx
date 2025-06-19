"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Brain, Database, ArrowRight, CheckCircle, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress with smooth animation
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Minimalist Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-200/20 rounded-full blur-lg"></div>

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
          <Link
            href="/"
            className={`flex items-center space-x-3 transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
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
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium">
              Home
            </Link>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
              Step 1: Upload
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                  1
                </div>
                <span className="font-medium text-orange-600">Upload Data</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-gray-500">Select Data</span>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Upload Area */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Upload className="mr-2 h-5 w-5 text-orange-500" />
                    Upload Your Data
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Upload your dataset and model files to begin the XAI analysis process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="dataset" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-orange-50 border border-orange-200">
                      <TabsTrigger
                        value="dataset"
                        className="data-[state=active]:bg-white data-[state=active]:text-orange-600 text-gray-600 font-medium"
                      >
                        Dataset
                      </TabsTrigger>
                      <TabsTrigger
                        value="model"
                        className="data-[state=active]:bg-white data-[state=active]:text-orange-600 text-gray-600 font-medium"
                      >
                        Model
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dataset" className="space-y-4">
                      <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-400 transition-all duration-300 bg-gradient-to-br from-orange-50 to-pink-50 relative overflow-hidden group">
                        <Database className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                        <div className="space-y-2 relative z-10">
                          <Label
                            htmlFor="dataset-upload"
                            className="text-lg font-medium cursor-pointer text-gray-800 hover:text-orange-600 transition-colors duration-300"
                          >
                            Drop your dataset here or click to browse
                          </Label>
                          <p className="text-sm text-gray-600">Supports CSV, JSON, and Excel files (max 50MB)</p>
                          <Input
                            id="dataset-upload"
                            type="file"
                            accept=".csv,.json,.xlsx,.xls"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-orange-600">
                            <span className="flex items-center">
                              <Zap className="mr-2 h-4 w-4" />
                              Uploading dataset...
                            </span>
                            <span>{Math.round(uploadProgress)}%</span>
                          </div>
                          <Progress
                            value={uploadProgress}
                            className="bg-orange-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-pink-500"
                          />
                        </div>
                      )}

                      {uploadComplete && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>Dataset uploaded successfully!</span>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="model" className="space-y-4">
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden group">
                        <Brain className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                        <div className="space-y-2 relative z-10">
                          <Label
                            htmlFor="model-upload"
                            className="text-lg font-medium cursor-pointer text-gray-800 hover:text-purple-600 transition-colors duration-300"
                          >
                            Upload your trained model
                          </Label>
                          <p className="text-sm text-gray-600">
                            Supports .pkl, .joblib, .h5, and .onnx files (max 100MB)
                          </p>
                          <Input id="model-upload" type="file" accept=".pkl,.joblib,.h5,.onnx" className="hidden" />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Sparkles className="mr-2 h-4 w-4" />
                          No model? No problem!
                        </h4>
                        <p className="text-sm text-blue-600">
                          You can train a model directly on our platform using your uploaded dataset.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-700 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Sample Datasets</CardTitle>
                  <CardDescription className="text-gray-600">
                    Try our platform with these pre-loaded datasets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Titanic Dataset", "Breast Cancer Dataset", "Loan Prediction Dataset"].map((dataset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {dataset}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Supported Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2 text-orange-600">Datasets</h4>
                      <div className="flex flex-wrap gap-2">
                        {["CSV", "JSON", "Excel"].map((format, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 transition-all duration-300"
                          >
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-purple-600">Models</h4>
                      <div className="flex flex-wrap gap-2">
                        {["PKL", "Joblib", "H5", "ONNX"].map((format, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-all duration-300"
                          >
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {uploadComplete && (
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-700">Ready to proceed!</h3>
                        <p className="text-sm text-green-600">Your data has been uploaded successfully.</p>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                      >
                        <Link href="/explore" className="flex items-center">
                          Continue to Data Exploration
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
