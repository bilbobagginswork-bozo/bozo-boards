'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import CursorToggle from './CursorToggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/boards', label: 'For Sale' },
  { href: '/repair', label: 'Submit Repair' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Bozo Boards"
            height={48}
            width={48}
            priority
            className="h-10 w-auto dark:invert dark:mix-blend-screen dark:contrast-[10]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition rounded
                ${pathname === href
                  ? 'text-[#2BD9C6]'
                  : 'text-neutral-500 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: toggle only (login is admin-only, not public) */}
        <div className="hidden md:flex items-center gap-2">
          <CursorToggle />
          <ThemeToggle />
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-neutral-800 dark:text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] px-4 py-4 flex flex-col gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`py-2 text-sm font-bold uppercase tracking-wide ${pathname === href ? 'text-[#2BD9C6]' : 'text-neutral-500 dark:text-white/70'}`}
            >
              {label}
            </Link>
          ))}
          <hr className="border-neutral-200 dark:border-white/10 my-2" />
        </div>
      )}
    </header>
  )
}
