"use client"

import { useState } from "react"
import { apiClient, type TrainModelRequest, type TrainModelResponse } from "@/lib/apiClient"

export function useModelTraining() {
  const [isTraining, setIsTraining] = useState(false)
  const [trainedModel, setTrainedModel] = useState<{
    modelType: string
    columns: string[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const trainModel = async (modelType: string, csvData: string) => {
    setIsTraining(true)
    setError(null)

    try {
      const request: TrainModelRequest = {
        model_type: modelType,
        csv_data: csvData,
      }

      const response: TrainModelResponse = await apiClient.trainModel(request)

      setTrainedModel({
        modelType,
        columns: response.columns,
      })

      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Training failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsTraining(false)
    }
  }

  const resetTraining = () => {
    setTrainedModel(null)
    setError(null)
  }

  return {
    trainModel,
    isTraining,
    trainedModel,
    error,
    resetTraining,
  }
}
