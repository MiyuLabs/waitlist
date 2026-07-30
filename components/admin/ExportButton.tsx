'use client'

import { useState } from 'react'

export default function ExportButton() {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/subscribers')
      const data = await res.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      id="admin-export-btn"
      onClick={handleExport}
      disabled={loading}
      style={{
        background:    loading ? 'var(--amber-dim)' : 'var(--amber)',
        color:         'var(--text-ink)',
        border:        'none',
        borderRadius:  '6px',
        fontFamily:    'var(--font-syne)',
        fontWeight:    600,
        fontSize:      '12px',
        letterSpacing: '0.04em',
        padding:       '8px 18px',
        cursor:        loading ? 'not-allowed' : 'pointer',
        transition:    'background 0.15s ease, transform 0.1s ease',
        display:       'flex',
        alignItems:    'center',
        gap:           '6px',
      }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--amber-soft)' }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--amber)' }}
      onMouseDown={e  => { if (!loading) e.currentTarget.style.transform  = 'scale(0.97)' }}
      onMouseUp={e    => { e.currentTarget.style.transform  = 'scale(1)' }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {loading ? 'exporting…' : 'export json'}
    </button>
  )
}
