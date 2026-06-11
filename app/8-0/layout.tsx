import type { Metadata } from 'next'
import { Oswald, Outfit } from 'next/font/google'
import './wc.css'
import GameHeader from './components/GameHeader'
import GameFooter from './components/GameFooter'

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: '8-0 | World Cup Draft Game',
  description:
    'Spin, draft a dream XI from World Cup history, and simulate an 8-match run to glory. Can you go a perfect 8-0?',
  openGraph: {
    title: '8-0 | World Cup Draft Game',
    description:
      'Spin, draft your dream XI from World Cup legends, pick a formation and chase a perfect 8-0 run to the trophy.',
    type: 'website',
    url: 'https://akaran.dev/8-0',
  },
  twitter: {
    card: 'summary_large_image',
    title: '8-0 | World Cup Draft Game',
    description: 'Draft a dream XI from World Cup history and chase a perfect 8-0 run.',
  },
}

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${oswald.variable} ${outfit.variable} wc-root wc-texture`}>
      <div className="relative z-10 flex min-h-screen flex-col">
        <GameHeader />
        <div className="flex-1">{children}</div>
        <GameFooter />
      </div>
    </div>
  )
}
