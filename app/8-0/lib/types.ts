// Core types, formations, and constants for the 8-0 World Cup Draft game.

export type PositionGroup = 'GK' | 'DEF' | 'MID' | 'FWD';

export type Position =
  | 'GK'
  | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB'
  | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM'
  | 'LW' | 'RW' | 'ST' | 'CF';

export interface PlayerRecord {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  worldCupYear: number;
  position: Position;
  positionGroup: PositionGroup;
  rating: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  saves?: number;
}

export type GameMode = 'classic' | 'worldcupiq';

export interface FormationSlot {
  id: string;          // unique within formation, e.g. "gk", "cb1"
  label: Position;     // displayed position label
  group: PositionGroup;
  x: number;           // 0-100, left → right
  y: number;           // 0-100, top (attack) → bottom (own goal)
}

export interface Formation {
  id: string;
  name: string;
  description: string;
  slots: FormationSlot[];
}

export interface DraftedPlayer extends PlayerRecord {
  slotId: string;
}

export interface SpinCombo {
  countryCode: string;
  country: string;
  year: number;
}

export interface MatchResult {
  round: string;
  opponent: string;
  opponentCode: string;
  opponentRating: number;
  goalsFor: number;
  goalsAgainst: number;
  result: 'W' | 'D' | 'L';
  penalties?: { for: number; against: number };
  extraTime?: boolean;
  eliminated?: boolean;
  champion?: boolean;
}

export interface SimulationResult {
  matches: MatchResult[];
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  champion: boolean;
  eliminatedRound: string | null;
  recordLabel: string; // e.g. "8-0 CHAMPION" or "6-1-1 — Semi-Final"
}

export interface LeaderboardEntry {
  id: string;
  mode: GameMode;
  formationId: string;
  formationName: string;
  teamRating: number;
  recordLabel: string;
  champion: boolean;
  wins: number;
  draws: number;
  losses: number;
  date: number; // epoch ms
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const WORLD_CUP_YEARS = [
  1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026,
] as const;

export const ROUNDS = [
  'Group Stage (MD1)',
  'Group Stage (MD2)',
  'Group Stage (MD3)',
  'Round of 32',
  'Round of 16',
  'Quarter-Final',
  'Semi-Final',
  'Final',
] as const;

// [min, max] opponent rating per round index (matches ROUNDS).
export const OPPONENT_STRENGTH: Array<[number, number]> = [
  [65, 78], // MD1
  [66, 79], // MD2
  [68, 80], // MD3
  [72, 82], // R32
  [75, 85], // R16
  [78, 88], // QF
  [82, 90], // SF
  [85, 93], // Final
];

export const TOTAL_SLOTS = 11;
export const MAX_SKIPS = 3;

// ---------------------------------------------------------------------------
// Position group helper
// ---------------------------------------------------------------------------
export const POSITION_GROUP: Record<Position, PositionGroup> = {
  GK: 'GK',
  CB: 'DEF', LB: 'DEF', RB: 'DEF', LWB: 'DEF', RWB: 'DEF',
  CDM: 'MID', CM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
  LW: 'FWD', RW: 'FWD', ST: 'FWD', CF: 'FWD',
};

const slot = (id: string, label: Position, x: number, y: number): FormationSlot => ({
  id, label, group: POSITION_GROUP[label], x, y,
});

// ---------------------------------------------------------------------------
// Formations (7) — coordinates on a vertical pitch (GK at bottom, y≈90)
// ---------------------------------------------------------------------------
export const FORMATIONS: Formation[] = [
  {
    id: '4-3-3',
    name: '4-3-3',
    description: 'The classic attacking shape — width and firepower up front.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('lb', 'LB', 14, 71), slot('cb1', 'CB', 38, 75), slot('cb2', 'CB', 62, 75), slot('rb', 'RB', 86, 71),
      slot('cdm', 'CDM', 50, 57), slot('cm1', 'CM', 30, 48), slot('cm2', 'CM', 70, 48),
      slot('lw', 'LW', 20, 25), slot('st', 'ST', 50, 19), slot('rw', 'RW', 80, 25),
    ],
  },
  {
    id: '4-4-2',
    name: '4-4-2',
    description: 'Tried and tested — solid shape, balanced across the pitch.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('lb', 'LB', 14, 71), slot('cb1', 'CB', 38, 75), slot('cb2', 'CB', 62, 75), slot('rb', 'RB', 86, 71),
      slot('lm', 'LM', 14, 48), slot('cm1', 'CM', 38, 52), slot('cm2', 'CM', 62, 52), slot('rm', 'RM', 86, 48),
      slot('st1', 'ST', 38, 21), slot('st2', 'ST', 62, 21),
    ],
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    description: 'Modern and versatile — control the middle, unlock with a No. 10.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('lb', 'LB', 14, 71), slot('cb1', 'CB', 38, 75), slot('cb2', 'CB', 62, 75), slot('rb', 'RB', 86, 71),
      slot('cdm1', 'CDM', 38, 60), slot('cdm2', 'CDM', 62, 60),
      slot('lw', 'LW', 17, 37), slot('cam', 'CAM', 50, 40), slot('rw', 'RW', 83, 37),
      slot('st', 'ST', 50, 17),
    ],
  },
  {
    id: '4-5-1',
    name: '4-5-1',
    description: 'Midfield overload — pack the middle and hit on the break.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('lb', 'LB', 14, 71), slot('cb1', 'CB', 38, 75), slot('cb2', 'CB', 62, 75), slot('rb', 'RB', 86, 71),
      slot('lm', 'LM', 11, 50), slot('cm1', 'CM', 33, 52), slot('cm2', 'CM', 50, 55), slot('cm3', 'CM', 67, 52), slot('rm', 'RM', 89, 50),
      slot('st', 'ST', 50, 21),
    ],
  },
  {
    id: '3-4-3',
    name: '3-4-3',
    description: 'All-out attack — three at the back, three up top. Brave football.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('cb1', 'CB', 28, 75), slot('cb2', 'CB', 50, 77), slot('cb3', 'CB', 72, 75),
      slot('lm', 'LM', 14, 50), slot('cm1', 'CM', 38, 53), slot('cm2', 'CM', 62, 53), slot('rm', 'RM', 86, 50),
      slot('lw', 'LW', 22, 24), slot('st', 'ST', 50, 19), slot('rw', 'RW', 78, 24),
    ],
  },
  {
    id: '3-5-2',
    name: '3-5-2',
    description: 'Wing-back warriors — dominate the flanks with five across the middle.',
    slots: [
      slot('gk', 'GK', 50, 90),
      slot('cb1', 'CB', 28, 76), slot('cb2', 'CB', 50, 78), slot('cb3', 'CB', 72, 76),
      slot('lwb', 'LWB', 10, 52), slot('cm1', 'CM', 34, 54), slot('cdm', 'CDM', 50, 58), slot('cm2', 'CM', 66, 54), slot('rwb', 'RWB', 90, 52),
      slot('st1', 'ST', 38, 22), slot('st2', 'ST', 62, 22),
    ],
  },
  {
    id: '5-4-1',
    name: '5-4-1',
    description: 'Fortress mode — five defenders, maximum solidity, clinical on the counter.',
    slots: [
      slot('gk', 'GK', 50, 91),
      slot('lwb', 'LWB', 9, 67), slot('cb1', 'CB', 30, 76), slot('cb2', 'CB', 50, 78), slot('cb3', 'CB', 70, 76), slot('rwb', 'RWB', 91, 67),
      slot('lm', 'LM', 18, 50), slot('cm1', 'CM', 40, 52), slot('cm2', 'CM', 60, 52), slot('rm', 'RM', 82, 50),
      slot('st', 'ST', 50, 22),
    ],
  },
];

export const getFormation = (id: string): Formation =>
  FORMATIONS.find((f) => f.id === id) ?? FORMATIONS[0];

// ---------------------------------------------------------------------------
// Country flags (ISO-3166 alpha-3 codes — as used by the Fjelstul dataset)
// ---------------------------------------------------------------------------
export const COUNTRY_FLAGS: Record<string, string> = {
  ARG: '🇦🇷', BRA: '🇧🇷', DEU: '🇩🇪', FRA: '🇫🇷', ITA: '🇮🇹',
  ESP: '🇪🇸', ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', NLD: '🇳🇱', PRT: '🇵🇹', HRV: '🇭🇷',
  BEL: '🇧🇪', URY: '🇺🇾', USA: '🇺🇸', MEX: '🇲🇽', JPN: '🇯🇵',
  KOR: '🇰🇷', MAR: '🇲🇦', SEN: '🇸🇳', NGA: '🇳🇬', GHA: '🇬🇭',
  CMR: '🇨🇲', AUS: '🇦🇺', CAN: '🇨🇦', COL: '🇨🇴', CHL: '🇨🇱',
  POL: '🇵🇱', SWE: '🇸🇪', DNK: '🇩🇰', CHE: '🇨🇭', AUT: '🇦🇹',
  RUS: '🇷🇺', UKR: '🇺🇦', SRB: '🇷🇸', SCG: '🇷🇸', YUG: '🇷🇸',
  CZE: '🇨🇿', CSK: '🇨🇿', SVK: '🇸🇰', SVN: '🇸🇮', BIH: '🇧🇦',
  GRC: '🇬🇷', TUR: '🇹🇷', BGR: '🇧🇬', ROU: '🇷🇴', IRL: '🇮🇪',
  SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', NOR: '🇳🇴', ISL: '🇮🇸', SUN: '🇷🇺',
  TUN: '🇹🇳', DZA: '🇩🇿', EGY: '🇪🇬', ZAF: '🇿🇦', CIV: '🇨🇮',
  IRN: '🇮🇷', SAU: '🇸🇦', QAT: '🇶🇦', ARE: '🇦🇪', PRK: '🇰🇵',
  CHN: '🇨🇳', NZL: '🇳🇿', CRI: '🇨🇷', HND: '🇭🇳', PAN: '🇵🇦',
  JAM: '🇯🇲', TTO: '🇹🇹', PER: '🇵🇪', PRY: '🇵🇾', BOL: '🇧🇴',
  ECU: '🇪🇨', AGO: '🇦🇴', TGO: '🇹🇬',
};

export const flag = (code: string): string => COUNTRY_FLAGS[code] ?? '🏳️';
