import './globals.css'
import Nav from '@/components/Nav'
import BackToTop from '@/components/BackToTop'
import ClientProviders from '@/components/ClientProviders'

export const metadata = {
  title: 'SG Explorer \u2014 Things to do in Singapore',
  description: 'A curated guide to activities, events, and weekend escapes in Singapore for people in their late 20s.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'SG Explorer' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2d6a4f',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('sg-dark') === 'true' || (!localStorage.getItem('sg-dark') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            }
          } catch {}
          if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
        `}} />
      </head>
      <body className="bg-[#fafaf8] dark:bg-[#141413] text-[#1a1a18] dark:text-[#e0e0dc] transition-colors duration-200">
        <ClientProviders>
          <Nav />
          <main className="page-enter">{children}</main>
          <BackToTop />
          <footer className="bg-[#1a1a18] dark:bg-[#0a0a09] text-white/60 py-12 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-white font-bold text-lg">SG<span className="text-[#74c69d]">.</span>explorer</span>
                <p className="text-sm mt-1">Updated weekly by an AI agent &middot; Built for Singapore&apos;s late-20s crowd</p>
              </div>
              <p className="text-sm">Made with {'\u2665'} in Singapore</p>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  )
}
