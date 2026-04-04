import Link from 'next/link'

export const metadata = {
  title: 'Quick Reference — FirstCare Africa',
  description: 'Normal vital signs, ORS recipe, drug doses, and danger signs for medical emergencies. Works offline.',
  keywords: 'normal temperature baby, normal heart rate child, ORS recipe home, paracetamol dose child weight, danger signs hospital'
}

const sections = [
  {
    id: 'vital-signs',
    title: 'Normal Vital Signs',
    icon: '🩺',
    color: '#E03131',
    items: [
      {
        label: 'Body Temperature',
        rows: [
          { desc: 'Normal', value: '36.1°C – 37.2°C' },
          { desc: 'Low-grade fever', value: '37.3°C – 38°C' },
          { desc: 'Fever', value: 'Above 38°C' },
          { desc: 'High fever', value: 'Above 39°C' },
          { desc: 'Dangerous', value: 'Above 40°C — act now' }
        ]
      },
      {
        label: 'Heart Rate (beats per minute)',
        rows: [
          { desc: 'Adult', value: '60 – 100 bpm' },
          { desc: 'Child 1–12 years', value: '70 – 120 bpm' },
          { desc: 'Infant under 1 year', value: '100 – 160 bpm' },
          { desc: 'Newborn', value: '120 – 160 bpm' }
        ]
      },
      {
        label: 'Breathing Rate (breaths per minute)',
        rows: [
          { desc: 'Adult', value: '12 – 20' },
          { desc: 'Child 1–5 years', value: 'Below 40' },
          { desc: 'Infant 2–12 months', value: 'Below 50' },
          { desc: 'Newborn under 2 months', value: 'Below 60' }
        ]
      },
      {
        label: 'Blood Pressure',
        rows: [
          { desc: 'Normal', value: 'Below 120/80' },
          { desc: 'Elevated', value: '120–129 / below 80' },
          { desc: 'High (Stage 1)', value: '130–139 / 80–89' },
          { desc: 'High (Stage 2)', value: '140+ / 90+' },
          { desc: 'Crisis — go now', value: 'Above 180/120' }
        ]
      }
    ]
  },
  {
    id: 'ors-recipe',
    title: 'ORS Recipe — Make At Home',
    icon: '💧',
    color: '#1971C2',
    intro: 'Use when ORS sachets are unavailable. Mix exactly as stated — too much salt is dangerous.',
    items: [
      {
        label: 'Ingredients',
        rows: [
          { desc: 'Clean water', value: '1 litre' },
          { desc: 'Sugar (level teaspoons)', value: '6 teaspoons' },
          { desc: 'Salt (level teaspoon)', value: '½ teaspoon' }
        ]
      },
      {
        label: 'How to give it',
        rows: [
          { desc: 'Under 2 years', value: '50–100ml after each loose stool' },
          { desc: '2–10 years', value: '100–200ml after each loose stool' },
          { desc: 'Over 10 years', value: 'As much as they want' }
        ]
      }
    ],
    warning: 'Stir completely until dissolved. Make fresh every 24 hours. Give in small sips — do not let the child gulp.'
  },
  {
    id: 'drug-doses',
    title: 'Paracetamol Doses by Weight',
    icon: '💊',
    color: '#2F9E44',
    intro: 'Always dose by weight, not age. Give every 4–6 hours. Do not exceed 4 doses in 24 hours.',
    items: [
      {
        label: 'Paracetamol — 15mg per kg',
        rows: [
          { desc: '5 kg baby', value: '75mg (1.5ml of 50mg/ml)' },
          { desc: '8 kg baby', value: '120mg (2.5ml of 50mg/ml)' },
          { desc: '10 kg child', value: '150mg (3ml of 50mg/ml)' },
          { desc: '15 kg child', value: '225mg (4.5ml of 50mg/ml)' },
          { desc: '20 kg child', value: '300mg (6ml of 50mg/ml)' },
          { desc: '30 kg child', value: '450mg (use adult tablet)' },
          { desc: 'Adult (over 50kg)', value: '500mg–1000mg' }
        ]
      },
      {
        label: 'Ibuprofen — 5–10mg per kg (over 3 months only)',
        rows: [
          { desc: '8 kg baby', value: '40–80mg every 6–8 hours' },
          { desc: '10 kg child', value: '50–100mg every 6–8 hours' },
          { desc: '15 kg child', value: '75–150mg every 6–8 hours' },
          { desc: '20 kg child', value: '100–200mg every 6–8 hours' },
          { desc: 'Adult', value: '400mg every 6–8 hours with food' }
        ]
      }
    ],
    warning: 'Never give aspirin to anyone under 16. Never give ibuprofen to infants under 3 months. Always give ibuprofen with food.'
  },
  {
    id: 'danger-signs',
    title: 'Universal Danger Signs',
    icon: '⚠️',
    color: '#E03131',
    intro: 'These signs always mean go to hospital immediately — regardless of what else is happening.',
    dangerList: [
      'Cannot be woken or is unconscious',
      'Not breathing or struggling to breathe',
      'Lips or fingernails are turning blue',
      'Seizures / fits / convulsions',
      'Severe bleeding that will not stop',
      'Rash that does not fade when pressed with a glass',
      'Fever above 40°C in any person',
      'Any fever in a baby under 3 months',
      'Sudden confusion or inability to speak',
      'Sudden severe headache unlike any previous headache',
      'Face drooping on one side or sudden arm weakness',
      'Chest pain spreading to arm or jaw'
    ]
  },
  {
    id: 'fast-stroke',
    title: 'FAST — Stroke Recognition',
    icon: '🧠',
    color: '#6741D9',
    intro: 'Every minute of stroke = 2 million brain cells lost. Act immediately.',
    fastItems: [
      { letter: 'F', word: 'FACE', desc: 'Ask them to smile. Does one side droop?' },
      { letter: 'A', word: 'ARMS', desc: 'Raise both arms. Does one drift down?' },
      { letter: 'S', word: 'SPEECH', desc: 'Say a phrase. Is it slurred or wrong?' },
      { letter: 'T', word: 'TIME', desc: 'Any of the above? Go to hospital NOW.' }
    ]
  },
  {
    id: 'cpr-steps',
    title: 'CPR — Adult (Quick Steps)',
    icon: '❤️',
    color: '#E03131',
    intro: 'Use when a person is not breathing and unresponsive.',
    numberedList: [
      'Call for help immediately before starting',
      'Lay the person flat on a firm surface',
      'Place heel of hand on CENTRE of chest',
      'Press down hard and fast — 5–6cm depth',
      '30 compressions at a rate of 100–120 per minute',
      'Tilt head back, lift chin, pinch nose shut',
      'Give 2 rescue breaths — 1 second each, watch chest rise',
      'Continue 30 compressions : 2 breaths',
      'Do not stop until help arrives or person breathes'
    ],
    warning: 'For infants: use 2 fingers only. Compress 4cm. Give 30 compressions then 2 gentle puffs.'
  },
  {
    id: 'dehydration-check',
    title: 'Dehydration Check — Children',
    icon: '💧',
    color: '#1971C2',
    items: [
      {
        label: 'Signs by severity',
        rows: [
          { desc: 'Mild', value: 'Thirsty, slightly dry mouth, dark urine' },
          { desc: 'Moderate', value: 'No urine 6–8 hrs, sunken eyes, dry tongue, no tears' },
          { desc: 'Severe', value: 'Sunken soft spot, skin stays pinched, very weak' }
        ]
      }
    ],
    warning: 'Skin test: pinch tummy skin for 2 seconds. If it stays pinched — severe dehydration, go to hospital now.'
  }
]

export default function QuickReferencePage() {
  return (
    <div style={{ paddingTop: '16px', paddingBottom: '40px' }}>

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
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📋</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.7rem',
          color: '#F5F0E8',
          marginBottom: '8px'
        }}>
          Quick Reference
        </h1>
        <p style={{ color: '#9BA8B5', fontSize: '0.85rem', lineHeight: '1.6' }}>
          Critical medical numbers, recipes, and danger signs.
          Works offline after first visit.
        </p>
      </div>

      {/* Jump links */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '28px'
      }}>
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`} style={{
            background: '#1C2B3A',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '6px 12px',
            color: '#9BA8B5',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {s.icon} {s.title.split('—')[0].trim()}
          </a>
        ))}
      </div>

      {/* Sections */}
      {sections.map(section => (
        <div key={section.id} id={section.id}
          style={{ marginBottom: '28px' }}>

          {/* Section header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '14px',
            paddingBottom: '10px',
            borderBottom: `2px solid ${section.color}30`
          }}>
            <span style={{ fontSize: '1.4rem' }}>{section.icon}</span>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.1rem',
              color: '#F5F0E8',
              margin: 0
            }}>
              {section.title}
            </h2>
          </div>

          {/* Intro text */}
          {section.intro && (
            <p style={{
              color: '#9BA8B5',
              fontSize: '0.82rem',
              lineHeight: '1.6',
              marginBottom: '12px'
            }}>
              {section.intro}
            </p>
          )}

          {/* Standard table items */}
          {section.items && section.items.map((item, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <p style={{
                color: section.color,
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                {item.label}
              </p>
              <div style={{
                background: '#1C2B3A',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                overflow: 'hidden'
              }}>
                {item.rows.map((row, j) => (
                  <div key={j} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: j < item.rows.length - 1
                      ? '1px solid rgba(255,255,255,0.04)'
                      : 'none'
                  }}>
                    <span style={{
                      color: '#9BA8B5',
                      fontSize: '0.82rem'
                    }}>
                      {row.desc}
                    </span>
                    <span style={{
                      color: '#F5F0E8',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textAlign: 'right',
                      maxWidth: '55%'
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Danger list */}
          {section.dangerList && (
            <div style={{
              background: 'rgba(224,49,49,0.06)',
              border: '1px solid rgba(224,49,49,0.2)',
              borderRadius: '14px',
              padding: '4px 0'
            }}>
              {section.dangerList.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 14px',
                  borderBottom: i < section.dangerList.length - 1
                    ? '1px solid rgba(224,49,49,0.08)'
                    : 'none'
                }}>
                  <span style={{
                    color: '#E03131',
                    flexShrink: 0,
                    fontSize: '0.8rem',
                    marginTop: '2px'
                  }}>⚠</span>
                  <p style={{
                    color: '#F5F0E8',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* FAST stroke items */}
          {section.fastItems && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {section.fastItems.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: '#1C2B3A',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  padding: '14px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: `${section.color}25`,
                    border: `1px solid ${section.color}40`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{
                      color: section.color,
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      fontFamily: "'DM Serif Display', serif"
                    }}>
                      {item.letter}
                    </span>
                  </div>
                  <div>
                    <p style={{
                      color: section.color,
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      margin: '0 0 3px 0'
                    }}>
                      {item.word}
                    </p>
                    <p style={{
                      color: '#F5F0E8',
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Numbered list */}
          {section.numberedList && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {section.numberedList.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    background: `${section.color}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {i + 1}
                  </div>
                  <p style={{
                    color: '#F5F0E8',
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    margin: 0,
                    paddingTop: '3px'
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Warning box */}
          {section.warning && (
            <div style={{
              background: 'rgba(240,140,0,0.08)',
              border: '1px solid rgba(240,140,0,0.25)',
              borderRadius: '12px',
              padding: '12px 14px',
              marginTop: '12px',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start'
            }}>
              <span style={{ color: '#F08C00', flexShrink: 0 }}>!</span>
              <p style={{
                color: 'rgba(240,140,0,0.9)',
                fontSize: '0.78rem',
                lineHeight: '1.5',
                margin: 0
              }}>
                {section.warning}
              </p>
            </div>
          )}

        </div>
      ))}

      {/* Bottom disclaimer */}
      <div style={{
        background: '#1C2B3A',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '14px',
        marginTop: '8px'
      }}>
        <p style={{
          color: '#5C6E7E',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          margin: 0,
          textAlign: 'center'
        }}>
          This reference is based on WHO and standard
          medical guidelines. Values are for guidance only.
          Individual variations exist. Always seek professional
          medical advice when available.
        </p>
      </div>

    </div>
  )
}
