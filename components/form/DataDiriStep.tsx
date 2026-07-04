"use client";

import { DAFTAR_DESA, DAFTAR_KARANG_TARUNA, OPSI_KARANG_TARUNA_LAINNYA, type DataDiri } from "@/types";
import SearchableSelect from "./SearchableSelect";

interface DataDiriStepProps {
  data: DataDiri;
  onChange: (data: DataDiri) => void;
  onNext: () => void;
  errors: Partial<Record<keyof DataDiri, string>>;
}

export default function DataDiriStep({ data, onChange, onNext, errors }: DataDiriStepProps) {
  const update = (patch: Partial<DataDiri>) => onChange({ ...data, ...patch });
  const isLainnya = data.karangTaruna === OPSI_KARANG_TARUNA_LAINNYA;

  return (
    <div className="card-modern glass-strong p-6 sm:p-9">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Data Diri</h2>
      <p className="mt-1.5 text-sm text-ink-soft dark:text-nightforest-text/70">
        Lengkapi data diri Anda sebelum melanjutkan ke kuesioner.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="nama" className="mb-1.5 block text-sm font-medium">
            Nama Lengkap <span className="text-clay">*</span>
          </label>
          <input
            id="nama"
            type="text"
            value={data.nama}
            onChange={(e) => update({ nama: e.target.value })}
            placeholder="Tuliskan nama lengkap Anda"
            className={`w-full rounded-xl border bg-white/70 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-forest-400 ${
              errors.nama ? "border-clay" : "border-black/10 dark:border-white/15"
            }`}
          />
          {errors.nama && <p className="mt-1.5 text-xs font-medium text-clay">{errors.nama}</p>}
        </div>

        <div>
          <label htmlFor="usia" className="mb-1.5 block text-sm font-medium">
            Usia <span className="text-clay">*</span>
          </label>
          <input
            id="usia"
            type="number"
            min={1}
            max={120}
            inputMode="numeric"
            value={data.usia}
            onChange={(e) => update({ usia: e.target.value })}
            placeholder="Contoh: 22"
            className={`w-full rounded-xl border bg-white/70 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-forest-400 ${
              errors.usia ? "border-clay" : "border-black/10 dark:border-white/15"
            }`}
          />
          {errors.usia && <p className="mt-1.5 text-xs font-medium text-clay">{errors.usia}</p>}
        </div>

        <div>
          <label htmlFor="asalDesa" className="mb-1.5 block text-sm font-medium">
            Asal Desa <span className="text-clay">*</span>
          </label>
          <select
            id="asalDesa"
            value={data.asalDesa}
            onChange={(e) => update({ asalDesa: e.target.value })}
            className={`w-full rounded-xl border bg-white/70 dark:bg-white/5 px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 focus:border-forest-400 dark:text-nightforest-text ${
              errors.asalDesa ? "border-clay" : "border-black/10 dark:border-white/15"
            }`}
          >
            <option value="" className="text-ink">
              Pilih desa Anda
            </option>
            {DAFTAR_DESA.map((desa) => (
              <option key={desa} value={desa} className="text-ink">
                {desa}
              </option>
            ))}
          </select>
          {errors.asalDesa && (
            <p className="mt-1.5 text-xs font-medium text-clay">{errors.asalDesa}</p>
          )}
        </div>

        <div>
          <label htmlFor="karangTaruna" className="mb-1.5 block text-sm font-medium">
            Karang Taruna <span className="text-clay">*</span>
          </label>
          <SearchableSelect
            id="karangTaruna"
            value={data.karangTaruna}
            onChange={(value) =>
              update({
                karangTaruna: value,
                karangTarunaLainnya: value === OPSI_KARANG_TARUNA_LAINNYA ? data.karangTarunaLainnya : ""
              })
            }
            options={DAFTAR_KARANG_TARUNA}
            placeholder="Pilih Karang Taruna Anda"
            searchPlaceholder="Cari Karang Taruna..."
            hasError={!!errors.karangTaruna}
          />
          {errors.karangTaruna && (
            <p className="mt-1.5 text-xs font-medium text-clay">{errors.karangTaruna}</p>
          )}

          {isLainnya && (
            <div className="mt-3">
              <label htmlFor="karangTarunaLainnya" className="mb-1.5 block text-sm font-medium">
                Nama Karang Taruna Lainnya <span className="text-clay">*</span>
              </label>
              <input
                id="karangTarunaLainnya"
                type="text"
                value={data.karangTarunaLainnya}
                onChange={(e) => update({ karangTarunaLainnya: e.target.value })}
                placeholder="Tuliskan nama Karang Taruna Anda"
                className={`w-full rounded-xl border bg-white/70 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-forest-400 ${
                  errors.karangTarunaLainnya ? "border-clay" : "border-black/10 dark:border-white/15"
                }`}
              />
              {errors.karangTarunaLainnya && (
                <p className="mt-1.5 text-xs font-medium text-clay">{errors.karangTarunaLainnya}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium">
            Jenis Kelamin <span className="text-clay">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            {(["Laki-laki", "Perempuan"] as const).map((jk) => (
              <label
                key={jk}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  data.jenisKelamin === jk
                    ? "border-forest-500 bg-forest-50 dark:bg-nightforest-surface2 text-forest-700 dark:text-turmeric-light"
                    : "border-black/10 dark:border-white/15 text-ink-soft dark:text-nightforest-text/70"
                }`}
              >
                <input
                  type="radio"
                  name="jenisKelamin"
                  className="sr-only"
                  checked={data.jenisKelamin === jk}
                  onChange={() => update({ jenisKelamin: jk })}
                />
                {jk}
              </label>
            ))}
          </div>
          {errors.jenisKelamin && (
            <p className="mt-1.5 text-xs font-medium text-clay">{errors.jenisKelamin}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-9 w-full rounded-full bg-gradient-to-r from-forest-600 to-forest-500 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg sm:w-auto sm:px-8"
      >
        Lanjutkan ke Kuesioner
      </button>
    </div>
  );
}
