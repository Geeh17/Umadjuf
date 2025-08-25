
"use client";
import { useEffect, useState } from "react";

type Cupom = {
  _id?: string;
  codigo: string;
  tipo: "percentual" | "fixo";
  valor: number;
  validade: string;
  usosMaximos: number;
  usosAtuais?: number;
  ativo: boolean;
};

export default function CuponsPage() {
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [form, setForm] = useState<Cupom>({ codigo: "", tipo: "percentual", valor: 10, validade: "", usosMaximos: 1, ativo: true });

  const load = async () => {
    const res = await fetch("/api/admin/cupons");
    if (res.ok) setCupons(await res.json());
    else window.location.href = "/admin/login";
  };

  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/cupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ codigo: "", tipo: "percentual", valor: 10, validade: "", usosMaximos: 1, ativo: true });
      load();
    }
  };

  const toggleAtivo = async (c: Cupom) => {
    if (!c._id) return;
    await fetch(`/api/admin/cupons/${c._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ativo: !c.ativo })
    });
    load();
  };

  const remove = async (c: Cupom) => {
    if (!c._id) return;
    await fetch(`/api/admin/cupons/${c._id}`, { method: "DELETE" });
    load();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "valor" || name === "usosMaximos" ? Number(value) : value } as any));
  };

  return (
    <main className="space-y-6">
      <section className="card">
        <h1 className="text-xl font-bold mb-4">Cupons</h1>
        <form onSubmit={save} className="grid md:grid-cols-6 gap-3">
          <input name="codigo" value={form.codigo} onChange={onChange} placeholder="Código" className="input md:col-span-2" required />
          <select name="tipo" value={form.tipo} onChange={onChange} className="input">
            <option value="percentual">Percentual (%)</option>
            <option value="fixo">Fixo (R$)</option>
          </select>
          <input name="valor" type="number" value={form.valor} onChange={onChange} placeholder="Valor" className="input" required />
          <input name="validade" type="date" value={form.validade} onChange={onChange} className="input" required />
          <input name="usosMaximos" type="number" value={form.usosMaximos} onChange={onChange} placeholder="Usos máximos" className="input" />
          <button className="btn md:col-span-6">Salvar</button>
        </form>
      </section>

      <section className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Código</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Validade</th>
              <th>Usos</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cupons.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="py-2">{c.codigo}</td>
                <td>{c.tipo}</td>
                <td>{c.valor}</td>
                <td>{new Date(c.validade).toLocaleDateString()}</td>
                <td>{c.usosAtuais || 0}/{c.usosMaximos}</td>
                <td>{c.ativo ? "Sim" : "Não"}</td>
                <td className="space-x-2">
                  <button onClick={() => toggleAtivo(c)} className="btn">Ativar/Desativar</button>
                  <button onClick={() => remove(c)} className="btn bg-red-600 hover:opacity-90">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
