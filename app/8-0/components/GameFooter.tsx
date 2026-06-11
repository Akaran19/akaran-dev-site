import Link from 'next/link'

export default function GameFooter() {
  return (
    <footer className="relative z-10 border-t border-wc-gold/15 bg-wc-navy/60">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          {/* Brand + inspired-by */}
          <div className="space-y-1.5">
            <div className="text-sm text-wc-muted">
              <span className="wc-display font-semibold text-wc-cream">8-0</span> — a World Cup
              draft game by{' '}
              <Link href="/" className="text-wc-gold-light hover:underline">
                Akaran Sivakumar
              </Link>
              .
            </div>
            <div className="text-xs text-wc-muted/60">
              Inspired by and with thanks to{' '}
              <a
                href="https://82-0.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wc-muted/80 hover:text-wc-cream hover:underline"
              >
                82-0.com
              </a>
            </div>
          </div>

          {/* Links + BMC */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            <Link href="/8-0/how-to-play" className="text-sm text-wc-muted hover:text-wc-cream">
              How to Play
            </Link>
            <a
              href="/contact"
              className="text-sm text-wc-muted hover:text-wc-cream"
            >
              ✉ Feedback & bugs
            </a>
            <a
              href="https://buymeacoffee.com/akaran19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-wc-gold-light to-wc-gold px-3.5 py-1.5 text-sm font-semibold text-wc-navy shadow-gold transition-transform hover:-translate-y-0.5"
            >
              ☕ Enjoying the game?
            </a>
          </div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-white/5 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[11px] text-wc-muted/50">
            © 2026 8-0. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-wc-muted/50">
            <span>Partners</span>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-wc-muted">Privacy &amp; Cookies Policy</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-wc-muted">Terms of Use</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-wc-muted">Cookie Settings</a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5 px-4 py-3">
        <p className="mx-auto max-w-4xl text-center text-[10px] leading-relaxed text-wc-muted/40">
          8-0 is an independent, fan-made game. It is not affiliated with, endorsed by, sponsored
          by, licensed by, or otherwise associated with any football club, competition, league,
          governing body, organisation, game publisher, or ratings provider. All club names, player
          names, ratings, statistics and season data are used for informational, descriptive and
          editorial purposes only. No official logos, crests, player images, likenesses or other
          official branding are used. All trademarks, trade names and other intellectual property
          rights remain the property of their respective owners.
          {' '}Player data derived from the{' '}
          <a
            href="https://github.com/jfjelstul/worldcup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-wc-muted/60 underline underline-offset-2"
          >
            Fjelstul World Cup Database
          </a>
          . Ratings are generated for entertainment and are not official.
        </p>
      </div>
    </footer>
  )
}
