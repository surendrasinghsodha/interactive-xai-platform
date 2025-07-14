import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, BarChart2 } from "lucide-react"

export default function XaiConceptsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Understanding Explainable AI (XAI)</h1>
          <p className="text-xl text-muted-foreground">Learn about the core concepts that power our platform.</p>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-6 w-6 text-primary" />
                SHAP (SHapley Additive exPlanations)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                SHAP is a game theory-based approach to explain the output of any machine learning model. It connects
                optimal credit allocation with local explanations using the classic Shapley values from game theory and
                their related extensions.
              </p>
              <p>
                Essentially, SHAP values tell us how much each feature in our dataset contributed to the model's
                prediction for a specific instance, compared to the average prediction for the dataset. Features that
                pushed the prediction higher have positive SHAP values, while those that pushed it lower have negative
                values.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-6 w-6 text-primary" />
                LIME (Local Interpretable Model-agnostic Explanations)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                LIME is a technique that explains the predictions of any classifier or regressor in an interpretable and
                faithful manner, by approximating it locally with an interpretable model.
              </p>
              <p>
                Instead of trying to understand the entire complex model, LIME focuses on understanding why a single
                prediction was made. It does this by creating a new, simpler model (like a linear model) that mimics the
                behavior of the complex model in the "local" vicinity of the prediction we want to explain. The weights
                of this simple model then serve as the explanation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
