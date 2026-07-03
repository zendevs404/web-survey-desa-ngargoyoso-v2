"use client";

import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { computeDashboardStats } from "@/lib/analytics";
import { generateAIInsight } from "@/lib/aiInsights";
import { useSurveyDataContext } from "@/lib/SurveyDataProvider";

export default function AIOverview() {
  const { rows } = useSurveyDataContext();
  const stats = useMemo(() => computeDashboardStats(rows), [rows]);
  const insight = useMemo(() => generateAIInsight(stats), [stats]);

  return (
    <section id="ai-overview" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-50/60 via-transparent to-transparent dark:from-nightforest-surface/40" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-clay dark:text-turmeric-light">
            AI Insight Dashboard
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            AI Overview
          </h2>
          <p className="mt-4 text-ink-soft dark:text-nightforest-text/70">
            Analisis otomatis dari data survei yang masuk — dihasilkan langsung dari data,
            diperbarui setiap kali ada responden baru.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="card-modern glass-strong p-7 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest-500 to-turmeric text-white">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="font-display text-lg font-semibold">Ringkasan Umum</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-nightforest-text/80 sm:text-base">
              {insight.ringkasanUmum}
            </p>
          </div>

          <div className="card-modern glass p-7 lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Temuan Utama</h3>
            {insight.temuanUtama.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {insight.temuanUtama.map((temuan) => (
                  <li key={temuan} className="flex gap-3 text-sm leading-relaxed text-ink-soft dark:text-nightforest-text/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-turmeric" aria-hidden="true" />
                    {temuan}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-soft dark:text-nightforest-text/60">
                Belum ada temuan — menunggu data responden.
              </p>
            )}
          </div>

          <div className="card-modern glass p-7">
            <h3 className="font-display text-lg font-semibold">Rekomendasi AI</h3>
            <ul className="mt-4 space-y-3">
              {insight.rekomendasi.map((rekom) => (
                <li key={rekom} className="flex gap-3 text-sm leading-relaxed text-ink-soft dark:text-nightforest-text/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-100 text-[11px] font-bold text-forest-700 dark:bg-nightforest-surface2 dark:text-turmeric-light">
                    →
                  </span>
                  {rekom}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[11px] text-ink-soft/70 dark:text-nightforest-text/50">
          Ringkasan dihasilkan secara otomatis (rule-based) dari data survei terkini, bukan opini pribadi.
        </p>
      </div>
    </section>
  );
}
