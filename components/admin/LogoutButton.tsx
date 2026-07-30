'use client'

import { useRouter } from 'next/navigation'
import { useState }  from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <button
      id="admin-logout-btn"
      onClick={handleLogout}
      disabled={loading}
      style={{
        background:    'transparent',
        border:        '1px solid var(--border)',
        borderRadius:  '6px',
        color:         'var(--text-3)',
        fontFamily:    'var(--font-jakarta)',
        fontSize:      '12px',
        padding:       '6px 14px',
        cursor:        loading ? 'not-allowed' : 'pointer',
        transition:    'border-color 0.15s ease, color 0.15s ease',
        letterSpacing: '0.03em',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--rose)'
        e.currentTarget.style.color       = 'var(--rose)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color       = 'var(--text-3)'
      }}
    >
      {loading ? 'signing out…' : 'sign out'}
    </button>
  )
}
