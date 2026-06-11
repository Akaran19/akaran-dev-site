'use client'

import type { PlayerRecord, GameMode } from '../lib/types'
import { flag } from '../lib/types'

interface PlayerCardProps {
  player: PlayerRecord
  mode?: GameMode
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  /** Force-show rating even in World Cup IQ mode (used on the results reveal). */
  revealRating?: boolean
  /** Slot labels this player can fill — rendered as coloured pills on the right. */
  slotBadges?: string[]
  /** When true, badges are rendered in muted grey (used for non-selectable players). */
  badgesDimmed?: boolean
}

/** Colour per slot based on position group */
const SLOT_COLOR: Record<string, string> = {
  GK:  'bg-teal-500/20 text-teal-400 border-teal-500/30',
  CB:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LB:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  RB:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LWB: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  RWB: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  CDM: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  CM:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  CAM: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  LM:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  RM:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  LW:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  RW:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ST:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  CF:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

const ratingTier = (r: number) => {
  if (r >= 90) return { ring: 'from-wc-gold-bright to-wc-gold', text: 'text-wc-gold-bright' }
  if (r >= 85) return { ring: 'from-wc-gold-light to-wc-gold', text: 'text-wc-gold-light' }
  if (r >= 80) return { ring: 'from-wc-muted to-slate-400', text: 'text-wc-cream' }
  return { ring: 'from-slate-500 to-slate-600', text: 'text-wc-muted' }
}

export default function PlayerCard({
  player,
  mode = 'classic',
  size = 'md',
  onClick,
  selected,
  disabled,
  revealRating,
  slotBadges,
  badgesDimmed,
}: PlayerCardProps) {
  const showRating = mode === 'classic' || revealRating
  const tier = ratingTier(player.rating)

  const pad = size === 'sm' ? 'p-2.5' : size === 'lg' ? 'p-4' : 'p-3'
  const nameSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group relative w-full overflow-hidden rounded-xl text-left transition-all ${pad} ${
        selected
          ? 'wc-glass-strong ring-2 ring-wc-gold shadow-gold'
          : 'wc-glass hover:border-wc-gold/40 hover:shadow-gold'
      } ${disabled ? 'cursor-not-allowed opacity-40' : onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3">
        {/* Rating / position badge */}
        <div
          className={`relative grid shrink-0 place-items-center rounded-lg bg-gradient-to-b ${tier.ring} ${
            size === 'sm' ? 'h-11 w-11' : size === 'lg' ? 'h-16 w-16' : 'h-14 w-14'
          }`}
        >
          {showRating ? (
            <>
              <span
                className={`wc-display font-bold leading-none text-wc-navy ${
                  size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
                }`}
              >
                {player.rating}
              </span>
              <span className="text-[9px] font-semibold uppercase leading-none text-wc-navy/70">
                {player.position}
              </span>
            </>
          ) : (
            <span className="wc-display text-sm font-bold uppercase leading-none text-wc-navy">
              {player.position}
            </span>
          )}
        </div>

        {/* Name + meta */}
        <div className="min-w-0 flex-1">
          <div className={`wc-display truncate font-semibold text-wc-cream ${nameSize}`}>
            {player.name}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-wc-muted">
            <span aria-hidden>{flag(player.countryCode)}</span>
            <span className="truncate">{player.country}</span>
            <span className="text-wc-gold/60">·</span>
            <span className="tabular-nums">{player.worldCupYear}</span>
          </div>
          {(player.goals ?? 0) > 0 && (
            <div className="mt-0.5 text-[10px] text-wc-gold-light/80">
              ⚽ {player.goals} {player.goals === 1 ? 'goal' : 'goals'} this WC
            </div>
          )}
        </div>

        {/* Slot compatibility badges */}
        {slotBadges && slotBadges.length > 0 && (
          <div className="ml-2 flex shrink-0 flex-wrap justify-end gap-1" style={{ maxWidth: 72 }}>
            {slotBadges.map((label) => (
              <span
                key={label}
                className={`rounded border px-1 py-px text-[9px] font-bold uppercase tracking-wide ${
                  badgesDimmed
                    ? 'border-white/10 bg-white/5 text-wc-muted/40'
                    : (SLOT_COLOR[label] ?? 'border-wc-gold/20 bg-wc-gold/10 text-wc-gold-light')
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}
