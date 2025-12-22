import { PokerNight } from "./types";

const KEY = "aiof_poker_nights_v1";

export function loadNights(): PokerNight[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PokerNight[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNights(nights: PokerNight[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(nights));
}

export function addNight(night: PokerNight) {
  const nights = loadNights();
  nights.unshift(night); // newest first
  saveNights(nights);
}

export function deleteNight(id: string) {
  const nights = loadNights().filter(n => n.id !== id);
  saveNights(nights);
}

export function computeStats(nights: PokerNight[]) {
  if (nights.length === 0) {
    return {
      avgPot: 0,
      avgPlayers: 0,
      avgBuyIn: 0,
      avgNet: 0,
      count: 0,
    };
  }

  const count = nights.length;

  const avgPot =
    nights.reduce((sum, n) => sum + (Number(n.largestPot) || 0), 0) / count;

  const avgPlayers =
    nights.reduce((sum, n) => sum + (Number(n.playersCount) || 0), 0) / count;

  const allBuyIns: number[] = [];
  nights.forEach(n => n.players.forEach(p => allBuyIns.push(Number(p.buyIn) || 0)));
  const avgBuyIn =
    allBuyIns.length === 0 ? 0 : allBuyIns.reduce((a, b) => a + b, 0) / allBuyIns.length;

  const avgNet =
    nights.reduce((sum, n) => {
      const amt = Number(n.resultAmount) || 0;
      return sum + (n.nightResult === "gain" ? amt : -amt);
    }, 0) / count;

  return { avgPot, avgPlayers, avgBuyIn, avgNet, count };
}
