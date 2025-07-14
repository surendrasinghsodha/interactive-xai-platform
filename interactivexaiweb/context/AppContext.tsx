"use client"

import { createContext, useState, type ReactNode } from "react"
import type { UploadResponse, TrainResponse, Explanation, AppContextType } from "@/lib/types"

export const AppContext = createContext<AppContextType>(null!)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTraining, setIsTraining] = useState<boolean>(false)
  const [trainingProgress, setTrainingProgress] = useState<number>(0)
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null)
  const [trainResponse, setTrainResponse] = useState<TrainResponse | null>(null)
  const [explanation, setExplanation] = useState<Explanation | null>(null)

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
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
