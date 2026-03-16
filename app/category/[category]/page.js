import Link from 'next/link'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

const categoryMeta = {
  emergency: {
    title: 'Emergency',
    subtitle: 'Life-threatening situations requiring immediate action',
    color: '#E03131',
    icon: '🚨',
    warning: 'These are critical emergencies. Call for help immediately while following these steps.'
  },
  acute: {
    title: 'Acute Illness',
    subtitle: 'Conditions needing attention within hours',
    color: '#D4500A',
    icon: '🤒',
    warning: null
  },
  common: {
    title: 'Common Conditions',
    subtitle: 'Everyday illnesses manageable at home with guidance',
    color: '#1971C2',
    icon: '💊',
    warning: null
  },
  'womens-health': {
    title: "Women's Health",
    subtitle: 'Conditions specific to women\'s health and reproductive wellbeing',
    color: '#6741D9',
    icon: '🌸',
    warning: null
  },
  chronic: {
    title: 'Chronic Conditions',
    subtitle: 'Managing ongoing conditions and acute episodes',
    color: '#0C8599',
    icon: '🫀',
    warning: null
  },
  'maternal-child': {
    title: 'Maternal & Child Health',
    subtitle: 'Care for mothers, newborns, and young children',
    color: '#2F9E44',
    icon: '👶',
    warning: null
  }
}

function getConditionsForCategory(category) {
  const dirPath = path.join(process.cwd(), 'content', category)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(f => f.endsWith('.json'))
    .map(file => {
      const raw = fs.readFileSync(
        path.join(dirPath, file), 'utf-8'
      )
      const data = JSON.parse(raw)
      // Skip placeholder content
      if (data.steps?.[0] === 'Content coming in Phase C.') {
        return { ...data, isPlaceholder: true }
      }
      return { ...data, isPlaceholder: false }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export async function generateMetadata({ params }) {
  const meta = categoryMeta[params.category]
  if (!meta) return { title: 'Not Found' }
  return {
    title: `${meta.title} — FirstCare Africa`,
    description: meta.subtitle
  }
}

export default function CategoryPage({ params }) {
  const meta = categoryMeta[params.category]
  if (!meta) notFound()

  const conditions = getConditionsForCategory(params.category)
  const ready = conditions.filter(c => !c.isPlaceholder)
  const coming = conditions.filter(c => c.isPlaceholder)

  return (
    <div style={{ paddingTop: '16px', paddingBottom: '32px' }}>

      {/* Back */}
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: '#9BA8B5',
        textDecoration: 'none',
        fontSize: '0.82rem',
        marginBottom: '20px',
        minHeight: '36px'
      }}>
        ← Home
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          {meta.icon}
        </div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.7rem',
          color: '#F5F0E8',
          marginBottom: '6px'
        }}>
          {meta.title}
        </h1>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.85rem',
          lineHeight: '1.5'
        }}>
          {meta.subtitle}
        </p>
      </div>

      {/* Emergency warning banner */}
      {meta.warning && (
        <div style={{
          background: 'rgba(224,49,49,0.1)',
          border: '1px solid rgba(224,49,49,0.3)',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '20px',
          display: 'flex',
          gap: '10px'
        }}>
          <span style={{ flexShrink: 0 }}>⚠️</span>
          <p style={{
            color: '#F5F0E8',
            fontSize: '0.82rem',
            lineHeight: '1.5',
            margin: 0
          }}>
            {meta.warning}
          </p>
        </div>
      )}

      {/* Ready conditions */}
      {ready.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#5C6E7E',
            marginBottom: '12px'
          }}>
            {ready.length} condition{ready.length !== 1 ? 's' : ''} available
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ready.map(condition => (
              <Link
                key={condition.id}
                href={`/condition/${condition.id}`}
                style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#1C2B3A',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: `3px solid ${meta.color}`,
                  borderRadius: '0 14px 14px 0',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'background 0.15s'
                }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                    {condition.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: '#F5F0E8',
                      fontSize: '0.92rem',
                      fontWeight: '600',
                      margin: '0 0 3px 0'
                    }}>
                      {condition.title}
                    </p>
                    <p style={{
                      color: '#9BA8B5',
                      fontSize: '0.75rem',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      {condition.summary}
                    </p>
                  </div>
                  <span style={{
                    color: '#5C6E7E',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Coming soon placeholders */}
      {coming.length > 0 && (
        <div>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#5C6E7E',
            marginBottom: '12px'
          }}>
            Coming soon
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {coming.map(condition => (
              <div key={condition.id} style={{
                background: 'rgba(28,43,58,0.5)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '14px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: 0.5
              }}>
                <span style={{ fontSize: '1.3rem' }}>
                  {condition.icon}
                </span>
                <p style={{
                  color: '#5C6E7E',
                  fontSize: '0.85rem',
                  margin: 0
                }}>
                  {condition.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No conditions fallback */}
      {conditions.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#5C6E7E'
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔨</p>
          <p style={{ fontSize: '0.88rem' }}>
            Content for this section is being prepared.
            Check back soon.
          </p>
        </div>
      )}

    </div>
  )
}
