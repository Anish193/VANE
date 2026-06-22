import { withAuth } from "@/lib/api/auth-middleware";
import { apiKeyRepo } from "@/lib/db/repositories/apiKey";
import { z } from "zod";
import { ok, created, err } from "@/lib/api/response";

const createKeySchema = z.object({
  name: z.string().min(1).max(80),
  permissions: z.array(z.string()).optional(),
});

export const GET = withAuth(async (_req, { user }) => {
  const keys = apiKeyRepo.findByUserId(user.sub).map(({ keyHash: _, ...k }) => k);
  return ok(keys);
});

export const POST = withAuth(async (req, { user }) => {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const parsed = createKeySchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0]?.message ?? "Validation error");

  const existing = apiKeyRepo.findByUserId(user.sub);
  if (existing.filter((k) => k.status === "active").length >= 10) {
    return err("Maximum 10 active API keys allowed");
  }

  const { apiKey, rawKey } = apiKeyRepo.create(user.sub, parsed.data.name, parsed.data.permissions);
  const { keyHash: _, ...safeKey } = apiKey;
  return created({ ...safeKey, key: rawKey }, "API key created — save this key, it won't be shown again");
});
