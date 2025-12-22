export default function PlayingCardsBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950" />

      <div className="absolute -top-10 -left-10 h-48 w-36 rotate-[-18deg] rounded-2xl bg-white/10 border border-white/10" />
      <div className="absolute top-24 left-24 h-52 w-40 rotate-[12deg] rounded-2xl bg-white/10 border border-white/10" />
      <div className="absolute top-10 right-10 h-48 w-36 rotate-[22deg] rounded-2xl bg-white/10 border border-white/10" />
      <div className="absolute bottom-10 right-24 h-52 w-40 rotate-[-10deg] rounded-2xl bg-white/10 border border-white/10" />
      <div className="absolute bottom-24 left-10 h-48 w-36 rotate-[8deg] rounded-2xl bg-white/10 border border-white/10" />

      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
