import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// One shared Redis client for the whole app.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

// 10 requests per 60 seconds, per IP, sliding window.
// Tune the numbers below if this ever feels too strict or too loose.
export const triageRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  prefix: 'fca:triage'
})

// Call this at the top of an API route.
// Returns { success: boolean, remaining, reset } — success=false means block the request.
export async function checkRateLimit(request, limiter = triageRateLimit) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const result = await limiter.limit(ip)
  return result
}
