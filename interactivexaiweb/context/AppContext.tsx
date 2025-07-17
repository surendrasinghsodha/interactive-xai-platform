"use client"

import { createContext, useState, type ReactNode } from "react"
import type { UploadResponse, TrainResponse, Explanation } from "@/lib/types"

export interface AppContextType {
  file: File | null
  setFile: (file: File | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isTraining: boolean
  setIsTraining: (isTraining: boolean) => void
  trainingProgress: number
  setTrainingProgress: (trainingProgress: number) => void
  uploadResponse: UploadResponse | null
  setUploadResponse: (uploadResponse: UploadResponse | null) => void
  trainResponse: TrainResponse | null
  setTrainResponse: (trainResponse: TrainResponse | null) => void
  explanation: Explanation | null
  setExplanation: (explanation: Explanation | null) => void
  selectedModel: string
  setSelectedModel: (selectedModel: string) => void
  targetColumn: string
  setTargetColumn: (targetColumn: string) => void
  featureColumns: string[]
  setFeatureColumns: (featureColumns: string[]) => void
  problemType: "classification" | "regression"
  setProblemType: (problemType: "classification" | "regression") => void
  selectedRow: Record<string, any> | null
  setSelectedRow: (selectedRow: Record<string, any> | null) => void
}

export const AppContext = createContext<AppContextType>(null!)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTraining, setIsTraining] = useState<boolean>(false)
  const [trainingProgress, setTrainingProgress] = useState<number>(0)
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null)
  const [trainResponse, setTrainResponse] = useState<TrainResponse | null>(null)
  const [explanation, setExplanation] = useState<Explanation | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [targetColumn, setTargetColumn] = useState<string>("")
  const [featureColumns, setFeatureColumns] = useState<string[]>([])
  const [problemType, setProblemType] = useState<"classification" | "regression">("classification")
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null)

  const value = {
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
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
