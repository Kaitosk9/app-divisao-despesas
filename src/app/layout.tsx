import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/custom/navbar";

export const metadata: Metadata = {
  title: "SplitSmart - Divida despesas de forma inteligente",
  description: "Gerencie despesas compartilhadas com roommates, parceiro(a) ou amigos. Pagamentos via PIX, divisão automática e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
