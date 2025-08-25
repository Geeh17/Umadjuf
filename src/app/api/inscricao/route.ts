import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inscricao from "@/models/Inscricao";
import Inscrito from "@/models/Inscrito";
import Cupom from "@/models/Cupom";
import Formulario from "@/models/Formulario";
import { criarPagamento } from "@/lib/infinitypay";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { cod_formulario, nome, email, cpf, telefone, codigoCupom } = body;
    if (!cod_formulario || !nome || !email) {
      return NextResponse.json({ success: false, message: "Dados incompletos" }, { status: 400 });
    }

    const form = await Formulario.findById(cod_formulario);
    if (!form) return NextResponse.json({ success: false, message: "Formulário inválido" }, { status: 400 });

    // preço base do formulário
    let total_pagar = Number(form.valor);
    let desconto = 0;
    let cupomCodigo: string | undefined;

    if (codigoCupom) {
      const cupom = await Cupom.findOne({ codigo: codigoCupom, situacao: "Ativo" });
      if (cupom && cupom.data_fim > new Date() && cupom.restante > 0) {
        cupomCodigo = cupom.codigo;
        desconto = Math.round((total_pagar * (cupom.desconto / 100)) * 100) / 100;
        total_pagar = Math.max(0, Math.round((total_pagar - desconto) * 100) / 100);
        cupom.restante -= 1;
        await cupom.save();
      }
    }

    const insc = await Inscricao.create({
      situacao_pagamento: "pendente",
      cod_formulario,
      link_pagamento: "",
      id_transacao: "",
      desconto,
      total_pago: 0,
      total_pagar,
      nome, email, cpf, telefone,
      cupomCodigo
    });

    await Inscrito.create({
      cod_inscricao: insc._id,
      nome, email, telefone
    });

    const pagamento = await criarPagamento({ valorCentavos: Math.round(total_pagar * 100), descricao: form.descricao, email, cpf });
    insc.id_transacao = pagamento.id || "";
    insc.link_pagamento = pagamento.link || "";
    await insc.save();

    return NextResponse.json({ success: true, inscricao: insc, pagamentoLink: insc.link_pagamento, transactionId: insc.id_transacao }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
