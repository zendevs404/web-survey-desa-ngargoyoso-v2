"use client";

import { DAFTAR_PERTANYAAN, type JawabanKuesioner } from "@/types";
import PanduanPenilaian from "./PanduanPenilaian";
import RatingQuestion from "./RatingQuestion";

interface KuesionerStepProps {
  jawaban: JawabanKuesioner;
  onChange: (jawaban: JawabanKuesioner) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors: Partial<Record<keyof JawabanKuesioner, boolean>>;
  submitting: boolean;
  submitError: string | null;
}

export default function KuesionerStep({
  jawaban,
  onChange,
  onBack,
  onSubmit,
  errors,
  submitting,
  submitError
}: KuesionerStepProps) {
  const update = (id: keyof JawabanKuesioner, value: number) => {
    onChange({ ...jawaban, [id]: value });
  };

  return (
    <div className="space-y-6">
      <PanduanPenilaian />

      {DAFTAR_PERTANYAAN.map((item, idx) => (
        <RatingQuestion
          key={item.id}
          name={item.id}
          number={idx + 1}
          question={item.label}
          value={jawaban[item.id] as number | null}
          onChange={(value) => update(item.id, value)}
          showError={errors[item.id]}
        />
      ))}

      <div className="card-modern glass p-5 sm:p-6">
        <label htmlFor="saran" className="flex gap-3 pb-3 text-sm font-medium leading-relaxed sm:text-base">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-nightforest-surface2 font-display text-xs font-bold text-forest-700 dark:text-turmeric-light">
            8
          </span>
          <span>
            Masukan dan Saran{" "}
            <span className="font-normal text-ink-soft dark:text-nightforest-text/60">(Opsional)</span>
          </span>
        </label>
        <textarea
          id="saran"
          rows={4}
          value={jawaban.saran}
          onChange={(e) => onChange({ ...jawaban, saran: e.target.value })}
          placeholder="Tuliskan masukan atau saran Anda untuk program ini."
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-forest-400"
        />
      </div>

      {submitError && (
        <div className="rounded-xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm font-medium text-clay-dark">
          {submitError}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="rounded-full border border-black/10 dark:border-white/15 px-7 py-3.5 text-sm font-semibold text-ink-soft dark:text-nightforest-text/80 transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-clay to-turmeric px-8 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {submitting ? "Mengirim..." : "Kirim Jawaban"}
        </button>
      </div>
    </div>
  );
}
