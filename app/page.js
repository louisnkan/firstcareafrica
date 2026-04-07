import Link from 'next/link'
import ShareButton from '../components/ShareButton'
import SearchBar from '../components/SearchBar'

export default function HomePage() {
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '28px', paddingTop: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(240,140,0,0.1)',
          border: '1px solid rgba(240,140,0,0.25)',
          borderRadius: '20px',
          padding: '4px 12px',
          marginBottom: '14px'
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '700',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#F08C00' }}>
            Free · Works Offline · No Login
          </span>
        </div>
        <h1 style={{ marginBottom: '10px', fontSize: '1.9rem' }}>
          Medical help when
          <span style={{
            color: '#F08C00',
            fontStyle: 'italic',
            display: 'block'
          }}> you need it most</span>
        </h1>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.92rem',
          maxWidth: '300px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Trusted guidance when doctors aren't available,
          hospitals are far, or help hasn't arrived yet.
        </p>
      </div>

      {/* SEARCH */}
      <SearchBar />

      {/* EMERGENCY CARD */}
      <Link href="/emergency" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none' }}>
        <div className="card-emergency" style={{ minHeight: '140px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span className="pulse-heart" style={{ fontSize: '2.5rem' }}>🚨</span>
            <span style={{
              background: 'rgba(0,0,0,0.25)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.62rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>Critical</span>
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            marginBottom: '6px',
            fontFamily: "'DM Serif Display', serif"
          }}>Emergency</h2>
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.82rem',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            Severe bleeding · Unconscious · Choking ·
            Heart attack · Childbirth · Drowning · Head injury
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '12px 16px',
            textAlign: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Tap for Emergency Help →
          </div>
        </div>
      </Link>

      {/* AI TRIAGE */}
      <Link href="/triage" style={{ display: 'block', marginBottom: '24px', textDecoration: 'none' }}>
        <div className="card-triage">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="icon-badge badge-purple">🔍</div>
            <div>
              <h3 style={{ color: '#F5F0E8', marginBottom: '3px' }}>
                Describe Your Situation
              </h3>
              <p style={{ color: '#9BA8B5', fontSize: '0.82rem', lineHeight: '1.4' }}>
                Not sure what's wrong? Describe your symptoms
                and get structured guidance instantly.
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* SECTION LABEL */}
      <div className="section-label">Medical Guidance</div>

      {/* CATEGORY GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <Link href="/category/acute" style={{ textDecoration: 'none' }}>
          <div className="card-acute" style={{ height: '100%', minHeight: '110px' }}>
            <div className="icon-badge badge-orange">🤒</div>
            <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '5px' }}>
              Acute Illness
            </h3>
            <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
              Malaria · Typhoid · Fever · Chest pain
            </p>
          </div>
        </Link>

        <Link href="/category/common" style={{ textDecoration: 'none' }}>
          <div className="card-common" style={{ height: '100%', minHeight: '110px' }}>
            <div className="icon-badge badge-blue">💊</div>
            <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '5px' }}>
              Common Conditions
            </h3>
            <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
              Cold · Infection · Headache · Diarrhoea
            </p>
          </div>
        </Link>

        <Link href="/category/womens-health" style={{ textDecoration: 'none' }}>
          <div className="card-womens" style={{ height: '100%', minHeight: '110px' }}>
            <div className="icon-badge badge-purple">🌸</div>
            <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '5px' }}>
              Women's Health
            </h3>
            <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
              Period pain · Discharge · Pregnancy signs
            </p>
          </div>
        </Link>

        <Link href="/category/chronic" style={{ textDecoration: 'none' }}>
          <div className="card-chronic" style={{ height: '100%', minHeight: '110px' }}>
            <div className="icon-badge badge-teal">🫀</div>
            <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '5px' }}>
              Chronic Conditions
            </h3>
            <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
              Hypertension · Diabetes · Asthma
            </p>
          </div>
        </Link>
      </div>

      {/* MATERNAL — full width */}
      <Link href="/category/maternal-child"
        style={{ display: 'block', marginBottom: '10px', textDecoration: 'none' }}>
        <div className="card-maternal">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="icon-badge badge-green">👶</div>
            <div>
              <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '3px' }}>
                Maternal & Child Health
              </h3>
              <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
                Newborn care · Child fever · Breastfeeding · Dehydration
              </p>
            </div>
            <span style={{ color: '#5C6E7E', marginLeft: 'auto',
              fontSize: '1rem', flexShrink: 0 }}>→</span>
          </div>
        </div>
      </Link>

      {/* QUICK REFERENCE */}
      <Link href="/quick-reference"
        style={{ display: 'block', marginBottom: '28px', textDecoration: 'none' }}>
        <div className="card-reference">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="icon-badge badge-amber">📋</div>
            <div>
              <h3 style={{ color: '#F5F0E8', fontSize: '0.9rem', marginBottom: '3px' }}>
                Quick Reference
              </h3>
              <p style={{ color: '#9BA8B5', fontSize: '0.75rem', lineHeight: '1.4' }}>
                Vital signs · Drug doses · ORS recipe · Danger signs
              </p>
            </div>
            <span style={{ color: '#5C6E7E', marginLeft: 'auto',
              fontSize: '1rem', flexShrink: 0 }}>→</span>
          </div>
        </div>
      </Link>

      <div className="divider" />

      {/* TRUST SECTION */}
      <div style={{ marginBottom: '24px' }}>
        <div className="section-label" style={{ marginBottom: '16px' }}>
          Why Trust FirstCare Africa
        </div>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '4px 16px'
        }}>
          {[
            ['⚕️', 'Based on WHO and universal first-aid protocols'],
            ['📶', 'Works offline after first visit — no data needed'],
            ['🌍', 'Written for untrained individuals in low-resource settings'],
            ['🔒', 'No account, no tracking, no data collected. Ever.'],
          ].map(([icon, text]) => (
            <div key={text} className="trust-check">
              <span style={{ fontSize: '0.95rem', marginTop: '1px',
                flexShrink: 0 }}>{icon}</span>
              <p style={{ color: '#9BA8B5', fontSize: '0.82rem',
                lineHeight: '1.5', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MEDICAL REVIEW NOTICE */}
      <div style={{
        background: 'rgba(240,140,0,0.06)',
        border: '1px solid rgba(240,140,0,0.2)',
        borderRadius: '14px',
        padding: '12px 16px',
        marginBottom: '8px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>⚕️</span>
        <p style={{
          color: 'rgba(240,140,0,0.85)',
          fontSize: '0.75rem',
          lineHeight: '1.5',
          margin: 0
        }}>
          Content currently under medical review.
          Use professional judgment alongside this guidance
          until review is complete.
        </p>
      </div>

{/* SHARE SECTION */}
      <div style={{ marginTop: '8px', marginBottom: '8px' }}>
        <div className="section-label" style={{ marginBottom: '14px' }}>
          Share FirstCare Africa
        </div>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.8rem',
          marginBottom: '14px',
          lineHeight: '1.5'
        }}>
          Someone you know might need this. Share it — it could 
          save a life.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '10px'
        }}>
          {/* WhatsApp */}
          <a
            href="https://wa.me/?text=FirstCare%20Africa%20%E2%80%94%20Medical%20guidance%20when%20doctors%20aren't%20available.%20Works%20offline.%20Free%20forever.%20https%3A%2F%2Ffirstcareafrica.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: '12px',
              padding: '12px',
              textDecoration: 'none',
              color: '#25D366',
              fontSize: '0.82rem',
              fontWeight: '600',
              minHeight: '44px'
            }}>
            <span>💬</span> WhatsApp
          </a>

          {/* X / Twitter */}
          <a
            href="https://twitter.com/intent/tweet?text=FirstCare%20Africa%20%E2%80%94%20Medical%20guidance%20when%20doctors%20aren't%20available.%20Free%2C%20offline-capable%2C%20no%20login.%20Built%20for%20Africa.&url=https%3A%2F%2Ffirstcareafrica.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '12px',
              textDecoration: 'none',
              color: '#F5F0E8',
              fontSize: '0.82rem',
              fontWeight: '600',
              minHeight: '44px'
            }}>
            <span>𝕏</span> Twitter/X
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffirstcareafrica.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(10,102,194,0.1)',
              border: '1px solid rgba(10,102,194,0.25)',
              borderRadius: '12px',
              padding: '12px',
              textDecoration: 'none',
              color: '#0A66C2',
              fontSize: '0.82rem',
              fontWeight: '600',
              minHeight: '44px'
            }}>
            <span>💼</span> LinkedIn
          </a>

{/* Copy Link */}
          <ShareButton />
        </div>

        {/* Instagram note */}
        <p style={{
          color: '#5C6E7E',
          fontSize: '0.72rem',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          For Instagram: copy the link above and paste 
          in your bio or story link sticker.
        </p>
      </div>

    </div>
  )
  }
     
