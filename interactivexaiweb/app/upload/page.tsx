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

export default function UploadPage() {
  const { file, setFile, isLoading, setIsLoading, uploadResponse, setUploadResponse } = useContext(AppContext)
  const { toast } = useToast()

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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Step 1: Upload & Inspect</h1>
          <p className="text-xl text-muted-foreground">Upload a CSV file to begin the XAI journey.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-6 w-6" />
                Upload CSV
              </CardTitle>
              <CardDescription>Select a CSV file. We'll inspect its columns and show a preview.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="csv-file">Choose CSV File</Label>
                <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
                {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
              </div>
              <Button onClick={handleInspect} disabled={isLoading || !file} className="w-full">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-6 w-6" />
                Dataset Info
              </CardTitle>
              <CardDescription>{uploadResponse ? "Your dataset details" : "Upload a file to see info"}</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadResponse ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Columns ({uploadResponse.columns.length})</h4>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                      {uploadResponse.columns.map((col) => (
                        <span key={col} className="px-2 py-1 bg-secondary rounded text-sm">
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
                    <Button asChild className="mt-2 w-full" size="sm">
                      <Link href="/train">Proceed to Step 2: Train Model →</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a file to see dataset information</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
