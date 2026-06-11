import Link from 'next/link'
import { STATS } from './data/players'

const FEATURES = [
  {
    icon: '🎰',
    title: 'Spin for legends',
    body: 'Each spin lands on a nation from a single World Cup. Draft one player from that squad — then spin again.',
  },
  {
    icon: '🧩',
    title: 'Pick your shape',
    body: 'Seven formations, from fortress 5-4-1 to all-out 3-4-3. Your slots decide who you can draft.',
  },
  {
    icon: '⚽',
    title: 'Simulate the run',
    body: 'Eight matches. Group stage to the Final. Chemistry, ratings and a little luck decide your fate.',
  },
  {
    icon: '🏆',
    title: 'Chase the 8-0',
    body: 'A perfect run is eight wins, zero losses. Save it to the leaderboard and share your XI.',
  },
]

export default function GameLanding() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:pt-24">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-wc-gold/30 bg-wc-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-wc-gold-light">
            World Cup Draft Game
          </span>
        </div>

        <h1 className="wc-display mt-6 animate-slide-up pb-2 text-6xl font-bold leading-[1.08] sm:text-8xl">
          <span className="wc-gold-text">8-0</span>
        </h1>
        <p className="wc-display mx-auto mt-3 max-w-2xl animate-slide-up text-2xl font-semibold text-wc-cream sm:text-3xl">
          Draft a dream XI from World Cup history.
        </p>
        <p className="mx-auto mt-4 max-w-xl animate-slide-up text-base text-wc-muted sm:text-lg">
          Spin through {STATS.worldCups} World Cups, build your team one legend at a time, pick a
          formation and simulate the run to glory. Can you go a perfect eight-and-oh?
        </p>

        {/* Mode CTAs */}
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-stretch justify-center gap-4 sm:flex-row">
          <Link
            href="/8-0/game?mode=classic"
            className="wc-btn-gold flex-1 rounded-2xl px-6 py-4 text-lg"
          >
            <span className="block wc-display text-lg font-bold">Classic Mode</span>
            <span className="mt-0.5 block text-xs font-normal text-wc-navy/70">
              Ratings shown — build the best XI
            </span>
          </Link>
          <Link
            href="/8-0/game?mode=worldcupiq"
            className="wc-btn-ghost flex-1 rounded-2xl px-6 py-4 text-lg"
          >
            <span className="block wc-display text-lg font-bold text-wc-cream">
              World Cup IQ
            </span>
            <span className="mt-0.5 block text-xs font-normal text-wc-muted">
              Ratings hidden — trust your knowledge
            </span>
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/8-0/how-to-play"
            className="text-sm text-wc-muted underline-offset-4 hover:text-wc-cream hover:underline"
          >
            New here? Read how to play →
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="wc-glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
          <StatCell value={STATS.players.toLocaleString()} label="Players" />
          <StatCell value={`${STATS.countries}`} label="Nations" />
          <StatCell value={`${STATS.worldCups}`} label="World Cups" />
          <StatCell value={`${STATS.combos}`} label="Squads to spin" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="wc-display text-center text-3xl font-bold text-wc-cream">
          How it works
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="wc-glass rounded-2xl p-5"
            >
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-wc-gold/10 text-2xl">
                {f.icon}
              </div>
              <div className="mb-1 flex items-center gap-2">
                <span className="wc-display text-xs font-bold text-wc-gold-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="wc-display text-lg font-semibold text-wc-cream">{f.title}</h3>
              </div>
              <p className="text-sm leading-snug text-wc-muted">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/8-0/game?mode=classic" className="wc-btn-gold rounded-2xl px-8 py-4 text-lg">
            ⚽ Start drafting
          </Link>
        </div>
      </section>
    </main>
  )
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-wc-navy/40 px-4 py-5 text-center">
      <div className="wc-display text-2xl font-bold tabular-nums text-wc-gold-light sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-wc-muted">{label}</div>
    </div>
  )
}
