import './globals.css'

export const metadata = {
  title: 'FirstCare Africa — Medical Guidance When Doctors Aren\'t Available',
  description: 'Step-by-step emergency first-aid and health guidance for Africa. Works offline. Free forever. Covers emergencies, acute illness, women\'s health, and more.',
  keywords: 'first aid africa, medical emergency africa, no doctor, health guidance nigeria, health app africa, malaria first aid, emergency help africa',
  manifest: '/manifest.json',
  authors: [{ name: 'FirstCare Africa' }],
  robots: 'index, follow',
  openGraph: {
    title: 'FirstCare Africa',
    description: 'Medical guidance when doctors aren\'t available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FirstCare Africa'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FirstCare Africa',
    description: 'Medical guidance when doctors aren\'t available.'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0F1923'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu',
                e => e.preventDefault());
              document.addEventListener('keydown', function(e) {
                if (e.key === 'F12') e.preventDefault();
                if (e.ctrlKey && e.shiftKey &&
                    (e.key==='I'||e.key==='J'||e.key==='C'))
                  e.preventDefault();
                if (e.ctrlKey && e.key==='U') e.preventDefault();
              });
            `
          }}
        />

        <div style={{ minHeight: '100vh', backgroundColor: '#0F1923' }}>

          {/* Navigation */}
          <nav style={{
            backgroundColor: 'rgba(15,25,35,0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '0 16px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}>
            <div style={{
              maxWidth: '520px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '56px'
            }}>
              <a href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  minHeight: 0
                }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, #E03131, #C92A2A)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(224,49,49,0.4)'
                }}>✚</div>
                <span style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: '1.15rem',
                  color: '#F5F0E8',
                  letterSpacing: '-0.01em'
                }}>
                  FirstCare
                  <span style={{ color: '#F08C00' }}> Africa</span>
                </span>
              </a>

              <a href="/triage"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#9BA8B5',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  minHeight: 0,
                  height: '32px',
                  letterSpacing: '0.02em'
                }}>
                Ask AI
              </a>
            </div>
          </nav>

          {/* Page content */}
          <main style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '0 16px 40px'
          }}>
            {children}
          </main>

          {/* Footer */}
          <footer style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '0 16px 32px'
          }}>
            <div className="disclaimer-banner">
              FirstCare Africa provides general medical guidance only.
              It does not replace a doctor or professional medical advice.
              In a true emergency, seek professional help immediately.
            </div>
            <p style={{
              textAlign: 'center',
              color: '#3D5166',
              fontSize: '0.72rem',
              marginTop: '12px',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              © 2025 FirstCare Africa · Free forever · Built for Africa
            </p>
          </footer>

        </div>
      </body>
    </html>
  )
}
