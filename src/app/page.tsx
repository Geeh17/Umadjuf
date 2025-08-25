export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo ao site da UMADJUF</h2>
        <p>Este projeto integra o site institucional com o sistema oficial de inscrições.</p>
      </section>
      <section className="card">
        <h3 className="text-lg font-semibold mb-2">Acesse a página de Inscrição</h3>
        <a className="btn inline-block" href="/inscricao">Ir para inscrição</a>
      </section>
    </main>
  );
}
