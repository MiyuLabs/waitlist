'use client'

interface Subscriber {
  id:        number
  email:     string
  createdAt: string // ISO string — serialised by the server component
}

interface Props {
  subscribers: Subscriber[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  })
}

export default function SubscribersTable({ subscribers }: Props) {
  const total = subscribers.length

  if (total === 0) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '14px', color: 'var(--text-3)' }}>
          no subscribers yet — share the link!
        </p>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width:          '100%',
          borderCollapse: 'collapse',
          fontFamily:     'var(--font-jakarta)',
          fontSize:       '13px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['#', 'Email', 'Joined'].map(col => (
              <th
                key={col}
                style={{
                  padding:       '10px 20px',
                  textAlign:     'left',
                  fontFamily:    'var(--font-pixel)',
                  fontSize:      '8px',
                  letterSpacing: '0.1em',
                  color:         'var(--text-3)',
                  textTransform: 'uppercase',
                  fontWeight:    400,
                  whiteSpace:    'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub, idx) => (
            <tr
              key={sub.id}
              style={{ borderBottom: idx < total - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.12s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(242,169,59,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <td style={{ padding: '12px 20px', color: 'var(--text-3)', fontFamily: 'monospace', fontSize: '12px', width: '50px' }}>
                {total - idx}
              </td>
              <td style={{ padding: '12px 20px', color: 'var(--text-1)' }}>
                {sub.email}
              </td>
              <td style={{ padding: '12px 20px', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                {formatDate(sub.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
