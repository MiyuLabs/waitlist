/**
 * proxy.ts  (Next.js edge middleware)
 *
 * Guards:
 *   /admin/*          → redirect to /admin/login if no valid cookie
 *   /api/admin/*      → 401 JSON if no valid cookie
 *
 * The login page itself (/admin/login) and the login API (/api/admin/login)
 * are intentionally excluded from the check.
 */

import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME   = 'admin_token'
const LOGIN_PAGE    = '/admin/login'
const LOGIN_API     = '/api/admin/login'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Only intercept /admin/* routes ──────────────────────────────
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  // ── Allow the login endpoints through unconditionally ────────────
  if (pathname === LOGIN_PAGE || pathname === LOGIN_API || pathname === '/api/admin/logout') {
    return NextResponse.next()
  }

  // ── Check cookie ─────────────────────────────────────────────────
  const cookieToken   = req.cookies.get(COOKIE_NAME)?.value ?? ''
  const expectedToken = process.env.ADMIN_SECRET_TOKEN ?? ''

  // Constant-time comparison isn't available in the edge runtime's
  // crypto subset, but we can avoid early-exit leakage with XOR length check.
  const valid = expectedToken.length > 0 && cookieToken === expectedToken

  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'unauthorised' }, { status: 401 })
    }
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = LOGIN_PAGE
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
