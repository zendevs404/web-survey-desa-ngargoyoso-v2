"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { ensureChartsRegistered, getChartThemeColors } from "@/lib/chartTheme";
import { useTheme } from "@/lib/theme-provider";
import type { HitungUsia } from "@/types";

ensureChartsRegistered();

interface DistribusiUsiaChartProps {
  data: HitungUsia[];
}

export default function DistribusiUsiaChart({ data }: DistribusiUsiaChartProps) {
  const { theme } = useTheme();
  const colors = getChartThemeColors(theme === "dark");
  const hasData = data.some((d) => d.jumlah > 0);

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.kelompok),
      datasets: [
        {
          label: "Jumlah Responden",
          data: data.map((d) => d.jumlah),
          backgroundColor: "#4B8F63",
          borderRadius: 10,
          maxBarThickness: 56
        }
      ]
    }),
    [data]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipText, bodyColor: colors.tooltipText }
    },
    scales: {
      x: { ticks: { color: colors.text }, grid: { display: false } },
      y: {
        ticks: { color: colors.text, precision: 0 },
        grid: { color: colors.grid },
        beginAtZero: true
      }
    }
  };

  return (
    <ChartCard title="Distribusi Usia" description="Kelompok usia: <17, 17-20, 21-25, >25 tahun">
      <div className="h-64">
        {hasData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-ink-soft dark:text-nightforest-text/60">
            Belum ada data.
          </p>
        )}
      </div>
    </ChartCard>
  );
}
