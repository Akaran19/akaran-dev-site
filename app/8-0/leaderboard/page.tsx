import type { Metadata } from 'next'
import LeaderboardClient from '../components/LeaderboardClient'

export const metadata: Metadata = {
  title: 'Leaderboard | 8-0 World Cup Draft',
  description: 'Your best 8-0 World Cup Draft runs, ranked by glory and team rating.',
}

export default function LeaderboardPage() {
  return <LeaderboardClient />
}
