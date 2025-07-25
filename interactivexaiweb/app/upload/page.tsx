"use client"

import type React from "react"
import { useContext, useState, useCallback } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, FileText, CheckCircle, Database, BarChart3 } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import { useDropzone } from "react-dropzone"
import { FileIcon } from "lucide-react"

export default function UploadPage() {
  const { file, setFile, isLoading, setIsLoading, uploadResponse, setUploadResponse } = useContext(AppContext)
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const breadcrumbs = [{ label: "Upload Data", href: "/upload", current: true }]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setUploadResponse(null) // Reset previous response
    }
  }

  const handleInspect = async () => {
    if (!file) {
      toast({ variant: "destructive", title: "No file selected" })
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://127.0.0.1:8000/inspect-csv", { method: "POST", body: formData })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || `Server error: ${res.statusText}`)
      }
      const data = await res.json()
      setUploadResponse(data)
      toast({ title: "Success", description: "Dataset inspected successfully!" })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Inspection Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]) // Set the first file as the main file
      }
    },
    [setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    multiple: false,
  })

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploading(true)
    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploading(false)
    toast({ title: "Success", description: "Files uploaded successfully!" })
    setFiles([])
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-20">
          <PageHeader
            title="Step 1: Upload & Inspect"
            description="Upload a CSV file to begin the XAI journey."
            breadcrumbs={breadcrumbs}
            showBackButton={false}
          />

          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="space-y-8">
              <PageNavigation
                currentStep="/upload"
                nextStep={{
                  href: "/train",
                  label: "Train Model",
                  icon: CheckCircle,
                  description: "Configure and train your model",
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <Upload className="mr-2 h-6 w-6 animate-pulse-glow" />
                      Upload CSV
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-shadow-sm">
                      Select a CSV file. We'll inspect its columns and show a preview.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="csv-file" className="text-white text-shadow-sm">
                        Choose CSV File
                      </Label>
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="bg-black/60 border-white/30 text-white backdrop-blur-sm file:bg-white/20 file:text-white file:border-0 file:rounded-md hover:bg-black/70 transition-all duration-300 text-shadow-sm"
                      />
                      {file && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-blue-900/20 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                          <FileText className="h-4 w-4 text-blue-400" />
                          <p className="text-sm text-blue-300 text-shadow-sm">Selected: {file.name}</p>
                        </div>
                      )}
                    </div>

                    {/* Drag and Drop Area */}
                    <div
                      {...getRootProps()}
                      className={`relative border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors duration-200 backdrop-blur-sm ${
                        isDragActive
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-white/30 hover:bg-white/10 hover:border-blue-500"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="text-blue-500 text-4xl mb-2" />
                        <p className="text-gray-300 text-center">
                          {isDragActive
                            ? "Drop the CSV file here..."
                            : "Drag 'n' drop a CSV file here, or click to select"}
                        </p>
                      </div>
                    </div>

                    {/* File List */}
                    <div className="mt-4">
                      {files.length > 0 && <h2 className="text-lg font-semibold mb-2 text-white">Selected Files:</h2>}
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 px-4 bg-black/40 rounded-md mb-2 transition-colors duration-200 hover:bg-black/60 border border-white/20"
                        >
                          <div className="flex items-center">
                            <FileIcon className="text-gray-400 mr-2 h-4 w-4" />
                            <span className="text-sm text-gray-300">{file.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleInspect}
                      disabled={isLoading || !file}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-shadow-sm"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inspecting...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Inspect Dataset
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <BarChart3 className="mr-2 h-6 w-6 animate-pulse-glow" />
                      Dataset Info
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-shadow-sm">
                      {uploadResponse ? "Your dataset details" : "Upload a file to see info"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadResponse ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 text-white text-shadow-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Columns ({uploadResponse.columns.length})
                          </h4>
                          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {uploadResponse.columns.map((col, index) => (
                              <span
                                key={col}
                                className="px-3 py-1 bg-slate-700/80 rounded-full text-sm text-slate-200 backdrop-blur-sm border border-white/10 hover:bg-slate-600/80 transition-all duration-300 text-shadow-sm"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-green-900/40 rounded-lg border border-green-500/40 backdrop-blur-sm">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 animate-pulse-glow" />
                            <span className="font-medium text-green-300 text-shadow-sm">Ready for Training!</span>
                          </div>
                          <p className="text-sm text-green-200 mb-3 text-shadow-sm">
                            Your dataset has been successfully analyzed and is ready for model training.
                          </p>
                          <Button
                            asChild
                            className="mt-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                            size="sm"
                          >
                            <Link href="/train">Proceed to Step 2: Train Model →</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-300">
                        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse-glow">
                          <FileText className="h-8 w-8 opacity-60" />
                        </div>
                        <p className="text-shadow-sm">Upload a file to see dataset information</p>
                        <p className="text-sm text-slate-400 mt-2 text-shadow-sm">
                          Supported format: CSV files with headers
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
