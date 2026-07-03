"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ANALYTICS_CONFIG, GOOGLE_APPS_SCRIPT_URL } from "@/config/googleAppsScript";
import { generateDemoRows } from "@/lib/analytics";
import type { SurveyApiResponse, SurveyRow } from "@/types";

interface UseSurveyDataResult {
  rows: SurveyRow[];
  loading: boolean;
  error: string | null;
  isDemoData: boolean;
  lastUpdated: Date | null;
  refresh: () => void;
}

const isConfigured =
  !!GOOGLE_APPS_SCRIPT_URL &&
  !GOOGLE_APPS_SCRIPT_URL.includes("PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_DI_SINI");

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { method: "GET", cache: "no-store", signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Mengambil data responden secara realtime dari Google Apps Script.
 * Melakukan polling berkala + tombol refresh manual. Jika endpoint belum
 * dikonfigurasi atau gagal diakses, dashboard tetap dapat ditinjau dengan
 * data contoh (ditandai jelas melalui `isDemoData`).
 */
export function useSurveyData(): UseSurveyDataResult {
  const [rows, setRows] = useState<SurveyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoData, setIsDemoData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const demoCache = useRef<SurveyRow[] | null>(null);

  const load = useCallback(async () => {
    if (!isConfigured) {
      if (!demoCache.current) demoCache.current = generateDemoRows();
      setRows(demoCache.current);
      setIsDemoData(true);
      setError(null);
      setLoading(false);
      setLastUpdated(new Date());
      return;
    }

    try {
      const res = await fetchWithTimeout(GOOGLE_APPS_SCRIPT_URL, ANALYTICS_CONFIG.timeoutMs);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json: SurveyApiResponse = await res.json();
      if (json.status !== "success" || !Array.isArray(json.data)) {
        throw new Error(json.message ?? "Format respons tidak sesuai");
      }
      setRows(json.data);
      setIsDemoData(false);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[useSurveyData] Gagal mengambil data realtime, menampilkan data contoh.", err);
      if (!demoCache.current) demoCache.current = generateDemoRows();
      setRows(demoCache.current);
      setIsDemoData(true);
      setError(err instanceof Error ? err.message : "Gagal memuat data");
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, ANALYTICS_CONFIG.pollingIntervalMs);
    return () => clearInterval(interval);
  }, [load]);

  const refresh = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  return { rows, loading, error, isDemoData, lastUpdated, refresh };
}
