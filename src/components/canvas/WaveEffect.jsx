/**
 * Wave Effect Canvas - Sóng xanh dương mượt mà
 */

import React, { useEffect, useRef } from 'react'

export function WaveEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawWave = (offset, amplitude, frequency, opacity, color) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x++) {
        const y = Math.sin((x + offset) * frequency) * amplitude + canvas.height - 100
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, canvas.height - 200, 0, canvas.height)
      gradient.addColorStop(0, `${color}00`)
      gradient.addColorStop(1, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
      
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.5

      // Multiple waves với màu xanh dương
      drawWave(time * 0.5, 30, 0.01, 0.1, '#3b82f6')
      drawWave(time * 0.7, 25, 0.012, 0.15, '#60a5fa')
      drawWave(time * 1, 20, 0.015, 0.2, '#93c5fd')

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 w-full -z-10 pointer-events-none"
      style={{ height: '300px' }}
    />
  )
}
