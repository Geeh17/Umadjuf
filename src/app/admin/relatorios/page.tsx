
"use client";
export default function RelatoriosPage() {
  const exportar = (format: "csv" | "xlsx") => {
    window.location.href = `/api/admin/relatorios?format=${format}`;
  };
  return (
    <main className="card max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Exportar Relatórios</h1>
      <div className="flex gap-4">
        <button onClick={() => exportar("csv")} className="btn">Exportar CSV</button>
        <button onClick={() => exportar("xlsx")} className="btn">Exportar XLSX</button>
      </div>
    </main>
  );
}
