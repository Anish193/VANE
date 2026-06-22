import { db } from "@/lib/db/store";
import type { ApiKey } from "@/types";
import { randomUUID, createHash } from "crypto";

function hashKey(rawKey: string): string {
  return createHash("sha256").update(rawKey).digest("hex");
}

function generateRawKey(): string {
  return `vane_${randomUUID().replace(/-/g, "")}`;
}

export const apiKeyRepo = {
  create(userId: string, name: string, permissions: string[] = ["chat"]): { apiKey: ApiKey; rawKey: string } {
    const rawKey = generateRawKey();
    const id = randomUUID();
    const now = new Date().toISOString();
    const apiKey: ApiKey = {
      id,
      userId,
      name,
      keyHash: hashKey(rawKey),
      keyPrefix: rawKey.slice(0, 12),
      status: "active",
      permissions,
      createdAt: now,
    };
    db.apiKeys.set(id, apiKey);
    return { apiKey, rawKey };
  },

  findByUserId(userId: string): ApiKey[] {
    return [...db.apiKeys.values()].filter((k) => k.userId === userId);
  },

  findByRawKey(rawKey: string): ApiKey | undefined {
    const hash = hashKey(rawKey);
    return [...db.apiKeys.values()].find((k) => k.keyHash === hash && k.status === "active");
  },

  revoke(id: string, userId: string): boolean {
    const key = db.apiKeys.get(id);
    if (!key || key.userId !== userId) return false;
    db.apiKeys.set(id, { ...key, status: "revoked" });
    return true;
  },

  markUsed(id: string): void {
    const key = db.apiKeys.get(id);
    if (key) db.apiKeys.set(id, { ...key, lastUsedAt: new Date().toISOString() });
  },
};
