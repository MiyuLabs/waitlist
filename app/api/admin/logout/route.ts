/**
 * app/api/admin/logout/route.ts
 *
 * POST /api/admin/logout
 * Clears the admin_token cookie.
 */

import { NextResponse } from 'next/server'

export function POST(): NextResponse {
  const res = NextResponse.json({ success: true }, { status: 200 })
  res.cookies.set('admin_token', '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   0,
    path:     '/',
  })
  return res
}

export function GET():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function PUT():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function DELETE(): NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
