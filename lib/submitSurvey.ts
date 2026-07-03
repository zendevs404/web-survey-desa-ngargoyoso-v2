import { GOOGLE_APPS_SCRIPT_URL, SUBMIT_CONFIG } from "@/config/googleAppsScript";
import type { SurveyPayload } from "@/types";

export class SurveySubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SurveySubmitError";
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Mengirim data kuesioner ke Google Apps Script Web App.
 * Menggunakan retry dengan exponential backoff apabila request gagal.
 */
export async function submitSurvey(payload: SurveyPayload): Promise<void> {
  if (
    !GOOGLE_APPS_SCRIPT_URL ||
    GOOGLE_APPS_SCRIPT_URL.includes("PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_DI_SINI")
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "[submitSurvey] NEXT_PUBLIC_GAS_URL belum dikonfigurasi. Lihat config/googleAppsScript.ts"
    );
  }

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= SUBMIT_CONFIG.maxRetries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(
        GOOGLE_APPS_SCRIPT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        },
        SUBMIT_CONFIG.timeoutMs
      );

      if (!response.ok) {
        throw new SurveySubmitError(`Server merespons dengan status ${response.status}`);
      }

      return;
    } catch (error) {
      lastError = error;
      if (attempt < SUBMIT_CONFIG.maxRetries) {
        await sleep(SUBMIT_CONFIG.retryDelayMs * attempt);
      }
    }
  }

  throw new SurveySubmitError(
    lastError instanceof Error
      ? `Gagal mengirim jawaban setelah ${SUBMIT_CONFIG.maxRetries} percobaan: ${lastError.message}`
      : `Gagal mengirim jawaban setelah ${SUBMIT_CONFIG.maxRetries} percobaan.`
  );
}
