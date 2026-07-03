"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import SummaryCards from "./SummaryCards";
import { computeDashboardStats } from "@/lib/analytics";
import { useSurveyDataContext } from "@/lib/SurveyDataProvider";

// Code-splitting: setiap chart (Chart.js + canvas) hanya diambil saat
// dashboard benar-benar dirender di sisi klien.
const DistribusiRespondenChart = dynamic(() => import("./DistribusiRespondenChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />
});
const DistribusiGenderChart = dynamic(() => import("./DistribusiGenderChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />
});
const DistribusiUsiaChart = dynamic(() => import("./DistribusiUsiaChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />
});
const RataRataPertanyaanChart = dynamic(() => import("./RataRataPertanyaanChart"), {
  ssr: false,
  loading: () => <ChartSkeleton tall />
});
const TrenPengisianChart = dynamic(() => import("./TrenPengisianChart"), {
  ssr: false,
  loading: () => <ChartSkeleton tall />
});
const WordCloudCard = dynamic(() => import("./WordCloudCard"), {
  ssr: false,
  loading: () => <ChartSkeleton tall />
});

function ChartSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`card-modern glass animate-pulse ${tall ? "h-96 lg:col-span-2" : "h-80"}`}
      aria-hidden="true"
    />
  );
}

export default function DashboardSection() {
  const { rows, loading, error, isDemoData, lastUpdated, refresh } = useSurveyDataContext();
  const stats = useMemo(() => computeDashboardStats(rows), [rows]);

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-clay dark:text-turmeric-light">
            Dashboard Analytics
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Data Responden secara Realtime
          </h2>
          <p className="mt-4 text-ink-soft dark:text-nightforest-text/70">
            Dashboard ini terhubung langsung ke Google Sheets melalui Google Apps Script dan
            diperbarui secara berkala.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl glass px-5 py-3 sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-ink-soft dark:text-nightforest-text/70">
            <span
              className={`h-2 w-2 rounded-full ${
                isDemoData ? "bg-turmeric" : "bg-forest-500"
              } animate-pulse`}
              aria-hidden="true"
            />
            {isDemoData
              ? "Menampilkan data contoh — sambungkan NEXT_PUBLIC_GAS_URL untuk data realtime."
              : "Terhubung ke Google Sheets secara realtime."}
            {lastUpdated && (
              <span className="hidden sm:inline">
                &middot; Diperbarui{" "}
                {lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest-600 px-4 py-2 text-xs font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg disabled:opacity-60"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={loading ? "animate-spin" : ""}
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {loading ? "Memuat..." : "Segarkan"}
          </button>
        </Reveal>

        {error && (
          <p className="mt-3 text-center text-xs text-clay">
            Terjadi kendala mengambil data terbaru, menampilkan data contoh sementara.
          </p>
        )}

        <div className="mt-10">
          <SummaryCards stats={stats} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <DistribusiRespondenChart desa={stats.distribusiDesa} karangTaruna={stats.distribusiKarangTaruna} />
          <DistribusiGenderChart data={stats.distribusiGender} />
          <DistribusiUsiaChart data={stats.distribusiUsia} />
          <RataRataPertanyaanChart data={stats.rataPerPertanyaan} />
          <TrenPengisianChart data={stats.trenPengisian} />
          <WordCloudCard data={stats.kataKunciSaran} />
        </div>
      </div>
    </section>
  );
}
