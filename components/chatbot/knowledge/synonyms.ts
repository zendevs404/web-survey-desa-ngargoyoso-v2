/**
 * Kamus sinonim untuk Synonym Matching.
 * Key = kata kunci kanonik (yang dipakai di knowledgeBase.ts),
 * Value = daftar variasi/sinonim yang mungkin diketik pengguna.
 *
 * Contoh: "cara promosi wisata", "bagaimana memasarkan wisata",
 * "tips marketing desa wisata" -> semua akan diarahkan ke kata kunci
 * kanonik "promosi" karena "memasarkan", "marketing", "pasarkan"
 * terdaftar sebagai sinonim.
 *
 * Modular: tinggal tambah entri baru di sini tanpa mengubah logic matcher.
 */
export const SYNONYM_MAP: Record<string, string[]> = {
  "desa wisata": ["kampung wisata", "wisata desa", "desa wisata itu apa"],
  promosi: [
    "memasarkan",
    "pasarkan",
    "marketing",
    "pemasaran",
    "mengenalkan wisata",
    "mempromosikan",
    "iklan wisata"
  ],
  "media sosial": ["medsos", "sosmed", "instagram", "tiktok", "facebook", "sosial media"],
  "digital marketing": ["pemasaran digital", "marketing online", "promosi online", "promosi digital"],
  partisipasi: ["keterlibatan", "gotong royong", "ikut serta", "andil warga", "peran warga"],
  pemberdayaan: ["capacity building", "pengembangan kapasitas", "penguatan masyarakat"],
  umkm: ["usaha mikro", "usaha kecil", "pelaku usaha", "produk lokal", "usaha rumahan"],
  qris: ["pembayaran digital", "cashless", "non tunai", "scan barcode", "bayar digital", "quick response code"],
  berkelanjutan: ["sustainable", "ramah lingkungan", "lestari", "ekowisata"],
  destinasi: ["objek wisata", "tempat wisata", "spot wisata", "lokasi wisata"],
  event: ["acara", "festival", "kegiatan desa", "agenda wisata"],
  branding: ["identitas", "citra desa", "brand image", "ciri khas desa"],
  "karang taruna": ["pemuda desa", "generasi muda desa", "organisasi pemuda"],
  kunjungan: ["wisatawan", "pengunjung", "traffic wisata", "jumlah tamu"],
  pelayanan: ["service", "keramahan", "kualitas layanan"],
  "ekonomi kreatif": ["produk kreatif", "industri kreatif", "kerajinan lokal"],
  edukasi: ["penyuluhan", "sosialisasi", "pelatihan warga", "pembelajaran masyarakat"],
  "pengabdian masyarakat": ["kkn", "program pengabdian", "community service"],
  "tata kelola": ["manajemen", "pengelolaan", "governance", "cara mengelola"]
};

/**
 * Mengembalikan daftar kata kunci kanonik yang "dipicu" oleh token
 * pengguna, berdasarkan kamus sinonim di atas.
 */
export function expandWithSynonyms(normalizedMessage: string): string[] {
  const triggered: string[] = [];
  for (const [canonical, variants] of Object.entries(SYNONYM_MAP)) {
    if (variants.some((v) => normalizedMessage.includes(v))) {
      triggered.push(canonical);
    }
  }
  return triggered;
}
