import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) { throw new Error("Defina JWT_SECRET no .env"); }

export function signAdminToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyAdminToken(token: string) { return jwt.verify(token, JWT_SECRET); }
export function getTokenFromCookies() { return cookies().get("admin_token")?.value; }
