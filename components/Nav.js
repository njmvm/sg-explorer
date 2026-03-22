'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',            label: 'Home' },
  { href: '/activities',  label: 'Activities' },
  { href: '/events',      label: 'Events' },
  { href: '/trips',       label: 'Weekend Trips' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScroll = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y < 60) { setVisible(true) }
      else if (y > lastScroll.current + 5) { setVisible(false); setMobileOpen(false) }
      else if (y < lastScroll.current - 5) { setVisible(true) }
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <nav className={`sticky top-0 z-50 bg-[#fafaf8]/90 backdrop-blur-md border-b border-[#e8e8e4] transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between">
        <Link href="/" className="text-[17px] font-bold tracking-tight text-[#1a1a18] no-underline">
          SG<span className="text-accent">.</span>explorer
        </Link>

        <ul className="hidden md:flex gap-7 list-none">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium no-underline transition-colors ${
                  pathname === l.href ? 'text-[#1a1a18]' : 'text-[#6b6b66] hover:text-[#1a1a18]'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/suggest" className="hidden sm:inline-block text-sm font-semibold px-4 py-2 bg-[#1a1a18] text-white rounded-lg hover:opacity-80 transition-opacity no-underline">
            Submit a spot
          </Link>
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f0f0ec] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></>
              ) : (
                <><line x1="3" y1="5" x2="17" y2="5" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="15" x2="17" y2="15" /></>
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e8e8e4] bg-[#fafaf8]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                  pathname === l.href ? 'bg-accent-light text-accent' : 'text-[#6b6b66] hover:bg-[#f0f0ec] hover:text-[#1a1a18]'
                }`}>
                {l.label}
              </Link>
            ))}
            <Link href="/suggest" className="mt-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#1a1a18] text-white no-underline text-center">
              Submit a spot
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
