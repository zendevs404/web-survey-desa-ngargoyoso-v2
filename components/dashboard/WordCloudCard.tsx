"use client";

import ChartCard from "./ChartCard";
import { CHART_PALETTE } from "@/lib/chartTheme";
import type { KataFrekuensi } from "@/types";

interface WordCloudCardProps {
  data: KataFrekuensi[];
}

function ukuranFont(jumlah: number, max: number, min: number): number {
  if (max === min) return 18;
  const scaled = (jumlah - min) / (max - min);
  return Math.round(13 + scaled * 26); // 13px - 39px
}

export default function WordCloudCard({ data }: WordCloudCardProps) {
  const top = data.slice(0, 24);
  const max = Math.max(...top.map((d) => d.jumlah), 1);
  const min = Math.min(...top.map((d) => d.jumlah), 1);

  return (
    <ChartCard
      title="Word Cloud"
      description="Kata yang paling sering muncul pada masukan & saran peserta"
      className="lg:col-span-2"
    >
      {top.length > 0 ? (
        <ul
          className="flex min-h-[14rem] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2 py-4"
          aria-label="Kata kunci paling sering muncul pada saran peserta"
        >
          {top.map((item, idx) => (
            <li
              key={item.kata}
              className="font-display font-semibold leading-none transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                fontSize: `${ukuranFont(item.jumlah, max, min)}px`,
                color: CHART_PALETTE[idx % CHART_PALETTE.length]
              }}
              title={`Muncul ${item.jumlah}x`}
            >
              {item.kata}
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex h-56 items-center justify-center text-sm text-ink-soft dark:text-nightforest-text/60">
          Belum ada masukan/saran yang dapat dianalisis.
        </p>
      )}
    </ChartCard>
  );
}
