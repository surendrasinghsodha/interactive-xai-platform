"use client"

import type React from "react"
import { createContext, useState, useContext, useMemo } from "react"
import type { AppContextType, UploadResponse, TrainResponse, Explanation } from "@/lib/types"

export const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTraining, setIsTraining] = useState<boolean>(false)
  const [trainingProgress, setTrainingProgress] = useState<number>(0)
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null)
  const [trainResponse, setTrainResponse] = useState<TrainResponse | null>(null)
  const [explanation, setExplanation] = useState<Explanation | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [targetColumn, setTargetColumn] = useState<string | null>(null)
  const [featureColumns, setFeatureColumns] = useState<string[]>([])
  const [problemType, setProblemType] = useState<"classification" | "regression">("classification")
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null)

  const contextValue = useMemo(
    () => ({
      file,
      setFile,
      isLoading,
      setIsLoading,
      isTraining,
      setIsTraining,
      trainingProgress,
      setTrainingProgress,
      uploadResponse,
      setUploadResponse,
      trainResponse,
      setTrainResponse,
      explanation,
      setExplanation,
      selectedModel,
      setSelectedModel,
      targetColumn,
      setTargetColumn,
      featureColumns,
      setFeatureColumns,
      problemType,
      setProblemType,
      selectedRow,
      setSelectedRow,
    }),
    [
      file,
      isLoading,
      isTraining,
      trainingProgress,
      uploadResponse,
      trainResponse,
      explanation,
      selectedModel,
      targetColumn,
      featureColumns,
      problemType,
      selectedRow,
    ],
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
