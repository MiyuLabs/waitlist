'use client'
import { useEffect, useState, RefObject } from 'react'

interface ScrollDotsProps {
  containerRef:  RefObject<HTMLDivElement | null>
  sectionCount:  number
}

export default function ScrollDots({ containerRef, sectionCount }: ScrollDotsProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActive(Math.min(idx, sectionCount - 1))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef, sectionCount])

  const scrollTo = (i: number) => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({
      top:      i * el.clientHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-300 flex flex-col gap-3"
      role="navigation"
      aria-label="Page sections"
    >
      {Array.from({ length: sectionCount }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to section ${i + 1}`}
          aria-current={active === i ? 'page' : undefined}
          onClick={() => scrollTo(i)}
          className="group relative flex items-center justify-center w-8 h-8 -mr-2"
          style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}
        >
          <div
            className="transition-all duration-500 ease-out rounded-full"
            style={{
              width: active === i ? '8px' : '5px',
              height: active === i ? '8px' : '5px',
              background: active === i ? 'var(--amber)' : 'var(--twilight)',
              boxShadow: active === i ? '0 0 15px var(--amber), 0 0 5px var(--amber-dim)' : 'none',
              transform: active === i ? 'scale(1.2)' : 'group-hover:scale(1.4)',
              opacity: active === i ? 1 : 0.4,
            }}
          />
          {/* External ring on hover */}
          <div 
            className="absolute inset-0 rounded-full border border-amber opacity-0 scale-50 transition-all duration-300 group-hover:opacity-20 group-hover:scale-75"
            style={{ borderColor: 'var(--amber)' }}
          />
        </button>
      ))}
    </div>
  )
}