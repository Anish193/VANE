import { sessionRepo } from "@/lib/db/repositories/session";
import { ok, err } from "@/lib/api/response";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }
  const { refreshToken } = body as { refreshToken?: string };
  if (refreshToken) sessionRepo.deleteByToken(refreshToken);
  return ok(null, "Logged out successfully");
}
