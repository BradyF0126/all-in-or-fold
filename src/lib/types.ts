export type PlayerEntry = {
  name: string;
  buyIn: number; // dollars
};

export type PokerNight = {
  id: string;
  dateISO: string; // YYYY-MM-DD
  playersCount: number;
  players: PlayerEntry[];
  largestPot: number;
  nightResult: "gain" | "loss";
  resultAmount: number; // dollars (positive number, meaning how much gained/lost)
  createdAt: number; // timestamp
};
