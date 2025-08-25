
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inscricao from "@/models/Inscricao";
import * as XLSX from "xlsx";
import { getTokenFromCookies, verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const token = getTokenFromCookies();
    if (!token) throw new Error("Unauthorized");
    verifyAdminToken(token);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "xlsx";

  const rows = await Inscricao.find({}).sort({ createdAt: -1 }).lean();

  const data = rows.map((r: any) => ({
    Nome: r.nome,
    Email: r.email,
    CPF: r.cpf,
    Telefone: r.telefone || "",
    ValorOriginal: r.valorOriginal,
    ValorFinal: r.valorFinal,
    StatusPagamento: r.statusPagamento,
    TransactionId: r.transactionId || "",
    Cupom: r.cupomCodigo || "",
    CriadoEm: new Date(r.createdAt).toISOString()
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inscricoes");

  if (format === "csv") {
    const csv = XLSX.utils.sheet_to_csv(ws);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv;charset=utf-8",
        "Content-Disposition": "attachment; filename=inscricoes.csv"
      }
    });
  }

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=inscricoes.xlsx"
    }
  });
}
