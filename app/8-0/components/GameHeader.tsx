'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/8-0', label: 'Home', exact: true },
  { href: '/8-0/game?mode=classic', label: 'Play', exact: false, matchPath: '/8-0/game' },
  { href: '/8-0/leaderboard', label: 'Leaderboard', exact: false },
]

export default function GameHeader() {
  const pathname = usePathname() || ''

  function isActive(item: { href: string; exact?: boolean; matchPath?: string }) {
    const path = item.matchPath ?? item.href
    if (item.exact) return pathname === '/8-0'
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-wc-gold/15 bg-wc-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/8-0" className="group flex items-center gap-2.5">
          <span className="wc-display grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-b from-wc-gold-light to-wc-gold text-lg font-bold text-wc-navy shadow-gold">
            8-0
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="wc-display text-sm font-semibold tracking-wide text-wc-cream">
              WORLD CUP DRAFT
            </span>
            <span className="text-[11px] text-wc-muted">Draft. Simulate. Conquer.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-wc-gold/15 text-wc-gold-light'
                    : 'text-wc-muted hover:text-wc-cream'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          {/* Feedback */}
          <a
            href="/contact"
            className="rounded-md p-1.5 text-wc-muted transition-colors hover:text-wc-cream"
            title="Feedback & bugs"
            aria-label="Feedback & bugs"
          >
            ✉
          </a>

          {/* BMC */}
          <a
            href="https://buymeacoffee.com/akaran19"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-wc-muted transition-colors hover:text-wc-gold-light"
            title="Enjoying the game? Buy me a coffee ☕"
            aria-label="Buy me a coffee"
          >
            ☕
          </a>
        </nav>
      </div>
    </header>
  )
}
