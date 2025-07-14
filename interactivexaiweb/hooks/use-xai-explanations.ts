"use client"

import { useState } from "react"
import { apiClient, type ExplainRequest, type ShapResponse, type LimeResponse } from "@/lib/apiClient"

export function useXaiExplanations() {
  const [isExplaining, setIsExplaining] = useState(false)
  const [shapExplanation, setShapExplanation] = useState<ShapResponse | null>(null)
  const [limeExplanation, setLimeExplanation] = useState<LimeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const explainWithShap = async (features: number[], modelType: string) => {
    setIsExplaining(true)
    setError(null)

    try {
      const request: ExplainRequest = { features }
      const response = await apiClient.explainWithShap(request, modelType)
      setShapExplanation(response)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "SHAP explanation failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsExplaining(false)
    }
  }

  const explainWithLime = async (features: number[], modelType: string) => {
    setIsExplaining(true)
    setError(null)

    try {
      const request: ExplainRequest = { features }
      const response = await apiClient.explainWithLime(request, modelType)
      setLimeExplanation(response)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "LIME explanation failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsExplaining(false)
    }
  }

  const resetExplanations = () => {
    setShapExplanation(null)
    setLimeExplanation(null)
    setError(null)
  }

  return {
    explainWithShap,
    explainWithLime,
    isExplaining,
    shapExplanation,
    limeExplanation,
    error,
    resetExplanations,
  }
}
