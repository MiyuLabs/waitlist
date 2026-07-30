/**
 * app/api/admin/subscribers/route.ts
 *
 * GET /api/admin/subscribers
 *
 * Returns all subscribers as JSON for programmatic / curl access.
 * Auth: admin_token cookie OR Authorization: Bearer <token> header.
 * ipHash is intentionally excluded from the response.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'

type Subscriber = {
  id:        number
  email:     string
  createdAt: Date
  source:    string
}

type ExportRow = Omit<Subscriber, 'createdAt'> & { createdAt: string }

function isAuthorised(req: NextRequest): boolean {
  const cookieToken = req.cookies.get('admin_token')?.value ?? ''
  const expected    = process.env.ADMIN_SECRET_TOKEN ?? ''
  if (expected.length === 0) return false
  if (cookieToken === expected) return true

  // Fallback: Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization') ?? ''
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : ''
  return bearerToken === expected
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 })
  }

  const subscribers: Subscriber[] = await prisma.subscriber.findMany({
    select: { id: true, email: true, createdAt: true, source: true },
    orderBy: { createdAt: 'asc' },
  })

  const data: ExportRow[] = subscribers.map(s => ({
    id:        s.id,
    email:     s.email,
    createdAt: s.createdAt.toISOString(),
    source:    s.source,
  }))

  return NextResponse.json(data, { status: 200 })
}

export function POST():   NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function PUT():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function DELETE(): NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
