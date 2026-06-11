// localStorage-backed leaderboard for the 8-0 World Cup Draft game.
import type { GameMode, LeaderboardEntry } from './types';

const STORAGE_KEY = '8-0-leaderboard-v1';
const MAX_ENTRIES = 50;

function safeParse(raw: string | null): LeaderboardEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is LeaderboardEntry =>
        e && typeof e.id === 'string' && typeof e.teamRating === 'number',
    );
  } catch {
    return [];
  }
}

/** Sort: champions first, then by team rating, then wins, then most recent. */
function rank(a: LeaderboardEntry, b: LeaderboardEntry): number {
  if (a.champion !== b.champion) return a.champion ? -1 : 1;
  if (b.teamRating !== a.teamRating) return b.teamRating - a.teamRating;
  if (b.wins !== a.wins) return b.wins - a.wins;
  return b.date - a.date;
}

export function getEntries(mode?: GameMode): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  const all = safeParse(window.localStorage.getItem(STORAGE_KEY)).sort(rank);
  return mode ? all.filter((e) => e.mode === mode) : all;
}

export function addEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const full: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: Date.now(),
  };
  if (typeof window === 'undefined') return full;
  const all = [...safeParse(window.localStorage.getItem(STORAGE_KEY)), full]
    .sort(rank)
    .slice(0, MAX_ENTRIES);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return full;
}

export function clearEntries(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/** Rank (1-based) an entry would achieve, for the "you placed #N" callout. */
export function projectedRank(teamRating: number, champion: boolean): number {
  const all = getEntries();
  const better = all.filter(
    (e) => (e.champion && !champion) || (e.champion === champion && e.teamRating > teamRating),
  );
  return better.length + 1;
}
