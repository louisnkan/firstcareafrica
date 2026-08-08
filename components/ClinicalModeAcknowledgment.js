'use client'

import { useMode } from '../contexts/ModeContext'

export default function ClinicalModeAcknowledgment() {
  const { showAcknowledgment, acknowledgeClinicalMode, setMode } = useMode()

  if (!showAcknowledgment) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: '#0F1E30',
        border: '1px solid rgba(12,133,153,0.25)',
        borderRadius: '24px 24px 0 0',
        padding: '32px 24px 40px',
        maxWidth: '520px',
        width: '100%'
      }}>
        <div style={{
          width: '40px',
          height: '4px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '2px',
          margin: '0 auto 28px'
        }} />
        <div style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #0C8599, #1971C2)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          marginBottom: '20px'
        }}>⚕️</div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.5rem',
          color: '#F2EDE4',
          marginBottom: '14px',
          lineHeight: '1.25',
          fontWeight: '700'
        }}>
          Health Worker Mode
        </h2>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.9rem',
          lineHeight: '1.7',
          marginBottom: '24px'
        }}>
          This mode shows denser, clinical-register content — dosing
          tables, differentials, and referral criteria — intended for
          trained health workers as a fast reference, not a
          replacement for clinical judgment or training.
        </p>
        <button
          onClick={acknowledgeClinicalMode}
          style={{
            background: 'linear-gradient(135deg, #0C8599, #1971C2)',
            border: 'none',
            borderRadius: '14px',
            padding: '16px',
            color: 'white',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '10px'
          }}>
          I understand — Continue to Health Worker Mode
        </button>
        <button
          onClick={() => setMode('patient')}
          style={{
            background: 'none',
            border: 'none',
            color: '#5C6E7E',
            fontSize: '0.82rem',
            cursor: 'pointer',
            width: '100%',
            padding: '8px'
          }}>
          Stay in patient mode
        </button>
      </div>
    </div>
  )
}
