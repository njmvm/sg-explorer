'use client'
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

  return (
    <nav className="sticky top-0 z-50 bg-[#fafaf8]/90 backdrop-blur-md border-b border-[#e8e8e4]">
      <div className="max-w-6xl mx-auto px-8 h-[60px] flex items-center justify-between">
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

        <button className="text-sm font-semibold px-4 py-2 bg-[#1a1a18] text-white rounded-lg hover:opacity-80 transition-opacity">
          Submit a spot
        </button>
      </div>
    </nav>
  )
}
