
"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/admin/me");
      if (!me.ok) { window.location.href = "/admin/login"; return; }
      setAuth(true);
    })();
  }, []);

  return (
    <main className="space-y-6">
      <section className="grid md:grid-cols-4 gap-4">
        <a className="card hover:shadow-lg" href="/admin/cupons">
          <h3 className="font-semibold">Cupons</h3>
          <p className="text-sm text-gray-500">Gerencie códigos de desconto</p>
        </a>
        <a className="card hover:shadow-lg" href="/admin/relatorios">
          <h3 className="font-semibold">Relatórios</h3>
          <p className="text-sm text-gray-500">Exporte CSV/XLSX</p>
        </a>
        <div className="card">
          <h3 className="font-semibold">Status</h3>
          <p className="text-sm">{auth === null ? "Verificando..." : auth ? "Autenticado" : "Não autenticado"}</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Pagamentos</h3>
          <p className="text-sm text-gray-500">Integração InfinityPay ativa</p>
        </div>
      </section>
    </main>
  );
}
