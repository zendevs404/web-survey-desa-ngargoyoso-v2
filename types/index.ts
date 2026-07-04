export type JenisKelamin = "Laki-laki" | "Perempuan" | "";

export interface DataDiri {
  nama: string;
  usia: string;
  asalDesa: string;
  karangTaruna: string;
  karangTarunaLainnya: string;
  jenisKelamin: JenisKelamin;
}

export interface JawabanKuesioner {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  saran: string;
}

export interface SurveyPayload {
  timestamp: string;
  nama: string;
  usia: string;
  asal: string;
  karang_taruna: string;
  jenis_kelamin: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  saran: string;
}

export const DAFTAR_DESA = [
  "Ngargoyoso",
  "Kemuning",
  "Berjo",
  "Segorogunung",
  "Puntukrejo",
  "Girimulyo",
  "Jatirejo"
] as const;

/** Opsi "Lainnya" pada pilihan Karang Taruna. */
export const OPSI_KARANG_TARUNA_LAINNYA = "Lainnya";

/** Daftar Karang Taruna per desa, ditambah opsi "Lainnya" di akhir. */
export const DAFTAR_KARANG_TARUNA = [
  ...DAFTAR_DESA.map((desa) => `Karang Taruna ${desa}`),
  OPSI_KARANG_TARUNA_LAINNYA
] as const;

/* ========================================================================
 * BATCH 2 — Dashboard Analytics, AI Overview & Chatbot
 * Tipe tambahan di bawah ini murni menambah (tidak mengubah) tipe Batch 1
 * di atas, agar seluruh kontrak data form/kuesioner tetap sama persis.
 * ==================================================================== */

/** Satu baris data mentah sebagaimana tersimpan di Google Sheets. */
export interface SurveyRow {
  timestamp: string;
  nama: string;
  usia: string | number;
  asal: string;
  karang_taruna: string;
  jenis_kelamin: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  saran: string;
}

/** Bentuk respons doGet() pada Google Apps Script. */
export interface SurveyApiResponse {
  status: "success" | "error";
  data?: SurveyRow[];
  message?: string;
}

export interface HitungAsal {
  nama: string;
  jumlah: number;
}

export interface HitungUsia {
  kelompok: string;
  jumlah: number;
}

export interface HitungPertanyaan {
  id: keyof JawabanKuesioner;
  label: string;
  rataRata: number;
}

export interface HitungTren {
  tanggal: string;
  jumlah: number;
}

export interface KataFrekuensi {
  kata: string;
  jumlah: number;
}

export interface DashboardStats {
  totalResponden: number;
  rataRataKeseluruhan: number;
  jumlahDesa: number;
  jumlahKarangTaruna: number;
  persentaseKepuasan: number;
  distribusiDesa: HitungAsal[];
  distribusiKarangTaruna: HitungAsal[];
  distribusiGender: { label: string; jumlah: number }[];
  distribusiUsia: HitungUsia[];
  rataPerPertanyaan: HitungPertanyaan[];
  trenPengisian: HitungTren[];
  kataKunciSaran: KataFrekuensi[];
  desaPalingAktif: string | null;
  karangTarunaPalingAktif: string | null;
  /** Rata-rata jumlah responden per Karang Taruna yang terlibat. */
  rataRespondenPerKarangTaruna: number;
  kelompokUsiaPalingAktif: string | null;
}

export interface AIInsight {
  ringkasanUmum: string;
  temuanUtama: string[];
  rekomendasi: string[];
}

export const DAFTAR_PERTANYAAN: { id: keyof JawabanKuesioner; label: string }[] = [
  {
    id: "q1",
    label:
      "Saya memahami cara mengelola dan mengorganisasikan desa wisata setelah mengikuti program ini"
  },
  {
    id: "q2",
    label: "Saya memahami pentingnya melibatkan masyarakat dalam pengelolaan desa wisata"
  },
  {
    id: "q3",
    label: "Saya memahami strategi promosi desa wisata yang dibagikan narasumber"
  },
  {
    id: "q4",
    label:
      "Saya memahami tantangan yang biasa dihadapi dalam mengelola desa wisata dan cara mengatasinya"
  },
  {
    id: "q5",
    label: "Narasumber menyampaikan pengalaman dan materi dengan jelas"
  },
  {
    id: "q6",
    label: "Saya merasa termotivasi untuk terlibat dalam pengembangan wisata di desa saya"
  },
  {
    id: "q7",
    label: "Program ini bermanfaat bagi saya sebagai anggota karang taruna"
  }
];
