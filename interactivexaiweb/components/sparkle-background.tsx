"use client"

import { useState, useEffect } from "react"

type Sparkle = {
  id: number
  left: string
  top: string
  animationDelay: string
  animationDuration: string
  color: string
}

export function SparkleBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Generate sparkles only on the client side
    const generatedSparkles: Sparkle[] = []
    const colors = [
      "#f97316",
      "#ec4899",
      "#8b5cf6",
      "#06b6d4",
      "#10b981",
      "#fbbf24",
      "#f472b6",
      "#a78bfa",
      "#22d3ee",
      "#34d399",
    ]

    for (let i = 0; i < 30; i++) {
      generatedSparkles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setSparkles(generatedSparkles)
  }, [])

  // During server-side rendering, return empty div
  if (!isMounted) {
    return <div className="absolute inset-0" />
  }

  return (
    <div className="absolute inset-0 pointer-events-none" suppressHydrationWarning>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-3 h-3 rounded-full animate-sparkle-fall opacity-70"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.animationDelay,
            animationDuration: sparkle.animationDuration,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 6px ${sparkle.color}`,
          }}
        />
      ))}
    </div>
  )
}
