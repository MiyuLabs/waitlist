'use client'
import { useEffect, useRef } from 'react'

export default function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const canvas  = document.createElement('canvas')
    canvas.width  = 220
    canvas.height = 220

    const ctx = canvas.getContext('2d')!
    const img = ctx.createImageData(220, 220)

    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }

    ctx.putImageData(img, 0, 0)
    el.style.backgroundImage = `url(${canvas.toDataURL()})`
    el.style.backgroundSize  = '220px 220px'
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-9998"
      style={{ opacity: 0.038, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    />
  )
}