import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      padding: '60px 20px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <p style={{ fontSize: '3rem', marginBottom: '16px' }}>
        ⚕️
      </p>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        color: '#F5F0E8',
        fontSize: '1.5rem',
        marginBottom: '12px'
      }}>
        Page not found
      </h1>
      <p style={{
        color: '#9BA8B5',
        fontSize: '0.9rem',
        marginBottom: '24px',
        lineHeight: '1.6'
      }}>
        This page doesn't exist. If you were
        looking for medical guidance, try
        searching from the home screen.
      </p>
      <Link href="/" style={{
        background: '#E03131',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem'
      }}>
        Go to Home
      </Link>
    </div>
  )
}
