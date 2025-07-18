"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, BarChart2, MessageSquare, BookOpen, Brain, Zap } from "lucide-react"
import PageHeader from "@/components/page-header"
import PageNavigation from "@/components/page-navigation"
import SpaceBackground from "@/components/space-background"

export default function XaiConceptsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-20">
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
                {/* Introduction Card */}
                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <BookOpen className="mr-2 h-6 w-6 text-blue-400 animate-pulse-glow" />
                      What is Explainable AI?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-slate-300 text-shadow-sm">
                    <p className="leading-relaxed">
                      Explainable AI (XAI) refers to methods and techniques in artificial intelligence that make the
                      results of AI solutions understandable to humans. It contrasts with the concept of "black box" AI,
                      where even the designers cannot explain why the AI arrived at a specific decision.
                    </p>
                    <p className="leading-relaxed">
                      Our platform focuses on two powerful XAI techniques: <strong className="text-white">SHAP</strong>{" "}
                      and <strong className="text-white">LIME</strong>, which help you understand how your AI models
                      make predictions.
                    </p>
                  </CardContent>
                </Card>

                {/* SHAP Card */}
                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <BarChart2 className="mr-2 h-6 w-6 text-blue-400 animate-pulse-glow" />
                      SHAP (SHapley Additive exPlanations)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-slate-300 text-shadow-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Core Concept
                      </h4>
                      <p className="leading-relaxed">
                        SHAP is a game theory-based approach to explain the output of any machine learning model. It
                        connects optimal credit allocation with local explanations using the classic Shapley values from
                        game theory and their related extensions.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">How SHAP Works:</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-300">
                        <li>Calculates the contribution of each feature to the prediction</li>
                        <li>Compares against the average prediction across all training data</li>
                        <li>Positive SHAP values push the prediction higher</li>
                        <li>Negative SHAP values pull the prediction lower</li>
                        <li>All SHAP values sum up to explain the difference from the base value</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-white mb-2">Key Benefits:</h4>
                      <ul className="space-y-1 text-sm text-green-300">
                        <li>
                          • <strong>Consistent:</strong> Same feature importance regardless of other features
                        </li>
                        <li>
                          • <strong>Accurate:</strong> Explanations always sum to the actual prediction
                        </li>
                        <li>
                          • <strong>Fair:</strong> Features contribute proportionally to their impact
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* LIME Card */}
                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <Lightbulb className="mr-2 h-6 w-6 text-purple-400 animate-pulse-glow" />
                      LIME (Local Interpretable Model-agnostic Explanations)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-slate-300 text-shadow-sm">
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Core Concept
                      </h4>
                      <p className="leading-relaxed">
                        LIME is a technique that explains the predictions of any classifier or regressor in an
                        interpretable and faithful manner, by approximating it locally with an interpretable model.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">How LIME Works:</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-300">
                        <li>Focuses on explaining individual predictions (local explanations)</li>
                        <li>Creates a simple model that mimics the complex model's behavior locally</li>
                        <li>Perturbs the input data to see how predictions change</li>
                        <li>Fits a linear model to approximate the complex model's behavior</li>
                        <li>Uses the linear model's weights as explanations</li>
                      </ul>
                    </div>

                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-white mb-2">Key Benefits:</h4>
                      <ul className="space-y-1 text-sm text-amber-300">
                        <li>
                          • <strong>Model-agnostic:</strong> Works with any machine learning model
                        </li>
                        <li>
                          • <strong>Local focus:</strong> Explains specific predictions in detail
                        </li>
                        <li>
                          • <strong>Intuitive:</strong> Creates simple, understandable explanations
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Card */}
                <Card className="glass-card backdrop-blur-md shadow-2xl border-white/20 hover:bg-black/70 transition-all duration-500 stellar-drift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-shadow-lg">
                      <MessageSquare className="mr-2 h-6 w-6 text-green-400 animate-pulse-glow" />
                      SHAP vs LIME: When to Use Which?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h4 className="font-semibold text-blue-300 mb-3">Use SHAP When:</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• You need consistent feature importance</li>
                          <li>• You want mathematically grounded explanations</li>
                          <li>• You need to compare feature importance across predictions</li>
                          <li>• You want explanations that sum to the actual prediction</li>
                        </ul>
                      </div>

                      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h4 className="font-semibold text-purple-300 mb-3">Use LIME When:</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• You need to explain individual predictions</li>
                          <li>• You want intuitive, easy-to-understand explanations</li>
                          <li>• Your model is a complete black box</li>
                          <li>• You need fast explanations for real-time applications</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-white mb-2">💡 Pro Tip:</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Our platform provides both SHAP and LIME explanations for every prediction. When they agree, you
                        can be more confident in the explanation. When they disagree, it often reveals interesting
                        insights about your model's behavior!
                      </p>
                    </div>
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
