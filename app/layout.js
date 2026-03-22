import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'SG Explorer — Things to do in Singapore',
  description: 'A curated guide to activities, events, and weekend escapes in Singapore for people in their late 20s.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="bg-[#1a1a18] text-white/60 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-white font-bold text-lg">SG<span className="text-[#74c69d]">.</span>explorer</span>
              <p className="text-sm mt-1">Updated weekly by an AI agent · Built for Singapore&apos;s late-20s crowd</p>
            </div>
            <p className="text-sm">Made with ♥ in Singapore</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
