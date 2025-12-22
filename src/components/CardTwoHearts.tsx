export default function CardTwoHearts() {
  return (
    <div className="relative h-28 w-20 sm:h-32 sm:w-24 rounded-xl bg-white shadow-xl border border-black/10 grid place-items-center">
      <div className="absolute top-2 left-2 text-sm font-bold text-red-600 leading-none">
        2<br />♥
      </div>
      <div className="text-4xl sm:text-5xl text-red-600">♥</div>
      <div className="absolute bottom-2 right-2 text-sm font-bold text-red-600 leading-none rotate-180">
        2<br />♥
      </div>
    </div>
  );
}
