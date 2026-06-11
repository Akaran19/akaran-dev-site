'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import type { SpinCombo } from '../lib/types'
import { flag } from '../lib/types'
import { ALL_COMBOS } from '../data/players'

const ITEM_H = 64 // px per reel row
const STRIP = 32 // filler rows before the target

interface SpinWheelProps {
  target: SpinCombo | null
  spinKey: number
  onLand: () => void
  spinning: boolean
}

function ComboRow({ combo, dim }: { combo: SpinCombo; dim?: boolean }) {
  return (
    <div
      className="flex items-center justify-center gap-3"
      style={{ height: ITEM_H }}
    >
      <span className={`text-3xl ${dim ? 'opacity-40' : ''}`} aria-hidden>
        {flag(combo.countryCode)}
      </span>
      <div className={dim ? 'opacity-40' : ''}>
        <div className="wc-display text-lg font-semibold leading-none text-wc-cream">
          {combo.country}
        </div>
        <div className="text-xs text-wc-muted">{combo.year} World Cup</div>
      </div>
    </div>
  )
}

export default function SpinWheel({ target, spinKey, onLand, spinning }: SpinWheelProps) {
  const controls = useAnimationControls()
  const landedRef = useRef(false)

  // Build a reel: random filler rows ending on the target.
  const strip = useMemo<SpinCombo[]>(() => {
    const filler: SpinCombo[] = []
    for (let i = 0; i < STRIP; i += 1) {
      filler.push(ALL_COMBOS[Math.floor(Math.random() * ALL_COMBOS.length)])
    }
    return target ? [...filler, target] : filler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinKey])

  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  }, [])

  useEffect(() => {
    if (!spinning || !target) return
    landedRef.current = false
    const finalY = -(strip.length - 2) * ITEM_H // center target on the middle guide
    controls.set({ y: 0 })
    controls
      .start({
        y: finalY,
        transition: reduced
          ? { duration: 0.4, ease: 'easeOut' }
          : { duration: 3, ease: [0.17, 0.67, 0.12, 0.99] },
      })
      .then(() => {
        if (!landedRef.current) {
          landedRef.current = true
          onLand()
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinKey, spinning])

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Window */}
      <div
        className="wc-glass-strong relative overflow-hidden rounded-2xl"
        style={{ height: ITEM_H * 3 }}
      >
        {/* Selection guides */}
        <div
          className="pointer-events-none absolute inset-x-0 z-20 border-y-2 border-wc-gold/60"
          style={{ top: ITEM_H, height: ITEM_H }}
        />
        {/* Top/bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-wc-navy to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-wc-navy to-transparent" />

        <motion.div animate={controls} initial={{ y: 0 }}>
          {strip.map((combo, i) => (
            <ComboRow
              key={`${combo.year}-${combo.countryCode}-${i}`}
              combo={combo}
              dim={i !== strip.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
