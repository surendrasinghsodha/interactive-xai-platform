export interface UploadResponse {
  filename: string
  columns: string[]
  sample_data: Record<string, any>[]
}

export interface TrainResponse {
  model_id: string
  problem_type: string
  target_column: string
  feature_columns: string[]
  metrics: Record<string, any>
  sample_data_with_predictions: Record<string, any>[]
}

export interface Explanation {
  shap_values: any
  lime_explanation: any
}

export interface AppContextType {
  file: File | null
  setFile: (file: File | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isTraining: boolean
  setIsTraining: (training: boolean) => void
  trainingProgress: number
  setTrainingProgress: (progress: number) => void
  uploadResponse: UploadResponse | null
  setUploadResponse: (response: UploadResponse | null) => void
  trainResponse: TrainResponse | null
  setTrainResponse: (response: TrainResponse | null) => void
  explanation: Explanation | null
  setExplanation: (explanation: Explanation | null) => void
  selectedModel: string | null
  setSelectedModel: (model: string | null) => void
  targetColumn: string | null
  setTargetColumn: (column: string | null) => void
  featureColumns: string[]
  setFeatureColumns: (columns: string[]) => void
  problemType: "classification" | "regression"
  setProblemType: (type: "classification" | "regression") => void
  selectedRow: Record<string, any> | null
  setSelectedRow: (row: Record<string, any> | null) => void
}
