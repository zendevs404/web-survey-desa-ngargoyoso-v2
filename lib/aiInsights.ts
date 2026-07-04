import type { AIInsight, DashboardStats } from "@/types";

const REKOMENDASI_PER_PERTANYAAN: Record<string, string> = {
  q1: "Perbanyak sesi praktik lapangan agar peserta lebih memahami tata kelola desa wisata secara langsung.",
  q2: "Perbanyak forum diskusi warga agar keterlibatan masyarakat dalam pengelolaan desa wisata semakin kuat.",
  q3: "Perbanyak studi kasus desa wisata lain sebagai referensi strategi promosi yang lebih variatif.",
  q4: "Tambahkan simulasi penanganan masalah nyata agar peserta lebih siap menghadapi tantangan pengelolaan.",
  q5: "Tingkatkan kualitas penyampaian materi narasumber, misalnya dengan media visual yang lebih interaktif.",
  q6: "Perbanyak kegiatan lapangan yang melibatkan langsung peserta agar motivasi keterlibatan meningkat.",
  q7: "Tingkatkan keterlibatan Karang Taruna melalui program lanjutan yang lebih relevan dengan kebutuhan mereka."
};

const REKOMENDASI_DASAR = [
  "Tingkatkan sesi praktik lapangan agar pemahaman peserta lebih mendalam.",
  "Perbanyak studi kasus desa wisata lain sebagai bahan pembelajaran.",
  "Tingkatkan keterlibatan Karang Taruna pada setiap tahap kegiatan."
];

function tierKualitas(skor: number): string {
  if (skor >= 4.5) return "sangat tinggi";
  if (skor >= 4) return "tinggi";
  if (skor >= 3) return "cukup baik";
  if (skor >= 2) return "masih rendah";
  return "sangat rendah";
}

/**
 * Menghasilkan ringkasan, temuan utama, dan rekomendasi secara dinamis
 * berdasarkan data survei yang masuk. Bersifat rule-based (bukan LLM)
 * sehingga selalu konsisten, cepat, dan tidak memerlukan backend AI.
 */
export function generateAIInsight(stats: DashboardStats): AIInsight {
  if (stats.totalResponden === 0) {
    return {
      ringkasanUmum:
        "Belum ada data responden yang masuk. Ringkasan akan tersedia secara otomatis begitu kuesioner mulai diisi.",
      temuanUtama: [],
      rekomendasi: REKOMENDASI_DASAR
    };
  }

  const tier = tierKualitas(stats.rataRataKeseluruhan);
  const ringkasanUmum = `Sebagian besar peserta menunjukkan tingkat pemahaman yang ${tier} terhadap tata kelola desa wisata, dengan rata-rata skor ${stats.rataRataKeseluruhan.toFixed(
    1
  )} dari 5 berdasarkan ${stats.totalResponden} responden. Tingkat kepuasan peserta tercatat sebesar ${
    stats.persentaseKepuasan
  }%.`;

  const pertanyaanTerurut = [...stats.rataPerPertanyaan].sort((a, b) => b.rataRata - a.rataRata);
  const tertinggi = pertanyaanTerurut[0];
  const terendah = pertanyaanTerurut[pertanyaanTerurut.length - 1];

  const temuanUtama: string[] = [];
  if (tertinggi) {
    temuanUtama.push(
      `Skor tertinggi ada pada aspek "${tertinggi.label}" dengan rata-rata ${tertinggi.rataRata.toFixed(1)} dari 5.`
    );
  }
  if (terendah && terendah.id !== tertinggi?.id) {
    temuanUtama.push(
      `Skor terendah ada pada aspek "${terendah.label}" dengan rata-rata ${terendah.rataRata.toFixed(1)} dari 5, sehingga menjadi prioritas perbaikan.`
    );
  }
  if (stats.desaPalingAktif) {
    temuanUtama.push(`Desa paling aktif mengisi kuesioner adalah ${stats.desaPalingAktif}.`);
  }
  if (stats.kelompokUsiaPalingAktif) {
    temuanUtama.push(
      `Kelompok usia paling aktif berpartisipasi adalah rentang usia ${stats.kelompokUsiaPalingAktif} tahun.`
    );
  }
  temuanUtama.push(
    `Total ${stats.jumlahDesa} desa dan ${stats.jumlahKarangTaruna} Karang Taruna telah terlibat dalam pengisian kuesioner.`
  );

  if (stats.karangTarunaPalingAktif) {
    const jumlahTeraktif = stats.distribusiKarangTaruna[0]?.jumlah ?? 0;
    temuanUtama.push(
      `Karang Taruna paling aktif adalah ${stats.karangTarunaPalingAktif} dengan ${jumlahTeraktif} responden.`
    );
  }

  if (stats.distribusiKarangTaruna.length > 0) {
    const daftarJumlah = stats.distribusiKarangTaruna
      .map((kt) => `${kt.nama} (${kt.jumlah} responden)`)
      .join(", ");
    temuanUtama.push(`Sebaran jumlah responden per Karang Taruna: ${daftarJumlah}.`);
  }

  if (stats.jumlahKarangTaruna > 0) {
    temuanUtama.push(
      `Rata-rata setiap Karang Taruna diwakili oleh sekitar ${stats.rataRespondenPerKarangTaruna.toFixed(
        1
      )} responden, menggambarkan tingkat partisipasi Karang Taruna secara keseluruhan.`
    );
  }

  if (stats.distribusiKarangTaruna.length > 1) {
    const teraktif = stats.distribusiKarangTaruna[0];
    const tidakAktif = stats.distribusiKarangTaruna[stats.distribusiKarangTaruna.length - 1];
    if (teraktif && tidakAktif && teraktif.nama !== tidakAktif.nama) {
      temuanUtama.push(
        `Dibandingkan dengan ${tidakAktif.nama} (${tidakAktif.jumlah} responden), partisipasi ${teraktif.nama} tercatat lebih tinggi (${teraktif.jumlah} responden), menunjukkan adanya kesenjangan partisipasi antar Karang Taruna.`
      );
    }
  }

  const rekomendasi: string[] = [];
  if (terendah) {
    const spesifik = REKOMENDASI_PER_PERTANYAAN[terendah.id];
    if (spesifik) rekomendasi.push(spesifik);
  }
  REKOMENDASI_DASAR.forEach((r) => {
    if (!rekomendasi.includes(r) && rekomendasi.length < 4) rekomendasi.push(r);
  });
  if (stats.persentaseKepuasan < 70) {
    rekomendasi.push(
      "Evaluasi kembali metode penyampaian materi karena persentase kepuasan peserta masih di bawah target."
    );
  }

  if (stats.distribusiKarangTaruna.length > 1) {
    const teraktif = stats.distribusiKarangTaruna[0];
    const tidakAktif = stats.distribusiKarangTaruna[stats.distribusiKarangTaruna.length - 1];
    if (teraktif && tidakAktif && teraktif.jumlah > tidakAktif.jumlah * 2) {
      rekomendasi.push(
        `Lakukan pendampingan tambahan bagi ${tidakAktif.nama} agar tingkat partisipasinya dapat menyusul Karang Taruna lain seperti ${teraktif.nama}.`
      );
    }
  }

  return { ringkasanUmum, temuanUtama, rekomendasi };
}
