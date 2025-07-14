"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Share2, Mail, Printer, Brain, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedReport, setSelectedReport] = useState("executive")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const reportTypes = [
    {
      id: "executive",
      name: "Executive Summary",
      description: "High-level overview for stakeholders",
      icon: "📊",
      pages: 3,
      audience: "Executives",
    },
    {
      id: "technical",
      name: "Technical Report",
      description: "Detailed analysis for data scientists",
      icon: "🔬",
      pages: 12,
      audience: "Technical Team",
    },
    {
      id: "compliance",
      name: "Compliance Report",
      description: "Regulatory and audit documentation",
      icon: "📋",
      pages: 8,
      audience: "Compliance Team",
    },
  ]

  const exportFormats = [
    { format: "PDF", icon: "📄", description: "Portable Document Format" },
    { format: "DOCX", icon: "📝", description: "Microsoft Word Document" },
    { format: "HTML", icon: "🌐", description: "Web Page Format" },
    { format: "JSON", icon: "📊", description: "Structured Data Format" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-green-200/50 bg-white/80 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                InterWeb-XAI
              </h1>
              <p className="text-xs text-green-600/70 font-medium">AI Made Simple</p>
            </div>
          </Link>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 font-medium">
            Reports & Export
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Analysis Reports</h1>
            <p className="text-lg text-gray-600">Generate comprehensive reports and share your XAI insights</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Report Generation */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <FileText className="mr-2 h-5 w-5 text-green-500" />
                    Report Templates
                  </CardTitle>
                  <CardDescription>Choose the type of report to generate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {reportTypes.map((report) => (
                      <div
                        key={report.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          selectedReport === report.id
                            ? "border-green-500 bg-green-50 shadow-lg"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                        }`}
                        onClick={() => setSelectedReport(report.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{report.icon}</div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{report.name}</h3>
                              <p className="text-sm text-gray-600">{report.description}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>{report.pages} pages</div>
                            <div>{report.audience}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Report Preview */}
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                    Report Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="charts">Charts</TabsTrigger>
                      <TabsTrigger value="data">Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          {reportTypes.find((r) => r.id === selectedReport)?.name}
                        </h3>

                        {selectedReport === "executive" && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Key Findings</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Model achieved 87.5% accuracy on test dataset</li>
                                <li>House size is the most important feature (35% contribution)</li>
                                <li>Location and condition significantly impact predictions</li>
                                <li>Model explanations show high reliability (92% consistency)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Recommendations</h4>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Deploy model for production use</li>
                                <li>Monitor feature importance over time</li>
                                <li>Collect additional location-based features</li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {selectedReport === "technical" && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Model Performance</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded border">
                                  <div className="text-sm text-gray-600">Accuracy</div>
                                  <div className="text-lg font-bold text-green-600">87.5%</div>
                                </div>
                                <div className="bg-white p-3 rounded border">
                                  <div className="text-sm text-gray-600">F1-Score</div>
                                  <div className="text-lg font-bold text-blue-600">0.84</div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">SHAP Analysis</h4>
                              <p className="text-gray-600 text-sm">
                                Feature importance analysis using TreeExplainer with 1000 background samples...
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedReport === "compliance" && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Audit Trail</h4>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                  <span>Model Training Date:</span>
                                  <span>2024-01-15 14:30:00</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Data Source:</span>
                                  <span>housing_dataset_v2.csv</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Validation Method:</span>
                                  <span>5-fold Cross Validation</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Bias Assessment</h4>
                              <p className="text-gray-600 text-sm">
                                No significant bias detected across protected attributes...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="charts">
                      <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto" />
                          <p className="text-gray-600">Interactive charts will be embedded here</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-3 rounded">SHAP Summary Plot</div>
                            <div className="bg-white p-3 rounded">Feature Importance</div>
                            <div className="bg-white p-3 rounded">Force Plot</div>
                            <div className="bg-white p-3 rounded">Partial Dependence</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="data">
                      <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Feature</th>
                                <th className="text-left p-2">Importance</th>
                                <th className="text-left p-2">SHAP Value</th>
                                <th className="text-left p-2">Confidence</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2">House Size</td>
                                <td className="p-2">0.35</td>
                                <td className="p-2">+0.42</td>
                                <td className="p-2">95%</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2">Location</td>
                                <td className="p-2">0.28</td>
                                <td className="p-2">+0.31</td>
                                <td className="p-2">89%</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2">Age</td>
                                <td className="p-2">0.15</td>
                                <td className="p-2">-0.18</td>
                                <td className="p-2">92%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Export Options */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exportFormats.map((format) => (
                    <Button
                      key={format.format}
                      variant="outline"
                      className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                    >
                      <span className="mr-3 text-lg">{format.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{format.format}</div>
                        <div className="text-xs text-gray-500">{format.description}</div>
                      </div>
                      <Download className="ml-auto h-4 w-4" />
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Share Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Generate Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Report History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Housing Analysis", date: "2024-01-15", type: "Executive" },
                    { name: "Model Comparison", date: "2024-01-14", type: "Technical" },
                    { name: "Audit Report", date: "2024-01-13", type: "Compliance" },
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{report.name}</div>
                        <div className="text-xs text-gray-500">{report.date}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
