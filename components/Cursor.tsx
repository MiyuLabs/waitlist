'use client'
import { useEffect, useRef } from 'react'

const SPARKS = ['■', '✦', '★', '◆', '▪'] as const

export default function Cursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const throttleTs = useRef<number>(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if ('ontouchstart' in window) {
      cursor.style.display = 'none'
      return
    }

    document.body.style.cursor = 'none'

    function spawnSparkle(x: number, y: number): void {
      const now = Date.now()
      if (now - throttleTs.current < 38) return
      throttleTs.current = now

      const s   = document.createElement('span')
      const ox  = (Math.random() - 0.5) * 18
      const oy  = (Math.random() - 0.5) * 18
      const col = Math.random() > 0.5 ? 'var(--amber-soft)' : 'var(--pixel)'
      const sz  = 5 + Math.random() * 5

      s.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)]
      s.style.cssText = `
        position:fixed;left:${x + ox}px;top:${y + oy}px;
        font-size:${sz}px;color:${col};pointer-events:none;z-index:99997;
        animation:sparkleOut 0.5s ease forwards;
        transform:translate(-50%,-50%);
        font-family:var(--font-pixel);image-rendering:pixelated;`
      document.body.appendChild(s)
      setTimeout(() => s.remove(), 520)
    }

    const onMove  = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
      spawnSparkle(e.clientX, e.clientY)
    }
    const onDown  = () => cursor.classList.add('scale-75')
    const onUp    = () => cursor.classList.remove('scale-75')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-99999 transition-transform duration-75"
      style={{
        width:           8,
        height:          8,
        background:      'var(--amber)',
        boxShadow:       '0 0 10px var(--amber), 0 0 22px rgba(242,169,59,0.4)',
        transform:       'translate(-50%,-50%)',
        imageRendering:  'pixelated',
      }}
      aria-hidden="true"
    />
  )
}