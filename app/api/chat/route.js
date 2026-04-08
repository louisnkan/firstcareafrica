const ALLOWED_ORIGINS = [
  'https://firstcareafrica.vercel.app',
  'https://firstcareafrica.health',
  'http://localhost:3000'
]


import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const rateLimitStore = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 10
  const record = rateLimitStore.get(ip) || { count: 0, resetAt: now + windowMs }
  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + windowMs
  }
  record.count++
  rateLimitStore.set(ip, record)
  return record.count <= maxRequests
}

function sanitizeInput(text) {
  if (typeof text !== 'string') return ''
  return text
    .trim()
    .slice(0, 500)
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s.,?!'\-()]/g, '')
}

function getTriageSystemPrompt() {
  return `You are a calm, experienced clinical advisor for FirstCare Africa — a platform helping people in low-resource African settings where doctors are not immediately available.

The user will describe their symptoms or situation in plain language. Your role is to provide structured, actionable guidance.

RULES YOU MUST FOLLOW:
1. Ask at most 2 short clarifying questions before giving guidance. If enough information is provided, respond immediately.
2. Never give a definitive diagnosis. Use phrases like "this sounds like", "the most likely cause is", "this may be".
3. Always include specific red flag symptoms that mean go to hospital immediately.
4. Suggest only widely available over-the-counter interventions where relevant.
5. Always end with a clear next action.
6. Write at a Grade 6 reading level. No Latin medical terms.
7. Be calm and reassuring. The person reading this may be frightened.
8. Structure your response with these sections when giving full guidance:
   - What this sounds like
   - What to do right now
   - What to avoid
   - Go to hospital immediately if...
   - Next step

Always end every full response with exactly this line:
This guidance does not replace a doctor. Seek professional medical help as soon as possible.`
}

function getConditionSystemPrompt(conditionName) {
  return `You are a calm first-aid assistant for FirstCare Africa, helping someone manage a case of ${conditionName}.

The user has already read the step-by-step guidance for ${conditionName}. They may have follow-up questions about this specific condition.

RULES YOU MUST FOLLOW:
1. Only answer questions related to ${conditionName} or closely related concerns.
2. If asked about something unrelated, say: For that concern, please go back to the home screen and find the relevant section.
3. Never contradict the standard first-aid steps already shown on the page.
4. Never give a definitive diagnosis.
5. Keep answers short — 3 to 5 sentences maximum.
6. Grade 6 reading level. Plain language only.
7. Be calm. The person may be in a stressful situation.

End every response with:
Guidance only. Seek professional medical help as soon as possible.`
}

export async function POST(request) {
  try {
    // CORS check
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://firstcareafrica.vercel.app',
      'https://firstcareafrica.health',
      'http://localhost:3000'
    ]
    if (origin && !allowedOrigins.includes(origin)) {
      return Response.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown'

    if (!checkRateLimit(ip)) {
      return Response.json(
        {
          error: 'rate_limited',
          message: 'You have sent too many requests. Please wait a minute before trying again.'
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const mode = body.mode || 'triage'
    const rawQuestion = body.question || body.message || ''
    const conditionName = body.conditionName || ''
    const conversationHistory = body.history || []

    const question = sanitizeInput(rawQuestion)

    if (!question || question.length < 2) {
      return Response.json(
        { error: 'invalid_input', message: 'Please describe your situation.' },
        { status: 400 }
      )
    }

    const systemPrompt = mode === 'condition'
      ? getConditionSystemPrompt(conditionName)
      : getTriageSystemPrompt()

    const messages = [
      ...conversationHistory.slice(-6),
      { role: 'user', content: question }
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: messages
    })

    const aiText = response.content[0]?.text || 'Unable to generate a response. Please try again.'

    return Response.json({
      response: aiText,
      mode: mode
    })

  } catch (error) {
    console.error('Chat API error:', error)

    const errorMessage = error?.message || ''
    const errorStatus = error?.status || 500

    if (errorStatus === 401 || errorMessage.includes('auth')) {
      return Response.json(
        {
          error: 'api_error',
          message: 'AI guidance is temporarily unavailable. The fixed first-aid steps above are still accurate and reliable.'
        },
        { status: 503 }
      )
    }

    if (errorStatus === 429 || errorMessage.includes('rate')) {
      return Response.json(
        {
          error: 'rate_error',
          message: 'Too many requests right now. Please wait 60 seconds and try again.'
        },
        { status: 429 }
      )
    }

    if (errorStatus === 529 || errorMessage.includes('overload')) {
      return Response.json(
        {
          error: 'overload_error',
          message: 'AI is busy right now. Please try again in a moment. The steps above are still fully accurate.'
        },
        { status: 503 }
      )
    }

    return Response.json(
      {
        error: 'server_error',
        message: 'AI guidance is temporarily unavailable. Please use the step-by-step guidance above.'
      },
      { status: 500 }
    )
  }
}
