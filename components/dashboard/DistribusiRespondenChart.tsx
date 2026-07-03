"use client";

import { useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { CHART_PALETTE, ensureChartsRegistered, getChartThemeColors } from "@/lib/chartTheme";
import { useTheme } from "@/lib/theme-provider";
import type { HitungAsal } from "@/types";

ensureChartsRegistered();

interface DistribusiRespondenChartProps {
  desa: HitungAsal[];
  karangTaruna: HitungAsal[];
}

type Mode = "desa" | "karang_taruna";

export default function DistribusiRespondenChart({
  desa,
  karangTaruna
}: DistribusiRespondenChartProps) {
  const [mode, setMode] = useState<Mode>("desa");
  const { theme } = useTheme();
  const colors = getChartThemeColors(theme === "dark");

  const source = mode === "desa" ? desa : karangTaruna;
  const hasData = source.length > 0;

  const data = useMemo(
    () => ({
      labels: source.map((s) => s.nama),
      datasets: [
        {
          data: source.map((s) => s.jumlah),
          backgroundColor: source.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
          borderColor: theme === "dark" ? "#152820" : "#FBF8F1",
          borderWidth: 2
        }
      ]
    }),
    [source, theme]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: colors.text, boxWidth: 12, padding: 14, font: { size: 11 } }
      },
      tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipText, bodyColor: colors.tooltipText }
    }
  };

  return (
    <ChartCard
      title="Distribusi Responden"
      description="Sebaran responden berdasarkan asal"
      action={
        <div className="inline-flex shrink-0 rounded-full border border-black/10 dark:border-white/15 bg-white/50 dark:bg-white/5 p-0.5">
          {(
            [
              { key: "desa", label: "Desa" },
              { key: "karang_taruna", label: "Karang Taruna" }
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setMode(opt.key)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
                mode === opt.key
                  ? "bg-forest-600 text-white shadow-soft"
                  : "text-ink-soft dark:text-nightforest-text/70"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-64">
        {hasData ? (
          <Pie data={data} options={options} />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-ink-soft dark:text-nightforest-text/60">
            Belum ada data untuk kategori ini.
          </p>
        )}
      </div>
    </ChartCard>
  );
}
