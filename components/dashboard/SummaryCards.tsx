"use client";

import type { DashboardStats } from "@/types";
import Reveal from "@/components/Reveal";

interface SummaryCardsProps {
  stats: DashboardStats;
}

const ICONS: Record<string, JSX.Element> = {
  responden: (
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  skor: (
    <path
      d="M12 2.5 15 9l7 1-5.2 5 1.3 7-6.1-3.3L5.9 22l1.3-7L2 10l7-1 3-6.5Z"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  desa: (
    <path
      d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  karangTaruna: (
    <path
      d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  kepuasan: (
    <path
      d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
};

export default function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      key: "responden",
      label: "Total Responden",
      value: stats.totalResponden.toLocaleString("id-ID"),
      suffix: "orang"
    },
    {
      key: "skor",
      label: "Rata-rata Skor Keseluruhan",
      value: stats.rataRataKeseluruhan.toFixed(1),
      suffix: "/ 5"
    },
    {
      key: "desa",
      label: "Jumlah Desa Terlibat",
      value: stats.jumlahDesa.toLocaleString("id-ID"),
      suffix: "desa"
    },
    {
      key: "karangTaruna",
      label: "Jumlah Karang Taruna Terlibat",
      value: stats.jumlahKarangTaruna.toLocaleString("id-ID"),
      suffix: "kelompok"
    },
    {
      key: "kepuasan",
      label: "Persentase Kepuasan",
      value: stats.persentaseKepuasan.toString(),
      suffix: "%"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, idx) => (
        <Reveal key={card.key} delay={idx * 80}>
          <div className="card-modern card-hover-lift glass h-full p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-moss text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {ICONS[card.key]}
              </svg>
            </div>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {card.value}
              <span className="ml-1 text-sm font-medium text-ink-soft dark:text-nightforest-text/60">
                {card.suffix}
              </span>
            </p>
            <p className="mt-1.5 text-xs font-medium text-ink-soft dark:text-nightforest-text/70">
              {card.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
