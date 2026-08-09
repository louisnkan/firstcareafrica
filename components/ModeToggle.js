'use client'

import { useMode } from '../contexts/ModeContext'

export default function ModeToggle() {
  const { mode, setMode } = useMode()
  const isClinical = mode === 'clinical'

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 140,
      width: '100%',
      background: isClinical
        ? 'linear-gradient(90deg, #0C8599, #1971C2)'
        : '#0F1E30',
      borderBottom: isClinical
        ? '1px solid rgba(255,255,255,0.15)'
        : '1px solid rgba(255,255,255,0.06)',
      padding: '7px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <span style={{
        color: isClinical ? 'white' : '#5C6E7E',
        fontSize: '0.72rem',
        fontWeight: '600'
      }}>
        {isClinical
          ? 'Health Worker View — dosing, referral & clinical detail shown'
          : 'Trained health worker? Switch views for faster clinical reference.'}
      </span>
      <button
        onClick={() => setMode(isClinical ? 'patient' : 'clinical')}
        style={{
          background: isClinical ? 'rgba(255,255,255,0.15)' : 'rgba(232,160,32,0.12)',
          border: isClinical
            ? '1px solid rgba(255,255,255,0.3)'
            : '1px solid rgba(232,160,32,0.3)',
          borderRadius: '20px',
          padding: '4px 12px',
          color: isClinical ? 'white' : '#E8A020',
          fontSize: '0.7rem',
          fontWeight: '700',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
      >
        {isClinical ? 'Back to Patient View' : 'Switch View'}
      </button>
    </div>
  )
}
