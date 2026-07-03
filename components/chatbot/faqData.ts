export interface FAQEntry {
  id: string;
  topic: string;
  keywords: string[];
  answer: string;
}

export const FAQ_DATA: FAQEntry[] = [
  {
    id: "tata-kelola",
    topic: "Tata Kelola Desa Wisata",
    keywords: ["tata kelola", "kelola", "mengelola", "manajemen", "organisasi", "pengelolaan"],
    answer:
      "Tata kelola desa wisata adalah cara masyarakat mengatur, mengorganisasikan, dan menjalankan aktivitas wisata di desa secara bersama-sama — mulai dari perencanaan, pembagian peran, hingga pengelolaan pendapatan agar manfaatnya dirasakan seluruh warga."
  },
  {
    id: "program-kegiatan",
    topic: "Program Kegiatan",
    keywords: ["program", "kegiatan", "agenda", "kelas", "pelatihan", "jadwal"],
    answer:
      "Program ini terdiri dari pelatihan dan praktik lapangan seputar tata kelola desa wisata, mulai dari perencanaan komunitas, penataan infrastruktur, pengembangan usaha lokal, hingga penyiapan pusat informasi wisatawan. Detail tahapannya bisa dilihat pada bagian \"Tentang Program\"."
  },
  {
    id: "manfaat",
    topic: "Manfaat Desa Wisata",
    keywords: ["manfaat", "keuntungan", "dampak", "faedah"],
    answer:
      "Desa wisata dapat membuka lapangan kerja baru, meningkatkan pendapatan warga melalui UMKM lokal, melestarikan budaya dan lingkungan, serta mendorong generasi muda untuk berkontribusi langsung dalam pembangunan desanya."
  },
  {
    id: "promosi",
    topic: "Promosi Wisata",
    keywords: ["promosi", "pemasaran", "marketing", "sosial media", "konten"],
    answer:
      "Promosi desa wisata bisa dilakukan lewat media sosial, kerja sama dengan komunitas atau agen wisata, konten foto/video otentik, serta storytelling tentang keunikan budaya dan alam desa agar lebih dikenal wisatawan."
  },
  {
    id: "karang-taruna",
    topic: "Peran Karang Taruna",
    keywords: ["karang taruna", "pemuda", "generasi muda", "peran karang taruna"],
    answer:
      "Karang Taruna berperan sebagai penggerak utama generasi muda dalam pengelolaan desa wisata — mulai dari pemandu wisata, pengelola media promosi, hingga penghubung antara warga dan pengunjung."
  },
  {
    id: "ngargoyoso",
    topic: "Desa Ngargoyoso",
    keywords: ["ngargoyoso", "karanganyar", "lokasi", "desa ngargoyoso"],
    answer:
      "Ngargoyoso adalah kecamatan di Kabupaten Karanganyar, Jawa Tengah, yang dikenal dengan potensi alam pegunungan dan agrowisata. Program ini mengangkat pengalaman nyata masyarakat Ngargoyoso dalam membangun ekosistem desa wisatanya."
  }
];

export const QUICK_SUGGESTIONS = FAQ_DATA.map((f) => f.topic);

export const GREETING =
  "Halo! Saya asisten virtual seputar program Desa Wisata Ngargoyoso. Silakan pilih topik di bawah, atau ketik pertanyaan Anda.";

export const FALLBACK_ANSWER =
  "Maaf, saya belum memiliki jawaban untuk pertanyaan itu. Coba pilih salah satu topik di bawah, atau hubungi tim pengabdian masyarakat untuk informasi lebih lanjut.";

/** Mencocokkan pesan pengguna dengan basis FAQ berbasis kata kunci sederhana. */
export function findAnswer(message: string): string {
  const lower = message.toLowerCase();
  const match = FAQ_DATA.find((entry) => entry.keywords.some((kw) => lower.includes(kw)));
  return match ? match.answer : FALLBACK_ANSWER;
}
