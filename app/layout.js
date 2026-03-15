import './globals.css'

export const metadata = {
  title: 'FirstCare Africa',
  description: 'Medical guidance when doctors aren\'t available. Emergency first-aid, illness guidance, and health advice for Africa.',
  keywords: 'first aid africa, medical emergency, no doctor, health guidance',
  manifest: '/manifest.json',
  themeColor: '#DC2626',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FirstCare'
  },
  openGraph: {
    title: 'FirstCare Africa',
    description: 'Medical guidance when doctors aren\'t available.',
    type: 'website'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#DC2626'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {/* Security: disable right-click and devtools */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('contextmenu', 
              e => e.preventDefault());
            document.addEventListener('keydown', function(e) {
              if (e.key === 'F12') e.preventDefault();
              if (e.ctrlKey && e.shiftKey && 
                  (e.key === 'I' || e.key === 'J')) 
                e.preventDefault();
              if (e.ctrlKey && e.key === 'U') 
                e.preventDefault();
            });
          `
        }} />

        {/* App wrapper */}
        <div className="min-h-screen bg-gray-950">
          {/* Top navigation bar */}
          <nav className="bg-gray-900 border-b border-gray-800 
                          px-4 py-3 sticky top-0 z-50">
            <div className="max-w-lg mx-auto flex items-center 
                            justify-between">
              <a href="/" className="flex items-center gap-2 
                                     min-h-0 h-auto">
                <span className="text-red-500 text-xl">✚</span>
                <span className="font-bold text-white text-lg">
                  FirstCare
                  <span className="text-red-500"> Africa</span>
                </span>
              </a>
              <a href="/triage" 
                 className="text-sm bg-gray-700 text-gray-200 
                            px-3 py-1 rounded-lg min-h-0 h-8">
                Ask AI
              </a>
            </div>
          </nav>

          {/* Page content */}
          <main className="max-w-lg mx-auto px-4 pb-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="max-w-lg mx-auto px-4 pb-6 
                             mt-4">
            <div className="disclaimer-banner">
              <p>
                FirstCare Africa provides general medical guidance only.
                It does not replace a doctor or professional medical advice.
                In a true emergency, call for help and go to the nearest 
                clinic immediately.
              </p>
            </div>
            <p className="text-center text-gray-600 text-xs mt-3">
              © 2025 FirstCare Africa · Free forever
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
