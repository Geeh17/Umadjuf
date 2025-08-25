
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) router.push("/admin");
    else { const data = await res.json(); setMsg(data.message || "Falha no login"); }
  };

  return (
    <main className="max-w-md mx-auto card">
      <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn w-full">Entrar</button>
      </form>
      {msg && <p className="text-red-600 mt-3">{msg}</p>}
    </main>
  );
}
