import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Formulario from "@/models/Formulario";

export async function GET() {
  await dbConnect();
  const list = await Formulario.find({}).sort({ data_inicio: 1 }).lean();
  return NextResponse.json(list);
}
