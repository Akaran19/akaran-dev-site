// Draft state + helpers for the 8-0 World Cup Draft game.
// Pure, framework-agnostic logic so React components stay thin.
import {
  type PlayerRecord,
  type DraftedPlayer,
  type FormationSlot,
  type PositionGroup,
  type SpinCombo,
  getFormation,
  MAX_SKIPS,
} from './types';
import { ALL_COMBOS, getSquad } from '../data/players';

export interface DraftState {
  formationId: string;
  picks: Record<string, DraftedPlayer>; // slotId -> drafted player
  usedComboKeys: string[]; // "year-code" combos already spun
  usedPlayerIds: string[];
  skipsUsed: number;
  currentCombo: SpinCombo | null;
}

export const comboKeyOf = (c: SpinCombo) => `${c.year}-${c.countryCode}`;

export function createDraft(formationId: string): DraftState {
  return {
    formationId,
    picks: {},
    usedComboKeys: [],
    usedPlayerIds: [],
    skipsUsed: 0,
    currentCombo: null,
  };
}

/** Slots that still need filling, in formation order. */
export function emptySlots(state: DraftState): FormationSlot[] {
  const formation = getFormation(state.formationId);
  return formation.slots.filter((s) => !state.picks[s.id]);
}

/** How many of each position group are still required. */
export function remainingNeeds(state: DraftState): Record<PositionGroup, number> {
  const needs: Record<PositionGroup, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  for (const slot of emptySlots(state)) needs[slot.group] += 1;
  return needs;
}

/** Position groups that the team still needs at least one of. */
function neededGroups(state: DraftState): Set<PositionGroup> {
  const needs = remainingNeeds(state);
  return new Set(
    (Object.keys(needs) as PositionGroup[]).filter((g) => needs[g] > 0),
  );
}

/**
 * Pick a random combo that hasn't been used yet AND whose squad can contribute
 * at least one player to a still-needed position group. This avoids dead spins.
 */
export function pickRandomCombo(state: DraftState): SpinCombo | null {
  const used = new Set(state.usedComboKeys);
  const groupsNeeded = neededGroups(state);

  const candidates = ALL_COMBOS.filter((c) => {
    if (used.has(comboKeyOf(c))) return false;
    const squad = getSquad(c.year, c.countryCode);
    if (squad.length === 0) return false;
    // squad must have at least one player in a needed group not already drafted
    return squad.some(
      (p) =>
        groupsNeeded.has(p.positionGroup) &&
        !state.usedPlayerIds.includes(p.id),
    );
  });

  if (candidates.length === 0) {
    // fall back to any unused, non-empty combo
    const fallback = ALL_COMBOS.filter(
      (c) => !used.has(comboKeyOf(c)) && getSquad(c.year, c.countryCode).length > 0,
    );
    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Players from a combo that can still be drafted into an open, matching slot. */
export function selectableFromCombo(state: DraftState, combo: SpinCombo): PlayerRecord[] {
  const groupsNeeded = neededGroups(state);
  const drafted = new Set(state.usedPlayerIds);
  return getSquad(combo.year, combo.countryCode)
    .filter((p) => groupsNeeded.has(p.positionGroup) && !drafted.has(p.id))
    .sort((a, b) => b.rating - a.rating);
}

/** Empty slots a given player is eligible to fill (matched by position group). */
export function eligibleSlots(state: DraftState, player: PlayerRecord): FormationSlot[] {
  return emptySlots(state).filter((s) => s.group === player.positionGroup);
}

/** Record a spin: store the combo as used and set it current. */
export function applySpin(state: DraftState, combo: SpinCombo): DraftState {
  return {
    ...state,
    currentCombo: combo,
    usedComboKeys: [...state.usedComboKeys, comboKeyOf(combo)],
  };
}

/** Use a skip (re-spin without drafting). Returns null if no skips left. */
export function canSkip(state: DraftState): boolean {
  return state.skipsUsed < MAX_SKIPS && state.currentCombo !== null;
}

export function applySkip(state: DraftState): DraftState {
  return { ...state, skipsUsed: state.skipsUsed + 1, currentCombo: null };
}

export const skipsRemaining = (state: DraftState): number =>
  Math.max(0, MAX_SKIPS - state.skipsUsed);

/**
 * Place a player into a slot. Auto-selects the first eligible slot if slotId is
 * omitted. Returns unchanged state if the move is invalid.
 */
export function placePlayer(
  state: DraftState,
  player: PlayerRecord,
  slotId?: string,
): DraftState {
  const eligible = eligibleSlots(state, player);
  if (eligible.length === 0) return state;
  const target = slotId
    ? eligible.find((s) => s.id === slotId)
    : eligible[0];
  if (!target) return state;
  if (state.usedPlayerIds.includes(player.id)) return state;

  return {
    ...state,
    picks: { ...state.picks, [target.id]: { ...player, slotId: target.id } },
    usedPlayerIds: [...state.usedPlayerIds, player.id],
    currentCombo: null,
  };
}

export function isComplete(state: DraftState): boolean {
  return emptySlots(state).length === 0;
}

export function filledCount(state: DraftState): number {
  return Object.keys(state.picks).length;
}

/** Average rating of the players drafted so far (0 if none). */
export function teamRating(state: DraftState): number {
  const players = Object.values(state.picks);
  if (players.length === 0) return 0;
  const total = players.reduce((sum, p) => sum + p.rating, 0);
  return Math.round((total / players.length) * 10) / 10;
}

/** Drafted players in formation slot order. */
export function squadInOrder(state: DraftState): DraftedPlayer[] {
  const formation = getFormation(state.formationId);
  return formation.slots
    .map((s) => state.picks[s.id])
    .filter((p): p is DraftedPlayer => Boolean(p));
}
