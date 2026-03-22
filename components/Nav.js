'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'
import { useSaved } from './SavedProvider'

const links = [
  { href: '/',            label: 'Home' },
  { href: '/activities',  label: 'Activities' },
  { href: '/events',      label: 'Events' },
  { href: '/trips',       label: 'Weekend Trips' },
  { href: '/saved',       label: 'Saved' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScroll = useRef(0)
  const { saved } = useSaved()

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
    <nav
      className={`sticky top-0 z-50 bg-[#fafaf8]/90 dark:bg-[#141413]/90 backdrop-blur-md border-b border-[#e8e8e4] dark:border-[#333330] transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between">
        <Link href="/" className="text-[17px] font-bold tracking-tight text-[#1a1a18] dark:text-[#e0e0dc] no-underline">
          SG<span className="text-accent">.</span>explorer
        </Link>

        <ul className="hidden md:flex gap-7 list-none" role="menubar">
          {links.map(l => (
            <li key={l.href} role="none">
              <Link
                href={l.href}
                role="menuitem"
                aria-current={pathname === l.href ? 'page' : undefined}
                className={`text-sm font-medium no-underline transition-colors ${
                  pathname === l.href ? 'text-[#1a1a18] dark:text-white' : 'text-[#6b6b66] dark:text-[#a0a09b] hover:text-[#1a1a18] dark:hover:text-white'
                }`}
              >
                {l.label}
                {l.href === '/saved' && saved.length > 0 && (
                  <span className="ml-1 text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">{saved.length}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Link href="/suggest" className="hidden sm:inline-block text-sm font-semibold px-4 py-2 bg-[#1a1a18] dark:bg-white dark:text-[#1a1a18] text-white rounded-lg hover:opacity-80 transition-opacity no-underline">
            Submit a spot
          </Link>
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f0f0ec] dark:hover:bg-[#333] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
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
        <div className="md:hidden border-t border-[#e8e8e4] dark:border-[#333330] bg-[#fafaf8]/95 dark:bg-[#141413]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                  pathname === l.href ? 'bg-accent-light text-accent' : 'text-[#6b6b66] dark:text-[#a0a09b] hover:bg-[#f0f0ec] dark:hover:bg-[#333] hover:text-[#1a1a18] dark:hover:text-white'
                }`}>
                {l.label}
                {l.href === '/saved' && saved.length > 0 && (
                  <span className="ml-1 text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">{saved.length}</span>
                )}
              </Link>
            ))}
            <Link href="/suggest" className="mt-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#1a1a18] dark:bg-white dark:text-[#1a1a18] text-white no-underline text-center">
              Submit a spot
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
