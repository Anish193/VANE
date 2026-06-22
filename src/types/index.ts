export type UserRole = "admin" | "developer" | "user";
export type PlanTier = "free" | "pro" | "enterprise";
export type AgentId = "helix" | "omen" | "forge" | "atlas";
export type ProviderName = "openai" | "anthropic" | "gemini" | "ollama";
export type MessageRole = "user" | "assistant" | "system";
export type ApiKeyStatus = "active" | "revoked" | "expired";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  plan: PlanTier;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "dark" | "light" | "system";
  defaultAgent: AgentId;
  notifications: boolean;
  twoFactor: boolean;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanTier;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
  preferences: UserPreferences;
}

export interface Session {
  userId: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  keyHash: string;
  keyPrefix: string;
  status: ApiKeyStatus;
  permissions: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  agentId: AgentId;
  title: string;
  messages: Message[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  tokens?: number;
  metadata?: Record<string, unknown>;
}

export interface UsageRecord {
  userId: string;
  period: string;
  requests: number;
  tokens: number;
  agents: Record<AgentId, number>;
  providers: Record<ProviderName, number>;
}

export interface AgentConfig {
  id: AgentId;
  name: string;
  description: string;
  model: string;
  provider: ProviderName;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  capabilities: string[];
  enabled: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: Record<string, unknown>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
