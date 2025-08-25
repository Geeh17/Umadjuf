
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, verifyAdminToken } from "@/lib/auth";

export async function GET(_req: NextRequest) {
  try {
    const token = getTokenFromCookies();
    if (!token) return NextResponse.json({ ok: false }, { status: 401 });
    const payload = verifyAdminToken(token) as any;
    return NextResponse.json({ ok: true, user: { email: payload.email, role: payload.role } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
