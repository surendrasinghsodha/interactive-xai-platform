"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1

      // Set canvas to full viewport size
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      // Scale canvas back to normal size but with high DPI
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"

      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    // Enhanced star field with multiple layers - REDUCED STAR COUNT
    const starLayers: Array<{
      stars: Array<{
        x: number
        y: number
        size: number
        brightness: number
        twinkleSpeed: number
        parallaxSpeed: number
        type: "normal" | "bright" | "giant"
      }>
      speed: number
    }> = []

    // Create multiple star layers for depth - REDUCED COUNTS
    for (let layer = 0; layer < 4; layer++) {
      const starCount = layer === 0 ? 800 : layer === 1 ? 400 : layer === 2 ? 200 : 100 // Reduced from 2000, 800, 400, 200
      const stars = []

      for (let i = 0; i < starCount; i++) {
        const distance = Math.random()
        let size,
          brightness,
          type: "normal" | "bright" | "giant" = "normal"

        if (distance < 0.05) {
          size = 3 + Math.random() * 4
          brightness = 0.9 + Math.random() * 0.1
          type = "giant"
        } else if (distance < 0.15) {
          size = 1.5 + Math.random() * 2
          brightness = 0.7 + Math.random() * 0.3
          type = "bright"
        } else {
          size = 0.5 + Math.random() * 1.5
          brightness = 0.2 + Math.random() * 0.5
          type = "normal"
        }

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          brightness,
          twinkleSpeed: 0.5 + Math.random() * 2,
          parallaxSpeed: (4 - layer) * 0.1,
          type,
        })
      }

      starLayers.push({
        stars,
        speed: (4 - layer) * 0.2,
      })
    }

    // Galaxy structures - SLIGHTLY REDUCED
    const galaxies: Array<{
      x: number
      y: number
      rotation: number
      rotationSpeed: number
      size: number
      arms: number
      armSpread: number
      coreSize: number
      stars: Array<{
        angle: number
        radius: number
        brightness: number
        size: number
        armIndex: number
      }>
      driftX: number
      driftY: number
      driftSpeed: number
    }> = []

    // Create multiple galaxies - REDUCED FROM 6 TO 4
    const galaxyConfigs = [
      { x: 0.2, y: 0.3, size: 250, arms: 4 },
      { x: 0.8, y: 0.7, size: 200, arms: 3 },
      { x: 0.1, y: 0.8, size: 150, arms: 5 },
      { x: 0.9, y: 0.2, size: 180, arms: 2 },
    ]

    galaxyConfigs.forEach((config) => {
      const galaxy = {
        x: config.x * window.innerWidth,
        y: config.y * window.innerHeight,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        size: config.size,
        arms: config.arms,
        armSpread: 0.3 + Math.random() * 0.4,
        coreSize: config.size * 0.1,
        stars: [] as any[],
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.1,
        driftSpeed: 0.02 + Math.random() * 0.03,
      }

      // Generate spiral arms - REDUCED STARS PER ARM
      for (let arm = 0; arm < galaxy.arms; arm++) {
        const armAngle = (arm / galaxy.arms) * Math.PI * 2
        const starsInArm = 80 + Math.random() * 60 // Reduced from 150 + 100

        for (let i = 0; i < starsInArm; i++) {
          const t = Math.random()
          const radius = t * galaxy.size * (0.3 + Math.random() * 0.7)
          const angle = armAngle + t * Math.PI * 4 * galaxy.armSpread + (Math.random() - 0.5) * 0.5

          galaxy.stars.push({
            angle,
            radius,
            brightness: Math.max(0.1, 1 - t + Math.random() * 0.3),
            size: 0.5 + Math.random() * (3 - t * 2),
            armIndex: arm,
          })
        }
      }

      // Add core stars - REDUCED
      for (let i = 0; i < 50; i++) {
        // Reduced from 80
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * galaxy.coreSize

        galaxy.stars.push({
          angle,
          radius,
          brightness: 0.8 + Math.random() * 0.2,
          size: 1 + Math.random() * 2,
          armIndex: -1, // Core star
        })
      }

      galaxies.push(galaxy)
    })

    // Nebula clouds - REDUCED
    const nebulae: Array<{
      x: number
      y: number
      size: number
      opacity: number
      drift: { x: number; y: number }
      particles: Array<{
        x: number
        y: number
        size: number
        opacity: number
      }>
    }> = []

    for (let i = 0; i < 5; i++) {
      // Reduced from 8
      const nebula = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 200 + Math.random() * 300,
        opacity: 0.1 + Math.random() * 0.2,
        drift: {
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
        },
        particles: [] as any[],
      }

      // Generate nebula particles - REDUCED
      for (let j = 0; j < 30; j++) {
        // Reduced from 50
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * nebula.size
        nebula.particles.push({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 10 + Math.random() * 30,
          opacity: Math.random() * 0.3,
        })
      }

      nebulae.push(nebula)
    }

    // ENHANCED SHOOTING STARS
    const shootingStars: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      brightness: number
      size: number
      color: string
      trail: Array<{ x: number; y: number; opacity: number }>
    }> = []

    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4)
      let x, y, vx, vy

      // Enhanced speed and variety
      const baseSpeed = 3 + Math.random() * 6

      switch (side) {
        case 0: // Top
          x = Math.random() * window.innerWidth
          y = -50
          vx = (Math.random() - 0.5) * baseSpeed
          vy = baseSpeed + Math.random() * 3
          break
        case 1: // Right
          x = window.innerWidth + 50
          y = Math.random() * window.innerHeight
          vx = -baseSpeed - Math.random() * 3
          vy = (Math.random() - 0.5) * baseSpeed
          break
        case 2: // Bottom
          x = Math.random() * window.innerWidth
          y = window.innerHeight + 50
          vx = (Math.random() - 0.5) * baseSpeed
          vy = -baseSpeed - Math.random() * 3
          break
        default: // Left
          x = -50
          y = Math.random() * window.innerHeight
          vx = baseSpeed + Math.random() * 3
          vy = (Math.random() - 0.5) * baseSpeed
      }

      // Different types of shooting stars
      const starType = Math.random()
      let color = "white"
      let size = 2 + Math.random() * 3
      let brightness = 0.8 + Math.random() * 0.2

      if (starType < 0.1) {
        // Rare golden shooting star
        color = "#FFD700"
        size = 4 + Math.random() * 3
        brightness = 1.0
      } else if (starType < 0.3) {
        // Blue-white shooting star
        color = "#E6F3FF"
        size = 3 + Math.random() * 2
        brightness = 0.9
      }

      shootingStars.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 40 + Math.random() * 80, // Slightly shorter life for more frequent stars
        brightness,
        size,
        color,
        trail: [],
      })
    }

    const animate = () => {
      time += 0.016

      // Clear with deep space black
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw nebulae first (background)
      nebulae.forEach((nebula) => {
        nebula.x += nebula.drift.x
        nebula.y += nebula.drift.y

        // Wrap around screen
        if (nebula.x < -nebula.size) nebula.x = window.innerWidth + nebula.size
        if (nebula.x > window.innerWidth + nebula.size) nebula.x = -nebula.size
        if (nebula.y < -nebula.size) nebula.y = window.innerHeight + nebula.size
        if (nebula.y > window.innerHeight + nebula.size) nebula.y = -nebula.size

        ctx.save()
        ctx.globalAlpha = nebula.opacity * (0.7 + 0.3 * Math.sin(time * 0.5))

        nebula.particles.forEach((particle) => {
          const gradient = ctx.createRadialGradient(
            nebula.x + particle.x,
            nebula.y + particle.y,
            0,
            nebula.x + particle.x,
            nebula.y + particle.y,
            particle.size,
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`)
          gradient.addColorStop(1, "transparent")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(nebula.x + particle.x, nebula.y + particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })

        ctx.restore()
      })

      // Draw star layers with parallax
      starLayers.forEach((layer, layerIndex) => {
        layer.stars.forEach((star) => {
          // Parallax movement
          star.x -= layer.speed * time * 0.1
          if (star.x < -10) {
            star.x = window.innerWidth + 10
            star.y = Math.random() * window.innerHeight
          }

          const twinkle = 0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.x * 0.01)
          const brightness = star.brightness * twinkle

          ctx.save()
          ctx.globalAlpha = brightness * (0.3 + layerIndex * 0.2)

          // Different rendering based on star type
          if (star.type === "giant") {
            // Giant stars with diffraction spikes
            ctx.strokeStyle = `rgba(255, 255, 255, ${brightness})`
            ctx.lineWidth = 0.5
            ctx.globalAlpha = brightness * 0.6

            // Cross pattern
            ctx.beginPath()
            ctx.moveTo(star.x - star.size * 4, star.y)
            ctx.lineTo(star.x + star.size * 4, star.y)
            ctx.moveTo(star.x, star.y - star.size * 4)
            ctx.lineTo(star.x, star.y + star.size * 4)
            ctx.stroke()

            // Diagonal spikes
            ctx.beginPath()
            ctx.moveTo(star.x - star.size * 2, star.y - star.size * 2)
            ctx.lineTo(star.x + star.size * 2, star.y + star.size * 2)
            ctx.moveTo(star.x + star.size * 2, star.y - star.size * 2)
            ctx.lineTo(star.x - star.size * 2, star.y + star.size * 2)
            ctx.stroke()
          }

          // Star core
          ctx.globalAlpha = brightness
          ctx.fillStyle = "white"
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()

          // Glow for bright stars
          if (star.type === "bright" || star.type === "giant") {
            const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 6)
            glowGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.3})`)
            glowGradient.addColorStop(1, "transparent")

            ctx.fillStyle = glowGradient
            ctx.globalAlpha = brightness * 0.4
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        })
      })

      // Draw galaxies
      galaxies.forEach((galaxy) => {
        // Update galaxy position and rotation
        galaxy.rotation += galaxy.rotationSpeed
        galaxy.x += Math.sin(time * galaxy.driftSpeed) * galaxy.driftX
        galaxy.y += Math.cos(time * galaxy.driftSpeed * 1.3) * galaxy.driftY

        ctx.save()
        ctx.translate(galaxy.x, galaxy.y)
        ctx.rotate(galaxy.rotation)

        // Draw galaxy core
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.coreSize)
        coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        coreGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)")
        coreGradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")

        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(0, 0, galaxy.coreSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw spiral arms and stars
        galaxy.stars.forEach((star) => {
          const x = Math.cos(star.angle + time * 0.1) * star.radius
          const y = Math.sin(star.angle + time * 0.1) * star.radius

          ctx.save()
          ctx.globalAlpha = star.brightness * (0.4 + 0.6 * Math.sin(time * 2 + star.angle))
          ctx.fillStyle = "white"
          ctx.beginPath()
          ctx.arc(x, y, star.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        ctx.restore()
      })

      // ENHANCED SHOOTING STAR CREATION - MORE FREQUENT
      if (Math.random() < 0.008) {
        // Increased from 0.003 to 0.008
        createShootingStar()
      }

      // Update and draw shooting stars with enhanced effects
      shootingStars.forEach((star, index) => {
        star.x += star.vx
        star.y += star.vy
        star.life++

        // Add to trail with more points
        star.trail.unshift({ x: star.x, y: star.y, opacity: star.brightness })
        if (star.trail.length > 30) star.trail.pop() // Longer trail

        // Draw enhanced trail
        star.trail.forEach((point, i) => {
          const trailOpacity = point.opacity * (1 - i / star.trail.length) * (1 - star.life / star.maxLife)
          if (trailOpacity > 0.01) {
            ctx.save()
            ctx.globalAlpha = trailOpacity

            // Create gradient for trail
            const trailGradient = ctx.createRadialGradient(
              point.x,
              point.y,
              0,
              point.x,
              point.y,
              Math.max(1, star.size - i * 0.1),
            )
            trailGradient.addColorStop(0, star.color)
            trailGradient.addColorStop(1, "transparent")

            ctx.fillStyle = trailGradient
            ctx.beginPath()
            ctx.arc(point.x, point.y, Math.max(0.5, star.size - i * 0.1), 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        })

        // Draw main shooting star with glow
        ctx.save()
        ctx.globalAlpha = star.brightness * (1 - star.life / star.maxLife)

        // Outer glow
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4)
        glowGradient.addColorStop(0, star.color)
        glowGradient.addColorStop(1, "transparent")

        ctx.fillStyle = glowGradient
        ctx.globalAlpha = star.brightness * 0.3 * (1 - star.life / star.maxLife)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.globalAlpha = star.brightness * (1 - star.life / star.maxLife)
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Remove if expired or off screen
        if (
          star.life > star.maxLife ||
          star.x < -100 ||
          star.x > window.innerWidth + 100 ||
          star.y < -100 ||
          star.y > window.innerHeight + 100
        ) {
          shootingStars.splice(index, 1)
        }
      })

      // Add subtle film grain for cinematic quality
      if (Math.random() < 0.05) {
        // Reduced frequency
        ctx.save()
        ctx.globalAlpha = 0.015
        ctx.fillStyle = Math.random() > 0.5 ? "white" : "black"
        for (let i = 0; i < 25; i++) {
          // Reduced grain particles
          ctx.beginPath()
          ctx.arc(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            Math.random() * 0.5,
            0,
            Math.PI * 2,
          )
          ctx.fill()
        }
        ctx.restore()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{
        background: "#000000",
        imageRendering: "crisp-edges",
        pointerEvents: "none",
      }}
    />
  )
}
