import Reveal from "./Reveal";
import Counter from "./Counter";

const TUJUAN = [
  {
    title: "Tata Kelola Desa Wisata",
    desc: "Meningkatkan pemahaman peserta tentang cara mengelola dan mengorganisasikan desa wisata.",
    icon: (
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    )
  },
  {
    title: "Strategi Promosi Wisata",
    desc: "Mengenalkan strategi promosi desa wisata yang relevan dengan potensi lokal.",
    icon: (
      <path
        d="M3 11l18-7-7 18-2.5-7.5L3 11Z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  {
    title: "Keterlibatan Masyarakat",
    desc: "Mendorong keterlibatan aktif masyarakat dalam setiap tahap pengelolaan wisata.",
    icon: (
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  {
    title: "Partisipasi Karang Taruna",
    desc: "Memotivasi Karang Taruna untuk berpartisipasi aktif dalam pengembangan desa wisata.",
    icon: (
      <path
        d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  }
];

const TIMELINE = [
  {
    step: "01",
    title: "Pelatihan & Perencanaan Komunitas",
    desc: "Warga dan Karang Taruna belajar bersama menyusun rencana pengelolaan desa wisata."
  },
  {
    step: "02",
    title: "Pembangunan Infrastruktur",
    desc: "Penataan akses jalan, penunjuk arah, dan fasilitas dasar penunjang wisata."
  },
  {
    step: "03",
    title: "Pengembangan Usaha Lokal",
    desc: "Warung, kerajinan, dan produk lokal mulai dikembangkan sebagai daya tarik desa."
  },
  {
    step: "04",
    title: "Pusat Informasi Wisatawan",
    desc: "Desa siap menyambut wisatawan dengan layanan informasi dan pengalaman yang tertata."
  }
];

export default function AboutProgram() {
  return (
    <section id="tentang-program" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-clay dark:text-turmeric-light">
            Tentang Program
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Dari Pengalaman Nyata Menuju Desa Wisata yang Mandiri
          </h2>
          <p className="mt-4 text-ink-soft dark:text-nightforest-text/70">
            Program ini menghadirkan pembelajaran langsung dari perjalanan Desa Ngargoyoso
            membangun ekosistem wisatanya, agar generasi muda memiliki bekal nyata untuk desanya
            masing-masing.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TUJUAN.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 90}>
              <div className="card-modern card-hover-lift glass h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-forest-500 to-moss text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-nightforest-text/70">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="text-center font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Perjalanan Transformasi Desa Wisata
          </h3>
          <div className="relative mt-14">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-forest-400 via-turmeric to-clay sm:left-1/2 sm:w-px" />
            <ol className="space-y-10 sm:space-y-14">
              {TIMELINE.map((item, idx) => (
                <li
                  key={item.step}
                  className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                    idx % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="sm:w-1/2" />
                  <span className="absolute left-0 top-0 z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-paper dark:border-nightforest-bg bg-gradient-to-br from-clay to-turmeric font-display text-sm font-bold text-white shadow-soft sm:left-1/2 sm:-translate-x-1/2">
                    {item.step}
                  </span>
                  <div
                    className={`card-modern glass ml-20 p-6 sm:ml-0 sm:w-1/2 ${
                      idx % 2 === 1 ? "sm:pr-14 sm:text-right" : "sm:pl-14"
                    }`}
                  >
                    <h4 className="font-display text-lg font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-nightforest-text/70">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="mt-24 grid gap-6 rounded-3xl glass p-8 sm:grid-cols-3 sm:p-10">
          <div className="text-center">
            <div className="font-display text-4xl font-semibold text-forest-600 dark:text-turmeric-light">
              <Counter target={7} />
            </div>
            <p className="mt-2 text-sm text-ink-soft dark:text-nightforest-text/70">
              Desa &amp; Kelurahan di Kecamatan Ngargoyoso
            </p>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-semibold text-forest-600 dark:text-turmeric-light">
              <Counter target={7} />
            </div>
            <p className="mt-2 text-sm text-ink-soft dark:text-nightforest-text/70">
              Aspek Evaluasi dalam Kuesioner
            </p>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-semibold text-forest-600 dark:text-turmeric-light">
              <Counter target={4} />
            </div>
            <p className="mt-2 text-sm text-ink-soft dark:text-nightforest-text/70">
              Tahapan Perjalanan Transformasi Desa
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
