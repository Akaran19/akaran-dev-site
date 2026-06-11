'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SimulationResult, MatchResult } from '../lib/types'
import { flag } from '../lib/types'

interface SimulationProps {
  result: SimulationResult
  onComplete: () => void
}

const resultStyles = {
  W: { label: 'WIN', chip: 'bg-wc-pitch-light text-white', dot: '🟢' },
  D: { label: 'DRAW', chip: 'bg-wc-gold/30 text-wc-gold-light', dot: '🟡' },
  L: { label: 'LOSS', chip: 'bg-wc-red/80 text-white', dot: '🔴' },
} as const

function MatchRow({ match, index }: { match: MatchResult; index: number }) {
  const style = resultStyles[match.result]
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="wc-glass flex items-center gap-3 rounded-xl p-3"
    >
      <span className="hidden w-28 shrink-0 text-xs font-medium text-wc-muted sm:block">
        {match.round}
      </span>
      <div className="flex flex-1 items-center justify-center gap-2 sm:gap-4">
        <span className="wc-display text-sm font-semibold text-wc-cream">Your XI</span>
        <span className="wc-display rounded-lg bg-wc-navy/70 px-3 py-1 text-xl font-bold tabular-nums text-wc-gold-light">
          {match.goalsFor} <span className="text-wc-muted">–</span> {match.goalsAgainst}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-wc-cream">
          <span aria-hidden>{flag(match.opponentCode)}</span>
          {match.opponent}
        </span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style.chip}`}>
          {style.label}
        </span>
        {match.penalties && (
          <span className="text-[10px] text-wc-muted">
            pens {match.penalties.for}-{match.penalties.against}
          </span>
        )}
        {match.extraTime && !match.penalties && (
          <span className="text-[10px] text-wc-muted">a.e.t.</span>
        )}
      </div>
    </motion.div>
  )
}

export default function Simulation({ result, onComplete }: SimulationProps) {
  const [revealed, setRevealed] = useState(0)
  const done = revealed >= result.matches.length

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 900)
      return () => clearTimeout(t)
    }
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reduce ? 250 : 1100
    const t = setTimeout(() => setRevealed((n) => n + 1), delay)
    return () => clearTimeout(t)
  }, [revealed, done, onComplete, result.matches.length])

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 text-center">
        <p className="wc-display text-sm uppercase tracking-[0.2em] text-wc-gold-light">
          The Road to Glory
        </p>
        <h2 className="wc-display mt-1 text-2xl font-bold text-wc-cream sm:text-3xl">
          Simulating your run…
        </h2>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {result.matches.slice(0, revealed).map((m, i) => (
            <MatchRow key={`${m.round}-${i}`} match={m} index={i} />
          ))}
        </AnimatePresence>

        {!done && revealed < result.matches.length && (
          <div className="wc-shimmer h-[58px] rounded-xl" />
        )}
      </div>
    </div>
  )
}
