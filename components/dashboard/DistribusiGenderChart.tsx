"use client";

import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { ensureChartsRegistered, getChartThemeColors } from "@/lib/chartTheme";
import { useTheme } from "@/lib/theme-provider";

ensureChartsRegistered();

interface DistribusiGenderChartProps {
  data: { label: string; jumlah: number }[];
}

const GENDER_COLORS: Record<string, string> = {
  "Laki-laki": "#1F4D3D",
  Perempuan: "#E3A857",
  "Tidak diisi": "#B8B2A0"
};

export default function DistribusiGenderChart({ data }: DistribusiGenderChartProps) {
  const { theme } = useTheme();
  const colors = getChartThemeColors(theme === "dark");
  const hasData = data.some((d) => d.jumlah > 0);

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.label),
      datasets: [
        {
          data: data.map((d) => d.jumlah),
          backgroundColor: data.map((d) => GENDER_COLORS[d.label] ?? "#6B9071"),
          borderColor: theme === "dark" ? "#152820" : "#FBF8F1",
          borderWidth: 2
        }
      ]
    }),
    [data, theme]
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
    <ChartCard title="Distribusi Gender" description="Perbandingan responden laki-laki dan perempuan">
      <div className="h-64">
        {hasData ? (
          <Pie data={chartData} options={options} />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-ink-soft dark:text-nightforest-text/60">
            Belum ada data.
          </p>
        )}
      </div>
    </ChartCard>
  );
}
