"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <path
        d="M14 9V6.5c0-.83.67-1.5 1.5-1.5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5V9H7v3h3v10h4V12h2.8l.7-3H14Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <>
        <path d="M22 8.5s-.2-1.6-.85-2.3c-.8-.9-1.7-.9-2.1-1C16 5 12 5 12 5h0s-4 0-7.05.2c-.4.1-1.3.1-2.1 1C2.2 6.9 2 8.5 2 8.5S1.8 10.3 1.8 12.1v1.7c0 1.8.2 3.6.2 3.6s.2 1.6.85 2.3c.8.9 1.85.85 2.3.95C6.6 20.9 12 21 12 21s4-.05 7.05-.25c.4-.1 1.3-.1 2.1-1 .65-.7.85-2.3.85-2.3s.2-1.8.2-3.6v-1.7C22.2 10.3 22 8.5 22 8.5Z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 15.2V8.8l5.5 3.2-5.5 3.2Z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  }
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative overflow-hidden bg-forest-800 text-white">
        <div className="terrace-texture absolute inset-x-0 bottom-0 h-32 opacity-10" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest-400 to-turmeric text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2 4 8v13h6v-6h4v6h6V8l-8-6Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="font-display text-lg font-semibold tracking-tight">
                  Desa Ngargoyoso
                </span>
              </Link>
              <p className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                Belajar Tata Kelola Desa Wisata Desa Ngargoyoso, Karanganyar dari Pengalaman Nyata
              </p>
              <p className="mt-3 text-sm text-white/70">
                Powered by: Karang Taruna &amp; Tim Pengabdian Masyarakat Universitas Gadjah Mada
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
            <p className="text-center text-xs text-white/60 sm:text-left">
              &copy; {new Date().getFullYear()} Desa Ngargoyoso, Karanganyar. Seluruh hak cipta dilindungi.
              <span className="mx-1.5 text-white/30">&bull;</span>
              Made by ZenDevs with <span aria-label="love" role="img">&hearts;</span>
            </p>
            <nav className="flex gap-5 text-xs text-white/70">
              <Link href="/#beranda" className="transition-colors hover:text-white">
                Beranda
              </Link>
              <Link href="/kuesioner" className="transition-colors hover:text-white">
                Kuesioner
              </Link>
              <Link href="/#dashboard" className="transition-colors hover:text-white">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas halaman"
        className={`fixed bottom-5 left-5 z-[55] flex h-11 w-11 items-center justify-center rounded-full glass-strong text-forest-700 shadow-soft transition-all duration-300 dark:text-turmeric-light sm:bottom-6 sm:left-6 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
