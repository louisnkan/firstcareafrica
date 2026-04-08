'use client'

export default function ConditionError() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '2rem' }}>⚕️</p>
      <h2 style={{ color: '#F5F0E8' }}>
        This page could not load
      </h2>
      <p style={{ color: '#9BA8B5' }}>
        Please go back and try another condition
        or use the AI triage for guidance.
      </p>
      <a href="/" style={{ color: '#F08C00' }}>
        Return to home
      </a>
    </div>
  )
}
