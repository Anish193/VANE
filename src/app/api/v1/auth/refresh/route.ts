import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { sessionRepo } from "@/lib/db/repositories/session";
import { userRepo } from "@/lib/db/repositories/user";
import { ok, err, unauthorized } from "@/lib/api/response";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const { refreshToken } = body as { refreshToken?: string };
  if (!refreshToken) return err("Refresh token required");

  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) return unauthorized("Invalid or expired refresh token");

  const session = sessionRepo.findByToken(refreshToken);
  if (!session) return unauthorized("Session not found");

  const user = userRepo.findById(session.userId);
  if (!user) return unauthorized("User not found");

  sessionRepo.deleteByToken(refreshToken);
  const [newAccess, newRefresh] = await Promise.all([
    signAccessToken({ sub: user.id, email: user.email, role: user.role, plan: user.plan }),
    signRefreshToken(user.id),
  ]);
  sessionRepo.create(user.id, newRefresh);

  return ok({ accessToken: newAccess, refreshToken: newRefresh });
}
