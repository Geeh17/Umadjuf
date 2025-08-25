import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inscricao from "@/models/Inscricao";

function validaAssinatura(_req: NextRequest) {
  const secret = process.env.INFINITYPAY_WEBHOOK_SECRET;
  if (!secret) return true;
  // TODO: implementar verificação real de assinatura conforme docs InfinityPay
  return true;
}

export async function POST(req: NextRequest) {
  try {
    if (!validaAssinatura(req)) {
      return NextResponse.json({ ok: false, message: "Assinatura inválida" }, { status: 401 });
    }
    await dbConnect();
    const payload = await req.json();
    const transactionId = payload?.id || payload?.transactionId || payload?.paymentId;
    const status = (payload?.status || "").toLowerCase();
    if (!transactionId) return NextResponse.json({ ok: false, message: "Sem transactionId" }, { status: 400 });

    const doc = await Inscricao.findOne({ transactionId });
    if (!doc) return NextResponse.json({ ok: false, message: "Inscrição não encontrada" });

    if (status.includes("paid") || status === "pago" || status === "approved") doc.statusPagamento = "pago";
    else if (status.includes("failed") || status === "falhou" || status === "rejected") doc.statusPagamento = "falhou";
    else doc.statusPagamento = "pendente";
    await doc.save();

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
  }
}
