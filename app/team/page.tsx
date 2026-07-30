'use client'
import { useRef, useState, useEffect } from 'react'
import Link         from 'next/link'
import Image from 'next/image'
import Cursor       from '@/components/Cursor'
import GrainOverlay from '@/components/GrainOverlay'
import Navbar       from '@/components/Navbar'
import ScrollDots   from '@/components/ScrollDots'

// ── Types ────────────────────────────────────────────────────────
type AccentKey = 'amber' | 'mint' | 'pixel' | 'rose'

interface Social {
  label: string
  href:  string
}

interface TeamMember {
  id:       string
  num:      string
  name:     string
  title:    string
  role:     string
  bio:      string
  social:   Social
  accent:   AccentKey
  initials: string
}

interface AccentStyle {
  glow:   string
  color:  string
  soft:   string
  bg:     string
  border: string
  initBg: string
}

// ── Data ─────────────────────────────────────────────────────────
// Replace `social.href` with real URLs.
// Place team photos at /public/team/{id}.jpg (400×500 recommended)
// and swap the initials avatar for <Image /> once you have them.
const TEAM: TeamMember[] = [
  {
    id:       'rudransh',
    num:      '01',
    name:     'Rudransh Joshi',
    title:    'sleepyhead engineer',
    role:     'Systems & Engineering',
    bio:      'a guy obsessed with cats. writes the software, obsesses over the hardware, designs at 4am, and somehow still finds new problems to solve for fun. if miyu has a soul, this guy probably wired it in himself.',
    social:   { label: '↝ rudraxd.in', href: 'https://rudraxd.in' },
    accent:   'amber',
    initials: 'RJ',
  },
  {
    id:       'uttam',
    num:      '02',
    name:     'Uttam Tiwari',
    title:    'bro with the north star',
    role:     'Directions & Decisions',
    bio:      'keeps the vision clean, gets everyone on the same page, and somehow makes the chaos behave. takes random half-baked ideas and turns them into actual plans, actual work, actual results. when miyu is lost on what to do next, he’s usually the guy pointing ahead like, “trust me bro, we got this.”',
    social:   { label: '↝ instagram', href: 'https://instagram.com/_uttam.tiwari_' },
    accent:   'mint',
    initials: 'UT',
  },
  {
    id:       'manish',
    num:      '03',
    name:     'Maneesh Bisht',
    title:    'the one with too many tabs open',
    role:     'Systems & Management',
    bio:      "floats somewhere between design brain, engineering support, and spreadsheet wizardry. this guy makes sure miyu feels right, looks right, and never — ever — ships ugly. if it doesn't look good, it doesn't leave the room. miyu's unofficial damage control department.",
    social:   { label: '↝ instagram', href: 'https://instagram.com/maneeshbisht_' },
    accent:   'pixel',
    initials: 'MB',
  },
  {
    id:       'neha',
    num:      '04',
    name:     'Neha Kumari',
    title:    'internet ambulance',
    role:     'Brand & Community',
    bio:      "somewhere between strategist, creative brain, and professional overthinker. bro makes sure miyu feels alive outside the screen too — shaping the vibe, planning the moves, and making chaos look suspiciously organized.",
    social:   { label: '↝ instagram', href: 'https://instagram.com/__total_dreamrr__' },
    accent:   'rose',
    initials: 'NK',
  },
]

const ACCENTS: Record<AccentKey, AccentStyle> = {
  amber: { glow: 'rgba(242,169,59,0.12)',  color: 'var(--amber)',  soft: 'var(--amber-soft)', bg: 'rgba(242,169,59,0.10)',  border: 'rgba(242,169,59,0.25)',  initBg: '#352010' },
  mint:  { glow: 'rgba(94,207,174,0.10)',  color: 'var(--mint)',   soft: '#7DDEC0',            bg: 'rgba(94,207,174,0.08)', border: 'rgba(94,207,174,0.22)',  initBg: '#0D2E25' },
  pixel: { glow: 'rgba(139,111,212,0.12)', color: 'var(--pixel)',  soft: '#A08DE0',            bg: 'rgba(139,111,212,0.08)',border: 'rgba(139,111,212,0.22)', initBg: '#1E1535' },
  rose:  { glow: 'rgba(232,115,106,0.10)', color: 'var(--rose)',   soft: '#EE9089',            bg: 'rgba(232,115,106,0.08)',border: 'rgba(232,115,106,0.22)', initBg: '#2E1210' },
}

// ── Polaroid ──────────────────────────────────────────────────────
interface PolaroidProps {
  member:  TeamMember
  visible: boolean
}

function Polaroid({ member, visible }: PolaroidProps) {
  const a = ACCENTS[member.accent]
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        background:    '#F0EDE6',
        padding:       '14px 14px 44px',
        boxShadow:     '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        transform:     'rotate(-2deg)',
        animation:     visible ? 'polaroidReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none',
        opacity:       visible ? undefined : 0,
        width:         200,
        flexShrink:    0,
        position:      'relative',
      }}
    >
      <div
        style={{
          width:          172,
          height:         200,
          background:     a.initBg,
          border:         `1px solid ${a.border}`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        
        <Image src={`/team/${member.id}.jpg`} fill unoptimized alt={member.name} style={{ objectFit: 'cover' }} />      
      </div>
      <p style={{ position: 'absolute', bottom: 15, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: 8, color: '#5E5878', letterSpacing: '0.1em' }}>
        {member.id.toUpperCase()}.jpg
      </p>
    </div>
  )
}

// ── Member Section ────────────────────────────────────────────────
interface MemberSectionProps {
  member:  TeamMember
  visible: boolean
}

function MemberSection({ member, visible }: MemberSectionProps) {
  const a = ACCENTS[member.accent]
  return (
    <section
      className="snap-section relative flex items-center justify-center px-8 md:px-20"
      style={{ background: `radial-gradient(ellipse 65% 60% at 30% 50%, ${a.glow}, transparent), radial-gradient(ellipse 40% 50% at 80% 70%, rgba(8,6,17,0.8), transparent), var(--midnight)` }}
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Ghost number */}
      <div
        className="absolute select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily:    'var(--font-fraunces)',
          fontStyle:     'italic',
          fontWeight:    900,
          fontSize:      'clamp(18rem, 40vw, 32rem)',
          color:         a.color,
          opacity:       0.035,
          lineHeight:    1,
          right:         '-2%',
          top:           '50%',
          transform:     'translateY(-50%)',
          letterSpacing: '-0.06em',
          userSelect:    'none',
        }}
      >
        {member.num}
      </div>

      <div
        className="
          relative z-10 flex flex-col items-center text-center
          md:flex-row md:items-center md:text-left
          gap-10 md:gap-20 max-w-5xl w-full
        "
      >
        {/* Polaroid */}
        <div className="shrink-0">
          <Polaroid member={member} visible={visible} />
        </div>

        {/* Info */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-pixel mb-5 ml-0 sm:mb-3 ml-2" style={{ fontSize: '8px', letterSpacing: '0.14em', color: a.color, opacity: 0.85 }}>
            {member.role.toUpperCase()}
          </p>

          <h2 className="font-fraunces italic font-black text-text-1" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            {member.name}
          </h2>

          <p className="font-fraunces italic font-light" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)', color: a.soft, marginBottom: 28, lineHeight: 1.4 }}>
            {member.title}
          </p>

          <div style={{ width: '100%', height: 1, marginBottom: 24, background: `repeating-linear-gradient(90deg, ${a.border} 0px, ${a.border} 3px, transparent 3px, transparent 9px)` }} />

          <p className="font-jakarta text-text-2" style={{ fontSize: '0.94rem', lineHeight: 1.85, maxWidth: 460, width: '100%', marginBottom: 40 }}>
            {member.bio}
          </p>

          <a
            href={member.social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-syne font-semibold no-underline inline-flex items-center gap-2 transition-all duration-200"
            style={{ fontSize: '0.82rem', letterSpacing: '0.06em', color: a.color, borderBottom: `1.5px solid ${a.border}`, paddingBottom: 2, width: 'fit-content' }}
            onMouseEnter={e => { e.currentTarget.style.color = a.soft; e.currentTarget.style.borderBottomColor = a.soft }}
            onMouseLeave={e => { e.currentTarget.style.color = a.color; e.currentTarget.style.borderBottomColor = a.border }}
          >
            {member.social.label}
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────
const SECTION_COUNT = TEAM.length + 2 // intro + 4 members + outro

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActiveIdx(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />
      <GrainOverlay />
      <Navbar />
      <ScrollDots containerRef={containerRef} sectionCount={SECTION_COUNT} />

      <div ref={containerRef} className="snap-container">

        {/* ── Intro ────────────────────────────────────────────── */}
        <section
          className="snap-section flex flex-col items-center justify-center relative"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 40%, rgba(242,169,59,0.08), transparent), var(--midnight)' }}
          aria-label="Team introduction"
        >
          <div className="text-center px-6">
            <p className="font-pixel text-text-3 mb-8" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>[ PERSONNEL DATABASE ]</p>
            <h1 className="font-fraunces italic font-black text-text-1 mb-5" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              the people<br />
              <span style={{ color: 'var(--amber)' }}>behind the glow</span>
            </h1>
            <p className="font-fraunces italic font-light text-text-2 mb-12" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', lineHeight: 1.65 }}>
              four people. one obsession. no sleep.
            </p>
            <div className="flex flex-col items-center gap-2" aria-hidden="true">
              <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, var(--amber), transparent)' }} />
              <span className="font-pixel text-amber" style={{ fontSize: '7px', letterSpacing: '0.14em' }}>scroll to meet them</span>
            </div>
          </div>
          <span className="absolute top-8 left-10 font-pixel text-text-3" style={{ fontSize: '6.5px', letterSpacing: '0.1em' }} aria-hidden="true">4 RECORDS FOUND</span>
          <span className="absolute bottom-8 right-10 font-pixel text-text-3" style={{ fontSize: '6.5px', letterSpacing: '0.1em' }} aria-hidden="true">MIYULABS · 2026</span>
        </section>

        {/* ── Team members ─────────────────────────────────────── */}
        {TEAM.map((member, i) => (
          <MemberSection key={member.id} member={member} visible={activeIdx === i + 1} />
        ))}

        {/* ── Outro ────────────────────────────────────────────── */}
        <section
          className="snap-section flex flex-col items-center justify-center relative px-8"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(139,111,212,0.07), transparent), var(--midnight)' }}
          aria-label="Join us"
        >
          <div className="text-center max-w-lg">
            <p className="font-pixel text-text-3 mb-8" style={{ fontSize: '8px', letterSpacing: '0.16em' }}>[ END OF FILE ]</p>
            <h2 className="font-fraunces italic font-black text-text-1 mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              and miyu<br />
              <span style={{ color: 'var(--pixel)' }}>is coming</span>
            </h2>
            <p className="font-fraunces italic font-light text-text-2 mb-10" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              we're building something we & you actually want to exist.<br />
              come wait with us.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 no-underline font-syne font-bold rounded-[6px] px-7 py-4 transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'var(--amber)', color: 'var(--text-ink)', fontSize: '0.88rem', letterSpacing: '0.04em', boxShadow: '0 0 0 1px var(--amber-dim), 0 4px 22px rgba(242,169,59,0.32)' }}
            >
              join waitlist →
            </Link>
          </div>

          <div className="absolute bottom-10 flex items-center gap-6" aria-hidden="true">
            {TEAM.map(m => {
              const a = ACCENTS[m.accent]
              return (
                <div
                  key={m.id}
                  className="flex items-center justify-center font-pixel"
                  style={{ width: 34, height: 34, background: a.initBg, border: `1px solid ${a.border}`, fontSize: 8, color: a.color, letterSpacing: '0.04em' }}
                >
                  {m.initials}
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </>
  )
}