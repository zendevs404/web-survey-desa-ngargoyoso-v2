"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/#beranda", label: "Beranda" },
  { href: "/kuesioner", label: "Kuesioner" },
  { href: "/#dashboard", label: "Dashboard Analytics" },
  { href: "/#ai-overview", label: "AI Overview" },
  { href: "/#tentang-program", label: "Tentang Program" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const isActive = (href: string) => {
    if (href === "/kuesioner") return pathname === "/kuesioner";
    const hash = href.split("#")[1];
    if (!hash) return pathname === "/" && !activeHash;
    return pathname === "/" && activeHash === `#${hash}`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-2.5 glass shadow-glass mx-4 sm:mx-6 lg:mx-auto transition-all duration-500">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest-500 to-turmeric text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 4 8v13h6v-6h4v6h6V8l-8-6Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Desa Ngargoyoso
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-forest-700 dark:text-turmeric-light"
                  : "text-ink-soft dark:text-nightforest-text/70 hover:text-forest-600 dark:hover:text-turmeric-light"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-forest-500 to-turmeric" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 md:hidden"
          >
            <span
              className={`h-0.5 w-4.5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
              style={{ width: 18 }}
            />
            <span
              className={`h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
              style={{ width: 18 }}
            />
            <span
              className={`h-0.5 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
              style={{ width: 18 }}
            />
          </button>
        </div>
      </div>

      <div
        className={`mx-4 mt-2 overflow-hidden rounded-2xl glass-strong shadow-glass transition-all duration-400 ease-out md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-sm font-medium text-ink-soft dark:text-nightforest-text/80 transition-colors duration-200 active:bg-black/5 dark:active:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
