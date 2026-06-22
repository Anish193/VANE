import { db } from "@/lib/db/store";
import type { Session } from "@/types";

export const sessionRepo = {
  create(userId: string, refreshToken: string): Session {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const session: Session = {
      userId,
      refreshToken,
      expiresAt,
      createdAt: new Date().toISOString(),
    };
    db.sessions.set(refreshToken, session);
    return session;
  },

  findByToken(token: string): Session | undefined {
    const session = db.sessions.get(token);
    if (!session) return undefined;
    if (new Date(session.expiresAt) < new Date()) {
      db.sessions.delete(token);
      return undefined;
    }
    return session;
  },

  deleteByToken(token: string): void {
    db.sessions.delete(token);
  },

  deleteByUserId(userId: string): void {
    for (const [key, session] of db.sessions) {
      if (session.userId === userId) db.sessions.delete(key);
    }
  },
};
