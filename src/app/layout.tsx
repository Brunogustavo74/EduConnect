import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduConnect — Conectando alunos, conhecimento e oportunidades",
  description:
    "Plataforma educacional completa para alunos e professores. Organize provas, trabalhos, planos de estudo, monitoria e muito mais.",
  keywords: [
    "educação",
    "plataforma educacional",
    "estudos",
    "monitoria",
    "escola",
    "alunos",
    "professores",
    "portal cd",
    "portal cicero dias",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
