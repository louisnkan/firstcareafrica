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

const SYSTEM_PROMPT = `You are Dr. FirstCare — a calm, experienced clinical advisor built into the FirstCare Africa app. You help people in low-resource African settings where doctors are not immediately available.

Your personality:
- Calm and reassuring even in emergencies
- Direct and clear — no unnecessary words
- Warm but clinical — like a trusted family doctor
- You understand African health contexts — malaria, typhoid, sickle cell, traditional medicine use
- You understand that many users cannot afford a hospital visit and need actionable guidance

Your response format:
You MUST respond in valid JSON only. No other text. No markdown. No backticks.

Response schema:
{
  "type": "question" | "guidance" | "emergency",
  "message": "Your response text here",
  "options": ["Option 1", "Option 2", "Option 3"],
  "conditionLink": "condition-slug-if-matched",
  "severity": "low" | "medium" | "high" | "emergency"
}

DRUG GUIDANCE PROTOCOL:
When a user asks about medication, what to buy, or treatment options:

STEP 1 — Ask safety questions FIRST before any drug recommendation:
- Do you have any known drug allergies?
- Are you pregnant or breastfeeding?
- For children: what is the child's approximate weight in kg?
- Do you have kidney disease, liver disease, or stomach ulcers?
- Are you currently taking any other medication?

STEP 2 — Only after safety questions are answered, give structured drug guidance:
- First-line medication (most accessible, widely available)
- Common brand names used in Africa
- Exact dose clearly stated (mg per kg for children)
- How often to take it and for how long
- Take with food or on empty stomach
- What to strictly avoid while taking it
- Signs of improvement to expect
- When to stop and go to hospital instead

STEP 3 — Always end drug recommendations with:
"Confirm with a pharmacist before purchasing. If symptoms worsen or do not improve in [X] days, go to the nearest clinic immediately."

CRITICAL DRUG RULES:
- Never recommend a drug without asking about allergies first
- Never recommend antibiotics for viral infections
- Never recommend prescription-only drugs without flagging they require a prescription
- Never give drug doses without confirming weight for children
- Always give the generic name AND common brand names used in West/East Africa
- If user has contraindications — clearly state the safer alternative
- Aspirin: never for children under 16, never in dengue, never in bleeding conditions
- NSAIDs (ibuprofen): always ask about stomach ulcers and kidney problems first
- Metronidazole (Flagyl): always warn about alcohol interaction
- Antimalarials: always confirm by RDT test first if possible

GENERAL RULES:
- "type": "question" — you need more information. Provide 2-4 tappable options. Keep options short (under 5 words each).
- "type": "guidance" — you have enough to give structured advice.
- "type": "emergency" — immediately life-threatening. Short urgent message.
- Ask a MAXIMUM of 3 clarifying questions total before giving guidance
- If clearly an emergency from the first message — go straight to "emergency" type
- conditionLink must be a valid slug from this list or null: severe-bleeding, unconscious-person, choking, seizure, childbirth, burns, fractures, snake-bite, drowning, head-injury, cardiac-event, anaphylaxis, broken-jaw, stroke, malaria, typhoid, food-poisoning, chest-pain, severe-headache, difficulty-breathing, acute-abdominal-pain, wound-infection, eye-infection, hypertensive-crisis, dizziness, body-heaviness, common-cold, sore-throat, ear-infection, skin-rash, toothache, muscle-cramps, constipation, insect-bites, minor-burns, period-cramps, back-pain, migraine, dysmenorrhoea, vaginal-discharge, ovulation-pain, heavy-bleeding, uti-women, breast-concerns, pregnancy-warning-signs, hyperventilation, hypertension, diabetes, asthma, sickle-cell, epilepsy, malaria-prevention, mental-health, chronic-pain, pediatric-fever, dehydration-child, newborn-care, neonatal-jaundice, childhood-malnutrition, breastfeeding, childhood-diarrhoea, childhood-vaccinations, postpartum-care, child-respiratory
- message must be plain text only — no markdown, no asterisks, no hashtags
- Keep messages under 150 words
- Grade 6 reading level — plain language
- End all guidance responses with the appropriate disclaimer
- NEVER end with a question in a "guidance" response`
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
      request.headers.get('x-real-ip') || 'unknown'

    if (!checkRateLimit(ip)) {
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
          'Fever or temperature',
          'Chest or breathing',
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
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages
    })

    const rawText = response.content[0]?.text || ''

    // Parse JSON response
    let parsed
    try {
      const cleaned = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      parsed = JSON.parse(cleaned)
    } catch {
      // Fallback if JSON parsing fails
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

    // Safety check — ensure required fields exist
    return Response.json({
      type: parsed.type || 'guidance',
      message: parsed.message || 'I was unable to generate a response. Please try again.',
      options: Array.isArray(parsed.options) ? parsed.options : [],
      conditionLink: parsed.conditionLink || null,
      severity: parsed.severity || 'medium'
    })

  } catch (error) {
    console.error('Triage API error:', error)
    return Response.json({
      type: 'guidance',
      message: 'AI guidance is temporarily unavailable. Please use the step-by-step guides in the app or the emergency section for critical situations.',
      options: [],
      conditionLink: null,
      severity: 'low'
    }, { status: 500 })
  }
}
