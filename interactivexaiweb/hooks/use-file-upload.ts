"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/apiClient"

interface UploadResult {
  success: boolean
  file: {
    name: string
    size: number
    type: string
    lastModified: string
  }
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true)
    setProgress(0)
    setError(null)
    setResult(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 200)

      const response = await apiClient.uploadFile(file)

      clearInterval(progressInterval)
      setProgress(100)
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsUploading(false)
    setProgress(0)
    setResult(null)
    setError(null)
  }, [])

  return {
    uploadFile,
    isUploading,
    progress,
    result,
    error,
    reset,
  }
}
