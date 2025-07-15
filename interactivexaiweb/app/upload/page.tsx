"use client"

import type React from "react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"

export default function UploadPage() {
  const { file, setFile, isLoading, setIsLoading, uploadResponse, setUploadResponse } = useContext(AppContext)
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Upload className="mr-2 h-6 w-6" />
                  Upload CSV
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Select a CSV file. We'll inspect its columns and show a preview.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="csv-file" className="text-white">
                    Choose CSV File
                  </Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  {file && <p className="text-sm text-slate-400">Selected: {file.name}</p>}
                </div>
                <Button
                  onClick={handleInspect}
                  disabled={isLoading || !file}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inspecting...
                    </>
                  ) : (
                    "Inspect Dataset"
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="mr-2 h-6 w-6" />
                  Dataset Info
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {uploadResponse ? "Your dataset details" : "Upload a file to see info"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadResponse ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Columns ({uploadResponse.columns.length})</h4>
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                        {uploadResponse.columns.map((col) => (
                          <span key={col} className="px-2 py-1 bg-slate-700 rounded text-sm text-slate-300">
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium text-green-300">Ready for Training!</span>
                      </div>
                      <Button
                        asChild
                        className="mt-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        size="sm"
                      >
                        <Link href="/train">Proceed to Step 2: Train Model →</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a file to see dataset information</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
