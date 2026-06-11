'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { DraftedPlayer, Formation, GameMode, SimulationResult } from '../lib/types'
import { flag } from '../lib/types'
import { formBar, isPerfectRun, chemistryBonus, baseTeamRating } from '../lib/simulation'
import { addEntry, projectedRank } from '../lib/leaderboard'
import Pitch from './Pitch'
import OverallBox from './OverallBox'

interface ResultsScreenProps {
  result: SimulationResult
  formation: Formation
  squad: DraftedPlayer[]
  mode: GameMode
  onPlayAgain: () => void
}

export default function ResultsScreen({
  result,
  formation,
  squad,
  mode,
  onPlayAgain,
}: ResultsScreenProps) {
  const perfect = isPerfectRun(result)
  const base = Math.round(baseTeamRating(squad) * 10) / 10
  const chem = chemistryBonus(squad)
  const teamRating = Math.round((base + chem) * 10) / 10
  const [copied, setCopied] = useState(false)
  const [rank, setRank] = useState<number | null>(null)
  const savedRef = useRef(false)

  const picks: Record<string, DraftedPlayer> = {}
  for (const p of squad) picks[p.slotId] = p

  // Save to leaderboard once.
  useEffect(() => {
    if (savedRef.current) return
    savedRef.current = true
    addEntry({
      mode,
      formationId: formation.id,
      formationName: formation.name,
      teamRating,
      recordLabel: result.recordLabel,
      champion: result.champion,
      wins: result.wins,
      draws: result.draws,
      losses: result.losses,
    })
    setRank(projectedRank(teamRating, result.champion))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shareText =
    `8-0 World Cup Draft 🏆\n` +
    `${formation.name} · Rating ${teamRating}\n` +
    `${formBar(result)}\n` +
    `${result.recordLabel}\n` +
    `Play at akaran.dev/8-0`

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: '8-0 World Cup Draft', text: shareText })
        return
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {result.champion ? (
          <>
            <div className="mb-2 text-6xl">🏆</div>
            <h1 className="wc-display wc-gold-text text-4xl font-bold sm:text-5xl">
              {perfect ? 'PERFECT 8-0' : 'WORLD CHAMPIONS'}
            </h1>
            <p className="mt-2 text-wc-muted">
              {perfect
                ? 'Eight matches. Eight wins. Immortality.'
                : 'You lifted the trophy. Glory is yours.'}
            </p>
          </>
        ) : (
          <>
            <div className="mb-2 text-5xl">⚽</div>
            <h1 className="wc-display text-3xl font-bold text-wc-cream sm:text-4xl">
              {result.eliminatedRound ?? 'Tournament Over'}
            </h1>
            <p className="mt-2 text-wc-muted">So close. Run it back and chase the trophy.</p>
          </>
        )}
      </motion.div>

      {/* Stat strip */}
      <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-3">
        <Stat label="Record" value={`${result.wins}-${result.draws}-${result.losses}`} />
        <Stat label="Rating" value={teamRating.toFixed(1)} accent />
        <Stat label="Chemistry" value={`+${chem.toFixed(1)}`} />
        <Stat label="Goals" value={`${result.goalsFor}–${result.goalsAgainst}`} />
        {rank !== null && <Stat label="Leaderboard" value={`#${rank}`} accent />}
      </div>

      {/* Form bar */}
      <div className="mt-5 text-center text-2xl tracking-widest" aria-hidden>
        {formBar(result)}
      </div>

      {/* Overall rating box */}
      <div className="mt-6">
        <OverallBox squad={squad} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Final XI */}
        <div>
          <h2 className="wc-display mb-3 text-center text-lg font-semibold text-wc-cream">
            Your Final XI — {formation.name}
          </h2>
          <Pitch
            formation={formation}
            picks={picks}
            mode={mode}
            revealRatings
            compact
          />
        </div>

        {/* Match log */}
        <div>
          <h2 className="wc-display mb-3 text-center text-lg font-semibold text-wc-cream">
            Match Log
          </h2>
          <div className="space-y-2">
            {result.matches.map((m, i) => (
              <div
                key={`${m.round}-${i}`}
                className="wc-glass flex items-center justify-between rounded-lg px-3 py-2 text-sm"
              >
                <span className="w-24 truncate text-xs text-wc-muted">{m.round}</span>
                <span className="flex items-center gap-1.5 text-wc-cream">
                  <span aria-hidden>{flag(m.opponentCode)}</span>
                  <span className="hidden sm:inline">{m.opponent}</span>
                </span>
                <span className="wc-display font-bold tabular-nums text-wc-gold-light">
                  {m.goalsFor}–{m.goalsAgainst}
                  {m.penalties ? (
                    <span className="ml-1 text-[10px] text-wc-muted">
                      ({m.penalties.for}-{m.penalties.against}p)
                    </span>
                  ) : m.extraTime ? (
                    <span className="ml-1 text-[10px] text-wc-muted">aet</span>
                  ) : null}
                </span>
                <span
                  className={`w-7 text-center font-bold ${
                    m.result === 'W'
                      ? 'text-wc-pitch-light'
                      : m.result === 'D'
                        ? 'text-wc-gold-light'
                        : 'text-wc-red'
                  }`}
                >
                  {m.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onShare}
          className="wc-btn-gold w-full rounded-xl px-6 py-3 sm:w-auto"
        >
          {copied ? '✓ Copied to clipboard' : '📋 Share result'}
        </button>
        <button
          type="button"
          onClick={onPlayAgain}
          className="wc-btn-ghost w-full rounded-xl px-6 py-3 sm:w-auto"
        >
          ↻ Play again
        </button>
        <Link
          href="/8-0/leaderboard"
          className="wc-btn-ghost w-full rounded-xl px-6 py-3 text-center sm:w-auto"
        >
          🏅 Leaderboard
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="wc-glass rounded-xl px-4 py-2 text-center">
      <div className="text-[10px] uppercase tracking-wider text-wc-muted">{label}</div>
      <div
        className={`wc-display text-lg font-bold tabular-nums ${
          accent ? 'text-wc-gold-light' : 'text-wc-cream'
        }`}
      >
        {value}
      </div>
    </div>
  )
}
