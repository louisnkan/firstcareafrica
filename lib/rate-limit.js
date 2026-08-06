import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// One shared Redis client for the whole app.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

// Matches the original in-memory limit in app/api/chat/route.js (10 / 60s)
export const chatRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  prefix: 'fca:chat'
})

// Matches the original in-memory limit in app/api/triage/route.js (15 / 60s)
export const triageRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(15, '60 s'),
  analytics: true,
  prefix: 'fca:triage'
})

// Call this at the top of a POST handler, after the CORS check.
// Returns { success, remaining, reset } — success=false means block the request.
export async function checkRateLimit(request, limiter) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  return limiter.limit(ip)
}
