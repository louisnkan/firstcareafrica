'use client'

import { useMode } from '../contexts/ModeContext'

export default function ModeToggle() {
  const { mode, setMode } = useMode()
  const isClinical = mode === 'clinical'

  return (
    <button
      onClick={() => setMode(isClinical ? 'patient' : 'clinical')}
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        zIndex: 130,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: isClinical
          ? 'linear-gradient(135deg, #0C8599, #1971C2)'
          : 'rgba(15,30,48,0.85)',
        border: isClinical
          ? '1px solid rgba(255,255,255,0.25)'
          : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '18px',
        padding: '7px 12px',
        color: isClinical ? 'white' : '#5C6E7E',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.68rem',
        fontWeight: '700',
        letterSpacing: '0.02em',
        cursor: 'pointer',
        boxShadow: isClinical
          ? '0 2px 14px rgba(12,133,153,0.35)'
          : '0 1px 6px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(6px)'
      }}
      aria-label={isClinical ? 'Switch back to patient view' : 'Switch to Clinical View for health workers'}
    >
      <span style={{ fontSize: '0.8rem' }}>⚕️</span>
      {isClinical ? 'Clinical View' : 'Clinical View'}
    </button>
  )
}
