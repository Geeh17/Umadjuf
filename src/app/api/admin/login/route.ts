
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await Usuario.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 401 });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ message: "Senha inválida" }, { status: 401 });
  }

  const token = signAdminToken({ sub: String(user._id), email: user.email, role: user.role });
  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "admin_token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
