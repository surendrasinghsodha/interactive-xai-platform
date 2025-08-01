export interface UploadResponse {
  columns: string[]
  sample_data: Record<string, any>[]
}

export interface TrainResponse {
  model_id: string
  message: string
  columns: string[]
  problem_type: "classification" | "regression"
  target_column: string
  numeric_columns: string[]
  sample_data: Record<string, any>[]
  model_performance: Record<string, any>
}

export interface ShapExplanation {
  features: string[]
  shap_values: number[]
  base_value: number
  explainer_type: string
  reliability_score?: number
}

export interface LimeExplanation {
  lime_explanation: Record<string, number>
  reliability_score?: number
}

export interface Explanation {
  shap: ShapExplanation
  lime: LimeExplanation
  overall_reliability?: number
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
  selectedModel: string | null
  setSelectedModel: (selectedModel: string | null) => void
  targetColumn: string | null
  setTargetColumn: (targetColumn: string | null) => void
  featureColumns: string[]
  setFeatureColumns: (featureColumns: string[]) => void
  problemType: "classification" | "regression"
  setProblemType: (problemType: "classification" | "regression") => void
  selectedRow: Record<string, any> | null
  setSelectedRow: (selectedRow: Record<string, any> | null) => void
}
