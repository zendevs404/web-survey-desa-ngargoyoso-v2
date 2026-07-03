import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";

let registered = false;

/** Mendaftarkan seluruh komponen Chart.js sekali saja (hindari duplikasi). */
export function ensureChartsRegistered() {
  if (registered) return;
  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  registered = true;
}

/** Palet warna khas identitas Desa Ngargoyoso (forest / turmeric / clay / moss). */
export const CHART_PALETTE = [
  "#1F4D3D", // forest
  "#E3A857", // turmeric
  "#B85C32", // clay
  "#6B9071", // moss
  "#4B8F63", // forest-400
  "#C8873A", // turmeric-dark
  "#D68159", // clay-light
  "#77AB89", // forest-300
  "#9DBBA0", // moss-light
  "#8F441F" // clay-dark
];

export function withAlpha(hex: string, alpha: number): string {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface ChartThemeColors {
  text: string;
  grid: string;
  tooltipBg: string;
  tooltipText: string;
}

export function getChartThemeColors(isDark: boolean): ChartThemeColors {
  return isDark
    ? {
        text: "#F3EFE4",
        grid: "rgba(243, 239, 228, 0.1)",
        tooltipBg: "#152820",
        tooltipText: "#F3EFE4"
      }
    : {
        text: "#4A4E42",
        grid: "rgba(35, 38, 31, 0.08)",
        tooltipBg: "#FFFFFF",
        tooltipText: "#23261F"
      };
}
