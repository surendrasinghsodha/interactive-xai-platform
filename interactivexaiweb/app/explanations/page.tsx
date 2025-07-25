import type { Metadata } from "next"
import ExplanationsClientPage from "./ExplanationsClientPage"

export const metadata: Metadata = {
  title: "Explanations",
  description: "Detailed explanations of various concepts.",
}

export default function ExplanationsPage() {
  return <ExplanationsClientPage />
}
