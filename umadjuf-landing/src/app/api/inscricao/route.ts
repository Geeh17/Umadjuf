import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Inscricao } from "@/models/Inscricao";

export async function POST(request: Request) {
  try {
    const dados = await request.json();
    await connectMongoDB();

    const nova = await Inscricao.create(dados);

    return NextResponse.json(nova, { status: 201 });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json({ error: "Erro ao inscrever" }, { status: 500 });
  }
}
