/**
 * Floating Orbs Canvas - Các quả cầu xanh dương lơ lửng
 */

import React, { useEffect, useRef } from 'react'

export function FloatingOrbs({ count = 5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let orbs = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Orb {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 150 + 100
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.hue = Math.random() * 60 + 200 // Blue range
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX *= -1
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.speedY *= -1
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, 0.3)`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, 0.15)`)
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < count; i++) {
      orbs.push(new Orb())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        orb.update()
        orb.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
