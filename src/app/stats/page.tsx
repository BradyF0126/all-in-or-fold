"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { computeStats, loadNights } from "@/lib/storage";

export default function StatsPage() {
  const [stats, setStats] = useState(computeStats([]));

  useEffect(() => {
    setStats(computeStats(loadNights()));
  }, []);

  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <div className="mx-auto max-w-md px-5 py-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Stats</h1>
          <Link href="/" className="underline text-white/80">Home</Link>
        </div>

        <div className="space-y-4 mt-6">
          <div className="p-4 rounded-xl bg-white/5">Average Pot: ${stats.avgPot.toFixed(2)}</div>
          <div className="p-4 rounded-xl bg-white/5">Average Players: {stats.avgPlayers.toFixed(2)}</div>
          <div className="p-4 rounded-xl bg-white/5">Average Buy-In: ${stats.avgBuyIn.toFixed(2)}</div>
          <div className="p-4 rounded-xl bg-white/5">
            Average Net: {stats.avgNet >= 0 ? "+" : "-"}${Math.abs(stats.avgNet).toFixed(2)}
          </div>
        </div>
      </div>
    </main>
  );
}
