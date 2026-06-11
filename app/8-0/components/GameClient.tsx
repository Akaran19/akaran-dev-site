'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { GameMode, PlayerRecord, PositionGroup, SimulationResult, SpinCombo, Position } from '../lib/types'
import { getFormation, MAX_SKIPS, TOTAL_SLOTS, PLAYER_CAN_FILL } from '../lib/types'
import {
  type DraftState,
  createDraft,
  pickRandomCombo,
  applySpin,
  applySkip,
  canSkip,
  skipsRemaining,
  selectableFromCombo,
  eligibleSlots,
  emptySlots,
  placePlayer,
  isComplete,
  filledCount,
  teamRating,
  squadInOrder,
  remainingNeeds,
} from '../lib/gameLogic'
import { getSquad } from '../data/players'
import { simulate } from '../lib/simulation'
import FormationPicker from './FormationPicker'
import Pitch from './Pitch'
import PlayerCard from './PlayerCard'
import SpinWheel from './SpinWheel'
import Simulation from './Simulation'
import ResultsScreen from './ResultsScreen'
import OverallBox from './OverallBox'

type Phase = 'formation' | 'draft' | 'sim' | 'results'

const GROUP_LABEL: Record<PositionGroup, string> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
}

export default function GameClient({ mode }: { mode: GameMode }) {
  const [phase, setPhase] = useState<Phase>('formation')
  const [formationId, setFormationId] = useState<string | null>('4-3-3')
  const [draft, setDraft] = useState<DraftState | null>(null)

  // Spin state
  const [spinning, setSpinning] = useState(false)
  const [spinKey, setSpinKey] = useState(0)
  const [spinTarget, setSpinTarget] = useState<SpinCombo | null>(null)

  // Placement choice
  const [pendingPlayer, setPendingPlayer] = useState<PlayerRecord | null>(null)
  const [selectableSlotIds, setSelectableSlotIds] = useState<string[]>([])

  const [simResult, setSimResult] = useState<SimulationResult | null>(null)

  const formation = useMemo(
    () => (draft ? getFormation(draft.formationId) : getFormation(formationId ?? '4-3-3')),
    [draft, formationId],
  )

  // ----- Phase: formation -----
  const startDraft = () => {
    if (!formationId) return
    setDraft(createDraft(formationId))
    setPhase('draft')
  }

  // ----- Phase: draft -----
  const startSpin = () => {
    if (!draft || spinning) return
    const target = pickRandomCombo(draft)
    if (!target) return
    setSpinTarget(target)
    setPendingPlayer(null)
    setSelectableSlotIds([])
    setSpinning(true)
    setSpinKey((k) => k + 1)
  }

  const handleLand = () => {
    if (!draft || !spinTarget) return
    setDraft(applySpin(draft, spinTarget))
    setSpinning(false)
  }

  const handleSkip = () => {
    if (!draft || !canSkip(draft)) return
    setDraft(applySkip(draft))
    setSpinTarget(null)
    setPendingPlayer(null)
    setSelectableSlotIds([])
  }

  const choosePlayer = (player: PlayerRecord) => {
    if (!draft) return
    const elig = eligibleSlots(draft, player)
    if (elig.length === 0) return
    if (elig.length === 1) {
      setDraft(placePlayer(draft, player, elig[0].id))
      setPendingPlayer(null)
      setSelectableSlotIds([])
      setSpinTarget(null)
    } else {
      setPendingPlayer(player)
      setSelectableSlotIds(elig.map((s) => s.id))
    }
  }

  const placeIntoSlot = (slotId: string) => {
    if (!draft || !pendingPlayer) return
    setDraft(placePlayer(draft, pendingPlayer, slotId))
    setPendingPlayer(null)
    setSelectableSlotIds([])
    setSpinTarget(null)
  }

  const runSimulation = () => {
    if (!draft) return
    const squad = squadInOrder(draft)
    const res = simulate(squad, getFormation(draft.formationId), mode)
    setSimResult(res)
    setPhase('sim')
  }

  const playAgain = () => {
    setDraft(null)
    setSimResult(null)
    setSpinTarget(null)
    setPendingPlayer(null)
    setSelectableSlotIds([])
    setSpinning(false)
    setPhase('formation')
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (phase === 'formation') {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <ModeBadge mode={mode} />
        <h1 className="wc-display mt-4 text-3xl font-bold text-wc-cream sm:text-4xl">
          Choose your formation
        </h1>
        <p className="mt-2 max-w-2xl text-wc-muted">
          Your shape sets the eleven positions you’ll draft. Pick a system that fits the team
          you want to build.
        </p>
        <div className="mt-8">
          <FormationPicker selected={formationId} onSelect={setFormationId} />
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={startDraft}
            disabled={!formationId}
            className="wc-btn-gold rounded-2xl px-8 py-4 text-lg disabled:opacity-50"
          >
            Start the draft →
          </button>
        </div>
      </main>
    )
  }

  if (phase === 'sim' && simResult) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Simulation result={simResult} onComplete={() => setPhase('results')} />
      </main>
    )
  }

  if (phase === 'results' && simResult && draft) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <ResultsScreen
          result={simResult}
          formation={getFormation(draft.formationId)}
          squad={squadInOrder(draft)}
          mode={mode}
          onPlayAgain={playAgain}
        />
      </main>
    )
  }

  // ----- Draft UI -----
  if (!draft) return null
  const needs = remainingNeeds(draft)
  const complete = isComplete(draft)
  const combo = draft.currentCombo
  const selectable = combo ? selectableFromCombo(draft, combo) : []
  const selectableIds = new Set(selectable.map((p) => p.id))
  const openSlotSet = new Set(emptySlots(draft).map((s) => s.label as Position))
  const fullSquad = combo ? getSquad(combo.year, combo.countryCode).sort((a, b) => b.rating - a.rating) : []
  const drafted = new Set(draft.usedPlayerIds)
  const nonSelectable = fullSquad.filter((p) => !selectableIds.has(p.id) && !drafted.has(p.id))
  const eligibleGroups = pendingPlayer
    ? new Set<PositionGroup>([pendingPlayer.positionGroup])
    : undefined

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <ModeBadge mode={mode} />

      {/* Progress strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="wc-display text-2xl font-bold text-wc-cream sm:text-3xl">
            Build your XI
          </h1>
          <p className="text-sm text-wc-muted">
            {filledCount(draft)} / {TOTAL_SLOTS} drafted ·{' '}
            {formation.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="wc-glass rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase tracking-wider text-wc-muted">Team rating</div>
            <div className="wc-display text-xl font-bold tabular-nums text-wc-gold-light">
              {mode === 'classic' ? (teamRating(draft) || '—') : '??'}
            </div>
          </div>
          <div className="wc-glass rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase tracking-wider text-wc-muted">Skips left</div>
            <div className="wc-display text-xl font-bold tabular-nums text-wc-cream">
              {skipsRemaining(draft)}/{MAX_SKIPS}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Pitch */}
        <div>
          <Pitch
            formation={formation}
            picks={draft.picks}
            mode={mode}
            eligibleGroups={eligibleGroups}
            selectableSlotIds={pendingPlayer ? selectableSlotIds : []}
            onSlotClick={placeIntoSlot}
          />
          {pendingPlayer && (
            <p className="mt-3 animate-pulse text-center text-sm font-medium text-wc-gold-light">
              Tap a highlighted {GROUP_LABEL[pendingPlayer.positionGroup]} slot to place{' '}
              {pendingPlayer.name}
            </p>
          )}
          {/* Live overall box — shows once first player is placed */}
          {mode === 'classic' && filledCount(draft) > 0 && (
            <div className="mt-4">
              <OverallBox squad={Object.values(draft.picks)} />
            </div>
          )}
        </div>

        {/* Draft control */}
        <div className="wc-glass rounded-2xl p-5 sm:p-6">
          {complete ? (
            <CompleteCard onSimulate={runSimulation} rating={mode === 'classic' ? teamRating(draft) : null} />
          ) : (
            <>
              {/* Needs summary */}
              <div className="mb-4 flex flex-wrap gap-2">
                {(Object.keys(needs) as PositionGroup[]).map((g) =>
                  needs[g] > 0 ? (
                    <span
                      key={g}
                      className="rounded-full bg-wc-navy/50 px-3 py-1 text-xs font-medium text-wc-muted"
                    >
                      {g} ×{needs[g]}
                    </span>
                  ) : null,
                )}
              </div>

              {/* Wheel */}
              <SpinWheel
                target={spinTarget}
                spinKey={spinKey}
                spinning={spinning}
                onLand={handleLand}
              />

              {/* Controls / squad */}
              <div className="mt-5">
                {!combo && !spinning && (
                  <button
                    type="button"
                    onClick={startSpin}
                    className="wc-btn-gold w-full rounded-xl px-6 py-4 text-lg"
                  >
                    🎰 Spin the wheel
                  </button>
                )}

                {spinning && (
                  <p className="text-center text-sm text-wc-muted">Spinning…</p>
                )}

                {combo && !spinning && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${combo.year}-${combo.countryCode}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-wc-muted">
                          Pick one from{' '}
                          <span className="font-semibold text-wc-cream">
                            {combo.country} {combo.year}
                          </span>
                        </p>
                        {canSkip(draft) && (
                          <button
                            type="button"
                            onClick={handleSkip}
                            className="rounded-lg border border-wc-gold/30 px-3 py-1 text-xs text-wc-muted transition-colors hover:text-wc-cream"
                          >
                            Skip ({skipsRemaining(draft)})
                          </button>
                        )}
                      </div>

                      {selectable.length === 0 ? (
                        <div className="rounded-xl bg-wc-navy/40 p-4 text-center text-sm text-wc-muted">
                          No players from this squad fit your open positions.{' '}
                          {canSkip(draft) ? 'Use a skip to spin again.' : 'Spin again.'}
                          {!canSkip(draft) && (
                            <button
                              type="button"
                              onClick={startSpin}
                              className="mt-3 block w-full rounded-lg bg-wc-gold/20 px-4 py-2 font-semibold text-wc-gold-light"
                            >
                              Spin again
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="wc-scroll max-h-[320px] space-y-2 overflow-y-auto pr-1">
                          {selectable.map((p) => (
                            <PlayerCard
                              key={p.id}
                              player={p}
                              mode={mode}
                              size="sm"
                              selected={pendingPlayer?.id === p.id}
                              onClick={() => choosePlayer(p)}
                              slotBadges={(PLAYER_CAN_FILL[p.position] ?? []).filter((l) => openSlotSet.has(l as Position))}
                            />
                          ))}
                          {nonSelectable.length > 0 && (
                            <>
                              {selectable.length > 0 && (
                                <div className="px-1 pt-1 text-[10px] uppercase tracking-wider text-wc-muted/50">
                                  Doesn&apos;t fit your formation
                                </div>
                              )}
                              {nonSelectable.map((p) => (
                                <PlayerCard
                                  key={p.id}
                                  player={p}
                                  mode={mode}
                                  size="sm"
                                  disabled
                                  slotBadges={PLAYER_CAN_FILL[p.position] ?? []}
                                  badgesDimmed
                                />
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/8-0" className="text-sm text-wc-muted hover:text-wc-cream">
          ← Quit to menu
        </Link>
      </div>
    </main>
  )
}

function ModeBadge({ mode }: { mode: GameMode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-wc-gold/30 bg-wc-gold/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-wc-gold-light">
      {mode === 'classic' ? '⭐ Classic Mode' : '🧠 World Cup IQ'}
    </span>
  )
}

function CompleteCard({
  onSimulate,
  rating,
}: {
  onSimulate: () => void
  rating: number | null
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-8 text-center">
      <div className="text-5xl">✅</div>
      <h2 className="wc-display mt-3 text-2xl font-bold text-wc-cream">Squad complete!</h2>
      {rating !== null && (
        <p className="mt-1 text-wc-muted">
          Team rating{' '}
          <span className="wc-display text-lg font-bold text-wc-gold-light">{rating}</span>
        </p>
      )}
      <p className="mt-3 max-w-xs text-sm text-wc-muted">
        Eight matches stand between you and the trophy. Time to find out what your XI is made of.
      </p>
      <button
        type="button"
        onClick={onSimulate}
        className="wc-btn-gold mt-6 rounded-xl px-8 py-4 text-lg"
      >
        ⚽ Kick off the tournament →
      </button>
    </div>
  )
}
