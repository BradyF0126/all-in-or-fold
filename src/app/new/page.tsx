"use client";

import { useMemo, useState } from "react";
import { addNight } from "@/lib/storage";
import { PokerNight, PlayerEntry } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function NewPokerNightPage() {
  const router = useRouter();

  const [dateISO, setDateISO] = useState(todayISO());
  const [playersCount, setPlayersCount] = useState<number>(4);
  const [largestPotStr, setLargestPotStr] = useState("");

  const [nightResult, setNightResult] = useState<"gain" | "loss">("gain");
  const [resultAmountStr, setResultAmountStr] = useState("");

  const [players, setPlayers] = useState<PlayerEntry[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({ name: `Player ${i + 1}`, buyIn: 0 }))
  );

  useMemo(() => {
    setPlayers(prev => {
      const next = [...prev];
      if (playersCount > next.length) {
        for (let i = next.length; i < playersCount; i++) {
          next.push({ name: `Player ${i + 1}`, buyIn: 0 });
        }
      } else if (playersCount < next.length) {
        next.length = playersCount;
      }
      return next;
    });
  }, [playersCount]);

  const canSave = playersCount > 0 && players.every(p => p.name.trim());

  function setPlayer(idx: number, patch: Partial<PlayerEntry>) {
    setPlayers(prev => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  }

  function onSave() {
    if (!canSave) return;

    const night: PokerNight = {
      id: crypto.randomUUID(),
      dateISO,
      playersCount,
      players,
      largestPot: Number(largestPotStr || 0),
      resultAmount: Number(resultAmountStr || 0),

      createdAt: Date.now(),
      nightResult: "gain"
    };

    addNight(night);
    router.push("/history");
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <div className="mx-auto max-w-md px-5 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">New Poker Night</h1>
          <Link href="/" className="underline text-white/80">Home</Link>
        </div>

        <div className="space-y-4 mt-6">
          <input type="date" value={dateISO} onChange={e => setDateISO(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />

          <label className="block text-sm text-white/80 mb-1">
  Number of Players
</label>
<input
  type="number"
  min={1}
  value={playersCount}
  onChange={e => setPlayersCount(Math.max(1, Number(e.target.value) || 1))}
  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
/>


          <label className="block text-sm text-white/80 mb-1">
  Total Pot ($)
</label>
<input
  inputMode="decimal"
  value={largestPotStr}
  onChange={(e) => {
    // allow blank OR numbers with optional decimal
    const v = e.target.value;
    if (v === "" || /^\d*\.?\d*$/.test(v)) setLargestPotStr(v);
  }}
  className="..."
  placeholder="Enter total pot"
/>


          <div className="flex gap-2">
            <button onClick={() => setNightResult("gain")}
              className={`flex-1 py-2 rounded-xl ${nightResult === "gain" ? "bg-emerald-500/30" : "bg-black/30"}`}>
              Gain
            </button>
            <button onClick={() => setNightResult("loss")}
              className={`flex-1 py-2 rounded-xl ${nightResult === "loss" ? "bg-red-500/30" : "bg-black/30"}`}>
              Loss
            </button>
          </div>

          <label className="block text-sm text-white/80 mb-1">
  Amount {nightResult === "gain" ? "Won" : "Lost"}
</label>
<div className="flex items-center gap-2">
  <div className="rounded-xl bg-black/20 border border-white/15 px-3 py-2 text-white/80 select-none">
    $
  </div>

  <input
    inputMode="decimal"
    value={resultAmountStr}
    onChange={(e) => {
      const v = e.target.value;
      if (v === "" || /^\d*\.?\d*$/.test(v)) setResultAmountStr(v);
    }}
    className="w-full rounded-xl bg-black/20 border border-white/15 px-4 py-2 text-white outline-none focus:border-white/30"
    placeholder="0.00"
  />
</div>

          {players.map((p, i) => (
            <div key={i} className="flex gap-2">
              <input value={p.name} onChange={e => setPlayer(i, { name: e.target.value })}
                className="flex-1 rounded-xl bg-black/30 border border-white/10 px-3 py-2"
                placeholder={`Player ${i + 1}`} />
              <input type="number" value={p.buyIn}
                onChange={e => setPlayer(i, { buyIn: Number(e.target.value) })}
                className="w-28 rounded-xl bg-black/30 border border-white/10 px-3 py-2"
                placeholder="$" />
            </div>
          ))}

          <button onClick={onSave}
            className="w-full py-3 rounded-xl bg-emerald-500/30 font-bold">
            Save Poker Night
          </button>
        </div>
      </div>
    </main>
  );
}
