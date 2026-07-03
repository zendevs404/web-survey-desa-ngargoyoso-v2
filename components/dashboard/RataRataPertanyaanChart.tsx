"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { CHART_PALETTE, ensureChartsRegistered, getChartThemeColors } from "@/lib/chartTheme";
import { useTheme } from "@/lib/theme-provider";
import type { HitungPertanyaan } from "@/types";

ensureChartsRegistered();

interface RataRataPertanyaanChartProps {
  data: HitungPertanyaan[];
}

export default function RataRataPertanyaanChart({ data }: RataRataPertanyaanChartProps) {
  const { theme } = useTheme();
  const colors = getChartThemeColors(theme === "dark");

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.id.toUpperCase()),
      datasets: [
        {
          label: "Rata-rata Skor",
          data: data.map((d) => d.rataRata),
          backgroundColor: data.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
          borderRadius: 8,
          maxBarThickness: 26
        }
      ]
    }),
    [data]
  );

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        callbacks: {
          title: (items: any[]) => data[items[0]?.dataIndex ?? 0]?.label ?? ""
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 5,
        ticks: { color: colors.text, stepSize: 1 },
        grid: { color: colors.grid }
      },
      y: { ticks: { color: colors.text }, grid: { display: false } }
    }
  };

  return (
    <ChartCard
      title="Rata-rata Tiap Pertanyaan"
      description="Skor rata-rata Q1 sampai Q7 (skala 1-5)"
      className="lg:col-span-2"
    >
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
      <ul className="mt-4 grid gap-1.5 text-xs text-ink-soft dark:text-nightforest-text/60 sm:grid-cols-2">
        {data.map((d) => (
          <li key={d.id}>
            <span className="font-semibold text-ink dark:text-nightforest-text">
              {d.id.toUpperCase()}:
            </span>{" "}
            {d.label}
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
