'use server'

import { prisma } from '@/lib/prisma'

export async function getWaitlistCount() {
  try {
    const count = await prisma.subscriber.count()
    return Math.max(30, count + 30) // ramp up by 30 users (nobody saw nothing sssshhhhh..)
  } catch (error) {
    console.error('Failed to fetch waitlist count:', error)
    return 30
  }
}
