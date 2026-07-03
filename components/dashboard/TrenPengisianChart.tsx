"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { ensureChartsRegistered, getChartThemeColors, withAlpha } from "@/lib/chartTheme";
import { useTheme } from "@/lib/theme-provider";
import type { HitungTren } from "@/types";

ensureChartsRegistered();

interface TrenPengisianChartProps {
  data: HitungTren[];
}

export default function TrenPengisianChart({ data }: TrenPengisianChartProps) {
  const { theme } = useTheme();
  const colors = getChartThemeColors(theme === "dark");

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.tanggal),
      datasets: [
        {
          label: "Jumlah Pengisian",
          data: data.map((d) => d.jumlah),
          borderColor: "#1F4D3D",
          backgroundColor: withAlpha("#1F4D3D", 0.18),
          pointBackgroundColor: "#E3A857",
          pointBorderColor: "#E3A857",
          pointRadius: 4,
          tension: 0.35,
          fill: true
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
      x: { ticks: { color: colors.text, maxRotation: 0, autoSkipPadding: 12 }, grid: { display: false } },
      y: { ticks: { color: colors.text, precision: 0 }, grid: { color: colors.grid }, beginAtZero: true }
    }
  };

  return (
    <ChartCard
      title="Tren Pengisian"
      description="Jumlah kuesioner masuk per tanggal submit"
      className="lg:col-span-2"
    >
      <div className="h-72">
        {data.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-ink-soft dark:text-nightforest-text/60">
            Belum ada data.
          </p>
        )}
      </div>
    </ChartCard>
  );
}
