import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Play | 8-0 World Cup Draft',
  description:
    'Learn how to play 8-0: spin for World Cup squads, draft your dream XI, pick a formation and simulate the run to the trophy.',
}

const STEPS = [
  {
    n: '01',
    title: 'Pick a formation',
    body: 'Choose one of seven systems. Your formation defines the eleven positions you must fill — one goalkeeper, plus defenders, midfielders and forwards.',
  },
  {
    n: '02',
    title: 'Spin the wheel',
    body: 'Each spin lands on a single nation from a single World Cup — say, Brazil 2002 or France 2022. That squad is now available to draft from.',
  },
  {
    n: '03',
    title: 'Draft a player',
    body: 'Pick one player from the spun squad to fill an open position. A player can only go into a slot that matches their position group. Each squad can only be spun once per game.',
  },
  {
    n: '04',
    title: 'Use your skips wisely',
    body: 'Don’t like the options? You get three skips per game to re-spin. Once they’re gone, you draft from whatever the wheel gives you.',
  },
  {
    n: '05',
    title: 'Complete your XI',
    body: 'Repeat until all eleven positions are filled. Players from the same nation build chemistry, giving your team a rating boost.',
  },
  {
    n: '06',
    title: 'Simulate the run',
    body: 'Play eight matches — three group games, then five knockout rounds to the Final. Ratings, chemistry and a little luck decide each result.',
  },
]

export default function HowToPlay() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-wc-gold/30 bg-wc-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-wc-gold-light">
          The Rules
        </span>
        <h1 className="wc-display mt-5 text-4xl font-bold text-wc-cream sm:text-5xl">
          How to play <span className="wc-gold-text">8-0</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-wc-muted">
          Build a dream XI from World Cup legends and simulate a run to the trophy. The name? A
          perfect tournament is eight matches won, zero lost.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {STEPS.map((s) => (
          <div key={s.n} className="wc-glass flex gap-4 rounded-2xl p-5">
            <span className="wc-display shrink-0 text-2xl font-bold text-wc-gold/50">{s.n}</span>
            <div>
              <h2 className="wc-display text-lg font-semibold text-wc-cream">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-wc-muted">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modes */}
      <div className="mt-12">
        <h2 className="wc-display text-center text-2xl font-bold text-wc-cream">Two ways to play</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="wc-glass rounded-2xl p-5">
            <h3 className="wc-display text-lg font-semibold text-wc-gold-light">⭐ Classic</h3>
            <p className="mt-1 text-sm text-wc-muted">
              Player ratings are shown. Optimise every pick and chase the highest-rated XI you can
              assemble.
            </p>
          </div>
          <div className="wc-glass rounded-2xl p-5">
            <h3 className="wc-display text-lg font-semibold text-wc-gold-light">🧠 World Cup IQ</h3>
            <p className="mt-1 text-sm text-wc-muted">
              Ratings are hidden until the final whistle. Draft on instinct and knowledge alone —
              the true test of a football mind.
            </p>
          </div>
        </div>
      </div>

      {/* Scoring */}
      <div className="wc-glass mt-8 rounded-2xl p-6">
        <h2 className="wc-display text-xl font-semibold text-wc-cream">What is a perfect 8-0?</h2>
        <p className="mt-2 text-sm leading-relaxed text-wc-muted">
          Win all eight matches in regulation, extra time or on penalties — without a single
          regulation loss — and you’ll earn the perfect <strong className="text-wc-gold-light">8-0</strong>{' '}
          and lift the trophy. A loss in the group stage still lets you advance, but it costs your
          perfect record. Lose a knockout match and your run is over.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/8-0/game?mode=classic" className="wc-btn-gold rounded-xl px-8 py-4 text-lg">
          ⚽ Start drafting
        </Link>
        <Link href="/8-0" className="wc-btn-ghost rounded-xl px-8 py-4 text-lg">
          ← Back to menu
        </Link>
      </div>
    </main>
  )
}
