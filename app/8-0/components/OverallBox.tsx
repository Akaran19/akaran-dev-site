import type { DraftedPlayer } from '../lib/types'

interface OverallBoxProps {
  squad: DraftedPlayer[]
}

interface StatRow {
  icon: string
  label: string
  value: number
  from: string
  to: string
}

function avg(players: DraftedPlayer[]) {
  if (!players.length) return 0
  return Math.round(players.reduce((s, p) => s + p.rating, 0) / players.length)
}

// Scale bar: ratings live ~60-99; treat 55 as 0% and 99 as 100%
function pct(v: number) {
  return Math.min(100, Math.max(0, ((v - 55) / 44) * 100)).toFixed(1)
}

export default function OverallBox({ squad }: OverallBoxProps) {
  const overall = avg(squad)
  const gk  = avg(squad.filter((p) => p.positionGroup === 'GK'))
  const def = avg(squad.filter((p) => p.positionGroup === 'DEF'))
  const mid = avg(squad.filter((p) => p.positionGroup === 'MID'))
  const fwd = avg(squad.filter((p) => p.positionGroup === 'FWD'))

  const rows: StatRow[] = [
    { icon: '⚡', label: 'Attack',   value: fwd,  from: '#F97316', to: '#EF4444' },
    { icon: '↺',  label: 'Midfield', value: mid,  from: '#22C55E', to: '#16A34A' },
    { icon: '🛡',  label: 'Defence',  value: def,  from: '#818CF8', to: '#6366F1' },
    { icon: '🥅', label: 'GK',       value: gk,   from: '#EAB308', to: '#D4A843' },
  ]

  return (
    <div
      className="mx-auto w-full max-w-xs rounded-2xl border border-white/10 bg-[#111827]/90 px-5 py-4 shadow-card"
      aria-label="Team overall rating breakdown"
    >
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-wc-muted/70">
        Overall
      </div>
      <div className="wc-display mb-4 text-5xl font-black tabular-nums text-wc-cream">
        {overall}
      </div>

      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-5 text-center text-sm leading-none" aria-hidden>
              {row.icon}
            </span>
            <span className="w-16 text-xs text-wc-muted/80">{row.label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-white/10" style={{ height: 7 }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct(row.value)}%`,
                  background: `linear-gradient(to right, ${row.from}, ${row.to})`,
                }}
              />
            </div>
            <span className="w-7 text-right text-sm font-semibold tabular-nums text-wc-cream">
              {row.value || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
