"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Upload, BrainCircuit, BarChart2, Lightbulb } from "lucide-react"

export default function FeatureDemoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
          <Eye className="mr-2 h-5 w-5" />
          View Features
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="train">Train</TabsTrigger>
              <TabsTrigger value="explain">Explain</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Upload className="h-6 w-6 text-primary" />
                    <CardTitle>Data Upload & Inspection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Easily upload CSV datasets and get instant data insights:
                  </CardDescription>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Automatic column detection and type inference</li>
                    <li>Data quality assessment and missing value detection</li>
                    <li>Sample data preview and statistical summaries</li>
                    <li>Support for various data formats and encodings</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="train" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <CardTitle>Model Training</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">Train machine learning models with ease:</CardDescription>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Multiple algorithms: Random Forest, Decision Trees, SVM, Logistic Regression</li>
                    <li>Automatic hyperparameter optimization</li>
                    <li>Real-time training progress tracking</li>
                    <li>Model performance metrics and validation</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explain" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <CardTitle>AI Explanations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Generate comprehensive explanations using industry-standard methods:
                  </CardDescription>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>SHAP (SHapley Additive exPlanations) for global and local explanations</li>
                    <li>LIME (Local Interpretable Model-agnostic Explanations)</li>
                    <li>Feature importance rankings and contribution analysis</li>
                    <li>Reliability scoring through perturbation testing</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualize" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-6 w-6 text-primary" />
                    <CardTitle>Interactive Visualizations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Explore your model's behavior through rich visualizations:
                  </CardDescription>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Interactive SHAP force plots and waterfall charts</li>
                    <li>LIME explanation bar charts and feature weights</li>
                    <li>Model performance dashboards and confusion matrices</li>
                    <li>Exportable charts and reports for presentations</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
