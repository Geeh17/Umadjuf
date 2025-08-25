import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cupom from "@/models/Cupom";
import Formulario from "@/models/Formulario";

// Aceita dd/mm/aaaa e yyyy-mm-dd
function parseDateAny(s?: string) {
  if (!s) return undefined;
  const str = String(s).trim();

  // dd/mm/aaaa
  if (str.includes("/")) {
    const [dd, mm, yyyy] = str.split("/");
    if (dd && mm && yyyy) {
      const d = new Date(+yyyy, +mm - 1, +dd);
      return isNaN(d.getTime()) ? undefined : d;
    }
  }

  // yyyy-mm-dd (value padrão de <input type="date">)
  const d = new Date(str);
  return isNaN(d.getTime()) ? undefined : d;
}

export async function GET() {
  await dbConnect();
  const list = await Cupom.find({}).sort({ createdAt: -1 }).lean();

  // Mapeia campos para o que a UI espera
  const mapped = list.map((c: any) => ({
    ...c,
    ativo: c.situacao === "Ativo", // boolean para tabela
    validade: c.data_fim, // alias para a coluna de validade
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // LOG do payload que chegou do front
    console.log("📩 CUPOM RECEBIDO:", body);

    let {
      codigo,
      tipo,
      valor,
      validade,
      usos, // novo
      formularioDescricao,
      // legado
      desconto,
      data_fim,
      quantidade,
      // variações que podem vir do front
      usosMaximos, // aceito também
      ativo, // ignorado (usamos 'situacao')
    } = body;

    if (!codigo) {
      console.log("❌ Falhou: código não informado");
      return NextResponse.json(
        { message: "Informe o código" },
        { status: 400 }
      );
    }

    // normaliza tipo vindo do select ("Fixo (R$)"/"Percentual (%)") ou legado
    const tipoFmt = (tipo || (desconto != null ? "percentual" : undefined))
      ?.toString()
      .toLowerCase()
      .trim();

    let _tipo: "fixo" | "percentual" | undefined;
    if (tipoFmt?.startsWith("fixo")) _tipo = "fixo";
    else if (tipoFmt?.startsWith("percent")) _tipo = "percentual";
    else _tipo = tipoFmt as any;

    const _valor = Number(valor != null ? valor : desconto);

    // aceita usos / quantidade / usosMaximos
    const _usos = Number(
      usos != null
        ? usos
        : quantidade != null
        ? quantidade
        : usosMaximos != null
        ? usosMaximos
        : NaN
    );

    // aceita validade (dd/mm/aaaa ou yyyy-mm-dd) ou data_fim
    const _dataFim = data_fim
      ? parseDateAny(data_fim)
      : validade
      ? parseDateAny(validade)
      : undefined;

    console.log("📝 Normalizado:", { _tipo, _valor, _usos, _dataFim });

    if (!_tipo || !["fixo", "percentual"].includes(_tipo)) {
      console.log("❌ Tipo inválido:", _tipo);
      return NextResponse.json(
        { message: "Tipo inválido (use 'fixo' ou 'percentual')" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(_valor)) {
      console.log("❌ Valor inválido:", _valor);
      return NextResponse.json(
        { message: "Valor do desconto inválido" },
        { status: 400 }
      );
    }
    if (!_dataFim || isNaN(_dataFim.getTime())) {
      console.log("❌ Data inválida:", _dataFim);
      return NextResponse.json(
        { message: "Informe a validade (dd/mm/aaaa ou yyyy-mm-dd)" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(_usos)) {
      console.log("❌ Quantidade inválida:", _usos);
      return NextResponse.json(
        { message: "Informe a quantidade de usos" },
        { status: 400 }
      );
    }

    let cod_formulario: any = null;
    if (formularioDescricao) {
      console.log("🔎 Procurando formulário:", formularioDescricao);
      const form = await Formulario.findOne({ descricao: formularioDescricao });
      if (form) cod_formulario = form._id;
    }

    const exists = await Cupom.findOne({ codigo });
    if (exists) {
      console.log("⚠️ Código já existe:", codigo);
      return NextResponse.json(
        { message: "Código já existe" },
        { status: 409 }
      );
    }

    const createdDoc = await Cupom.create({
      codigo,
      tipo: _tipo,
      valor: _valor,
      quantidade: _usos,
      restante: _usos,
      data_fim: _dataFim,
      situacao: "Ativo", // já nasce ativo
      cod_formulario,
    });

    const created = createdDoc.toObject();

    console.log("✅ Criado cupom:", created);

    // devolve com os aliases que a UI usa
    return NextResponse.json(
      {
        ...created,
        ativo: true,
        validade: created.data_fim,
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("💥 ERRO /api/admin/cupons:", e);
    return NextResponse.json(
      { message: e.message || "Erro interno" },
      { status: 500 }
    );
  }
}
