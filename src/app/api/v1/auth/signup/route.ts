import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validation/auth";
import { userRepo } from "@/lib/db/repositories/user";
import { sessionRepo } from "@/lib/db/repositories/session";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { created, err } from "@/lib/api/response";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0]?.message ?? "Validation error");

  const { name, email, password } = parsed.data;

  if (userRepo.findByEmail(email)) return err("Email already registered", 409);

  const passwordHash = await bcrypt.hash(password, 12);
  const user = userRepo.create({ name, email, passwordHash });

  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken({ sub: user.id, email: user.email, role: user.role, plan: user.plan }),
    signRefreshToken(user.id),
  ]);
  sessionRepo.create(user.id, refreshToken);

  return created(
    { user: userRepo.toPublic(user), accessToken, refreshToken },
    "Account created successfully"
  );
}
