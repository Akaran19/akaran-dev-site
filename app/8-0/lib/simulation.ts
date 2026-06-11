// Tournament simulation engine for the 8-0 World Cup Draft game.
import {
  type DraftedPlayer,
  type Formation,
  type GameMode,
  type MatchResult,
  type SimulationResult,
  ROUNDS,
  OPPONENT_STRENGTH,
} from './types';

// Pool of plausible opponent nations (code + display name) for flavour.
const OPPONENT_POOL: Array<[string, string]> = [
  ['BRA', 'Brazil'], ['DEU', 'Germany'], ['ITA', 'Italy'], ['ESP', 'Spain'],
  ['FRA', 'France'], ['ARG', 'Argentina'], ['NLD', 'Netherlands'], ['PRT', 'Portugal'],
  ['ENG', 'England'], ['BEL', 'Belgium'], ['HRV', 'Croatia'], ['URY', 'Uruguay'],
  ['MEX', 'Mexico'], ['USA', 'United States'], ['COL', 'Colombia'], ['CHL', 'Chile'],
  ['DNK', 'Denmark'], ['SWE', 'Sweden'], ['CHE', 'Switzerland'], ['POL', 'Poland'],
  ['JPN', 'Japan'], ['KOR', 'South Korea'], ['MAR', 'Morocco'], ['SEN', 'Senegal'],
  ['NGA', 'Nigeria'], ['CMR', 'Cameroon'], ['GHA', 'Ghana'], ['AUS', 'Australia'],
  ['SRB', 'Serbia'], ['TUR', 'Turkey'], ['GRC', 'Greece'], ['IRN', 'Iran'],
  ['ECU', 'Ecuador'], ['PER', 'Peru'], ['CRI', 'Costa Rica'], ['CAN', 'Canada'],
];

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Knuth's Poisson sampler — used for goal counts.
function poisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

/**
 * Chemistry bonus: players sharing a nationality link up. Each extra player from
 * the same country adds a little; bonus is capped so it tops up, never dominates.
 */
export function chemistryBonus(squad: DraftedPlayer[]): number {
  const byCountry = new Map<string, number>();
  for (const p of squad) {
    byCountry.set(p.countryCode, (byCountry.get(p.countryCode) ?? 0) + 1);
  }
  let bonus = 0;
  for (const count of Array.from(byCountry.values())) {
    if (count >= 2) bonus += (count - 1) * 0.6;
  }
  return Math.round(Math.min(bonus, 5) * 10) / 10;
}

export function baseTeamRating(squad: DraftedPlayer[]): number {
  if (squad.length === 0) return 0;
  const total = squad.reduce((s, p) => s + p.rating, 0);
  return total / squad.length;
}

export function effectiveTeamRating(squad: DraftedPlayer[]): number {
  return Math.round((baseTeamRating(squad) + chemistryBonus(squad)) * 10) / 10;
}

function pickOpponents(): Array<[string, string]> {
  const pool = [...OPPONENT_POOL];
  const chosen: Array<[string, string]> = [];
  for (let i = 0; i < ROUNDS.length; i += 1) {
    if (pool.length === 0) pool.push(...OPPONENT_POOL);
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(idx, 1)[0]);
  }
  return chosen;
}

interface Scoreline {
  gf: number;
  ga: number;
  extraTime?: boolean;
  penalties?: { for: number; against: number };
}

/** Play a single 90-minute scoreline given the rating gap. */
function playRegulation(diff: number): Scoreline {
  const attack = clamp(1.45 + diff * 0.07, 0.25, 4.2);
  const defence = clamp(1.25 - diff * 0.06, 0.2, 4.0);
  return { gf: poisson(attack), ga: poisson(defence) };
}

/** Resolve a knockout match (extra time + penalties if level). */
function playKnockout(diff: number): Scoreline {
  const reg = playRegulation(diff);
  if (reg.gf !== reg.ga) return reg;

  // Extra time — lower-scoring period.
  const etAttack = clamp(0.45 + diff * 0.03, 0.05, 1.6);
  const etDefence = clamp(0.4 - diff * 0.025, 0.05, 1.5);
  const etFor = poisson(etAttack);
  const etAgainst = poisson(etDefence);
  const gf = reg.gf + etFor;
  const ga = reg.ga + etAgainst;
  if (gf !== ga) return { gf, ga, extraTime: true };

  // Penalties — better side slightly favoured.
  const edge = clamp(diff * 0.015, -0.12, 0.12);
  let pFor = 0;
  let pAgainst = 0;
  for (let i = 0; i < 5; i += 1) {
    if (Math.random() < 0.75 + edge) pFor += 1;
    if (Math.random() < 0.75 - edge) pAgainst += 1;
  }
  // sudden death until decided
  while (pFor === pAgainst) {
    const a = Math.random() < 0.75 + edge ? 1 : 0;
    const b = Math.random() < 0.75 - edge ? 1 : 0;
    pFor += a;
    pAgainst += b;
  }
  return { gf, ga, extraTime: true, penalties: { for: pFor, against: pAgainst } };
}

/**
 * Simulate the full 8-match run. Group stage (first 3) never eliminates; the
 * five knockout rounds are sudden-death. A regulation loss in the group still
 * costs the perfect "8-0" but you advance.
 */
export function simulate(
  squad: DraftedPlayer[],
  _formation: Formation,
  _mode: GameMode,
): SimulationResult {
  const effRating = effectiveTeamRating(squad);
  const opponents = pickOpponents();

  const matches: MatchResult[] = [];
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;
  let eliminatedRound: string | null = null;
  let champion = false;

  for (let round = 0; round < ROUNDS.length; round += 1) {
    const roundName = ROUNDS[round];
    const [oppCode, oppName] = opponents[round];
    const [lo, hi] = OPPONENT_STRENGTH[round];
    const opponentRating = randInt(lo, hi) + Math.round(randFloat(0, 0.9) * 10) / 10;
    const diff = effRating - opponentRating;
    const isGroup = round < 3;

    const score = isGroup ? playRegulation(diff) : playKnockout(diff);
    goalsFor += score.gf;
    goalsAgainst += score.ga;

    // Determine outcome — penalties decide knockouts that end level.
    let result: 'W' | 'D' | 'L';
    if (score.penalties) {
      result = score.penalties.for > score.penalties.against ? 'W' : 'L';
    } else if (score.gf > score.ga) {
      result = 'W';
    } else if (score.gf < score.ga) {
      result = 'L';
    } else {
      result = 'D';
    }

    if (result === 'W') wins += 1;
    else if (result === 'D') draws += 1;
    else losses += 1;

    const eliminated = !isGroup && result === 'L';
    const isFinal = round === ROUNDS.length - 1;
    if (isFinal && result === 'W') champion = true;

    matches.push({
      round: roundName,
      opponent: oppName,
      opponentCode: oppCode,
      opponentRating: Math.round(opponentRating * 10) / 10,
      goalsFor: score.gf,
      goalsAgainst: score.ga,
      result,
      penalties: score.penalties,
      extraTime: score.extraTime,
      eliminated,
      champion: isFinal && result === 'W',
    });

    if (eliminated) {
      eliminatedRound = roundName;
      break;
    }
  }

  return {
    matches,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    champion,
    eliminatedRound,
    recordLabel: buildRecordLabel({ wins, draws, losses, champion, eliminatedRound }),
  };
}

function buildRecordLabel(r: {
  wins: number;
  draws: number;
  losses: number;
  champion: boolean;
  eliminatedRound: string | null;
}): string {
  if (r.champion) {
    if (r.losses === 0 && r.draws === 0) return 'PERFECT 8-0 — CHAMPIONS 🏆';
    return `CHAMPIONS 🏆 · ${r.wins}W-${r.draws}D-${r.losses}L`;
  }
  const stage = r.eliminatedRound ?? 'Final';
  return `${stage} · ${r.wins}W-${r.draws}D-${r.losses}L`;
}

export const isPerfectRun = (res: SimulationResult): boolean =>
  res.champion && res.losses === 0 && res.draws === 0;

/** Compact emoji form bar for sharing, e.g. 🟢🟢🟢🟡🟢🟢🟢🟢. */
export function formBar(res: SimulationResult): string {
  return res.matches
    .map((m) => (m.result === 'W' ? '🟢' : m.result === 'D' ? '🟡' : '🔴'))
    .join('');
}
