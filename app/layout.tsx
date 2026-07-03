import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ChatbotWidget = dynamic(() => import("@/components/chatbot/ChatbotWidget"), {
  ssr: false
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"]
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Belajar Tata Kelola Desa Wisata Ngargoyoso, Karanganyar",
  description:
    "Kuesioner evaluasi peserta program edukasi tata kelola desa wisata Desa Ngargoyoso, Karanganyar, berdasarkan pengalaman nyata untuk Karang Taruna dan masyarakat umum.",
  icons: {
    icon: "/favicon.svg"
  },
  keywords: [
    "desa wisata",
    "Ngargoyoso",
    "Karanganyar",
    "tata kelola desa wisata",
    "karang taruna",
    "kuesioner desa wisata"
  ],
  openGraph: {
    title: "Belajar Tata Kelola Desa Wisata Ngargoyoso, Karanganyar",
    description:
      "Program edukasi tata kelola desa wisata berbasis pengalaman nyata Desa Ngargoyoso, Karanganyar.",
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Belajar Tata Kelola Desa Wisata Ngargoyoso, Karanganyar"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${jakarta.variable} ${mono.variable} font-body`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
