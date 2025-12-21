'use client'

import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const x = e.clientX
        const y = e.clientY
        spotlightRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 40%)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(circle 200px at center, rgba(255, 255, 255, 0.08), transparent 40%)'
      }}
    />
  )
}