# Kuesioner Desa Wisata Ngargoyoso

Website survei/kuesioner evaluasi peserta program edukasi tata kelola desa wisata
**Desa Ngargoyoso, Karanganyar**. Dibangun dengan Next.js 14 (App Router), TypeScript,
dan Tailwind CSS.

> Status: **Batch 2** — Dashboard Analytics realtime (Chart.js), AI Overview
> (rule-based insight otomatis), Chatbot floating (rule-based FAQ), Footer,
> dan optimasi performa (code splitting, lazy loading) telah ditambahkan di
> atas fondasi Batch 1 (landing page, navigasi, dark/light mode, form data
> diri, form kuesioner, integrasi pengiriman ke Google Apps Script) tanpa
> mengubah struktur maupun fitur yang sudah ada sebelumnya.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Mengganti Hero Image

Ganti file `public/hero-image.webp` dengan gambar hero pilihan Anda (gunakan nama
file yang sama). Warna aksen situs (gradient, tombol, elemen dekoratif) akan
**otomatis menyesuaikan** dengan warna dominan pada gambar tersebut berkat proses
ekstraksi warna di sisi klien (`lib/colorExtractor.ts`) — tidak perlu mengubah kode.

## Menghubungkan ke Google Apps Script

1. Buat Google Apps Script Web App (lihat contoh kode di
   `config/googleAppsScript.ts`) yang menerima POST request dan menuliskannya ke
   Google Spreadsheet.
2. **Batch 2:** tambahkan juga fungsi `doGet()` pada script yang sama (contoh
   lengkap ada di `config/googleAppsScript.ts`) agar Dashboard Analytics bisa
   membaca data secara realtime dari Sheet yang sama. Satu Web App URL dipakai
   untuk kedua arah: `POST` untuk mengirim jawaban baru, `GET` untuk membaca
   seluruh data.
3. Deploy sebagai Web App dengan akses **Anyone**, lalu salin URL yang dihasilkan.
4. Salin `.env.local.example` menjadi `.env.local`, lalu isi:

   ```
   NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
   ```

5. Restart `npm run dev` agar environment variable terbaca.

Pengiriman data menggunakan `fetch` dengan mekanisme **retry** (percobaan ulang
otomatis hingga 3 kali dengan backoff) dan **timeout**, lihat `lib/submitSurvey.ts`.

Selama `NEXT_PUBLIC_GAS_URL` belum diisi (atau endpoint sedang tidak bisa
diakses), Dashboard Analytics & AI Overview otomatis menampilkan **data
contoh** yang ditandai jelas dengan indikator kuning, sehingga tampilan tetap
bisa ditinjau kapan saja tanpa bergantung pada koneksi ke Google Sheets.

## Dashboard Analytics, AI Overview & Chatbot (Batch 2)

- **Dashboard Analytics** (`components/dashboard/`) — kartu ringkasan (total
  responden, rata-rata skor, jumlah desa, jumlah Karang Taruna, persentase
  kepuasan) + 6 chart Chart.js yang sepenuhnya responsif: distribusi
  responden (desa/Karang Taruna), distribusi gender, distribusi usia, rata-rata
  tiap pertanyaan (Q1–Q7), tren pengisian per tanggal, dan word cloud dari
  kolom saran. Data diambil melalui `lib/useSurveyData.ts` (polling tiap 30
  detik + tombol "Segarkan"), lalu diagregasi oleh `lib/analytics.ts`.
- **AI Overview** (`components/dashboard/AIOverview.tsx`) — ringkasan umum,
  temuan utama, dan rekomendasi dihasilkan otomatis dan deterministik dari
  data survei melalui `lib/aiInsights.ts` (rule-based, tanpa backend AI/LLM,
  sehingga selalu konsisten dan tidak memerlukan API key tambahan).
- **Chatbot floating** (`components/chatbot/`) — bubble di kanan bawah,
  panel chat modern, FAQ rule-based seputar tata kelola desa wisata, program
  kegiatan, manfaat desa wisata, promosi wisata, peran Karang Taruna, dan Desa
  Ngargoyoso (`faqData.ts`), lengkap dengan quick suggestion chips dan
  indikator mengetik.
- **Footer** (`components/Footer.tsx`) — tagline program, kredit "Powered by",
  placeholder sosial media, copyright dinamis, dan tombol Back to Top.

## Catatan Teknis Batch 2

Untuk menjaga seluruh struktur, styling, dan komponen Batch 1 tetap utuh,
Batch 2 melanjutkan dengan stack yang **sama** dengan Batch 1 (Next.js 14 App
Router, TypeScript, Tailwind CSS, komponen custom bertema glassmorphism) dan
hanya menambah dependensi minimal yang benar-benar dipakai:

- `chart.js` + `react-chartjs-2` untuk seluruh chart dashboard.
- Word cloud dibuat custom (tag-cloud responsif berbasis CSS) tanpa dependensi
  tambahan agar tetap ringan dan konsisten dengan desain glass yang sudah ada.
- Chart & chatbot di-*code split* memakai `next/dynamic` (`ssr: false`) agar
  tidak membebani bundle awal halaman.

Framer Motion, shadcn/ui, React Hook Form, dan Zod tidak ditambahkan karena
Batch 1 sudah memiliki solusi setara buatan sendiri (animasi CSS/Reveal,
komponen glass custom, validasi form native) — menambah library tersebut akan
menduplikasi fungsi yang sudah berjalan dan berisiko mengubah tampilan/perilaku
Batch 1. Beri tahu jika Anda tetap ingin migrasi eksplisit ke library tersebut.

## Struktur Proyek

```
app/
  layout.tsx          # Root layout, font, ThemeProvider, Navbar, Footer, Chatbot
  page.tsx             # Landing page (Hero + Dashboard + AI Overview + Tentang Program)
  globals.css          # Tema, glassmorphism, animasi
  kuesioner/page.tsx    # Alur multi-step: Data Diri -> Kuesioner -> Sukses
components/
  Navbar.tsx, ThemeToggle.tsx, Hero.tsx, AboutProgram.tsx, Footer.tsx
  FloatingShapes.tsx, Reveal.tsx, Counter.tsx
  form/                # DataDiriStep, KuesionerStep, RatingQuestion,
                        # PanduanPenilaian, StepIndicator, SuccessState, Confetti
  dashboard/            # SummaryCards, ChartCard, 6 chart component,
                        # DashboardSection, AIOverview
  chatbot/              # ChatbotWidget, faqData
lib/
  theme-provider.tsx   # Context dark/light mode + localStorage
  colorExtractor.ts    # Ekstraksi warna dominan dari hero-image.webp
  submitSurvey.ts       # Fetch + retry ke Google Apps Script (POST)
  useSurveyData.ts       # Fetch + polling realtime dari Google Apps Script (GET)
  SurveyDataProvider.tsx # Context berbagi data antar Dashboard & AI Overview
  analytics.ts            # Agregasi data mentah -> DashboardStats
  aiInsights.ts            # Rule-based AI Overview generator
  chartTheme.ts             # Registrasi Chart.js + palet warna & tema
config/
  googleAppsScript.ts   # URL, konfigurasi endpoint GAS (doPost + doGet)
types/
  index.ts              # Tipe data & daftar desa/pertanyaan + tipe dashboard
public/
  hero-image.webp        # Placeholder hero image (ganti sesuai kebutuhan)
  patterns/contour.svg    # Motif kontur terasering (elemen visual khas)
```

## Data yang Dikirim ke Google Apps Script

```json
{
  "timestamp": "2026-07-03T08:00:00.000Z",
  "nama": "…",
  "usia": "…",
  "asal": "…",
  "jenis_kelamin": "…",
  "q1": 1-5,
  "q2": 1-5,
  "q3": 1-5,
  "q4": 1-5,
  "q5": 1-5,
  "q6": 1-5,
  "q7": 1-5,
  "saran": "…"
}
```
