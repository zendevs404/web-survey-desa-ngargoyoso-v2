import Link from "next/link";
import Confetti from "./Confetti";

export default function SuccessState() {
  return (
    <div className="card-modern glass-strong relative overflow-hidden p-8 text-center sm:p-14">
      <Confetti />
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-forest-500 to-moss text-white shadow-glass animate-slideUp">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        className="relative mt-6 animate-slideUp font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        Terima Kasih atas Jawaban Anda!
      </h2>
      <p
        className="relative mx-auto mt-3 max-w-md animate-slideUp text-sm text-ink-soft dark:text-nightforest-text/70"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Evaluasi Anda sangat berarti untuk pengembangan program edukasi tata kelola desa wisata
        Ngargoyoso ke depannya.
      </p>
      <Link
        href="/"
        className="relative mt-8 inline-block animate-slideUp rounded-full bg-forest-600 px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
        style={{ animationDelay: "0.3s", opacity: 0 }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
