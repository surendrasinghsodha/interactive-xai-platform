export interface UploadResponse {
  columns: string[]
  sample_data: Record<string, any>[]
}

export interface TrainResponse {
  model_id: string
  message: string
  columns: string[]
  problem_type: string
  target_column: string
  numeric_columns: string[]
  sample_data: Record<string, any>[]
}

export interface ShapExplanation {
  features: string[]
  shap_values: number[]
  base_value: number
  explainer_type: string
}

export interface LimeExplanation {
  lime_explanation: { [feature: string]: number }
}

export interface Explanation {
  shap: ShapExplanation
  lime: LimeExplanation
}

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
}
