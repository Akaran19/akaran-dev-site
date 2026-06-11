'use client'

import { FORMATIONS, type Formation, type PositionGroup } from '../lib/types'

const dotColor: Record<PositionGroup, string> = {
  GK: 'bg-amber-400',
  DEF: 'bg-sky-400',
  MID: 'bg-emerald-400',
  FWD: 'bg-rose-400',
}

function MiniPitch({ formation }: { formation: Formation }) {
  return (
    <div className="wc-pitch relative h-28 w-full overflow-hidden rounded-lg border border-wc-gold/15">
      {formation.slots.map((s) => (
        <span
          key={s.id}
          className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${dotColor[s.group]} ring-1 ring-wc-navy/40`}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  )
}

interface FormationPickerProps {
  selected: string | null
  onSelect: (id: string) => void
}

export default function FormationPicker({ selected, onSelect }: FormationPickerProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FORMATIONS.map((f) => {
        const active = selected === f.id
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelect(f.id)}
            className={`group rounded-2xl p-4 text-left transition-all ${
              active
                ? 'wc-glass-strong ring-2 ring-wc-gold shadow-gold'
                : 'wc-glass hover:border-wc-gold/40 hover:shadow-gold'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="wc-display text-xl font-bold text-wc-cream">{f.name}</span>
              {active && (
                <span className="rounded-full bg-wc-gold/20 px-2 py-0.5 text-xs font-semibold text-wc-gold-light">
                  Selected
                </span>
              )}
            </div>
            <MiniPitch formation={f} />
            <p className="mt-3 text-sm leading-snug text-wc-muted">{f.description}</p>
          </button>
        )
      })}
    </div>
  )
}
