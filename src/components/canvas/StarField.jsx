/**
 * Star Field Canvas - Bầu trời sao xanh dương
 */

import React, { useEffect, useRef } from 'react'

export function StarField({ starCount = 200 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speedY = Math.random() * 0.5 + 0.1
        this.opacity = Math.random()
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.y += this.speedY
        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }

        this.opacity += this.twinkleSpeed
        if (this.opacity > 1 || this.opacity < 0.3) {
          this.twinkleSpeed *= -1
        }
      }

      draw() {
        ctx.fillStyle = `rgba(147, 197, 253, ${this.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#3b82f6'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [starCount])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: '#0f172a' }}
    />
  )
}
