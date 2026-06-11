import type { Metadata } from 'next'
import type { GameMode } from '../lib/types'
import GameClient from '../components/GameClient'

export const metadata: Metadata = {
  title: 'Play | 8-0 World Cup Draft',
}

export default function GamePage({
  searchParams,
}: {
  searchParams?: { mode?: string }
}) {
  const mode: GameMode = searchParams?.mode === 'worldcupiq' ? 'worldcupiq' : 'classic'
  return <GameClient mode={mode} />
}
