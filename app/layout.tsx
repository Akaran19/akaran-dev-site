import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Spotlight from '@/components/Spotlight'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Akaran Sivakumar – Decision-Focused Data Scientist',
  description: 'Data scientist specializing in decision-making under uncertainty using behavioral data, statistical modeling, and experimentation.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen relative`}>
        <Spotlight />
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}