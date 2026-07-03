"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { applyAccentColors, extractAccentColors } from "@/lib/colorExtractor";
import FloatingShapes from "./FloatingShapes";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/hero-image.webp";
    img.onload = () => {
      try {
        const colors = extractAccentColors(img);
        applyAccentColors(colors);
      } catch {
        // keep CSS fallback accent colors
      }
    };
  }, []);

  return (
    <section id="beranda" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/hero-image.webp"
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(var(--accent-1),0.78) 0%, rgba(var(--accent-1),0.55) 35%, rgba(var(--accent-1),0.82) 100%)"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      </div>

      <FloatingShapes />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-white">
        <span className="animate-fadeIn rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90">
          Program Edukasi Karang Taruna
        </span>

        <h1
          className="mt-6 animate-slideUp font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Belajar Tata Kelola Desa Wisata Desa Ngargoyoso, Karanganyar dari Pengalaman Nyata
        </h1>

        <p
          className="mt-6 max-w-2xl animate-slideUp text-balance text-base text-white/85 sm:text-lg"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          Program edukasi berbasis pengalaman nyata untuk meningkatkan pemahaman generasi muda
          mengenai pengelolaan desa wisata yang berkelanjutan.
        </p>

        <div
          className="mt-10 flex animate-slideUp flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <Link
            href="/kuesioner"
            className="group rounded-full bg-turmeric px-7 py-3.5 text-sm font-semibold text-forest-800 shadow-glow-turmeric transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
          >
            Isi Kuesioner
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/#dashboard"
            className="rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
          >
            Lihat Dashboard
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-white/70 animate-scrollHint">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Gulir</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
