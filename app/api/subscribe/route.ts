/**
 * app/api/subscribe/route.ts
 *
 * POST /api/subscribe
 *   Body: { email: string }
 *
 * - Validates email strictly
 * - Rate-limits by IP (in-memory; swap for Redis in production)
 * - Hashes the IP before storage
 * - Deduplicates: silently succeeds on already-subscribed emails
 * - Persists to SQLite via Prisma + better-sqlite3
 * - Sends a confirmation email via Nodemailer / GoDaddy SMTP
 */

import { NextRequest, NextResponse } from 'next/server'
import { isEmail }                   from 'validator'
import { createHash }                from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { buildWaitlistEmail } from '@/lib/emailTemplate'

// ── Types ───────────────────────────────────────────────────────
interface RateLimitEntry {
  count:   number
  resetAt: number
}

type ApiResponse = { success: true } | { error: string }

// ── Rate limiter (in-memory) ────────────────────────────────────
// Production recommendation: replace with Upstash Redis + @upstash/ratelimit.
const ipMap = new Map<string, RateLimitEntry>()
const WINDOW_MS = 60 * 60 * 1_000 // 1 hour
const MAX_HITS  = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()

  // Periodic cleanup to prevent memory growth
  if (Math.random() < 0.05) {
    for (const [key, val] of ipMap) {
      if (now > val.resetAt) ipMap.delete(key)
    }
  }

  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_HITS) return false
  entry.count++
  return true
}

// ── IP hashing (privacy) ────────────────────────────────────────
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? 'miyu_fallback_salt'
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .slice(0, 16) // Store only 16 hex chars — enough for dedup, not enough to reverse
}

// ── Blocked disposable email domains ────────────────────────────
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'throwaway.email',
  'guerrillamail.com', 'sharklasers.com', 'trashmail.com',
  'yopmail.com', 'dispostable.com',
])

// ── Handler ─────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Rate limit
    const forwarded = req.headers.get('x-forwarded-for')
    const ip        = (forwarded ? forwarded.split(',')[0] : '').trim() || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'too many requests. slow down a little.' },
        { status: 429 }
      )
    }

    // 2. Parse body
    let body: unknown
    try { body = await req.json() }
    catch {
      return NextResponse.json({ error: 'invalid request body' }, { status: 400 })
    }

    const raw   = (body as Record<string, unknown>)?.email
    const email = typeof raw === 'string' ? raw.trim().toLowerCase() : ''

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    // 3. Validate format
    if (!isEmail(email, { allow_utf8_local_part: false })) {
      return NextResponse.json(
        { error: 'that doesn\'t look like a real email.' },
        { status: 400 }
      )
    }

    // 4. Block disposable domains
    const domain = email.split('@')[1]
    if (BLOCKED_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: 'please use a real email address.' },
        { status: 400 }
      )
    }

    // 5. Deduplicate — don't reveal whether it exists (prevents enumeration)
    const existing = await prisma.subscriber.findUnique({ where: { email } })
    if (existing) {
      // Return success but skip the email to avoid duplicate sends
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // 6. Persist to DB
    await prisma.subscriber.create({
      data: {
        email,
        ipHash: hashIp(ip),
        source: 'waitlist',
      },
    })

    // 7. Send confirmation email
    const { subject, html, text } = buildWaitlistEmail(email)
    await sendMail({ to: email, subject, html, text })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[POST /api/subscribe]', message)

    // Don't leak internals to the client
    return NextResponse.json(
      { error: 'something went wrong. try again in a bit.' },
      { status: 500 }
    )
  }
}

export function GET():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function PUT():    NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }
export function DELETE(): NextResponse { return NextResponse.json({ error: 'method not allowed' }, { status: 405 }) }