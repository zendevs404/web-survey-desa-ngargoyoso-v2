import type { GuardrailTopic } from "./types";

/**
 * Topik yang SAMA SEKALI di luar ruang lingkup chatbot.
 * Jika salah satu kata kunci ini terdeteksi, chatbot TIDAK menjawab
 * pertanyaannya dan langsung menampilkan OFF_TOPIC_ANSWER.
 * Modular: tambah kategori/kata kunci baru cukup dengan menambah array ini.
 */
export const OFF_TOPIC_TOPICS: GuardrailTopic[] = [
  { category: "Politik", keywords: ["politik", "pilpres", "pilkada", "capres", "partai politik", "pemilu", "presiden", "gubernur", "dpr"] },
  { category: "Agama", keywords: ["agama", "keyakinan", "ibadah", "kitab suci", "ceramah agama"] },
  { category: "SARA", keywords: ["sara", "suku bangsa", "ras tertentu", "antar agama", "diskriminasi suku"] },
  { category: "Konflik sosial", keywords: ["konflik sosial", "bentrok warga", "tawuran", "kerusuhan"] },
  { category: "Konten dewasa", keywords: ["konten dewasa", "pornografi", "video dewasa", "asusila"] },
  { category: "Kekerasan", keywords: ["kekerasan", "pembunuhan", "penganiayaan", "kdrt", "senjata tajam"] },
  { category: "Investasi", keywords: ["investasi", "reksadana", "trading forex", "instrumen investasi"] },
  { category: "Kripto", keywords: ["kripto", "cryptocurrency", "bitcoin", "koin digital", "nft"] },
  { category: "Saham", keywords: ["saham", "bursa efek", "ihsg", "trading saham"] },
  { category: "Pinjaman", keywords: ["pinjaman online", "pinjol", "kredit bank", "cicilan", "utang piutang"] },
  { category: "Hacking", keywords: ["hacking", "hack akun", "bobol sistem", "peretasan", "cracking password"] },
  { category: "Pemrograman", keywords: ["pemrograman", "coding", "bahasa pemrograman", "javascript", "python script"] },
  { category: "Kesehatan", keywords: ["obat", "resep dokter", "gejala penyakit", "vaksin", "keluhan sakit"] },
  { category: "Diagnosa penyakit", keywords: ["diagnosa", "diagnosis penyakit", "saya sakit apa", "ciri ciri penyakit"] },
  { category: "Konsultasi hukum", keywords: ["konsultasi hukum", "pasal pidana", "gugatan", "somasi", "tuntutan hukum"] },
  { category: "Berita politik", keywords: ["berita politik", "kabinet", "menteri", "presiden terpilih"] }
];

/**
 * Topik sensitif/kontroversial yang MASIH berkaitan dengan desa wisata
 * tapi berpotensi memicu perdebatan (mis. sengketa lahan, korupsi dana desa).
 * Chatbot tidak memberi opini, hanya mengarahkan kembali ke topik edukasi.
 */
export const SENSITIVE_TOPICS: GuardrailTopic[] = [
  {
    category: "Sensitif/Kontroversial",
    keywords: [
      "korupsi",
      "sengketa lahan",
      "sengketa tanah",
      "konflik warga",
      "pro kontra",
      "kontroversi",
      "demo warga",
      "protes warga",
      "isu sensitif",
      "siapa yang salah",
      "pendapat pribadi anda",
      "menurut kamu siapa",
      "menurutmu siapa",
      "menurut anda siapa"
    ]
  }
];

export const OFF_TOPIC_ANSWER =
  "Maaf, saya hanya dapat membantu pertanyaan yang berkaitan dengan desa wisata, tata kelola wisata, pemberdayaan masyarakat, Karang Taruna, UMKM, dan program edukasi yang tersedia pada website ini.";

export const SENSITIVE_ANSWER =
  "Topik tersebut bersifat sensitif dan saya tidak dapat memberikan opini mengenainya. Sebagai asisten edukasi, saya lebih senang membantu Anda memahami tata kelola desa wisata, pemberdayaan masyarakat, UMKM, atau peran Karang Taruna. Ada yang ingin ditanyakan seputar topik tersebut?";

function matches(normalized: string, topics: GuardrailTopic[]): boolean {
  return topics.some((t) => t.keywords.some((kw) => normalized.includes(kw)));
}

export function isOffTopic(normalized: string): boolean {
  return matches(normalized, OFF_TOPIC_TOPICS);
}

export function isSensitive(normalized: string): boolean {
  return matches(normalized, SENSITIVE_TOPICS);
}
