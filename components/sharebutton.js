'use client'

export default function ShareButton() {
  function copyLink() {
    navigator.clipboard.writeText('https://firstcareafrica.vercel.app')
      .then(() => alert('Link copied!'))
      .catch(() => alert('Copy failed — please copy manually'))
  }

  return (
    <button
      onClick={copyLink}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: 'rgba(240,140,0,0.1)',
        border: '1px solid rgba(240,140,0,0.25)',
        borderRadius: '12px',
        padding: '12px',
        color: '#F08C00',
        fontSize: '0.82rem',
        fontWeight: '600',
        cursor: 'pointer',
        minHeight: '44px',
        width: '100%'
      }}>
      <span>🔗</span> Copy Link
    </button>
  )
}
