import type { Metadata } from 'next'
import LoginForm         from '@/components/admin/LoginForm'

export const metadata: Metadata = {
  title:  'Admin — MiyuLabs',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main
      style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'var(--midnight)',
        padding:        '24px',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position:      'fixed',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(242,169,59,0.07), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position:     'relative',
          width:        '100%',
          maxWidth:     '380px',
          background:   'var(--dusk)',
          border:       '1px solid var(--border-warm)',
          borderRadius: '12px',
          padding:      '36px 32px',
          animation:    'rise 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Top inner highlight */}
        <div
          aria-hidden
          style={{
            position:     'absolute',
            top: 0, left: 0, right: 0,
            height:       '1px',
            background:   'linear-gradient(90deg, transparent 0%, rgba(242,169,59,0.25) 50%, transparent 100%)',
            borderRadius: '12px 12px 0 0',
          }}
        />

        {/* Header */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily:    'var(--font-pixel)',
              fontSize:      '8px',
              color:         'var(--amber)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom:  '10px',
            }}
          >
            miyulabs · admin
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize:   '22px',
              color:      'var(--text-1)',
              margin:     0,
            }}
          >
            Dashboard Access
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize:   '13px',
              color:      'var(--text-3)',
              marginTop:  '6px',
            }}
          >
            enter your access token to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  )
}
