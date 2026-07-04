"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface SearchableSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  searchPlaceholder?: string;
  hasError?: boolean;
  emptyMessage?: string;
}

/**
 * Dropdown select dengan kotak pencarian di dalamnya, dibangun tanpa
 * dependensi eksternal agar tetap ringan dan konsisten dengan gaya
 * input lain pada form. Mendukung navigasi keyboard dasar dan klik di
 * luar untuk menutup panel.
 */
export default function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Pilih salah satu",
  searchPlaceholder = "Cari...",
  hasError = false,
  emptyMessage = "Tidak ada pilihan yang cocok."
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl border bg-white/70 dark:bg-white/5 px-4 py-3 text-left text-sm outline-none transition-colors duration-200 focus:border-forest-400 ${
          hasError ? "border-clay" : "border-black/10 dark:border-white/15"
        }`}
      >
        <span className={value ? "text-ink dark:text-nightforest-text" : "text-ink-soft/70 dark:text-nightforest-text/50"}>
          {value || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`ml-2 shrink-0 text-ink-soft transition-transform duration-200 dark:text-nightforest-text/60 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-soft-lg dark:border-white/15 dark:bg-nightforest-surface">
          <div className="border-b border-black/10 p-2 dark:border-white/10">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:border-forest-400 dark:border-white/15 dark:bg-white/5 dark:text-nightforest-text"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === opt}
                    onClick={() => handleSelect(opt)}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-forest-50 dark:hover:bg-nightforest-surface2 ${
                      value === opt
                        ? "bg-forest-50 font-semibold text-forest-700 dark:bg-nightforest-surface2 dark:text-turmeric-light"
                        : "text-ink dark:text-nightforest-text"
                    }`}
                  >
                    {opt}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-ink-soft dark:text-nightforest-text/60">
                {emptyMessage}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
