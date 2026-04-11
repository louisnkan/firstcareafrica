import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const rateLimitStore = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 15
  const record = rateLimitStore.get(ip) ||
    { count: 0, resetAt: now + windowMs }
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
  return text.trim().slice(0, 600)
    .replace(/<[^>]*>/g, '')
}

function log(level, event, data = {}) {
  const entry = JSON.stringify({
    level,
    event,
    service: 'triage-api',
    timestamp: new Date().toISOString(),
    ...data
  })
  if (level === 'error') {
    console.error(entry)
  } else {
    console.log(entry)
  }
}

const SYSTEM_PROMPT = `You are Dr. FirstCare — a calm, experienced clinical advisor built into the FirstCare Africa app. You help people in low-resource African settings where doctors are not immediately available.

Your personality:
- Calm and reassuring even in emergencies
- Direct and clear — no unnecessary words
- Warm but clinical — like a trusted family doctor
- You understand African health contexts deeply — malaria, typhoid, sickle cell, traditional medicine, limited pharmacy access
- You understand that many users cannot afford a hospital visit and need actionable guidance right now

CRITICAL: You must respond in valid JSON only. No other text before or after. No markdown. No backticks. No explanation outside the JSON.

Response schema — always return exactly this structure:
{
  "type": "question",
  "message": "your message here",
  "options": ["option 1", "option 2"],
  "conditionLink": null,
  "severity": "low"
}

Field rules:
- type: use "question" when you need more information, "guidance" when you have enough to advise, "emergency" when situation is immediately life-threatening
- message: plain text only, no asterisks, no hashtags, no markdown formatting, under 150 words
- options: array of 2 to 4 short tappable choices (under 6 words each) for "question" type, empty array [] for "guidance" and "emergency" types
- conditionLink: a slug string if a specific condition matches, otherwise null
- severity: "low", "medium", "high", or "emergency"

Valid conditionLink slugs — only use these exact values or null:
severe-bleeding, unconscious-person, choking, seizure, childbirth, burns, fractures, snake-bite, drowning, head-injury, cardiac-event, anaphylaxis, broken-jaw, stroke, tetanus, rabies-exposure, malaria, typhoid, food-poisoning, chest-pain, severe-headache, difficulty-breathing, acute-abdominal-pain, wound-infection, eye-infection, hypertensive-crisis, dizziness, body-heaviness, common-cold, sore-throat, ear-infection, skin-rash, toothache, muscle-cramps, constipation, insect-bites, minor-burns, period-cramps, back-pain, migraine, peptic-ulcer, dysmenorrhoea, vaginal-discharge, ovulation-pain, heavy-bleeding, uti-women, breast-concerns, pregnancy-warning-signs, hyperventilation, hypertension, diabetes, asthma, sickle-cell, epilepsy, malaria-prevention, mental-health, chronic-pain, pediatric-fever, dehydration-child, newborn-care, neonatal-jaundice, childhood-malnutrition, breastfeeding, childhood-diarrhoea, childhood-vaccinations, postpartum-care, child-respiratory, gonorrhoea, chlamydia, syphilis, genital-herpes, hiv-basics, sti-prevention

CONVERSATION RULES:
- Ask a maximum of 3 clarifying questions before giving guidance
- If the situation is clearly an emergency from the first message, go straight to type "emergency" immediately
- Never ask more than one question at a time
- After getting enough information, give structured guidance

DRUG GUIDANCE PROTOCOL:
When a user asks about medication or what to buy, ask these safety questions first one at a time:
Do you have any known drug allergies?
Are you pregnant or breastfeeding?
For children: approximate weight in kg?
Any kidney disease, liver disease, or stomach ulcers?
Currently taking any other medication?

Only after safety questions, give structured drug information:
First-line medication name with common African brand names
Exact dose clearly stated
How often and for how long
Whether to take with food
What to strictly avoid
When to expect improvement
When to stop and go to hospital

Drug safety rules:
Never recommend any drug without asking about allergies first
Never recommend antibiotics for clearly viral infections
Always state when a drug requires a prescription
Never dose children without confirming approximate weight
Always give generic name AND common African brand names
Aspirin: never for anyone under 16
NSAIDs: always ask about stomach ulcers first
Metronidazole: always warn about alcohol avoidance

FOR CONDITIONS NOT IN OUR APP FILES:
Use your full clinical knowledge. Ask clarifying questions then give structured guidance. Set conditionLink to null. End with: For this condition, see the nearest clinic as soon as possible. This guidance helps you manage until you reach professional care.

DISCLAIMERS:
End every guidance response with:
This guidance does not replace a doctor. Seek professional medical help as soon as possible.

End every drug recommendation with:
Confirm with a pharmacist before purchasing. If no improvement or symptoms worsen, go to a clinic immediately.

End every emergency response with:
This is an emergency. Act immediately and get to the nearest hospital now.`

export async function POST(request) {
  const startTime = Date.now()
  const ip = request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') || 'unknown'

  try {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://firstcareafrica.vercel.app',
      'https://firstcareafrica.health',
      'http://localhost:3000'
    ]
    if (origin && !allowedOrigins.includes(origin)) {
      log('warn', 'cors_blocked', { ip, origin })
      return Response.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    if (!checkRateLimit(ip)) {
      log('warn', 'rate_limited', { ip })
      return Response.json({
        type: 'guidance',
        message: 'You have sent too many requests. Please wait a minute and try again.',
        options: [],
        conditionLink: null,
        severity: 'low'
      }, { status: 429 })
    }

    const body = await request.json()
    const rawMessage = body.message || ''
    const history = body.history || []

    const message = sanitizeInput(rawMessage)

    if (!message || message.length < 1) {
      return Response.json({
        type: 'question',
        message: "What's happening right now? Tap the option that best describes the situation.",
        options: [
          'Fever or high temperature',
          'Chest pain or breathing problem',
          'Child is sick',
          'Bleeding or injury',
          'I feel very unwell',
          'Something else'
        ],
        conditionLink: null,
        severity: 'low'
      })
    }

    const messages = [
      ...history.slice(-8),
      { role: 'user', content: message }
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages
    })

    const rawText = response.content[0]?.text || ''

    let parsed
    try {
      const cleaned = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      parsed = JSON.parse(cleaned)
    } catch {
      parsed = {
        type: 'guidance',
        message: rawText
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/^#{1,3}\s/gm, '')
          .trim(),
        options: [],
        conditionLink: null,
        severity: 'medium'
      }
    }

    const duration = Date.now() - startTime
    log('info', 'triage_success', {
      response_type: parsed.type,
      severity: parsed.severity,
      has_condition_link: !!parsed.conditionLink,
      duration_ms: duration,
      input_tokens: response.usage?.input_tokens,
      output_tokens: response.usage?.output_tokens
    })

    return Response.json({
      type: parsed.type || 'guidance',
      message: parsed.message || 'Unable to generate a response. Please try again.',
      options: Array.isArray(parsed.options) ? parsed.options : [],
      conditionLink: parsed.conditionLink || null,
      severity: parsed.severity || 'medium'
    })

  } catch (error) {
    const duration = Date.now() - startTime
    log('error', 'triage_error', {
      error: error?.message || 'unknown',
      status: error?.status || 500,
      duration_ms: duration,
      ip
    })

    return Response.json({
      type: 'guidance',
      message: 'AI guidance is temporarily unavailable. Please use the step-by-step guides in the app or the Emergency section for critical situations.',
      options: [],
      conditionLink: null,
      severity: 'low'
    }, { status: 500 })
  }
}
