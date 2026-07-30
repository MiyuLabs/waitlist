'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-200 flex items-center justify-between px-10 py-5 w-full"
      style={{
        background:     'rgba(8,6,17,0.55)',
        backdropFilter: 'blur(14px)',
        borderBottom:   '1px solid var(--border)',
      }}
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="font-fraunces italic font-semibold text-xl text-text-1 no-underline"
        style={{ letterSpacing: '-0.02em' }}
      >
        Miyu<span style={{ color: 'var(--amber)' }}>Labs</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/team"
          className="font-syne text-text-3 no-underline transition-colors duration-200 hover:text-amber uppercase"
          style={{ fontSize: '0.68rem', letterSpacing: '0.15em' }}
        >
          the team
        </Link>

        <div
          className="flex items-center gap-2 font-pixel text-text-3"
          style={{ fontSize: '6.5px', letterSpacing: '0.12em' }}
          role="status"
          aria-label="Status: Standby"
        >
          <div
            className="w-[6px] h-[6px]"
            style={{
              background: 'var(--mint)',
              boxShadow:  '0 0 6px var(--mint)',
              animation:  'blink 1.4s step-end infinite',
            }}
            aria-hidden="true"
          />
          STANDBY
        </div>
      </div>
    </nav>
  )
}