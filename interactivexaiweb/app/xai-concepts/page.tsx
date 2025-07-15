"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, BarChart2, MessageSquare } from "lucide-react"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"

export default function XaiConceptsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <PageHeader
        title="Understanding Explainable AI (XAI)"
        description="Learn about the core concepts that power our platform."
        breadcrumbs={[
          { label: "Platform", href: "/upload" },
          { label: "XAI Concepts", href: "/xai-concepts", current: true },
        ]}
        showBackButton={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <PageNavigation
            showWorkflow={false}
            nextStep={{
              href: "/feedback",
              label: "Provide Feedback",
              icon: MessageSquare,
              description: "Share your experience",
            }}
          />

          <div className="space-y-8">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart2 className="mr-2 h-6 w-6 text-blue-400" />
                  SHAP (SHapley Additive exPlanations)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <p>
                  SHAP is a game theory-based approach to explain the output of any machine learning model. It connects
                  optimal credit allocation with local explanations using the classic Shapley values from game theory
                  and their related extensions.
                </p>
                <p>
                  Essentially, SHAP values tell us how much each feature in our dataset contributed to the model's
                  prediction for a specific instance, compared to the average prediction for the dataset. Features that
                  pushed the prediction higher have positive SHAP values, while those that pushed it lower have negative
                  values.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Lightbulb className="mr-2 h-6 w-6 text-purple-400" />
                  LIME (Local Interpretable Model-agnostic Explanations)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <p>
                  LIME is a technique that explains the predictions of any classifier or regressor in an interpretable
                  and faithful manner, by approximating it locally with an interpretable model.
                </p>
                <p>
                  Instead of trying to understand the entire complex model, LIME focuses on understanding why a single
                  prediction was made. It does this by creating a new, simpler model (like a linear model) that mimics
                  the behavior of the complex model in the "local" vicinity of the prediction we want to explain. The
                  weights of this simple model then serve as the explanation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
