'use client'

import { useState, useRef } from 'react'
import { useRouter }        from 'next/navigation'

export default function LoginForm() {
  const router        = useRouter()
  const inputRef      = useRef<HTMLInputElement>(null)
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const token = inputRef.current?.value.trim() ?? ''

    try {
      const res = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token }),
      })

      if (res.ok) {
        router.replace('/admin')
      } else {
        const json = await res.json().catch(() => ({}))
        setError((json as { error?: string }).error ?? 'invalid token.')
        setShaking(true)
        setTimeout(() => setShaking(false), 500)
        if (inputRef.current) inputRef.current.value = ''
      }
    } catch {
      setError('network error — try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      id="admin-login-form"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label
          htmlFor="admin-token-input"
          style={{
            fontFamily:    'var(--font-pixel)',
            fontSize:      '9px',
            letterSpacing: '0.12em',
            color:         'var(--text-3)',
            textTransform: 'uppercase',
          }}
        >
          Access Token
        </label>
        <input
          ref={inputRef}
          id="admin-token-input"
          type="password"
          autoComplete="current-password"
          spellCheck={false}
          required
          placeholder="········"
          style={{
            background:    'var(--dusk)',
            border:        '1px solid var(--border)',
            borderRadius:  '6px',
            color:         'var(--text-1)',
            fontFamily:    'monospace',
            fontSize:      '14px',
            padding:       '12px 14px',
            outline:       'none',
            width:         '100%',
            transition:    'border-color 0.18s ease',
            animation:     shaking ? 'shake 0.4s ease' : 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--amber)' }}
          onBlur={e  => { e.currentTarget.style.borderColor = 'var(--border)' }}
        />
      </div>

      {error && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize:   '12px',
            color:      'var(--rose)',
            margin:     0,
          }}
        >
          {error}
        </p>
      )}

      <button
        id="admin-login-submit"
        type="submit"
        disabled={loading}
        style={{
          background:    loading ? 'var(--amber-dim)' : 'var(--amber)',
          color:         'var(--text-ink)',
          border:        'none',
          borderRadius:  '6px',
          fontFamily:    'var(--font-syne)',
          fontWeight:    600,
          fontSize:      '13px',
          letterSpacing: '0.04em',
          padding:       '12px',
          cursor:        loading ? 'not-allowed' : 'pointer',
          transition:    'background 0.15s ease, transform 0.1s ease',
          width:         '100%',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--amber-soft)' }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--amber)' }}
        onMouseDown={e  => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)' }}
        onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {loading ? 'verifying…' : 'enter →'}
      </button>
    </form>
  )
}
