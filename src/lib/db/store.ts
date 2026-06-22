import type { User, Session, ApiKey, Conversation, UsageRecord } from "@/types";

// In-memory store — swap for Prisma/Postgres by replacing these repositories
// All business logic should reference the repository layer, not this store directly

interface Store {
  users: Map<string, User>;
  sessions: Map<string, Session>;
  apiKeys: Map<string, ApiKey>;
  conversations: Map<string, Conversation>;
  usage: Map<string, UsageRecord>;
}

// Node.js global to persist store across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __vane_store: Store | undefined;
}

function createStore(): Store {
  return {
    users: new Map(),
    sessions: new Map(),
    apiKeys: new Map(),
    conversations: new Map(),
    usage: new Map(),
  };
}

export const db: Store = global.__vane_store ?? createStore();

if (process.env.NODE_ENV !== "production") {
  global.__vane_store = db;
}
