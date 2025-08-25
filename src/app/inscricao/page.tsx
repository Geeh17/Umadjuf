"use client";
import { useEffect, useState } from "react";

type Formulario = {
  _id: string;
  descricao: string;
  valor: number;
  data_inicio: string;
  data_fim: string;
};

const bannerByDescricao: Record<string, string> = {
  "AVIVA UMADJUF 2025": "/aviva.webp",
  "ACAMP UMADJUF 2026": "/acamp.webp",
};
const subtituloByDescricao: Record<string, string> = {
  "AVIVA UMADJUF 2025":
    "Dia 29 de novembro, faça sua inscrição, e venha participar!",
  "ACAMP UMADJUF 2026":
    "De 14 a 17 de fevereiro, faça sua inscrição, e venha participar!",
};

// 👇 novo: descrição → rota fixa
const linkByDescricao: Record<string, string> = {
  "AVIVA UMADJUF 2025": "/inscricao/aviva-2025",
  "ACAMP UMADJUF 2026": "/inscricao/acamp-2026",
};

export default function InscricaoIndex() {
  const [forms, setForms] = useState<Formulario[]>([]);
  useEffect(() => {
    fetch("/api/formularios")
      .then((r) => r.json())
      .then(setForms);
  }, []);

  return (
    <main className="py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Eventos da UMADJUF</h1>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {forms.map((f) => {
          const banner = bannerByDescricao[f.descricao] || "/placeholder.png";
          const subt =
            subtituloByDescricao[f.descricao] ||
            "Faça sua inscrição e participe!";
          const href =
            linkByDescricao[f.descricao] ??
            `/inscricao/${encodeURIComponent(f._id)}`;

          return (
            <div key={f._id} className="card text-center">
              <div className="flex justify-center">
                <img
                  src={banner}
                  alt={f.descricao}
                  className="w-60 h-72 object-cover rounded"
                />
              </div>
              <h2 className="mt-3 text-sm font-bold uppercase text-[#cf6f35]">
                {f.descricao.toUpperCase()}
              </h2>
              <p className="text-xs text-gray-600 mt-1">{subt}</p>
              <a
                href={href} // 👈 agora aponta para /inscricao/aviva-2025 ou /inscricao/acamp-2026
                className="btn mt-3 inline-block bg-[#cf6f35] hover:bg-[#b75f2f]"
              >
                Inscrever-se
              </a>
            </div>
          );
        })}
        {forms.length === 0 && (
          <section className="card">
            <h2 className="text-lg font-semibold mb-2">
              Nenhum formulário disponível
            </h2>
            <p className="text-sm text-gray-600">
              Rode o seed para criar AVIVA e ACAMP.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
