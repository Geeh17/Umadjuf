import "./globals.css";
export const metadata = {
  title: "UMADJUF – Sistema de Inscrições",
  description: "Site institucional com sistema de inscrições integrado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <header className="brand brand-gradient text-white">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src="/topoLogo.webp"
                  alt="UMADJUF"
                  className="h-10 w-auto"
                />
                <div className="hidden sm:block">
                  <p className="text-xs opacity-90">
                    União da Mocidade e Adolescentes
                  </p>
                  <h1 className="text-xl md:text-2xl font-bold tracking-wide">
                    UMADJUF
                  </h1>
                </div>
              </div>
              <nav className="flex gap-4 text-sm md:text-base">
                <a href="/" className="hover:underline">
                  Início
                </a>
                <a href="/inscricao" className="hover:underline">
                  Eventos
                </a>
                <a href="/admin" className="hover:underline">
                  Admin
                </a>
              </nav>
            </div>
          </header>
          {children}
          <footer className="mt-16 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} UMADJUF
          </footer>
        </div>
      </body>
    </html>
  );
}
