import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMADJUF",
  description:
    "Site oficial da União da Mocidade e Adolescentes da Assembleia de Deus de Juiz de Fora.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
