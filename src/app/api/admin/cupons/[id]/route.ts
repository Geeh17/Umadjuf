
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cupom from "@/models/Cupom";
import { getTokenFromCookies, verifyAdminToken } from "@/lib/auth";

function authOr401() {
  const token = getTokenFromCookies();
  if (!token) throw new Error("Unauthorized");
  verifyAdminToken(token);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try { authOr401(); } catch { return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); }
  const body = await req.json();
  const updated = await Cupom.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try { authOr401(); } catch { return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); }
  await Cupom.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
