"use client";

import Link from "next/link";
import CardTwoHearts from "@/components/CardTwoHearts";
import PlayingCardsBackground from "@/components/PlayingCardsBackground";

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white">
      <PlayingCardsBackground />

      <div className="relative z-10 mx-auto max-w-md px-5 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-center">
          All In or Fold
        </h1>
        <p className="text-center text-white/80 mt-2">
          Track poker nights, stats, and history.
        </p>

        {/* New layout: 2♥ in center, 3 buttons around it */}
        <div className="relative mt-12 h-[420px]">
          {/* Center card */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CardTwoHearts />
          </div>

          {/* New Poker Night (top) */}
          <Link
            href="/new"
            className="absolute left-1/2 top-6 -translate-x-1/2 rounded-2xl bg-white/10 border border-white/15 px-6 py-4 text-center font-bold shadow-lg active:scale-[0.98]"
          >
            New Poker Night
          </Link>

          {/* Stats (bottom-left) */}
          <Link
            href="/stats"
            className="absolute left-6 bottom-10 rounded-2xl bg-white/10 border border-white/15 px-6 py-4 text-center font-bold shadow-lg active:scale-[0.98]"
          >
            Stats
          </Link>

          {/* History (bottom-right) */}
          <Link
            href="/history"
            className="absolute right-6 bottom-10 rounded-2xl bg-white/10 border border-white/15 px-6 py-4 text-center font-bold shadow-lg active:scale-[0.98]"
          >
            History
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-white/70">
          Data saves on this device (localStorage).
        </div>
      </div>
    </main>
  );
}
