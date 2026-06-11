'use client'

import type { DraftedPlayer, Formation, GameMode, PositionGroup } from '../lib/types'
import { flag } from '../lib/types'

interface PitchProps {
  formation: Formation
  picks: Record<string, DraftedPlayer>
  mode?: GameMode
  /** Position groups currently eligible to receive a pick (empty slots pulse). */
  eligibleGroups?: Set<PositionGroup>
  /** Specific empty slot ids the user can click to place into. */
  selectableSlotIds?: string[]
  onSlotClick?: (slotId: string) => void
  revealRatings?: boolean
  compact?: boolean
}

const groupColor: Record<PositionGroup, string> = {
  GK: 'from-amber-400 to-amber-600',
  DEF: 'from-sky-400 to-sky-600',
  MID: 'from-emerald-400 to-emerald-600',
  FWD: 'from-rose-400 to-rose-600',
}

export default function Pitch({
  formation,
  picks,
  mode = 'classic',
  eligibleGroups,
  selectableSlotIds,
  onSlotClick,
  revealRatings,
  compact,
}: PitchProps) {
  const showRating = mode === 'classic' || revealRatings
  const selectable = new Set(selectableSlotIds ?? [])

  return (
    <div
      className={`wc-pitch relative mx-auto w-full overflow-hidden rounded-2xl border border-wc-gold/20 shadow-card ${
        compact ? 'max-w-md' : 'max-w-lg'
      }`}
      style={{ aspectRatio: compact ? '3 / 4' : '4 / 5' }}
    >
      {/* Painted pitch markings */}
      <svg
        className="wc-pitch-lines"
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        fill="none"
        stroke="var(--pitch-line)"
        strokeWidth="0.4"
      >
        <rect x="3" y="3" width="94" height="119" />
        <line x1="3" y1="62.5" x2="97" y2="62.5" />
        <circle cx="50" cy="62.5" r="11" />
        <circle cx="50" cy="62.5" r="0.8" fill="var(--pitch-line)" stroke="none" />
        {/* Top box (attacking) */}
        <rect x="28" y="3" width="44" height="16" />
        <rect x="40" y="3" width="20" height="6" />
        {/* Bottom box (own) */}
        <rect x="28" y="106" width="44" height="16" />
        <rect x="40" y="116" width="20" height="6" />
      </svg>

      {formation.slots.map((slot) => {
        const player = picks[slot.id]
        const isEligible = !player && eligibleGroups?.has(slot.group)
        const isSelectable = selectable.has(slot.id)

        return (
          <button
            key={slot.id}
            type="button"
            disabled={!isSelectable}
            onClick={isSelectable ? () => onSlotClick?.(slot.id) : undefined}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${
              isSelectable ? 'cursor-pointer' : 'cursor-default'
            }`}
            style={{ left: `${slot.x}%`, top: `${(slot.y / 100) * 100}%` }}
          >
            {player ? (
              <>
                <span
                  className={`relative grid place-items-center rounded-full bg-gradient-to-b ${
                    groupColor[slot.group]
                  } ${compact ? 'h-8 w-8' : 'h-10 w-10'} shadow-md ring-2 ring-wc-navy/40`}
                >
                  {showRating ? (
                    <span
                      className={`wc-display font-bold leading-none text-wc-navy ${
                        compact ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      {player.rating}
                    </span>
                  ) : (
                    <span className="text-sm leading-none" aria-hidden>
                      {flag(player.countryCode)}
                    </span>
                  )}
                </span>
                <span
                  className={`mt-1 max-w-[80px] truncate rounded bg-wc-navy/70 px-1.5 py-0.5 text-center font-medium text-wc-cream ${
                    compact ? 'text-[9px]' : 'text-[10px]'
                  }`}
                >
                  {player.name.split(' ').slice(-1)[0]}
                </span>
              </>
            ) : (
              <>
                <span
                  className={`grid place-items-center rounded-full border-2 border-dashed ${
                    compact ? 'h-8 w-8' : 'h-10 w-10'
                  } ${
                    isSelectable
                      ? 'animate-pulse-gold border-wc-gold bg-wc-gold/20'
                      : isEligible
                        ? 'border-wc-gold/50 bg-wc-gold/5'
                        : 'border-wc-cream/25 bg-wc-navy/30'
                  }`}
                >
                  <span className="wc-display text-[10px] font-semibold text-wc-cream/70">
                    {slot.label}
                  </span>
                </span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
