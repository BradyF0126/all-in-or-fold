import { supabase } from "./supabaseClient";
import type { PokerNight } from "./types";

// READ
export async function loadNightsDB(): Promise<PokerNight[]> {
  const { data, error } = await supabase
    .from("poker_nights")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Map DB column names -> your app's type names
  return (data ?? []).map((row: any) => ({
    id: row.id,
    dateISO: row.date_iso,
    playersCount: row.players_count,
    largestPot: row.largest_pot,
    resultAmount: row.result_amount,
    nightResult: row.night_result,
    createdAt: row.created_at,
    players: row.players ?? [], // if you store players as json
  }));
}

// CREATE
export async function addNightDB(night: PokerNight) {
  const { error } = await supabase.from("poker_nights").insert({
    id: night.id,
    date_iso: night.dateISO,
    players_count: night.playersCount,
    largest_pot: night.largestPot,
    result_amount: night.resultAmount,
    night_result: night.nightResult,
    players: night.players, // only works if you made a JSON column called players
  });

  if (error) throw error;
}

// DELETE
export async function deleteNightDB(id: string) {
  const { error } = await supabase.from("poker_nights").delete().eq("id", id);
  if (error) throw error;
}
