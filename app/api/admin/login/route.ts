/**
 * app/api/admin/login/route.ts
 *
 * POST /api/admin/login
 *   Body: { token: string }
 *
 * - Rate-limited: 5 attempts / 15 min per IP
 * - Uses timingSafeEqual to prevent timing oracle attacks
 * - Sets HttpOnly; Secure; SameSite=Strict cookie on success
 */

import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual }           from 'crypto'

// ── Rate limiter (in-memory) ────────────────────────────────────
interface RateLimitEntry { count: number; resetAt: number }
const loginAttempts = new Map<string, RateLimitEntry>()
const LOGIN_WINDOW_MS = 15 * 60 * 1_000 // 15 minutes
const LOGIN_MAX_HITS  = 5

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = loginAttempts.get(ip)
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS })
    return true
  }
  if (entry.count >= LOGIN_MAX_HITS) return false
  entry.count++
  return true
}

// ── Handler ─────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Rate limit
  const forwarded = req.headers.get('x-forwarded-for')
  const ip        = (forwarded ? forwarded.split(',')[0] : '').trim() || 'unknown'

  if (!checkLoginRateLimit(ip)) {
    return NextResponse.json(
      { error: 'too many attempts. try again later.' },
      { status: 429 }
    )
  }

  // 2. Parse body
  let body: unknown
  try { body = await req.json() }
  catch {
    return NextResponse.json({ error: 'invalid request body' }, { status: 400 })
  }

  const submittedToken = typeof (body as Record<string, unknown>)?.token === 'string'
    ? ((body as Record<string, unknown>).token as string).trim()
    : ''

  // 3. Timing-safe comparison
  const expectedToken = process.env.ADMIN_SECRET_TOKEN ?? ''

  let valid = false
  if (expectedToken.length > 0 && submittedToken.length > 0) {
    try {
      const a = Buffer.from(expectedToken, 'utf8')
      const b = Buffer.from(submittedToken.padEnd(expectedToken.length, '\0').slice(0, expectedToken.length), 'utf8')
      valid   = a.length === b.length && timingSafeEqual(a, b) && submittedToken === expectedToken
    } catch {
      valid = false
    }
  }

  if (!valid) {
    return NextResponse.json({ error: 'invalid token.' }, { status: 401 })
  }

  // 4. Set cookie
  const maxAge = parseInt(process.env.ADMIN_COOKIE_MAX_AGE ?? '604800', 10)

  const res = NextResponse.json({ success: true }, { status: 200 })
  res.cookies.set('admin_token', expectedToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
    path:     '/',
  })
  return res
}

export function GET():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function PUT():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function DELETE(): NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
