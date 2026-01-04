import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Consulta de Psicología | Bienestar Mental y Emocional",
  description: "Servicios profesionales de psicología. Terapia individual, de pareja y familiar. Citas presenciales y online. Tu bienestar mental es nuestra prioridad.",
  keywords: "psicología, terapia, salud mental, bienestar emocional, psicólogo, consulta psicológica",
  authors: [{ name: "Consulta de Psicología" }],
  openGraph: {
    title: "Consulta de Psicología | Bienestar Mental y Emocional",
    description: "Servicios profesionales de psicología. Tu bienestar mental es nuestra prioridad.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
