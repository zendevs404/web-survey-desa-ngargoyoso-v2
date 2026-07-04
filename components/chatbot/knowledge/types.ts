/**
 * Tipe data inti untuk knowledge base chatbot.
 * File ini sengaja dipisah agar struktur data bisa dipakai ulang
 * oleh knowledgeBase.ts, matcher.ts, maupun modul tambahan di masa depan
 * tanpa perlu mengubah logic utama chatbot (ChatbotWidget.tsx).
 */

export interface KnowledgeEntry {
  /** ID unik, dipakai untuk debugging & referensi internal. */
  id: string;
  /** Judul topik singkat, ditampilkan di UI (mis. tombol saran cepat). */
  topic: string;
  /** Kategori topik, memudahkan pengelompokan & audit cakupan konten. */
  category: string;
  /**
   * Kata kunci & frasa yang mengindikasikan intent ini.
   * Cocok melalui pencocokan substring (keyword matching).
   */
  keywords: string[];
  /**
   * Kata/frasa tambahan yang sinonim dari kata kunci utama.
   * Dipakai oleh synonym matching agar variasi pertanyaan tetap terjawab.
   */
  synonyms?: string[];
  /** Jawaban final: ramah, profesional, singkat (maks. ±150 kata). */
  answer: string;
}

export interface GuardrailTopic {
  category: string;
  keywords: string[];
}
