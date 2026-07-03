/**
 * Konfigurasi integrasi Google Apps Script.
 *
 * 1. Buat Google Apps Script Web App yang menerima POST request (doPost)
 *    dan menuliskan data ke Google Spreadsheet.
 * 2. Deploy sebagai Web App dengan akses "Anyone".
 * 3. Salin URL hasil deploy dan tempelkan di bawah, atau isi environment
 *    variable NEXT_PUBLIC_GAS_URL pada file .env.local.
 *
 * Contoh .env.local:
 * NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
 */

export const GOOGLE_APPS_SCRIPT_URL: string =
  process.env.NEXT_PUBLIC_GAS_URL ?? "https://script.google.com/macros/s/AKfycbzX0GsTh5na5VfTSH6aaGd5V6ttGAYD_ihpyBH78aXoNaUnE75rLOb6MSb8XxmgRL0RSw/exec";

export const SUBMIT_CONFIG = {
  /** Jumlah percobaan ulang jika request gagal */
  maxRetries: 3,
  /** Jeda awal antar percobaan (ms), akan bertambah (exponential backoff) */
  retryDelayMs: 800,
  /** Batas waktu tiap request (ms) */
  timeoutMs: 15000
};

export const ANALYTICS_CONFIG = {
  /** Interval polling data dashboard (ms) untuk efek "realtime". */
  pollingIntervalMs: 30000,
  /** Batas waktu tiap request (ms) */
  timeoutMs: 15000
};

/**
 * Contoh kode Google Apps Script (Code.gs) yang dapat digunakan di sisi server:
 *
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     data.timestamp,
 *     data.nama,
 *     data.usia,
 *     data.asal,
 *     data.jenis_kelamin,
 *     data.q1,
 *     data.q2,
 *     data.q3,
 *     data.q4,
 *     data.q5,
 *     data.q6,
 *     data.q7,
 *     data.saran
 *   ]);
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ status: "success" }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * // Ditambahkan pada Batch 2: endpoint baca data untuk Dashboard Analytics.
 * // Deploy ulang Web App yang sama (URL tetap sama, satu endpoint untuk
 * // baca [GET] dan tulis [POST]).
 * function doGet() {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
 *   const rows = sheet.getDataRange().getValues();
 *   const [header, ...body] = rows;
 *   const data = body
 *     .filter((row) => row.some((cell) => cell !== "" && cell !== null))
 *     .map((row) => {
 *       const obj = {};
 *       header.forEach((key, i) => { obj[key] = row[i]; });
 *       return obj;
 *     });
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ status: "success", data }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */
