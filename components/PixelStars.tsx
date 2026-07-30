'use client'
import { useEffect, useRef } from 'react'

interface PixelStarsProps {
  count?: number
}

const COLORS = [
  'var(--amber-soft)',
  'var(--pixel)',
  '#FFD4C8',
  'var(--mint)',
  'var(--text-3)',
] as const

const SIZES = [2, 2, 2, 4, 4, 4, 6] as const

export default function PixelStars({ count = 30 }: PixelStarsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      const sz   = SIZES[Math.floor(Math.random() * SIZES.length)]
      const col  = COLORS[Math.floor(Math.random() * COLORS.length)]
      const del  = Math.random() * 7
      const dur  = 3 + Math.random() * 4

      star.style.cssText = `
        position:absolute;
        width:${sz}px;height:${sz}px;
        background:${col};
        left:${Math.random() * 100}%;
        top:${3 + Math.random() * 88}%;
        opacity:${0.25 + Math.random() * 0.55};
        image-rendering:pixelated;
        animation:float ${dur}s ${del}s ease-in-out infinite;`

      el.appendChild(star)
    }

    return () => { el.innerHTML = '' }
  }, [count])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none z-1"
      aria-hidden="true"
    />
  )
}