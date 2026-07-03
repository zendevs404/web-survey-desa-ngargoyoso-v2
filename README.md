# Kuesioner Desa Wisata Ngargoyoso

Website survei/kuesioner evaluasi peserta program edukasi tata kelola desa wisata
**Desa Ngargoyoso, Karanganyar**. Dibangun dengan Next.js 14 (App Router), TypeScript,
dan Tailwind CSS.

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
