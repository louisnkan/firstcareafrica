# FirstCareAfrica

## Product Vision
A mobile-first medical guidance platform for anyone in a situation 
where professional medical help is unavailable, delayed, or inaccessible. 
Covers life-threatening emergencies, acute illness, common conditions, 
women's health, and chronic condition management. Fixed vetted content 
for all conditions. AI-powered open triage for situations not listed.
Target market: Africa, mobile-first, offline-capable.

## URL / Domain
firstcareafrica.health (or .com — confirm availability)

## Tech Stack
- Framework: Next.js 14 (App Router, JavaScript not TypeScript)
- Styling: Tailwind CSS
- Content: JSON files in /content folder (NO database in V1)
- AI: Anthropic Claude API (@anthropic-ai/sdk, haiku model)
- Offline: PWA via manifest.json + service worker (no extra package)
- Deployment: Vercel
- Future scaling: Vercel Pro → edge functions if needed

## Content Architecture (NEVER break this pattern)
All medical content lives in /content/[category]/[condition].json
Adding new content = add a JSON file. NEVER hardcode content in components.
Categories:
- /content/emergency/          (12 critical conditions)
- /content/acute/              (12 acute conditions)
- /content/common/             (12 common conditions)
- /content/womens-health/      (8 conditions)
- /content/chronic/            (8 conditions)
- /content/maternal-child/     (6 conditions)
- /content/quick-reference/    (static reference cards)

## JSON Content Structure (every file follows this exactly)
{
  "id": "condition-slug",
  "category": "emergency",
  "title": "Condition Name",
  "severity": "critical|acute|common",
  "icon": "emoji",
  "color": "red|orange|blue|green|purple",
  "summary": "One sentence description",
  "steps": ["Step 1", "Step 2"],
  "warnings": ["Warning 1"],
  "redFlags": ["Go to hospital immediately if..."],
  "pharmacyGuidance": {
    "helpful": ["Paracetamol for fever"],
    "avoid": ["Aspirin for children under 12"],
    "askFor": ["ORS sachets"]
  },
  "whenToGetHelp": "Clear escalation instruction"
}

## App Structure
- Home screen: Two entry points — EMERGENCY (red) and EVERYDAY HEALTH
- Category pages: Grid of condition cards per category
- Condition pages: Steps + warnings + pharmacy tips + AI follow-up
- AI Triage page: Open text "describe what's wrong" → structured response
- Quick Reference: Always-offline static cards

## API Routes
- /app/api/chat/route.js        (condition-scoped AI follow-up)
- /app/api/triage/route.js      (open AI triage, max 3 clarifying questions)
Both routes: rate limited, input sanitised, try/catch, disclaimer on response

## AI Behaviour Rules (enforce in every system prompt)
- Never give definitive diagnosis — use "this sounds like" / "likely"
- Always include red flag symptoms
- Always end with a clear next action
- Maximum 3 clarifying questions before responding
- Grade 6 reading level — no medical jargon
- Calm tone always — user may be scared
- Disclaimer on every response: 
  "This guidance does not replace a doctor. 
   If in doubt, go to your nearest clinic immediately."

## Security (built in from day one)
- API key in Vercel environment variables only — never in code
- Rate limiting: 10 AI requests/minute per IP, 50/hour per IP
- Input sanitisation on all user text before API calls
- Max input: 500 characters
- Right-click disabled, F12/DevTools shortcuts blocked
- Content security headers in next.config.js
- .env.local in .gitignore always

## Scalability Plan
V1: Vercel free tier (handles static content at any scale)
V2: Vercel Pro if AI endpoint load spikes
V3: Edge functions for AI routes if global latency becomes issue
Content always scales by adding JSON files — no code changes needed

## Code Rules
- JavaScript only (no TypeScript in V1)
- Functional components, async/await, try/catch always
- Files under 200 lines — split if longer
- kebab-case filenames, PascalCase component names
- Mobile-first: design at 375px, minimum 48px tap targets
- High contrast always — emergencies read in poor lighting
- DO NOT modify working files when adding new features
- DO NOT add dependencies without discussion

## Build & Deploy
- Dev: npm run dev
- Build: npm run build  
- Deploy: Push to GitHub → Vercel auto-deploys

## Medical Review Status
⚠️ PENDING — All content requires review by medical professional 
before public launch. Reviewer contacts: [add when confirmed]

## Current Status
- Phase: A (Foundation)
- Completed: Repo created, CLAUDE.md v1, package.json, 
  manifest.json, next.config.js placeholder
- In Progress: CLAUDE.md update (this file)
- Blocked: Domain name final confirmation pending
