"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSurveyData } from "@/lib/useSurveyData";
import type { SurveyRow } from "@/types";

interface SurveyDataContextValue {
  rows: SurveyRow[];
  loading: boolean;
  error: string | null;
  isDemoData: boolean;
  lastUpdated: Date | null;
  refresh: () => void;
}

const SurveyDataContext = createContext<SurveyDataContextValue | undefined>(undefined);

/** Membungkus Dashboard Analytics + AI Overview agar keduanya berbagi satu polling data. */
export function SurveyDataProvider({ children }: { children: ReactNode }) {
  const value = useSurveyData();
  return <SurveyDataContext.Provider value={value}>{children}</SurveyDataContext.Provider>;
}

export function useSurveyDataContext(): SurveyDataContextValue {
  const ctx = useContext(SurveyDataContext);
  if (!ctx) {
    throw new Error("useSurveyDataContext must be used within SurveyDataProvider");
  }
  return ctx;
}
