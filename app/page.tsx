'use client'
import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import Cursor       from '@/components/Cursor'
import GrainOverlay from '@/components/GrainOverlay'
import Navbar       from '@/components/Navbar'
import PixelStars   from '@/components/PixelStars'
import ScrollDots   from '@/components/ScrollDots'
import MiyuCat      from '@/components/MiyuCat'
import { getWaitlistCount } from '@/lib/actions'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'
type Accent      = 'amber' | 'rose' | 'mint'

// ── Sparkle burst helper ─────────────────────────────────────────
const SPARKS = ['■', '✦', '★', '◆'] as const

function burstSparkles() {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2

  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const s = document.createElement('span')
      s.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)]
      const x = cx + (Math.random() - 0.5) * 280
      const y = cy + (Math.random() - 0.5) * 200
      s.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        font-size:${6 + Math.random() * 6}px;
        color:${Math.random() > 0.5 ? 'var(--amber-soft)' : 'var(--pixel)'};
        pointer-events:none;z-index:99997;
        animation:sparkleOut 0.55s ease forwards;
        transform:translate(-50%,-50%);
        font-family:var(--font-pixel);`
      document.body.appendChild(s)
      setTimeout(() => s.remove(), 600)
    }, i * 28)
  }

  const ring = document.createElement('div')
  ring.style.cssText = `
    position:fixed;left:50%;top:50%;
    width:140px;height:140px;border-radius:50%;
    border:2px solid var(--amber);
    animation:burstRing 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
    pointer-events:none;z-index:99996;`
  document.body.appendChild(ring)
  setTimeout(() => ring.remove(), 700)
}

// ── Email Form ───────────────────────────────────────────────────
function EmailForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [errMsg, setErrMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = useCallback(async () => {
    if (state === 'loading' || state === 'success') return
    const val = email.trim()

    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      const inp = inputRef.current
      if (inp) {
        inp.style.borderColor = 'var(--rose)'
        inp.style.boxShadow   = '0 0 0 3px rgba(232,115,106,0.14)'
        setTimeout(() => {
          inp.style.borderColor = ''
          inp.style.boxShadow   = ''
        }, 1400)
      }
      setErrMsg("hmm. that doesn't look right.")
      return
    }

    setState('loading')
    setErrMsg('')

    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: val }),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'unknown error')
      setState('success')
      burstSparkles()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'something went wrong.'
      setState('error')
      setErrMsg(msg)
      setTimeout(() => { setState('idle'); setErrMsg('') }, 4500)
    }
  }, [email, state])

  if (state === 'success') {
    return (
      <p
        className="font-fraunces italic text-lg"
        style={{ color: 'var(--mint)', letterSpacing: '0.01em', animation: 'rise 0.6s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        we see you &nbsp;✦&nbsp; check your inbox
      </p>
    )
  }

  return (
    <div className="w-full max-w-[440px]">
      <p className="font-pixel text-text-3 mb-3 text-center md:text-left md:ml-1" style={{ fontSize: '10.5px', letterSpacing: '0.14em' }}>
        [ drop your interest ]
      </p>
      <div className="flex gap-2">
        <label htmlFor="email-input" className="sr-only">Email address</label>
        <input
          ref={inputRef}
          id="email-input"
          type="email"
          value={email}
          autoComplete="email"
          spellCheck={false}
          disabled={state === 'loading'}
          placeholder="your@email.com"
          onChange={e => { setEmail(e.target.value); setErrMsg('') }}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          className="flex-1 font-jakarta text-text-1 text-[0.92rem] rounded-[6px] px-4 py-[14px] outline-none transition-all duration-200"
          style={{ background: 'var(--dusk)', border: '1.5px solid var(--border)' }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--amber)'
            e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(242,169,59,0.14)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow   = 'none'
          }}
        />
        <button
          onClick={submit}
          disabled={state === 'loading'}
          className="font-syne font-bold text-[0.88rem] rounded-[6px] px-5 py-[14px] whitespace-nowrap transition-all duration-200 hover:-translate-y-px active:translate-y-0"
          style={{
            background:    'var(--amber)',
            color:         'var(--text-ink)',
            letterSpacing: '0.04em',
            boxShadow:     '0 0 0 1px var(--amber-dim), 0 4px 22px rgba(242,169,59,0.32), inset 0 1px 0 rgba(255,255,255,0.16)',
            cursor:        'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--amber-soft)'
            e.currentTarget.style.boxShadow  = '0 0 0 1px var(--amber), 0 6px 32px rgba(242,169,59,0.52), inset 0 1px 0 rgba(255,255,255,0.22)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--amber)'
            e.currentTarget.style.boxShadow  = '0 0 0 1px var(--amber-dim), 0 4px 22px rgba(242,169,59,0.32), inset 0 1px 0 rgba(255,255,255,0.16)'
          }}
        >
          {state === 'loading' ? '...' : "join waitlist →"}
        </button>
      </div>
      {errMsg && (
        <p className="mt-2 font-pixel" style={{ fontSize: '6.5px', letterSpacing: '0.1em', color: 'var(--rose)' }}>
          {errMsg}
        </p>
      )}
    </div>
  )
}

// ── Vibe Strip ───────────────────────────────────────────────────
interface VibeStripProps {
  icon:     string
  label:    string
  headline: ReactNode
  accent:   Accent
  index:    number
}

const ACCENT_COLORS: Record<Accent, string> = {
  amber: 'var(--amber)',
  rose:  'var(--rose)',
  mint:  'var(--mint)',
}

const GLOW_COLORS: Record<Accent, string> = {
  amber: 'rgba(242,169,59,0.10)',
  rose:  'rgba(232,115,106,0.09)',
  mint:  'rgba(94,207,174,0.08)',
}

function VibeStrip({ icon, label, headline, accent, index }: VibeStripProps) {
  const [hovered, setHovered] = useState(false)
  const color = ACCENT_COLORS[accent]
  const glow  = GLOW_COLORS[accent]

  return (
    <div
      className="group relative flex items-center px-12 md:px-20 transition-all duration-500 flex-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'default' }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 90% at 50% 50%, ${glow}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10 flex flex-col gap-2 mr-10 shrink-0">
        <span className="font-pixel text-text-3" style={{ fontSize: '12px', letterSpacing: '0.1em' }} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <span className="font-pixel" style={{ fontSize: '12px', letterSpacing: '0.08em', color }}>
          {icon}&nbsp;&nbsp;{label}
        </span>
      </div>
      <div className="relative z-10 flex-1">
        <p className="font-fraunces italic font-light text-text-1 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>
          {headline}
        </p>
      </div>
      <div
        className="relative z-10 ml-8 shrink-0 transition-all duration-300 font-pixel"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)', color, fontSize: '8px' }}
        aria-hidden="true"
      >
        →
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────
const SECTION_COUNT = 4

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

  useEffect(() => {
    getWaitlistCount().then(setWaitlistCount)
  }, [])

  return (
    <>
      <Cursor />
      <GrainOverlay />
      <Navbar />
      <ScrollDots containerRef={containerRef} sectionCount={SECTION_COUNT} />

      <div ref={containerRef} className="snap-container">

        {/* ── 1. Hero ──────────────────────────────────────────── */}
        <section className="snap-section scanlines flex flex-col items-center justify-center relative" aria-labelledby="hero-headline">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute animate-glow" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 860, height: 760, background: 'radial-gradient(ellipse 55% 55% at 50% 40%, rgba(242,169,59,0.10), transparent)' }} />
            <div className="absolute" style={{ bottom: '5%', right: '5%', width: 480, height: 480, background: 'radial-gradient(ellipse, rgba(232,115,106,0.07), transparent)' }} />
            <div className="absolute" style={{ top: '20%', left: '-8%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(94,207,174,0.04), transparent)' }} />
          </div>

          {/* Circuit lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.22 }} aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900" fill="none">
            <g stroke="rgba(53,44,88,0.8)" strokeWidth="0.6">
              <polyline points="0,280 180,280 180,180 420,180" /><circle cx="180" cy="280" r="3" fill="rgba(53,44,88,0.8)" /><circle cx="180" cy="180" r="3" fill="rgba(53,44,88,0.8)" /><circle cx="420" cy="180" r="3" fill="rgba(53,44,88,0.8)" />
              <polyline points="420,180 420,120 640,120" /><circle cx="640" cy="120" r="3.5" fill="rgba(139,111,212,0.5)" />
              <polyline points="1440,320 1240,320 1240,460 1050,460" /><circle cx="1240" cy="320" r="3" fill="rgba(53,44,88,0.8)" /><circle cx="1240" cy="460" r="3" fill="rgba(53,44,88,0.8)" /><circle cx="1050" cy="460" r="3.5" fill="rgba(242,169,59,0.3)" />
              <polyline points="80,680 280,680 280,780" /><circle cx="280" cy="680" r="3" fill="rgba(53,44,88,0.8)" />
              <polyline points="1360,720 1200,720 1200,640 1000,640" /><circle cx="1200" cy="720" r="3" fill="rgba(53,44,88,0.8)" /><circle cx="1200" cy="640" r="3" fill="rgba(53,44,88,0.8)" />
              <rect x="636" y="116" width="8" height="8" fill="rgba(139,111,212,0.35)" stroke="rgba(139,111,212,0.7)" />
              <rect x="1046" y="456" width="8" height="8" fill="rgba(242,169,59,0.15)" stroke="rgba(242,169,59,0.3)" />
            </g>
          </svg>

          <PixelStars count={28} />

          {/* Miyu */}
          <div className="relative z-3 mb-8 reveal-1" style={{ animation: 'float 5.5s ease-in-out infinite' }} aria-label="Miyu — coming soon">
            <div className="absolute animate-glow pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, background: 'radial-gradient(ellipse, rgba(242,169,59,0.22), transparent 65%)' }} aria-hidden="true" />
            <MiyuCat />
          </div>

          <div className="relative z-4 flex flex-col items-center text-center max-w-[680px] px-6">
            <h1 id="hero-headline" className="font-fraunces italic font-black text-text-1 reveal-2" style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
              something is<br />waking up
            </h1>
            <p className="font-fraunces italic font-light text-text-2 reveal-3" style={{ fontSize: 'clamp(1rem, 2.4vw, 1.45rem)', lineHeight: 1.65, marginBottom: 48 }}>
              for the ones still up at 3am
            </p>

            <div className="reveal-4 w-full flex justify-center">
              <EmailForm />
            </div>

            <div className="reveal-5 flex items-center gap-2.5 mt-5 rounded-full px-4 py-1.5" style={{ background: 'var(--dusk)', border: '1px solid var(--border)' }}>
              <div className="w-[6px] h-[6px]" style={{ background: 'var(--mint)', boxShadow: '0 0 6px var(--mint)', animation: 'blink 1.2s step-end infinite' }} aria-hidden="true" />
              <span className="font-pixel text-text-2" style={{ fontSize: '8px', letterSpacing: '0.07em' }}>
                <span style={{ color: 'var(--amber-soft)' }}>
                  {waitlistCount !== null ? waitlistCount.toLocaleString() : '...'}
                </span>&nbsp;people are curious
              </span>
            </div>
          </div>

          <div className="absolute bottom-7 left-1/2 flex flex-col items-center gap-2" style={{ transform: 'translateX(-50%)', animation: 'cueBob 2.4s ease-in-out infinite' }} aria-hidden="true">
            <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, var(--text-3), transparent)' }} />
            <span className="font-pixel text-text-3" style={{ fontSize: '6px', letterSpacing: '0.12em' }}>scroll</span>
          </div>
        </section>

        {/* ── 2. Hint ──────────────────────────────────────────── */}
        <section className="snap-section flex flex-col items-center justify-center relative" style={{ background: 'radial-gradient(ellipse 60% 70% at 85% 40%, var(--blush-dim), transparent), radial-gradient(ellipse 40% 50% at 15% 80%, var(--pixel-dim), transparent), var(--midnight)' }} aria-label="A hint about what we're building">
          <div className="flex flex-col items-center text-center max-w-[500px] px-6">
            <div className="sticker mb-9" aria-label="Coming soon">[ CLASSIFIED ]</div>
            <p className="font-fraunces italic font-light text-text-1" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.65 }}>
              a little companion.<br />
              for your{' '}
              <strong className="font-bold not-italic" style={{ color: 'var(--amber-soft)' }}>desk.</strong>
              <br />
              for your late nights.
            </p>
            <p className="font-fraunces italic text-text-3 mt-9" style={{ fontSize: '0.9rem' }}>— more soon</p>
          </div>
        </section>

        {/* ── 3. Vibes ─────────────────────────────────────────── */}
        <section className="snap-section flex flex-col justify-center relative" style={{ background: 'radial-gradient(ellipse 45% 60% at 15% 50%, rgba(94,207,174,0.04), transparent), radial-gradient(ellipse 40% 50% at 85% 70%, rgba(242,169,59,0.05), transparent), var(--midnight)' }} aria-label="What Miyu feels like">
          <p className="font-syne font-extrabold uppercase text-center my-6 px-6" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--amber)' }}>
            what it feels like
          </p>
          <div className="flex flex-col flex-1 justify-center">
            <div className="dither" />
            <VibeStrip icon="♨" label="VIBES" accent="amber" index={1} headline={<>chaos that <em>actually</em> hits. no noise, no distraction.</>} />
            <div className="dither" />
            <VibeStrip icon="☀" label="CONNECT" accent="rose" index={2} headline={<>heartbeats across seas. <span style={{ color: 'var(--text-2)' }}>no words needed.</span></>} />
            <div className="dither" />
            <VibeStrip icon="☘" label="FOCUS" accent="mint" index={3} headline={<>your 3am toolkit. <span style={{ color: 'var(--text-2)' }}>actually useful.</span></>} />
            <div className="dither" />
          </div>
        </section>

        {/* ── 4. Footer ────────────────────────────────────────── */}
        <section className="snap-section flex flex-col items-center relative" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(242,169,59,0.05), transparent), var(--midnight)' }} aria-label="Footer">
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <div className="text-center px-6 mb-16">
              <p className="font-fraunces italic font-light text-text-3 mb-4" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                built for the ones who are still up'
              </p>
              <p className="font-fraunces italic font-black text-text-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Miyu<span style={{ color: 'var(--amber)' }}>Labs</span>
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a href='https://instagram.com/atmiyulabs' className='font-syne text-text-3 no-underline transition-colors duration-200 hover:text-amber' style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}>Instagram</a>
              <a href='https://x.com/miyulabs' className='font-syne text-text-3 no-underline transition-colors duration-200 hover:text-amber' style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}>X</a>
              <a href='mailto:hi@miyulabs.in' className='font-syne text-text-3 no-underline transition-colors duration-200 hover:text-amber' style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}>Email</a>
            </div>
          </div>
          <div className="w-full mt-auto pb-8">
            <div className="dither w-full mb-8" />
            <p className="font-pixel text-text-3 text-center" style={{ fontSize: '9px', letterSpacing: '0.25em' }}>[ STANDBY — 2026 ]</p>
          </div>
        </section>
      </div>
    </>
  )
}