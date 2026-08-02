'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Is FirstCare Africa really free?',
    a: 'Yes, completely free, with no plan to change that. No account, no subscription, no hidden tier.'
  },
  {
    q: "Does it work without internet?",
    a: 'Yes. After your first visit, the app caches itself on your device, so emergency guidance is available even with no signal or data.'
  },
  {
    q: 'Who reviews the medical content?',
    a: 'Content is based on established sources — WHO guidance, Red Cross first-aid protocols, and international clinical references — and has been informally reviewed by medical professionals. Formal, ongoing review is actively underway as the project grows. If you\'re a medical professional and want to help with that review, reach out below.'
  },
  {
    q: 'Can I trust the drug recommendations?',
    a: 'Drug guidance is meant as a reference point, not a prescription. Always confirm dosage and suitability with a pharmacist or doctor before taking anything, especially for children, pregnancy, or existing conditions.'
  },
  {
    q: 'Do you collect or sell my data?',
    a: "No. There's no account, no tracking, and no data collection tied to your health questions. What you ask stays on your device."
  },
  {
    q: 'Is this a replacement for seeing a doctor?',
    a: "No. FirstCare Africa is a bridge for the moments when a doctor isn't reachable — it's designed to help you act safely in the meantime, not to replace professional care when it's available."
  }
]

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)'
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '20px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{
          color: '#F2EDE4',
          fontSize: '0.95rem',
          fontWeight: '600',
          fontFamily: "'DM Sans', sans-serif"
        }}>{q}</span>
        <span style={{
          color: '#E8A020',
          fontSize: '1.1rem',
          flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }}>+</span>
      </button>
      {isOpen && (
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.85rem',
          lineHeight: '1.7',
          margin: '0 4px 20px',
          maxWidth: '560px'
        }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section style={{
      padding: '100px 20px',
      background: '#0A1628'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#E8A020',
            borderRadius: '1px'
          }} />
          <span style={{
            color: '#E8A020',
            fontSize: '0.68rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>Questions</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: '800',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          marginBottom: '36px',
          color: '#F2EDE4'
        }}>
          Before you
          <span style={{ color: '#E8A020', fontStyle: 'italic' }}> trust us</span> with
          your health.
        </h2>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
