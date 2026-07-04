export const GREETING =
  "Halo! Saya asisten virtual seputar program Desa Wisata Ngargoyoso. Silakan pilih topik di bawah, atau ketik pertanyaan Anda.";

export const FALLBACK_ANSWER =
  "Terima kasih atas pertanyaannya. Saat ini saya hanya dapat membantu topik yang berkaitan dengan desa wisata, tata kelola wisata, UMKM, Karang Taruna, dan pemberdayaan masyarakat.";

/** FAQ Pintar bawaan — daftar lengkap pertanyaan yang bisa dijawab chatbot. */
export const FAQ_SUGGESTIONS: string[] = [
  "Apa itu desa wisata?",
  "Apa manfaat desa wisata?",
  "Bagaimana cara mempromosikan desa wisata?",
  "Apa peran Karang Taruna dalam desa wisata?",
  "Mengapa partisipasi masyarakat penting?",
  "Apa manfaat QRIS bagi UMKM?",
  "Bagaimana meningkatkan kunjungan wisatawan?",
  "Apa itu Sapta Pesona?",
  "Apa itu wisata berkelanjutan?"
];

/**
 * Tombol saran cepat yang ditampilkan di panel chat.
 * Sengaja dibuat singkat dan sedikit (bukan seluruh FAQ_SUGGESTIONS)
 * supaya tidak memakan banyak ruang vertikal dan menutupi area jawaban.
 * Teks tombol tetap dikenali matcher lewat keyword/synonym matching,
 * jadi tetap mengarah ke jawaban yang sama seperti pertanyaan lengkapnya.
 */
export const QUICK_SUGGESTIONS: string[] = [
  "Apa itu desa wisata?",
  "Manfaat desa wisata",
  "Cara promosi wisata",
  "Peran Karang Taruna",
  "Manfaat QRIS UMKM",
  "Apa itu Sapta Pesona?"
];
