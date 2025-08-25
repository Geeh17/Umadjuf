import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cupom from "@/models/Cupom";
import Formulario from "@/models/Formulario";

// tipagem do documento "achatado" (lean)
type CupomLean = {
  _id: string;
  codigo: string;
  tipo: "fixo" | "percentual";
  valor: number;
  quantidade: number;
  restante: number;
  data_fim: string | Date;
  situacao: string;
  cod_formulario?: string | null;
};

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const codigo = (searchParams.get("codigo") || "").trim();
  const formId = (searchParams.get("formId") || "").trim();
  const formDesc = (searchParams.get("formDesc") || "").trim();

  if (!codigo) {
    return NextResponse.json(
      { valido: false, mensagem: "Informe o código do cupom." },
      { status: 400 }
    );
  }

  // resolve formulário (opcional)
  let formObjectId: string | null = null;
  if (formId) formObjectId = formId;
  else if (formDesc) {
    const form = await Formulario.findOne({ descricao: formDesc }).lean<{
      _id: string;
    } | null>();
    if (form?._id) formObjectId = form._id;
  }

  // monta query: cupom ativo + código; se houver form, aceita do mesmo form OU global (null)
  const query: any = { codigo, situacao: "Ativo" };
  if (formObjectId) {
    query.$or = [{ cod_formulario: formObjectId }, { cod_formulario: null }];
  }

  // <<< importante: findOne + lean tipado (não é array)
  const cupom = await Cupom.findOne(query).lean<CupomLean | null>();

  if (!cupom) {
    return NextResponse.json(
      { valido: false, mensagem: "Cupom não encontrado ou inativo." },
      { status: 404 }
    );
  }

  const agora = new Date();
  const dataFim = new Date(cupom.data_fim);
  if (dataFim < agora) {
    return NextResponse.json(
      { valido: false, mensagem: "Cupom expirado." },
      { status: 400 }
    );
  }

  if (typeof cupom.restante !== "number" || cupom.restante <= 0) {
    return NextResponse.json(
      { valido: false, mensagem: "Cupom esgotado." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    valido: true,
    tipo: cupom.tipo, // "fixo" | "percentual"
    valor: cupom.valor, // número
    restante: cupom.restante,
    expiraEm: cupom.data_fim,
  });
}
