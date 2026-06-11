// Combined player database + lookup helpers for the 8-0 game.
import type { PlayerRecord, SpinCombo } from '../lib/types';
import { HISTORIC_PLAYERS } from './players.generated';
import { PLAYERS_2026 } from './players2026';

export const PLAYERS: PlayerRecord[] = [...HISTORIC_PLAYERS, ...PLAYERS_2026];

// Index players by "year-countryCode" combo key.
const byCombo = new Map<string, PlayerRecord[]>();
for (const p of PLAYERS) {
  const key = `${p.worldCupYear}-${p.countryCode}`;
  const arr = byCombo.get(key);
  if (arr) arr.push(p);
  else byCombo.set(key, [p]);
}

export const comboKey = (year: number, code: string) => `${year}-${code}`;

export const getSquad = (year: number, code: string): PlayerRecord[] =>
  byCombo.get(comboKey(year, code)) ?? [];

// All available country-year combos (one squad each), sorted.
export const ALL_COMBOS: SpinCombo[] = Array.from(byCombo.entries())
  .map(([key, squad]) => {
    const first = squad[0];
    return { countryCode: first.countryCode, country: first.country, year: first.worldCupYear };
  })
  .sort((a, b) => a.year - b.year || a.country.localeCompare(b.country));

// Headline stats for the landing page.
export const STATS = {
  players: PLAYERS.length,
  combos: ALL_COMBOS.length,
  countries: new Set(PLAYERS.map((p) => p.countryCode)).size,
  worldCups: new Set(PLAYERS.map((p) => p.worldCupYear)).size,
};
