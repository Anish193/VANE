import { withAuth } from "@/lib/api/auth-middleware";
import { userRepo } from "@/lib/db/repositories/user";
import { updateProfileSchema } from "@/lib/validation/auth";
import { ok, err, notFound } from "@/lib/api/response";

export const GET = withAuth(async (_req, { user }) => {
  const found = userRepo.findById(user.sub);
  if (!found) return notFound("User not found");
  return ok(userRepo.toPublic(found));
});

export const PATCH = withAuth(async (req, { user }) => {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0]?.message ?? "Validation error");

  const updated = userRepo.update(user.sub, parsed.data as Parameters<typeof userRepo.update>[1]);
  if (!updated) return notFound("User not found");
  return ok(userRepo.toPublic(updated), "Profile updated");
});
