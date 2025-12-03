"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random stars across the viewport
    const generateStars = () => {
      const newStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      }))
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <>
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl opacity-50 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-cyan-500/10 to-transparent rounded-full blur-3xl opacity-50 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-t from-violet-600/10 to-transparent rounded-full blur-3xl opacity-40 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating and twinkling stars */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "oklch(0.98 0 0)",
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: "0 0 6px oklch(0.98 0 0), 0 0 12px oklch(0.65 0.28 200)",
            }}
          />
        ))}
      </div>

      {/* Pulsating accent lights */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse-glow" />
        <div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse-glow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </>
  )
}
