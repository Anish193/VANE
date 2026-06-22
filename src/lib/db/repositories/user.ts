import { db } from "@/lib/db/store";
import type { User, PublicUser, UserRole, PlanTier } from "@/types";
import { randomUUID } from "crypto";

function toPublicUser(user: User): PublicUser {
  const { passwordHash: _, ...pub } = user;
  return pub;
}

export const userRepo = {
  findById(id: string): User | undefined {
    return db.users.get(id);
  },

  findByEmail(email: string): User | undefined {
    return [...db.users.values()].find((u) => u.email === email);
  },

  create(data: { email: string; name: string; passwordHash: string; role?: UserRole; plan?: PlanTier }): User {
    const id = randomUUID();
    const now = new Date().toISOString();
    const user: User = {
      id,
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
      role: data.role ?? "user",
      plan: data.plan ?? "free",
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
      preferences: {
        theme: "dark",
        defaultAgent: "helix",
        notifications: true,
        twoFactor: false,
      },
    };
    db.users.set(id, user);
    return user;
  },

  update(id: string, data: Partial<Omit<User, "id" | "createdAt">>): User | null {
    const user = db.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    db.users.set(id, updated);
    return updated;
  },

  toPublic: toPublicUser,

  all(): PublicUser[] {
    return [...db.users.values()].map(toPublicUser);
  },
};
