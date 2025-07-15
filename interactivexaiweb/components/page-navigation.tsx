"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Home, Upload, Brain, BarChart2 } from "lucide-react"
import Link from "next/link"

interface NavigationStep {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface PageNavigationProps {
  currentStep?: string
  previousStep?: NavigationStep
  nextStep?: NavigationStep
  showWorkflow?: boolean
}

const workflowSteps: NavigationStep[] = [
  {
    href: "/upload",
    label: "Upload Data",
    icon: Upload,
    description: "Upload your CSV dataset",
  },
  {
    href: "/train",
    label: "Train Model",
    icon: Brain,
    description: "Configure and train your model",
  },
  {
    href: "/explanations",
    label: "Get Explanations",
    icon: BarChart2,
    description: "Generate SHAP and LIME explanations",
  },
]

export default function PageNavigation({
  currentStep,
  previousStep,
  nextStep,
  showWorkflow = true,
}: PageNavigationProps) {
  return (
    <div className="space-y-6">
      {/* Workflow Steps */}
      {showWorkflow && (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workflowSteps.map((step, index) => {
                const isActive = currentStep === step.href
                const isCompleted = workflowSteps.findIndex((s) => s.href === currentStep) > index

                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                        : isCompleted
                          ? "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20"
                          : "bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:bg-slate-700/70 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive ? "bg-blue-500" : isCompleted ? "bg-green-500" : "bg-slate-600"
                        }`}
                      >
                        <step.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{step.label}</div>
                        <div className="text-xs opacity-75">{step.description}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous/Next Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {previousStep ? (
            <Button
              asChild
              variant="outline"
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <Link href={previousStep.href}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {previousStep.label}
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          )}
        </div>

        <div>
          {nextStep && (
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href={nextStep.href}>
                {nextStep.label}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
