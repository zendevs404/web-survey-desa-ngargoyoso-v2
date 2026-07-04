import type { KnowledgeEntry } from "./types";

/**
 * KNOWLEDGE BASE UTAMA
 * ---------------------------------------------------------------
 * Struktur modular: setiap topik = satu object KnowledgeEntry.
 * Untuk menambah topik/artikel baru di masa depan, cukup tambahkan
 * object baru ke array ini — TIDAK PERLU mengubah logic matcher
 * ataupun tampilan ChatbotWidget.tsx.
 *
 * Setiap "answer" ditulis ramah, profesional, singkat, informatif,
 * dan mudah dipahami masyarakat umum (maks. ±150 kata, 1-3 paragraf).
 */
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "definisi-desa-wisata",
    topic: "Apa itu Desa Wisata?",
    category: "Desa Wisata",
    keywords: ["apa itu desa wisata", "definisi desa wisata", "pengertian desa wisata", "desa wisata adalah", "arti desa wisata"],
    answer:
      "Desa wisata adalah kawasan pedesaan yang mengembangkan potensi alam, budaya, dan kehidupan masyarakat setempat menjadi daya tarik wisata, sambil tetap menjaga keaslian dan kearifan lokalnya. Wisatawan diajak merasakan langsung aktivitas warga, mulai dari pertanian, kerajinan, kuliner, hingga tradisi sehari-hari. Konsep ini berbeda dari wisata komersial biasa karena masyarakat desa berperan langsung sebagai pengelola sekaligus penerima manfaat utamanya."
  },
  {
    id: "manfaat-desa-wisata",
    topic: "Manfaat Desa Wisata",
    category: "Desa Wisata",
    keywords: ["manfaat desa wisata", "keuntungan desa wisata", "dampak desa wisata", "faedah desa wisata", "kenapa perlu desa wisata"],
    answer:
      "Desa wisata membuka lapangan kerja baru, meningkatkan pendapatan warga lewat UMKM dan jasa wisata, serta mendorong pelestarian budaya dan lingkungan setempat. Selain manfaat ekonomi, desa wisata juga menumbuhkan rasa bangga masyarakat terhadap kampung halamannya dan membuka kesempatan bagi generasi muda untuk berkarya tanpa harus merantau. Infrastruktur desa pun biasanya ikut berkembang seiring meningkatnya kunjungan wisatawan."
  },
  {
    id: "tata-kelola",
    topic: "Prinsip Tata Kelola Desa Wisata",
    category: "Tata Kelola",
    keywords: [
      "tata kelola desa wisata",
      "prinsip tata kelola",
      "cara mengelola desa wisata",
      "manajemen desa wisata",
      "pengelolaan desa wisata",
      "organisasi desa wisata"
    ],
    answer:
      "Tata kelola desa wisata yang baik menganut prinsip transparansi, partisipasi warga, keberlanjutan, dan pembagian manfaat yang adil. Biasanya dibentuk kelompok sadar wisata (Pokdarwis) atau BUMDes yang mengatur perencanaan kegiatan, pengelolaan keuangan, standar pelayanan, hingga pemeliharaan destinasi. Prinsip kunci lainnya adalah kolaborasi antara pemerintah desa, masyarakat, dan pihak swasta agar pengembangan wisata berjalan terarah dan bermanfaat bagi semua pihak."
  },
  {
    id: "karang-taruna",
    topic: "Peran Karang Taruna",
    category: "Pemberdayaan",
    keywords: ["karang taruna", "peran karang taruna", "pemuda desa wisata", "generasi muda desa wisata"],
    answer:
      "Karang Taruna berperan sebagai penggerak utama generasi muda dalam pengembangan desa wisata. Mereka aktif sebagai pemandu wisata, pengelola konten promosi digital, penyelenggara event desa, hingga penghubung antara warga dan wisatawan. Dengan semangat dan kreativitas anak muda, Karang Taruna membantu desa wisata tetap relevan mengikuti tren, sekaligus menjadi wadah pembelajaran organisasi dan kewirausahaan bagi para pemudanya."
  },
  {
    id: "strategi-promosi",
    topic: "Strategi Promosi Wisata",
    category: "Promosi",
    keywords: [
      "promosi wisata",
      "cara mempromosikan",
      "cara promosi wisata",
      "strategi promosi",
      "memasarkan wisata",
      "tips marketing desa wisata"
    ],
    answer:
      "Promosi desa wisata paling efektif dilakukan lewat kombinasi media sosial, kerja sama dengan agen perjalanan/komunitas, serta storytelling autentik tentang keunikan alam dan budaya desa. Konten foto dan video yang menarik, testimoni wisatawan, serta partisipasi dalam pameran atau festival pariwisata juga membantu memperluas jangkauan. Kuncinya adalah konsistensi mengunggah konten dan menonjolkan ciri khas yang tidak dimiliki destinasi lain."
  },
  {
    id: "media-sosial",
    topic: "Pemanfaatan Media Sosial",
    category: "Promosi",
    keywords: ["media sosial", "medsos", "sosmed", "instagram wisata", "tiktok wisata", "konten sosial media"],
    answer:
      "Media sosial seperti Instagram, TikTok, dan Facebook adalah alat promosi murah namun berdampak besar bagi desa wisata. Foto dan video pendek yang menampilkan keindahan alam, aktivitas budaya, atau produk UMKM dapat menjangkau calon wisatawan secara luas. Agar efektif, unggahan sebaiknya konsisten, memakai tagar lokal, melibatkan warga sebagai konten kreator, dan aktif membalas komentar atau pertanyaan pengunjung."
  },
  {
    id: "digital-marketing",
    topic: "Digital Marketing Wisata",
    category: "Promosi",
    keywords: ["digital marketing", "pemasaran digital", "marketing online", "promosi digital", "website wisata"],
    answer:
      "Digital marketing wisata mencakup pemanfaatan media sosial, website atau marketplace wisata, Google Maps/Google Bisnisku, hingga kerja sama dengan konten kreator lokal. Strategi ini membantu desa wisata menjangkau wisatawan dari luar daerah dengan biaya lebih efisien dibanding promosi konvensional. Data kunjungan dari platform digital juga bisa dipakai untuk mengevaluasi dan menyempurnakan strategi promosi ke depannya."
  },
  {
    id: "partisipasi-masyarakat",
    topic: "Pentingnya Partisipasi Masyarakat",
    category: "Pemberdayaan",
    keywords: [
      "partisipasi masyarakat",
      "peran masyarakat",
      "keterlibatan warga",
      "kenapa partisipasi penting",
      "mengapa partisipasi masyarakat penting",
      "gotong royong wisata"
    ],
    answer:
      "Partisipasi masyarakat penting karena warga adalah pemilik sekaligus pelaku utama desa wisata. Ketika masyarakat terlibat sejak perencanaan hingga pengelolaan, program wisata lebih sesuai kebutuhan lokal, manfaat ekonominya dirasakan merata, dan rasa memiliki terhadap destinasi pun tumbuh. Partisipasi ini bisa berupa gotong royong menjaga kebersihan, menjadi pemandu, menyediakan homestay, atau ikut serta dalam pelatihan pengelolaan wisata."
  },
  {
    id: "umkm",
    topic: "Pengembangan UMKM Lokal",
    category: "UMKM",
    keywords: ["umkm desa wisata", "usaha mikro", "usaha kecil desa", "produk lokal", "pengembangan umkm"],
    answer:
      "UMKM adalah tulang punggung ekonomi desa wisata, mulai dari kuliner khas, kerajinan tangan, hingga oleh-oleh lokal. Pengembangannya bisa dilakukan melalui pelatihan kualitas produk, kemasan yang menarik, standar higienitas, serta pendampingan pemasaran baik secara langsung maupun digital. Semakin berkembang UMKM, semakin besar pula perputaran ekonomi yang dinikmati warga sekitar destinasi wisata."
  },
  {
    id: "qris",
    topic: "Digitalisasi Pembayaran QRIS",
    category: "UMKM",
    keywords: ["qris", "pembayaran digital", "cashless umkm", "non tunai", "manfaat qris", "scan barcode bayar"],
    answer:
      "QRIS memudahkan UMKM menerima pembayaran non-tunai hanya dengan satu kode QR yang berlaku untuk berbagai aplikasi dompet digital dan mobile banking. Manfaatnya antara lain transaksi lebih cepat dan tercatat rapi, mengurangi risiko uang palsu, memudahkan wisatawan yang tidak membawa uang tunai, serta membuka peluang UMKM untuk mengakses layanan keuangan dan permodalan karena riwayat transaksinya lebih transparan."
  },
  {
    id: "wisata-berkelanjutan",
    topic: "Pariwisata Berkelanjutan",
    category: "Keberlanjutan",
    keywords: ["wisata berkelanjutan", "pariwisata berkelanjutan", "sustainable tourism", "ekowisata", "ramah lingkungan wisata"],
    answer:
      "Pariwisata berkelanjutan adalah pengembangan wisata yang memperhatikan keseimbangan antara manfaat ekonomi, kelestarian lingkungan, dan pelestarian budaya untuk generasi mendatang. Prinsipnya meliputi pengelolaan sampah yang baik, penggunaan sumber daya secara bijak, penghormatan terhadap adat setempat, serta melibatkan masyarakat lokal secara adil. Dengan pendekatan ini, desa wisata dapat terus berkembang tanpa merusak alam maupun nilai budaya yang menjadi daya tariknya."
  },
  {
    id: "pengelolaan-destinasi",
    topic: "Pengelolaan Destinasi Wisata",
    category: "Tata Kelola",
    keywords: ["pengelolaan destinasi", "manajemen destinasi", "penataan destinasi wisata", "pengembangan destinasi"],
    answer:
      "Pengelolaan destinasi wisata mencakup penataan area kunjungan, penyediaan fasilitas dasar (toilet, tempat parkir, papan informasi), penjagaan kebersihan dan keamanan, serta penetapan standar pelayanan bagi pengunjung. Pengelolaan yang baik juga memperhatikan daya tampung wisatawan agar destinasi tidak rusak akibat kunjungan berlebih, serta melibatkan warga sekitar dalam menjaga dan merawat area wisata secara berkelanjutan."
  },
  {
    id: "pengelolaan-event",
    topic: "Pengelolaan Event Desa",
    category: "Promosi",
    keywords: ["event desa", "acara desa", "festival desa", "pengelolaan acara wisata", "agenda wisata desa"],
    answer:
      "Event atau festival desa seperti panen raya, kirab budaya, atau lomba tradisional efektif menarik kunjungan sekaligus mempromosikan identitas desa wisata. Pengelolaannya perlu perencanaan matang mulai dari konsep acara, anggaran, perizinan, promosi jauh hari, hingga evaluasi setelah acara selesai. Event yang rutin diadakan juga membantu membangun citra desa wisata sebagai destinasi yang hidup dan selalu punya sesuatu yang baru untuk dikunjungi."
  },
  {
    id: "branding",
    topic: "Branding Desa Wisata",
    category: "Promosi",
    keywords: ["branding desa wisata", "identitas desa wisata", "citra desa wisata", "brand desa wisata", "ciri khas desa wisata"],
    answer:
      "Branding desa wisata adalah upaya membangun identitas dan citra khas yang membedakan desa dari destinasi lain, misalnya lewat logo, tagline, atau julukan unik yang mencerminkan potensi alam dan budayanya. Branding yang kuat memudahkan wisatawan mengingat dan merekomendasikan desa tersebut. Konsistensi dalam penggunaan nama, warna, gaya konten promosi, hingga pengalaman yang diberikan kepada pengunjung sangat menentukan keberhasilan sebuah branding desa wisata."
  },
  {
    id: "sapta-pesona",
    topic: "Sapta Pesona",
    category: "Standar Pelayanan",
    keywords: ["sapta pesona", "7 unsur sapta pesona", "apa itu sapta pesona"],
    answer:
      "Sapta Pesona adalah tujuh unsur yang perlu diwujudkan agar suatu destinasi nyaman dikunjungi wisatawan, yaitu: aman, tertib, bersih, sejuk, indah, ramah, dan kenangan. Ketujuh unsur ini menjadi panduan bagi masyarakat dan pengelola desa wisata dalam menyiapkan lingkungan dan pelayanan terbaik. Semakin konsisten sebuah desa menerapkan Sapta Pesona, semakin besar peluangnya membangun reputasi baik dan mendapat kunjungan wisatawan berulang."
  },
  {
    id: "chse",
    topic: "CHSE",
    category: "Standar Pelayanan",
    keywords: ["chse", "protokol chse", "standar kebersihan wisata", "cleanliness health safety environment"],
    answer:
      "CHSE adalah singkatan dari Cleanliness (kebersihan), Health (kesehatan), Safety (keamanan), dan Environment Sustainability (kelestarian lingkungan) — standar yang diterapkan pada destinasi wisata untuk memastikan kenyamanan dan keamanan pengunjung. Penerapan CHSE meliputi penyediaan fasilitas cuci tangan, prosedur kebersihan rutin, pelatihan kesiapsiagaan bagi pengelola, serta menjaga kelestarian lingkungan sekitar destinasi wisata."
  },
  {
    id: "pelayanan-wisata",
    topic: "Pelayanan Wisata",
    category: "Standar Pelayanan",
    keywords: ["pelayanan wisata", "kualitas pelayanan wisata", "keramahan wisatawan", "service wisata"],
    answer:
      "Pelayanan wisata yang baik dimulai dari keramahan warga menyambut pengunjung, kejelasan informasi (harga, rute, fasilitas), kecepatan menangani keluhan, hingga kebersihan dan kenyamanan fasilitas umum. Pelatihan bagi pemandu dan pelaku usaha lokal tentang komunikasi dan standar layanan sangat membantu meningkatkan pengalaman wisatawan, yang pada akhirnya mendorong kunjungan ulang dan rekomendasi dari mulut ke mulut."
  },
  {
    id: "ekonomi-kreatif",
    topic: "Ekonomi Kreatif",
    category: "UMKM",
    keywords: ["ekonomi kreatif", "produk kreatif desa", "industri kreatif", "kerajinan lokal"],
    answer:
      "Ekonomi kreatif di desa wisata memanfaatkan kreativitas warga untuk menghasilkan produk bernilai tambah, seperti kerajinan tangan, kuliner khas, seni pertunjukan, hingga suvenir bertema lokal. Selain menambah daya tarik wisata, ekonomi kreatif membuka lapangan usaha baru dan mendorong warga melestarikan kearifan lokal dalam bentuk produk yang bisa dinikmati wisatawan sebagai kenang-kenangan yang unik dan bermakna."
  },
  {
    id: "pengembangan-desa",
    topic: "Pengembangan Desa",
    category: "Desa Wisata",
    keywords: ["pengembangan desa", "pembangunan desa", "kemajuan desa", "penguatan desa"],
    answer:
      "Pengembangan desa melalui sektor wisata melibatkan penataan infrastruktur, peningkatan kapasitas warga, penguatan kelembagaan (seperti Pokdarwis dan BUMDes), serta sinergi program pemerintah dan swasta. Pendekatan ini membantu desa tidak hanya bertumbuh secara ekonomi, tetapi juga secara sosial dan lingkungan, sehingga kesejahteraan warga meningkat sekaligus identitas dan budaya lokal tetap terjaga."
  },
  {
    id: "edukasi-masyarakat",
    topic: "Edukasi Masyarakat",
    category: "Pemberdayaan",
    keywords: ["edukasi masyarakat", "penyuluhan warga", "sosialisasi masyarakat", "pelatihan warga desa"],
    answer:
      "Edukasi masyarakat menjadi fondasi keberhasilan desa wisata, mencakup pelatihan pengelolaan usaha, pelayanan wisatawan, literasi digital, hingga kesadaran menjaga lingkungan dan budaya. Melalui edukasi yang berkelanjutan, warga menjadi lebih siap dan percaya diri berperan aktif dalam setiap aspek pengembangan desa wisata, sehingga program yang dijalankan lebih mandiri dan berkelanjutan dalam jangka panjang."
  },
  {
    id: "pengabdian-masyarakat",
    topic: "Kegiatan Pengabdian Masyarakat",
    category: "Pemberdayaan",
    keywords: ["pengabdian masyarakat", "kkn desa wisata", "program pengabdian", "kegiatan pengabdian"],
    answer:
      "Kegiatan pengabdian masyarakat, seperti yang dilakukan mahasiswa atau lembaga pendidikan, biasanya berfokus pada pendampingan warga dalam tata kelola desa wisata, pelatihan digital marketing, penguatan UMKM, hingga edukasi Sapta Pesona dan CHSE. Program semacam ini bertujuan mentransfer pengetahuan dan keterampilan agar masyarakat dapat mengelola potensi wisatanya secara mandiri dan berkelanjutan setelah program berakhir."
  },
  {
    id: "kunjungan-wisatawan",
    topic: "Meningkatkan Kunjungan Wisatawan",
    category: "Promosi",
    keywords: [
      "meningkatkan kunjungan wisatawan",
      "menarik wisatawan",
      "cara menarik pengunjung",
      "jumlah wisatawan naik",
      "bagaimana meningkatkan kunjungan"
    ],
    answer:
      "Kunjungan wisatawan dapat ditingkatkan dengan memperkuat promosi digital, menghadirkan atraksi atau event rutin, menjaga kebersihan serta keramahan (Sapta Pesona), dan memberikan pengalaman unik yang tak dimiliki destinasi lain. Kerja sama dengan agen wisata, influencer lokal, dan komunitas juga membantu memperluas jangkauan promosi. Konsistensi kualitas pelayanan menjadi kunci agar wisatawan yang datang mau kembali lagi dan merekomendasikan ke orang lain."
  },
  {
    id: "ngargoyoso",
    topic: "Desa Ngargoyoso",
    category: "Lokasi",
    keywords: ["ngargoyoso", "desa ngargoyoso", "tentang ngargoyoso"],
    answer:
      "Ngargoyoso adalah kecamatan di Kabupaten Karanganyar, Jawa Tengah, yang dikenal dengan potensi alam pegunungan lereng Gunung Lawu dan agrowisata seperti perkebunan teh. Program pengabdian masyarakat ini mengangkat pengalaman nyata warga Ngargoyoso dalam membangun ekosistem desa wisata, mulai dari tata kelola, promosi, hingga pemberdayaan UMKM dan Karang Taruna setempat."
  },
  {
    id: "wisata-karanganyar",
    topic: "Wisata Karanganyar",
    category: "Lokasi",
    keywords: ["wisata karanganyar", "karanganyar", "destinasi karanganyar"],
    answer:
      "Karanganyar merupakan kabupaten di Jawa Tengah dengan beragam destinasi wisata alam dan budaya, mulai dari kawasan lereng Gunung Lawu, air terjun, kebun teh, hingga desa-desa wisata seperti Ngargoyoso. Potensi ini menjadikan Karanganyar salah satu tujuan wisata alam populer yang terus dikembangkan melalui program tata kelola dan pemberdayaan masyarakat desa wisata."
  },
  {
    id: "wisata-jawa-tengah",
    topic: "Wisata Jawa Tengah",
    category: "Lokasi",
    keywords: ["wisata jawa tengah", "jawa tengah", "destinasi jawa tengah"],
    answer:
      "Jawa Tengah memiliki kekayaan destinasi wisata yang beragam, mulai dari situs budaya, pegunungan, pantai, hingga desa-desa wisata yang mengangkat kearifan lokal, seperti di kawasan Karanganyar dan Ngargoyoso. Pengembangan desa wisata di provinsi ini terus didorong melalui penguatan tata kelola, promosi digital, dan pemberdayaan masyarakat agar potensi wisata dapat dinikmati secara berkelanjutan."
  },
  {
    id: "program-kegiatan",
    topic: "Program Kegiatan",
    category: "Program",
    keywords: ["program kegiatan", "agenda program", "pelatihan program", "jadwal kegiatan", "tentang program ini"],
    answer:
      "Program ini terdiri dari pelatihan dan praktik lapangan seputar tata kelola desa wisata, mulai dari perencanaan komunitas, penataan infrastruktur, pengembangan usaha lokal, digitalisasi UMKM, hingga penyiapan pusat informasi wisatawan. Detail tahapan kegiatan dapat dilihat pada bagian \"Tentang Program\" di halaman utama website ini."
  }
];
