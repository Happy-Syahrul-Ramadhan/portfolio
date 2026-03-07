"use client"

import { useEffect, useState } from "react"

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ }
      setTrail((prev) => [...prev.slice(-8), newTrail])

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  // Clean up old trails
  useEffect(() => {
    if (trail.length > 0) {
      const timeout = setTimeout(() => {
        setTrail((prev) => prev.slice(1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [trail])

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isMoving ? 1 : 0,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(var(--primary-rgb, 99, 102, 241), 0.15) 0%, rgba(var(--primary-rgb, 99, 102, 241), 0.08) 25%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="pointer-events-none fixed z-40 animate-ping"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (index + 1) / trail.length,
            animationDuration: "0.8s",
          }}
        >
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: `${80 - index * 8}px`,
              height: `${80 - index * 8}px`,
              background:
                "radial-gradient(circle, rgba(var(--primary-rgb, 99, 102, 241), 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
      ))}

      {/* Small dot cursor */}
      <div
        className="pointer-events-none fixed z-50 transition-all duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isMoving ? 1 : 0,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40"
          style={{
            width: "8px",
            height: "8px",
            boxShadow: "0 0 20px rgba(var(--primary-rgb, 99, 102, 241), 0.6)",
          }}
        />
      </div>
    </>
  )
}
