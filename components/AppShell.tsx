'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Spotlight from '@/components/Spotlight'

/**
 * Renders the personal-site chrome (Navbar/Footer/Spotlight) for normal pages,
 * but steps out of the way for the full-bleed "8-0" game routes which bring
 * their own header, footer and theme.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const isGame = pathname === '/8-0' || pathname.startsWith('/8-0/')

  if (isGame) {
    return <>{children}</>
  }

  return (
    <>
      <Spotlight />
      <Navbar />
      <main className="min-h-screen relative z-10">{children}</main>
      <Footer />
    </>
  )
}
