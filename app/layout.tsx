import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Recorda - Crie seu livro de recordações com IA",
  description: "Transforme suas memórias em um livro personalizado com o poder da IA. Envie fotos, áudios e textos pelo WhatsApp e deixe a tecnologia criar sua história.",
  keywords: "livro recordações, IA, memórias, fotos, áudio, WhatsApp, personalizado",
  authors: [{ name: "Recorda" }],
  openGraph: {
    title: "Recorda - Crie seu livro de recordações com IA",
    description: "Transforme suas memórias em um livro personalizado com o poder da IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
