'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { GameMode, LeaderboardEntry } from '../lib/types'
import { getFormation } from '../lib/types'
import { getEntries, clearEntries } from '../lib/leaderboard'

type Filter = 'all' | GameMode

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classic', label: 'Classic' },
  { id: 'worldcupiq', label: 'World Cup IQ' },
]

export default function LeaderboardClient() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loaded, setLoaded] = useState(false)

  const refresh = () => setEntries(getEntries())

  useEffect(() => {
    refresh()
    setLoaded(true)
  }, [])

  const shown = entries.filter((e) => filter === 'all' || e.mode === filter)

  const onClear = () => {
    if (window.confirm('Clear your entire local leaderboard? This cannot be undone.')) {
      clearEntries()
      refresh()
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <span className="text-4xl">🏅</span>
        <h1 className="wc-display mt-2 text-4xl font-bold text-wc-cream">Leaderboard</h1>
        <p className="mt-2 text-wc-muted">
          Your best runs, saved on this device. Champions rank first, then by team rating.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.id
                ? 'bg-wc-gold/20 text-wc-gold-light'
                : 'text-wc-muted hover:text-wc-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6">
        {!loaded ? null : shown.length === 0 ? (
          <div className="wc-glass rounded-2xl p-10 text-center">
            <p className="text-wc-muted">No runs yet. Time to make history.</p>
            <Link
              href="/8-0/game?mode=classic"
              className="wc-btn-gold mt-5 inline-block rounded-xl px-6 py-3"
            >
              ⚽ Play your first run
            </Link>
          </div>
        ) : (
          <div className="wc-glass overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[36px_1fr_auto] gap-3 border-b border-wc-gold/15 px-4 py-3 text-[11px] uppercase tracking-wider text-wc-muted sm:grid-cols-[44px_1fr_120px_90px_90px]">
              <span>#</span>
              <span>Run</span>
              <span className="hidden text-center sm:block">Record</span>
              <span className="hidden text-center sm:block">Rating</span>
              <span className="text-right sm:text-center">Result</span>
            </div>
            {shown.map((e, i) => (
              <div
                key={e.id}
                className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-wc-gold/5 px-4 py-3 last:border-0 sm:grid-cols-[44px_1fr_120px_90px_90px]"
              >
                <span
                  className={`wc-display text-lg font-bold ${
                    i === 0 ? 'text-wc-gold-bright' : i < 3 ? 'text-wc-gold-light' : 'text-wc-muted'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="wc-display truncate font-semibold text-wc-cream">
                    {getFormation(e.formationId).name}
                    {e.champion && <span className="ml-1.5">🏆</span>}
                  </div>
                  <div className="text-[11px] text-wc-muted">
                    {e.mode === 'classic' ? 'Classic' : 'World Cup IQ'} ·{' '}
                    {new Date(e.date).toLocaleDateString()}
                  </div>
                  <div className="mt-0.5 text-[11px] text-wc-gold-light/70 sm:hidden">
                    {e.wins}-{e.draws}-{e.losses} · {e.teamRating.toFixed(1)}
                  </div>
                </div>
                <span className="hidden text-center text-sm tabular-nums text-wc-cream sm:block">
                  {e.wins}-{e.draws}-{e.losses}
                </span>
                <span className="hidden text-center sm:block">
                  <span className="wc-display font-bold tabular-nums text-wc-gold-light">
                    {e.teamRating.toFixed(1)}
                  </span>
                </span>
                <span
                  className={`text-right text-xs font-semibold sm:text-center ${
                    e.champion ? 'text-wc-gold-light' : 'text-wc-muted'
                  }`}
                >
                  {e.champion ? 'CHAMP' : e.recordLabel.split('·')[0].trim()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {shown.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/8-0/game?mode=classic" className="wc-btn-gold rounded-xl px-6 py-3">
            ⚽ New run
          </Link>
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-wc-muted transition-colors hover:text-wc-red"
          >
            Clear leaderboard
          </button>
        </div>
      )}
    </main>
  )
}
