'use client'

import Link from 'next/link'
import ConditionChat from './ConditionChat'
import { useMode } from '../contexts/ModeContext'

const severityLabel = {
  critical: { text: 'Critical Emergency', color: '#E03131' },
  acute: { text: 'Acute — Needs Attention', color: '#D4500A' },
  common: { text: 'Common Condition', color: '#1971C2' }
}

const categoryColors = {
  emergency: '#E03131',
  acute: '#D4500A',
  common: '#1971C2',
  'womens-health': '#6741D9',
  chronic: '#0C8599',
  'maternal-child': '#2F9E44',
  'sexual-health': '#0C8599'
}

function ClinicalPanel({ condition }) {
  const hasClinicalContent =
    condition.differentials?.length > 0 ||
    condition.dosageTable?.length > 0 ||
    condition.referralCriteria?.length > 0 ||
    condition.clinicalNotes

  if (!hasClinicalContent) {
    return (
      <div style={{
        background: 'rgba(12,133,153,0.06)',
        border: '1px solid rgba(12,133,153,0.2)',
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <p style={{
          color: '#0C8599',
          fontSize: '0.82rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          ⚕️ Clinical detail for this condition hasn't been added yet.
          Showing standard guidance below.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      background: '#0F1E24',
      border: '1px solid rgba(12,133,153,0.3)',
      borderRadius: '16px',
      padding: '18px',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <span>⚕️</span>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.8rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#0C8599',
          margin: 0
        }}>
          Clinical Detail
        </h2>
      </div>

      {condition.differentials?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            color: '#7FD4E0',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Differentials to Consider
          </p>
          {condition.differentials.map((item, i) => (
            <p key={i} style={{
              color: '#F5F0E8',
              fontSize: '0.85rem',
              lineHeight: '1.55',
              marginBottom: '4px'
            }}>
              · {item}
            </p>
          ))}
        </div>
      )}

      {condition.dosageTable?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            color: '#7FD4E0',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Dosing Reference
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {condition.dosageTable.map((row, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '10px 12px'
              }}>
                <p style={{
                  color: '#F5F0E8',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  margin: '0 0 3px'
                }}>
                  {row.drug} {row.dose && `— ${row.dose}`}
                </p>
                {row.notes && (
                  <p style={{
                    color: '#9BA8B5',
                    fontSize: '0.78rem',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {row.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {condition.referralCriteria?.length > 0 && (
        <div style={{ marginBottom: condition.clinicalNotes ? '16px' : 0 }}>
          <p style={{
            color: '#7FD4E0',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Refer If
          </p>
          {condition.referralCriteria.map((item, i) => (
            <p key={i} style={{
              color: '#F5F0E8',
              fontSize: '0.85rem',
              lineHeight: '1.55',
              marginBottom: '4px'
            }}>
              · {item}
            </p>
          ))}
        </div>
      )}

      {condition.clinicalNotes && (
        <div>
          <p style={{
            color: '#7FD4E0',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Notes
          </p>
          <p style={{
            color: '#F5F0E8',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            {condition.clinicalNotes}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ConditionContent({ condition }) {
  const { mode } = useMode()
  const isClinical = mode === 'clinical'

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
              width: '6px',
              height: '6px',
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
          <span style={{ marginRight: '10px' }}>
            {condition.icon}
          </span>
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

      {/* CLINICAL PANEL — only in Clinical View */}
      {isClinical && <ClinicalPanel condition={condition} />}

      {/* STEPS */}
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
            <div
              className="step-number"
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
              width: '3px',
              height: '20px',
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
                <span style={{
                  color: '#E03131',
                  flexShrink: 0
                }}>
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
              Important Warnings
            </h2>
          </div>
          {condition.warnings.map((warning, i) => (
            <div key={i} className="warning-box"
              style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{
                  color: '#F08C00',
                  flexShrink: 0
                }}>
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
              width: '3px',
              height: '20px',
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
                {condition.pharmacyGuidance.helpful.map(
                  (item, i) => (
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
                {condition.pharmacyGuidance.avoid.map(
                  (item, i) => (
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
                {condition.pharmacyGuidance.askFor.map(
                  (item, i) => (
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

      {/* FAQ SECTION */}
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

      {/* AI FOLLOW-UP */}
      <div style={{ marginBottom: '24px' }}>
        <ConditionChat
          conditionName={condition.title}
          conditionCategory={condition.category}
        />
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        This guidance is based on universal medical protocols.
        It does not replace a doctor.
        Seek professional medical help as soon as possible.
      </div>

    </div>
  )
}
