"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface NavigationStep {
  href: string
  label: string
  icon: any
  description: string
}

interface PageNavigationProps {
  currentStep?: string
  previousStep?: NavigationStep
  nextStep?: NavigationStep
  showWorkflow?: boolean
}

export default function PageNavigation({
  currentStep,
  previousStep,
  nextStep,
  showWorkflow = true,
}: PageNavigationProps) {
  const workflowSteps = [
    {
      href: "/upload",
      label: "Upload Data",
      description: "Upload your CSV dataset",
      completed: currentStep === "/train" || currentStep === "/explanations" || currentStep === "/feedback",
      current: currentStep === "/upload",
    },
    {
      href: "/train",
      label: "Train Model",
      description: "Configure and train your model",
      completed: currentStep === "/explanations" || currentStep === "/feedback",
      current: currentStep === "/train",
    },
    {
      href: "/explanations",
      label: "Get Explanations",
      description: "Generate SHAP and LIME explanations",
      completed: currentStep === "/feedback",
      current: currentStep === "/explanations",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Workflow Progress */}
      {showWorkflow && (
        <Card className="bg-black/60 border-white/20 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-xl drop-shadow-lg">Platform Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.href}
                  className={`relative p-4 rounded-lg border transition-all duration-300 ${
                    step.current
                      ? "bg-blue-600/30 border-blue-400/50 shadow-lg shadow-blue-500/20"
                      : step.completed
                        ? "bg-green-600/20 border-green-400/40 shadow-lg shadow-green-500/10"
                        : "bg-slate-800/40 border-slate-600/40 hover:bg-slate-700/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.current
                          ? "bg-blue-500 text-white"
                          : step.completed
                            ? "bg-green-500 text-white"
                            : "bg-slate-600 text-slate-300"
                      }`}
                    >
                      {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <h3 className="font-semibold text-white drop-shadow-md">{step.label}</h3>
                  </div>
                  <p className="text-sm text-slate-300 drop-shadow-sm">{step.description}</p>
                  {step.current && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {previousStep ? (
          <Button
            asChild
            variant="outline"
            className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <Link href={previousStep.href} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{previousStep.label}</div>
                <div className="text-xs text-slate-300">{previousStep.description}</div>
              </div>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        {nextStep && (
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm"
          >
            <Link href={nextStep.href} className="flex items-center">
              <div className="text-right mr-2">
                <div className="font-medium">{nextStep.label}</div>
                <div className="text-xs text-blue-100">{nextStep.description}</div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
