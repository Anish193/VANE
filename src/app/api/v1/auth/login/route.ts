import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validation/auth";
import { userRepo } from "@/lib/db/repositories/user";
import { sessionRepo } from "@/lib/db/repositories/session";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { ok, err, unauthorized } from "@/lib/api/response";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0]?.message ?? "Validation error");

  const { email, password } = parsed.data;
  const user = userRepo.findByEmail(email);
  if (!user) return unauthorized("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return unauthorized("Invalid credentials");

  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken({ sub: user.id, email: user.email, role: user.role, plan: user.plan }),
    signRefreshToken(user.id),
  ]);
  sessionRepo.create(user.id, refreshToken);

  return ok({ user: userRepo.toPublic(user), accessToken, refreshToken }, "Logged in successfully");
}
