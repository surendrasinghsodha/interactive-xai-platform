"use client"

import { useState, useEffect } from "react"

type Sparkle = {
  left: string
  top: string
  animationDelay: string
  animationDuration: string
  background: string
}

export function SparkleBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const generatedSparkles: Sparkle[] = []
    for (let i = 0; i < 25; i++) {
      generatedSparkles.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
        background: `linear-gradient(45deg, ${
          ["#f97316", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"][Math.floor(Math.random() * 5)]
        }, ${["#fbbf24", "#f472b6", "#a78bfa", "#22d3ee", "#34d399"][Math.floor(Math.random() * 5)]})`,
      })
    }
    setSparkles(generatedSparkles)
  }, [])

  // Don't render anything until the component has mounted on the client
  if (!isMounted) {
    return <div className="absolute inset-0" />
  }

  return (
    <div className="absolute inset-0">
      {sparkles.map((sparkle, i) => (
        <div key={i} className="absolute w-3 h-3 rounded-full animate-sparkle" style={sparkle} />
      ))}
    </div>
  )
}
