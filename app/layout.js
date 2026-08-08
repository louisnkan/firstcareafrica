import './globals.css'
import FABChat from '../components/FABChat'

export const metadata = {
  metadataBase: new URL('https://firstcareafrica.health'),
  alternates: {
    canonical: '/'
  },
  title: 'FirstCare Africa — Medical Guidance When Doctors Aren\'t Available',
  description: 'Emergency first-aid, illness guidance, drug recommendations and AI-powered medical advice for Africa. Free forever. Works offline. No login required.',
  keywords: 'first aid africa, medical emergency africa, no doctor, health guidance nigeria, malaria first aid, emergency help africa, AI doctor africa',
  manifest: '/manifest.json',
  authors: [{ name: 'FirstCare Africa' }],
  robots: 'index, follow',
  verification: {
    google: 'IaOeWbJNEKXSW-p1fNsidhXsxW8boQ9U-B9PteNm0a0'
  },
  openGraph: {
    title: 'FirstCare Africa — Medical Guidance When Doctors Aren\'t Available',
    description: 'Emergency first-aid, illness guidance, and AI-powered medical advice for Africa. Free. Offline. No login.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FirstCare Africa',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FirstCare Africa — Medical guidance when doctors aren\'t available'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FirstCare Africa',
    description: 'Medical guidance when doctors aren\'t available.',
    images: ['/og-image.png']
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A1628'
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
          rel="preload"
          href="https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYh0.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap"
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
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                })
              }
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
        <div style={{ minHeight: '100vh', backgroundColor: '#0A1628' }}>
          {children}
          <FABChat />
        </div>
      </body>
    </html>
  )
}
