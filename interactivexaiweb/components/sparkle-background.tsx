"use client"

import { useEffect, useRef } from "react"

interface Sparkle {
  x: number
  y: number
  size: number
  opacity: number
  velocity: { x: number; y: number }
}

export default function SparkleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sparkles: Sparkle[] = []
    const sparkleCount = 50

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createSparkle = (): Sparkle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      },
    })

    const initSparkles = () => {
      sparkles.length = 0
      for (let i = 0; i < sparkleCount; i++) {
        sparkles.push(createSparkle())
      }
    }

    const updateSparkles = () => {
      sparkles.forEach((sparkle) => {
        sparkle.x += sparkle.velocity.x
        sparkle.y += sparkle.velocity.y
        sparkle.opacity += (Math.random() - 0.5) * 0.02

        if (sparkle.x < 0 || sparkle.x > canvas.width) sparkle.velocity.x *= -1
        if (sparkle.y < 0 || sparkle.y > canvas.height) sparkle.velocity.y *= -1
        if (sparkle.opacity <= 0 || sparkle.opacity >= 0.7) {
          sparkle.opacity = Math.max(0.1, Math.min(0.6, sparkle.opacity))
        }
      })
    }

    const drawSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparkles.forEach((sparkle) => {
        ctx.save()
        ctx.globalAlpha = sparkle.opacity
        ctx.fillStyle = "hsl(var(--primary))"
        ctx.beginPath()
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const animate = () => {
      updateSparkles()
      drawSparkles()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initSparkles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initSparkles()
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
