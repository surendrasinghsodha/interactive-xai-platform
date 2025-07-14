import type { TrainResponse, InspectResponse, ExplainResponse, ExplainRequest } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "An unknown error occurred." }))
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const apiClient = {
  inspectCsv: async (file: File): Promise<InspectResponse> => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await fetch(`${API_BASE_URL}/inspect-csv`, {
      method: "POST",
      body: formData,
    })
    return handleResponse<InspectResponse>(response)
  },

  trainModel: async (file: File, modelType: string, targetColumn: string): Promise<TrainResponse> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("model_type", modelType)
    formData.append("target_column", targetColumn)
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: "POST",
      body: formData,
    })
    return handleResponse<TrainResponse>(response)
  },

  getExplanations: async (request: ExplainRequest): Promise<ExplainResponse> => {
    const response = await fetch(`${API_BASE_URL}/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
    return handleResponse<ExplainResponse>(response)
  },
}
