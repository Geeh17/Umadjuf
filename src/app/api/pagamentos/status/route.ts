import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inscricao from "@/models/Inscricao";
import { obterPagamento } from "@/lib/infinitypay";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ ok: false, message: "Informe id" }, { status: 400 });

    const api = await obterPagamento(id);
    const doc = await Inscricao.findOne({ transactionId: id });
    if (doc) {
      if (api.status === "paid" || api.status === "approved") doc.statusPagamento = "pago";
      else if (api.status === "failed" || api.status === "rejected") doc.statusPagamento = "falhou";
      else doc.statusPagamento = "pendente";
      await doc.save();
    }
    return NextResponse.json({ ok: true, status: api.status });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
  }
}
