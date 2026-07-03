import { DAFTAR_DESA, DAFTAR_PERTANYAAN } from "@/types";
import type {
  DashboardStats,
  HitungAsal,
  JawabanKuesioner,
  KataFrekuensi,
  SurveyRow
} from "@/types";

const DESA_SET = new Set<string>(DAFTAR_DESA as readonly string[]);

const QUESTION_IDS: (keyof JawabanKuesioner)[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

const STOPWORDS = new Set([
  "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "ini", "itu", "saya",
  "kami", "kita", "adalah", "agar", "atau", "juga", "lebih", "lagi", "akan",
  "pada", "para", "ada", "tidak", "sudah", "belum", "bisa", "harus", "sangat",
  "supaya", "dalam", "sebagai", "oleh", "karena", "jadi", "saja", "masih",
  "terus", "semua", "banyak", "cukup", "baik", "bagus", "acara", "program",
  "nya", "yg", "utk", "dgn", "the", "and", "to", "a", "an"
]);

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function toNumberUsia(usia: string | number): number {
  const n = typeof usia === "number" ? usia : parseInt(usia, 10);
  return Number.isFinite(n) ? n : 0;
}

function kelompokUsia(usia: number): string {
  if (usia < 17) return "<17";
  if (usia <= 20) return "17-20";
  if (usia <= 25) return "21-25";
  return ">25";
}

function tallyToArray(map: Map<string, number>): HitungAsal[] {
  return Array.from(map.entries())
    .map(([nama, jumlah]) => ({ nama, jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah);
}

function formatTanggal(timestamp: string): string {
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return "Tidak diketahui";
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Mengubah data mentah spreadsheet menjadi seluruh metrik yang dibutuhkan
 * oleh kartu ringkasan, chart, dan AI Overview.
 */
export function computeDashboardStats(rows: SurveyRow[]): DashboardStats {
  const totalResponden = rows.length;

  const desaMap = new Map<string, number>();
  const karangTarunaMap = new Map<string, number>();
  const genderMap = new Map<string, number>();
  const usiaMap = new Map<string, number>(
    ["<17", "17-20", "21-25", ">25"].map((k) => [k, 0])
  );
  const trenMap = new Map<string, number>();
  const wordMap = new Map<string, number>();

  let totalSkorSemua = 0;
  let totalJawabanSemua = 0;
  let respondenPuas = 0;

  const sumPerPertanyaan: Record<string, number> = {};
  const countPerPertanyaan: Record<string, number> = {};
  QUESTION_IDS.forEach((id) => {
    sumPerPertanyaan[id] = 0;
    countPerPertanyaan[id] = 0;
  });

  for (const row of rows) {
    const asal = (row.asal ?? "").toString().trim();
    if (asal) {
      if (DESA_SET.has(asal)) {
        desaMap.set(asal, (desaMap.get(asal) ?? 0) + 1);
      } else {
        karangTarunaMap.set(asal, (karangTarunaMap.get(asal) ?? 0) + 1);
      }
    }

    const gender = (row.jenis_kelamin ?? "").toString().trim() || "Tidak diisi";
    genderMap.set(gender, (genderMap.get(gender) ?? 0) + 1);

    const kelompok = kelompokUsia(toNumberUsia(row.usia));
    usiaMap.set(kelompok, (usiaMap.get(kelompok) ?? 0) + 1);

    const tanggal = formatTanggal(row.timestamp);
    trenMap.set(tanggal, (trenMap.get(tanggal) ?? 0) + 1);

    let skorRespondenIni = 0;
    let jumlahJawabanRespondenIni = 0;
    QUESTION_IDS.forEach((id) => {
      const nilai = Number(row[id]);
      if (Number.isFinite(nilai) && nilai > 0) {
        sumPerPertanyaan[id] += nilai;
        countPerPertanyaan[id] += 1;
        totalSkorSemua += nilai;
        totalJawabanSemua += 1;
        skorRespondenIni += nilai;
        jumlahJawabanRespondenIni += 1;
      }
    });

    if (jumlahJawabanRespondenIni > 0 && skorRespondenIni / jumlahJawabanRespondenIni >= 4) {
      respondenPuas += 1;
    }

    const saran = (row.saran ?? "").toString().toLowerCase();
    saran
      .replace(/[^a-z0-9\sà-ú]/gi, " ")
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
      .forEach((w) => wordMap.set(w, (wordMap.get(w) ?? 0) + 1));
  }

  const rataPerPertanyaan = DAFTAR_PERTANYAAN.map(({ id, label }) => ({
    id,
    label,
    rataRata: countPerPertanyaan[id] > 0 ? round1(sumPerPertanyaan[id] / countPerPertanyaan[id]) : 0
  }));

  const distribusiDesa = tallyToArray(desaMap);
  const distribusiKarangTaruna = tallyToArray(karangTarunaMap);

  const trenPengisian = Array.from(trenMap.entries())
    .map(([tanggal, jumlah]) => ({ tanggal, jumlah }))
    .sort((a, b) => {
      const da = new Date(a.tanggal.replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3"));
      const db = new Date(b.tanggal.replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3"));
      return da.getTime() - db.getTime();
    });

  const kataKunciSaran: KataFrekuensi[] = Array.from(wordMap.entries())
    .map(([kata, jumlah]) => ({ kata, jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 30);

  const distribusiUsia = ["<17", "17-20", "21-25", ">25"].map((kelompok) => ({
    kelompok,
    jumlah: usiaMap.get(kelompok) ?? 0
  }));

  const distribusiGender = Array.from(genderMap.entries()).map(([label, jumlah]) => ({
    label,
    jumlah
  }));

  return {
    totalResponden,
    rataRataKeseluruhan: totalJawabanSemua > 0 ? round1(totalSkorSemua / totalJawabanSemua) : 0,
    jumlahDesa: distribusiDesa.length,
    jumlahKarangTaruna: distribusiKarangTaruna.length,
    persentaseKepuasan:
      totalResponden > 0 ? Math.round((respondenPuas / totalResponden) * 100) : 0,
    distribusiDesa,
    distribusiKarangTaruna,
    distribusiGender,
    distribusiUsia,
    rataPerPertanyaan,
    trenPengisian,
    kataKunciSaran,
    desaPalingAktif: distribusiDesa[0]?.nama ?? null,
    kelompokUsiaPalingAktif:
      distribusiUsia.slice().sort((a, b) => b.jumlah - a.jumlah)[0]?.jumlah
        ? distribusiUsia.slice().sort((a, b) => b.jumlah - a.jumlah)[0].kelompok
        : null
  };
}

/**
 * Dataset contoh yang realistis, hanya dipakai sebagai fallback ketika
 * NEXT_PUBLIC_GAS_URL belum dikonfigurasi atau endpoint belum bisa diakses,
 * supaya tampilan dashboard tetap dapat ditinjau selama pengembangan/demo.
 */
export function generateDemoRows(): SurveyRow[] {
  const desaSample = ["Ngargoyoso", "Kemuning", "Berjo", "Segorogunung", "Puntukrejo"];
  const ktSample = [
    "KT Tunas Muda Ngargoyoso",
    "KT Karya Bhakti Kemuning",
    "KT Mekar Sari Berjo",
    "KT Bina Remaja Puntukrejo"
  ];
  const saranSample = [
    "Sesi praktik lapangan sebaiknya diperbanyak agar lebih memahami pengelolaan wisata",
    "Studi kasus desa wisata lain akan sangat membantu sebagai referensi",
    "Materi promosi digital sangat bermanfaat, lanjutkan program ini",
    "Perlu pelatihan lanjutan tentang pengelolaan homestay dan kuliner lokal",
    "Keterlibatan karang taruna perlu ditingkatkan lagi pada kegiatan berikutnya",
    "Narasumber menyampaikan materi dengan jelas dan mudah dipahami",
    "Waktu pelatihan terasa singkat, mohon durasi ditambah",
    "Terima kasih, program ini membuka wawasan baru tentang desa wisata"
  ];

  const rows: SurveyRow[] = [];
  const now = Date.now();
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let i = 0; i < 64; i += 1) {
    const pakaiDesa = rand() > 0.35;
    const asal = pakaiDesa
      ? desaSample[Math.floor(rand() * desaSample.length)]
      : ktSample[Math.floor(rand() * ktSample.length)];
    const usia = 15 + Math.floor(rand() * 20);
    const gender = rand() > 0.48 ? "Laki-laki" : "Perempuan";
    const hariLalu = Math.floor(rand() * 21);
    const timestamp = new Date(now - hariLalu * 86400000).toISOString();
    const skorDasar = 3 + rand() * 2;

    const jawab = () => Math.min(5, Math.max(1, Math.round(skorDasar + (rand() - 0.5) * 1.6)));

    rows.push({
      timestamp,
      nama: `Peserta ${i + 1}`,
      usia,
      asal,
      jenis_kelamin: gender,
      q1: jawab(),
      q2: jawab(),
      q3: jawab(),
      q4: jawab(),
      q5: jawab(),
      q6: jawab(),
      q7: jawab(),
      saran: rand() > 0.3 ? saranSample[Math.floor(rand() * saranSample.length)] : ""
    });
  }

  return rows;
}
