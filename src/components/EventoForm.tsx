"use client";
import { useEffect, useMemo, useState } from "react";

type EventoFormProps = {
  descricao: string; // "AVIVA UMADJUF 2025" | "ACAMP UMADJUF 2026"
  mostrarCupom?: boolean; // true só no ACAMP
};

type Formulario = {
  _id: string;
  descricao: string;
  valor: number;
  data_inicio: string;
  data_fim: string;
};

export default function EventoForm({
  descricao,
  mostrarCupom = false,
}: EventoFormProps) {
  const [formInfo, setFormInfo] = useState<Formulario | null>(null);
  const [status, setStatus] = useState<{
    ok?: boolean;
    msg?: string;
    link?: string;
    id?: string;
  }>({});
  const [dados, setDados] = useState({
    nome: "",
    genero: "M",
    email: "",
    telefone: "",
    dataNascimento: "",
    telefoneResponsavel: "",
    nomeResponsavel: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefoneEmergencia: "",
    lider: "",
    bairroCongregacao: "",
    cpf: "",
    codigoCupom: "",
  });

  useEffect(() => {
    (async () => {
      const list: Formulario[] = await fetch("/api/formularios").then((r) =>
        r.json()
      );
      const f =
        list.find(
          (x) => x.descricao.toLowerCase() === descricao.toLowerCase()
        ) || null;
      setFormInfo(f);
    })();
  }, [descricao]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "radio") setDados((d) => ({ ...d, genero: value }));
    else setDados((d) => ({ ...d, [name]: value }));
  };

  const titulo = useMemo(
    () => `Inscrição para ${formInfo?.descricao ?? descricao}`,
    [formInfo, descricao]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({});
    if (!formInfo?._id)
      return setStatus({
        ok: false,
        msg: "Formulário não encontrado. Rode o seed.",
      });

    const payload: any = { cod_formulario: formInfo._id, ...dados };
    if (payload.dataNascimento) {
      const [dd, mm, yyyy] = payload.dataNascimento.split("/");
      if (yyyy && mm && dd)
        payload.dataNascimento = new Date(+yyyy, +mm - 1, +dd).toISOString();
    }

    const res = await fetch("/api/inscricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok)
      setStatus({
        ok: true,
        msg: "Inscrição criada! Finalize o pagamento.",
        link: data?.pagamentoLink || "",
        id: data?.transactionId,
      });
    else setStatus({ ok: false, msg: data.message || "Erro na inscrição" });
  };

  return (
    <main className="py-6">
      <h1 className="text-center text-2xl font-bold mb-6">{titulo}</h1>
      <form onSubmit={submit} className="max-w-3xl mx-auto">
        <div className="card">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Nome</label>
              <input
                name="nome"
                className="input"
                value={dados.nome}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="text-sm">Gênero</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="genero"
                    value="M"
                    checked={dados.genero === "M"}
                    onChange={onChange}
                  />{" "}
                  Masculino
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="genero"
                    value="F"
                    checked={dados.genero === "F"}
                    onChange={onChange}
                  />{" "}
                  Feminino
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                value={dados.email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="text-sm">Telefone</label>
              <input
                name="telefone"
                className="input"
                value={dados.telefone}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">Data de nascimento</label>
              <input
                name="dataNascimento"
                placeholder="DD/MM/AAAA"
                className="input"
                value={dados.dataNascimento}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Telefone do responsável</label>
              <input
                name="telefoneResponsavel"
                className="input"
                value={dados.telefoneResponsavel}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">Nome do responsável</label>
              <input
                name="nomeResponsavel"
                className="input"
                value={dados.nomeResponsavel}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Rua</label>
              <input
                name="rua"
                className="input"
                value={dados.rua}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">Número</label>
              <input
                name="numero"
                className="input"
                value={dados.numero}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Complemento</label>
              <input
                name="complemento"
                className="input"
                value={dados.complemento}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">Bairro</label>
              <input
                name="bairro"
                className="input"
                value={dados.bairro}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Cidade</label>
              <input
                name="cidade"
                className="input"
                value={dados.cidade}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">UF (Ex. MG)</label>
              <input
                name="estado"
                className="input"
                value={dados.estado}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Telefone de emergência</label>
              <input
                name="telefoneEmergencia"
                className="input"
                value={dados.telefoneEmergencia}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="text-sm">Nome do líder</label>
              <input
                name="lider"
                className="input"
                value={dados.lider}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm">Bairro da congregação</label>
              <input
                name="bairroCongregacao"
                className="input"
                value={dados.bairroCongregacao}
                onChange={onChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm">CPF</label>
              <input
                name="cpf"
                className="input"
                value={dados.cpf}
                onChange={onChange}
                required
              />
            </div>

            {mostrarCupom && (
              <div className="md:col-span-2">
                <label className="text-sm">Cupom (opcional)</label>
                <input
                  name="codigoCupom"
                  className="input"
                  value={dados.codigoCupom}
                  onChange={onChange}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full mt-4 bg-[#cf6f35] hover:bg-[#b75f2f]"
          >
            Finalizar Inscrição
          </button>

          {status.msg && (
            <p
              className={`mt-4 ${
                status.ok ? "text-green-700" : "text-red-600"
              }`}
            >
              {status.msg}
            </p>
          )}
          {status.link && (
            <a
              href={status.link}
              className="underline text-blue-700 mt-2 inline-block"
              target="_blank"
            >
              Abrir pagamento
            </a>
          )}
          {status.id && (
            <button
              onClick={async () => {
                const r = await fetch(`/api/pagamentos/status?id=${status.id}`);
                const j = await r.json();
                if (j.ok)
                  setStatus((s) => ({ ...s, msg: `Status: ${j.status}` }));
                else
                  setStatus((s) => ({
                    ...s,
                    msg: j.message || "Falha ao consultar status",
                  }));
              }}
              className="btn mt-2"
            >
              Verificar pagamento
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
