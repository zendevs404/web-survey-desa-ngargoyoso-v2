import { RATING_SCALE } from "./ratingScale";

export default function PanduanPenilaian() {
  return (
    <div className="card-modern glass-strong p-6 sm:p-7">
      <h3 className="font-display text-lg font-semibold">Panduan Penilaian</h3>
      <p className="mt-1 text-sm text-ink-soft dark:text-nightforest-text/70">
        Gunakan skala berikut untuk menjawab setiap pernyataan sesuai pengalaman Anda.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
        {RATING_SCALE.map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 p-3 sm:flex-col sm:text-center"
            style={{ backgroundColor: item.bg }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-9 sm:w-9"
              style={{ backgroundColor: item.color }}
            >
              {item.value}
            </span>
            <span className="text-xs font-medium leading-tight text-ink dark:text-nightforest-text">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
