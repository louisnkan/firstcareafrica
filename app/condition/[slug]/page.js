import Link from 'next/link'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import ConditionChat from '../../../components/ConditionChat'

// Find a condition JSON from any category folder
function getConditionData(slug) {
  // Sanitise slug — only allow lowercase letters, 
  // numbers and hyphens
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return null
  }
  // ... rest of function
function getConditionData(slug) {
  const categories = [
    'emergency',
    'acute',
    'common',
    'womens-health',
    'chronic',
    'maternal-child',
    'sexual-health'
  ]

  for (const category of categories) {
    const filePath = path.join(
      process.cwd(), 'content', category, `${slug}.json`
    )
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(raw)
    }
  }
  return null
}

// Category color map
const categoryColors = {
  emergency: '#E03131',
  acute:     '#D4500A',
  common:    '#1971C2',
  'womens-health': '#6741D9',
  chronic:   '#0C8599',
  'maternal-child': '#2F9E44'
}

const severityLabel = {
  critical: { text: 'Critical Emergency', color: '#E03131' },
  acute:    { text: 'Acute — Needs Attention', color: '#D4500A' },
  common:   { text: 'Common Condition', color: '#1971C2' }
}

export async function generateMetadata({ params }) {
  const condition = getConditionData(params.slug)
  if (!condition) return { title: 'Not Found' }
  return {
    title: `${condition.title} — FirstCare Africa`,
    description: condition.summary
  }
}

export default function ConditionPage({ params }) {
  const condition = getConditionData(params.slug)

  if (!condition) notFound()

  const accentColor = categoryColors[condition.category] || '#E03131'
  const severity = severityLabel[condition.severity] || severityLabel.common

  return (
    <div style={{ paddingTop: '16px', paddingBottom: '32px' }}>

      {/* Back button */}
      <Link
        href={`/category/${condition.category}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#9BA8B5',
          textDecoration: 'none',
          fontSize: '0.82rem',
          marginBottom: '20px',
          minHeight: '36px'
        }}>
        ← Back
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href={`/category/${condition.category}`}
          style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}40`,
            borderRadius: '20px',
            padding: '4px 12px',
            marginBottom: '12px',
            cursor: 'pointer'
          }}>
            <span style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: severity.color,
              flexShrink: 0,
              display: 'inline-block'
            }} />
            <span style={{
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: severity.color
            }}>
              {severity.text} ↗
            </span>
          </div>
        </Link>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.7rem',
          color: '#F5F0E8',
          marginBottom: '8px',
          lineHeight: '1.2'
        }}>
          <span style={{ marginRight: '10px' }}>{condition.icon}</span>
          {condition.title}
        </h1>

        <p style={{
          color: '#9BA8B5',
          fontSize: '0.88rem',
          lineHeight: '1.6'
        }}>
          {condition.summary}
        </p>
      </div>

      {/* STEPS */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px'
        }}>
          <div style={{
            width: '3px', height: '20px',
            background: accentColor,
            borderRadius: '2px',
            flexShrink: 0
          }} />
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#9BA8B5',
            margin: 0
          }}>
            What To Do — Step by Step
          </h2>
        </div>

        {condition.steps.map((step, i) => (
          <div key={i} className="step-item">
            <div className="step-number"
              style={{ background: accentColor }}>
              {i + 1}
            </div>
            <p style={{
              color: '#F5F0E8',
              fontSize: '0.92rem',
              lineHeight: '1.65',
              margin: 0
            }}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* RED FLAGS */}
      {condition.redFlags?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '3px', height: '20px',
              background: '#E03131',
              borderRadius: '2px',
              flexShrink: 0
            }} />
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#E03131',
              margin: 0
            }}>
              Go To Hospital Immediately If
            </h2>
          </div>
          {condition.redFlags.map((flag, i) => (
            <div key={i} className="redflag-box"
              style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: '#E03131', flexShrink: 0 }}>
                  ⚠
                </span>
                <p style={{
                  color: '#F5F0E8',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {flag}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WARNINGS */}
      {condition.warnings?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '3px', height: '20px',
              background: '#F08C00',
              borderRadius: '2px',
              flexShrink: 0
            }} />
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F08C00',
              margin: 0
            }}>
              Important Warnings
            </h2>
          </div>
          {condition.warnings.map((warning, i) => (
            <div key={i} className="warning-box"
              style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: '#F08C00', flexShrink: 0 }}>
                  !
                </span>
                <p style={{
                  color: '#F5F0E8',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {warning}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PHARMACY GUIDANCE */}
      {condition.pharmacyGuidance && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '3px', height: '20px',
              background: '#1971C2',
              borderRadius: '2px',
              flexShrink: 0
            }} />
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1971C2',
              margin: 0
            }}>
              Pharmacy Guidance
            </h2>
          </div>

          <div className="pharmacy-box">
            {condition.pharmacyGuidance.helpful?.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{
                  color: '#4CAF50',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  ✓ What Helps
                </p>
                {condition.pharmacyGuidance.helpful.map((item, i) => (
                  <p key={i} style={{
                    color: '#F5F0E8',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    marginBottom: '4px'
                  }}>
                    · {item}
                  </p>
                ))}
              </div>
            )}

            {condition.pharmacyGuidance.avoid?.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{
                  color: '#E03131',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  ✗ What To Avoid
                </p>
                {condition.pharmacyGuidance.avoid.map((item, i) => (
                  <p key={i} style={{
                    color: '#F5F0E8',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    marginBottom: '4px'
                  }}>
                    · {item}
                  </p>
                ))}
              </div>
            )}

            {condition.pharmacyGuidance.askFor?.length > 0 && (
              <div>
                <p style={{
                  color: '#F08C00',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  → Ask The Pharmacist For
                </p>
                {condition.pharmacyGuidance.askFor.map((item, i) => (
                  <p key={i} style={{
                    color: '#F5F0E8',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    marginBottom: '4px'
                  }}>
                    · {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* WHEN TO GET HELP */}
      <div style={{
        background: 'rgba(224,49,49,0.08)',
        border: '1px solid rgba(224,49,49,0.3)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <p style={{
          color: '#E03131',
          fontSize: '0.72rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          🏥 Get Professional Help
        </p>
        <p style={{
          color: '#F5F0E8',
          fontSize: '0.9rem',
          lineHeight: '1.65',
          margin: 0
        }}>
          {condition.whenToGetHelp}
        </p>
      </div>

      {/* AI FOLLOW-UP — Phase D */}
      <div style={{ marginBottom: '24px' }}>
        <ConditionChat
          conditionName={condition.title}
          conditionCategory={condition.category}
        />
      </div>
{/* FAQ SECTION — SEO goldmine */}
      {condition.faq && condition.faq.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px'
          }}>
            <div style={{
              width: '3px',
              height: '20px',
              background: '#F08C00',
              borderRadius: '2px',
              flexShrink: 0
            }} />
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F08C00',
              margin: 0
            }}>
              Frequently Asked Questions
            </h2>
          </div>

          {condition.faq.map((item, i) => (
            <div key={i} style={{
              background: '#1C2B3A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '10px'
            }}>
              <p style={{
                color: '#F08C00',
                fontSize: '0.88rem',
                fontWeight: '600',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                {item.question}
              </p>
              <p style={{
                color: '#F5F0E8',
                fontSize: '0.85rem',
                lineHeight: '1.65',
                margin: 0
              }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        This guidance is based on universal medical protocols.
        It does not replace a doctor.
        Seek professional medical help as soon as possible.
      </div>

    </div>
  )
}
