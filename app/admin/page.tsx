/**
 * app/admin/page.tsx  — Server Component
 *
 * Fetches subscriber list directly from Prisma at request time (SSR).
 * The proxy.ts middleware already guarantees only valid sessions reach here.
 * Interactive parts (table rows, buttons) are pushed into client components.
 */

import type { Metadata }   from 'next'
import { prisma }          from '@/lib/prisma'
import LogoutButton        from '@/components/admin/LogoutButton'
import ExportButton        from '@/components/admin/ExportButton'
import SubscribersTable    from '@/components/admin/SubscribersTable'

export const metadata: Metadata = {
  title:  'Admin — MiyuLabs',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const rows = await prisma.subscriber.findMany({
    select:  { id: true, email: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  // Serialise Dates to ISO strings before passing to the client component
  const subscribers = rows.map(r => ({
    id:        r.id,
    email:     r.email,
    createdAt: r.createdAt.toISOString(),
  }))

  const total = subscribers.length

  return (
    <main
      className="scrollbar-none"
      style={{
        height:     '100vh',
        background: 'var(--midnight)',
        color:      'var(--text-1)',
        overflowY:  'auto',
        overflowX:  'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position:      'fixed',
          inset:         0,
          background:    'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(242,169,59,0.06), transparent)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex:   1,
          maxWidth: '860px',
          margin:   '0 auto',
          padding:  '48px 24px 80px',
        }}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <header
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginBottom:   '40px',
            flexWrap:       'wrap',
            gap:            '12px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily:    'var(--font-pixel)',
                fontSize:      '8px',
                color:         'var(--amber)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '6px',
              }}
            >
              miyulabs · admin
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize:   'clamp(20px, 4vw, 28px)',
                margin:     0,
                color:      'var(--text-1)',
              }}
            >
              Waitlist
            </h1>
          </div>
          <LogoutButton />
        </header>

        {/* ── Stats strip ─────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div
            style={{
              background:   'var(--dusk)',
              border:       '1px solid var(--border)',
              borderRadius: '8px',
              padding:      '14px 22px',
              minWidth:     '130px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: '6px' }}>
              TOTAL
            </p>
            <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '28px', color: 'var(--amber)', margin: 0 }}>
              {total}
            </p>
          </div>
        </div>

        {/* ── Table card ──────────────────────────────────────── */}
        <div
          style={{
            background:   'var(--dusk)',
            border:       '1px solid var(--border)',
            borderRadius: '10px',
            overflow:     'hidden',
            position:     'relative',
          }}
        >
          {/* Top highlight */}
          <div
            aria-hidden
            style={{
              position:   'absolute',
              top: 0, left: 0, right: 0,
              height:     '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(242,169,59,0.2) 50%, transparent 100%)',
            }}
          />

          {/* Toolbar */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '16px 20px',
              borderBottom:   '1px solid var(--border)',
              flexWrap:       'wrap',
              gap:            '10px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>
              {total} {total === 1 ? 'subscriber' : 'subscribers'}
            </p>
            <ExportButton />
          </div>

          {/* Interactive table — client component */}
          <SubscribersTable subscribers={subscribers} />
        </div>
      </div>
    </main>
  )
}
