import { ok } from "@/lib/api/response";
import { db } from "@/lib/db/store";

export function GET() {
  return ok({
    status: "healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    db: {
      users: db.users.size,
      sessions: db.sessions.size,
      apiKeys: db.apiKeys.size,
      conversations: db.conversations.size,
    },
  });
}
