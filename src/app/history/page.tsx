
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";
import { loadNightsDB, deleteNightDB } from "@/lib/db";
import { PokerNight } from "@/lib/types";

export default function HistoryPage() {
  const router = useRouter();

  const [nights, setNights] = useState<PokerNight[]>([]);
  const [query, setQuery] = useState("");

  // 🔒 AUTH CHECK + LOAD
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        // Use router.push in client components, redirect() is server-only
        router.push("/login");
        return;
      }

      const nightsFromDb = await loadNightsDB();
      setNights(nightsFromDb);
    })();
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return nights;
    return nights.filter((n) => n.dateISO?.includes(q));
  }, [nights, query]);

  async function handleDelete(nightId: string) {
    const ok = confirm(
      "Are you sure you want to delete this poker night? This cannot be undone."
    );
    if (!ok) return;

    await deleteNightDB(nightId);
    const updated = await loadNightsDB();
    setNights(updated);
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <div className="mx-auto max-w-md px-5 py-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-extrabold">History</h1>
          <Link href="/" className="underline text-white/80">
            Home
          </Link>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by date"
          className="mt-4 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
        />

        <div className="space-y-4 mt-6">
          {filtered.map((n) => (
            <div key={n.id} className="p-4 rounded-xl bg-white/5">
              <div className="font-bold">{n.dateISO}</div>
              <div>Players: {n.playersCount}</div>
              <div>Largest Pot: ${n.largestPot}</div>
              <div>
                {n.nightResult}: ${n.resultAmount}
              </div>

              <button
                onClick={() => handleDelete(n.id)}
                className="mt-2 text-red-400 underline"
              >
                Delete
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-white/70">No nights found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
