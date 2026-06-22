import { withAuth } from "@/lib/api/auth-middleware";
import { apiKeyRepo } from "@/lib/db/repositories/apiKey";
import { ok, notFound } from "@/lib/api/response";

export const DELETE = withAuth(async (_req, { user, params }) => {
  const id = params?.id;
  if (!id) return notFound();
  const success = apiKeyRepo.revoke(id, user.sub);
  if (!success) return notFound("API key not found");
  return ok(null, "API key revoked");
});
