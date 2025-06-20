"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Database, BarChart3, Eye, Zap, Activity, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"

interface DatasetInfo {
  fileName: string
  headers: string[]
  data: any[]
  uploadTime: string
  fileSize: number
  totalRows: number
}

interface DatasetMetadata {
  fileName: string
  headers: string[]
  uploadTime: string
  fileSize: number
  totalRows: number
  hasData: boolean
}

export default function ExplorePage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null)
  const [displayData, setDisplayData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const rowsPerPage = 8

  useEffect(() => {
    setIsLoaded(true)
    loadDataset()
  }, [])

  const loadDataset = () => {
    setIsLoadingData(true)

    // First try to get data from global cache
    if (globalThis.uploadedDatasetCache) {
      const cachedData = globalThis.uploadedDatasetCache
      setDatasetInfo(cachedData)
      setDisplayData(cachedData.data.slice(0, rowsPerPage))
      setIsLoadingData(false)
      return
    }

    // If no cache, try to get metadata from localStorage
    const storedMetadata = localStorage.getItem("datasetMetadata")
    if (storedMetadata) {
      try {
        const metadata: DatasetMetadata = JSON.parse(storedMetadata)
        if (metadata.hasData) {
          // Create a dataset info object with metadata only
          const datasetFromMetadata: DatasetInfo = {
            fileName: metadata.fileName,
            headers: metadata.headers,
            data: [], // No actual data, will show message
            uploadTime: metadata.uploadTime,
            fileSize: metadata.fileSize,
            totalRows: metadata.totalRows,
          }
          setDatasetInfo(datasetFromMetadata)
          setDisplayData([])
          setIsLoadingData(false)
          return
        }
      } catch (error) {
        console.error("Error parsing stored metadata:", error)
      }
    }

    // Fallback to sample data
    setFallbackData()
    setIsLoadingData(false)
  }

  const setFallbackData = () => {
    const fallbackDataset = {
      fileName: "Titanic Dataset (Sample)",
      headers: ["id", "age", "sex", "embarked", "fare", "survived"],
      data: [
        { id: 1, age: 22, sex: "male", embarked: "S", fare: 7.25, survived: 0 },
        { id: 2, age: 38, sex: "female", embarked: "C", fare: 71.28, survived: 1 },
        { id: 3, age: 26, sex: "female", embarked: "S", fare: 7.92, survived: 1 },
        { id: 4, age: 35, sex: "female", embarked: "S", fare: 53.1, survived: 1 },
        { id: 5, age: 35, sex: "male", embarked: "S", fare: 8.05, survived: 0 },
        { id: 6, age: 54, sex: "male", embarked: "S", fare: 51.86, survived: 0 },
        { id: 7, age: 2, sex: "male", embarked: "S", fare: 21.08, survived: 0 },
        { id: 8, age: 27, sex: "female", embarked: "S", fare: 11.13, survived: 1 },
      ],
      uploadTime: new Date().toISOString(),
      fileSize: 1024,
      totalRows: 8,
    }
    setDatasetInfo(fallbackDataset)
    setDisplayData(fallbackDataset.data)
  }

  const loadPage = (page: number) => {
    if (!datasetInfo || !globalThis.uploadedDatasetCache) return

    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const pageData = globalThis.uploadedDatasetCache.data.slice(startIndex, endIndex)
    setDisplayData(pageData)
    setCurrentPage(page)
    setSelectedRows([]) // Clear selection when changing pages
  }

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const selectAllRows = () => {
    if (selectedRows.length === displayData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(displayData.map((row) => row.id))
    }
  }

  const clearSelection = () => {
    setSelectedRows([])
  }

  const getDatasetName = () => {
    if (!datasetInfo) return "Dataset"
    return datasetInfo.fileName.replace(/\.(csv|json|xlsx|xls)$/i, "")
  }

  const getPredictionForRow = (row: any) => {
    // Simple prediction logic based on available data
    if (datasetInfo?.headers.includes("survived")) {
      return row.survived ? "Survived" : "Did not survive"
    } else if (datasetInfo?.headers.includes("target")) {
      return row.target ? "Positive" : "Negative"
    } else if (datasetInfo?.headers.includes("class")) {
      return row.class
    } else {
      // Generic prediction
      return Math.random() > 0.5 ? "Positive" : "Negative"
    }
  }

  const getBadgeVariant = (value: any, header: string) => {
    if (header === "sex" || header === "gender") {
      return value === "female" ? "secondary" : "outline"
    } else if (header === "survived" || header === "target") {
      return value ? "default" : "destructive"
    }
    return "secondary"
  }

  const getBadgeColor = (value: any, header: string) => {
    if (header === "sex" || header === "gender") {
      return value === "female"
        ? "bg-pink-100 text-pink-700 border-pink-200"
        : "bg-blue-100 text-blue-700 border-blue-200"
    } else if (header === "survived" || header === "target") {
      return value ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
    }
    return "bg-gray-100 text-gray-700 border-gray-200"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const totalPages = datasetInfo ? Math.ceil(datasetInfo.totalRows / rowsPerPage) : 0
  const hasLargeDataset = datasetInfo && datasetInfo.totalRows > rowsPerPage

  if (!datasetInfo) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
                    Dataset: {getDatasetName()}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {displayData.length > 0
                      ? `Select data points to generate explanations for model predictions`
                      : `Dataset metadata loaded. Re-upload file to view data.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {displayData.length > 0 ? (
                    <>
                      <div className="rounded-md border border-orange-200 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b border-orange-200 bg-orange-50">
                              <TableHead className="w-12 text-orange-700 font-medium">Select</TableHead>
                              {datasetInfo.headers.map((header, index) => (
                                <TableHead key={index} className="text-orange-700 font-medium capitalize">
                                  {header}
                                </TableHead>
                              ))}
                              <TableHead className="text-orange-700 font-medium">Prediction</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {displayData.map((row, index) => (
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
                                {datasetInfo.headers.map((header, colIndex) => (
                                  <TableCell key={colIndex} className="text-gray-700">
                                    {header === "sex" ||
                                    header === "gender" ||
                                    header === "survived" ||
                                    header === "target" ? (
                                      <Badge
                                        variant={getBadgeVariant(row[header], header)}
                                        className={getBadgeColor(row[header], header)}
                                      >
                                        {row[header]?.toString() || "N/A"}
                                      </Badge>
                                    ) : (
                                      row[header]?.toString() || "N/A"
                                    )}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Badge
                                    variant={
                                      getPredictionForRow(row).includes("Survived") ||
                                      getPredictionForRow(row) === "Positive"
                                        ? "default"
                                        : "destructive"
                                    }
                                    className={
                                      getPredictionForRow(row).includes("Survived") ||
                                      getPredictionForRow(row) === "Positive"
                                        ? "bg-green-100 text-green-700 border-green-200"
                                        : "bg-red-100 text-red-700 border-red-200"
                                    }
                                  >
                                    {getPredictionForRow(row)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Pagination for large datasets */}
                      {hasLargeDataset && (
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Showing {currentPage * rowsPerPage + 1} to{" "}
                            {Math.min((currentPage + 1) * rowsPerPage, datasetInfo.totalRows)} of{" "}
                            {datasetInfo.totalRows.toLocaleString()} rows
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => loadPage(currentPage - 1)}
                              disabled={currentPage === 0}
                              className="border-orange-200 text-orange-600 hover:bg-orange-50"
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-gray-600">
                              Page {currentPage + 1} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => loadPage(currentPage + 1)}
                              disabled={currentPage >= totalPages - 1}
                              className="border-orange-200 text-orange-600 hover:bg-orange-50"
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-orange-600 flex items-center font-medium">
                          <Activity className="mr-2 h-4 w-4" />
                          {selectedRows.length} of {displayData.length} rows selected
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={selectAllRows}
                            className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                          >
                            {selectedRows.length === displayData.length ? "Deselect All" : "Select All"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearSelection}
                            className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                          >
                            Clear Selection
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Database className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Dataset Not Available</h3>
                      <p className="text-gray-600 mb-4">
                        The dataset data is not currently loaded in memory. Please re-upload your file to view and
                        select data.
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        <Link href="/upload" className="flex items-center">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Re-upload Dataset
                        </Link>
                      </Button>
                    </div>
                  )}
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
                    { label: "Total Rows", value: datasetInfo.totalRows.toLocaleString() },
                    { label: "Features", value: datasetInfo.headers.length.toString() },
                    { label: "File Size", value: formatFileSize(datasetInfo.fileSize) },
                    { label: "Uploaded", value: new Date(datasetInfo.uploadTime).toLocaleDateString() },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-all duration-300"
                    >
                      <span className="text-sm text-gray-700">{item.label}:</span>
                      <span className="text-sm font-medium text-orange-600 max-w-32 truncate" title={item.value}>
                        {item.value}
                      </span>
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

              {selectedRows.length > 0 && selectedModel && displayData.length > 0 && (
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
