export const APP_NAME = "VANE";
export const APP_FULL_NAME = "Voice-Activated Evidence Network";
export const APP_TAGLINE = "One Intelligence. Infinite Possibilities.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const JWT_SECRET = process.env.JWT_SECRET || "vane-dev-secret-change-in-production";
export const JWT_ACCESS_EXPIRES = "15m";
export const JWT_REFRESH_EXPIRES = "30d";

export const RATE_LIMIT = {
  FREE: 100,
  PRO: 5000,
  ENTERPRISE: 100000,
} as const;

export const PLANS = {
  free: { name: "Free", price: 0, requests: 100, agents: ["helix"] },
  pro: { name: "Pro", price: 29, requests: 5000, agents: ["helix", "omen"] },
  enterprise: { name: "Enterprise", price: 199, requests: 100000, agents: ["helix", "omen", "forge", "atlas"] },
} as const;

export const AGENTS = {
  helix: {
    id: "helix" as const,
    name: "Helix",
    tagline: "General Intelligence",
    description: "A versatile reasoning engine for everyday tasks, writing, analysis, and problem-solving.",
    color: "#3B82F6",
    gradient: "from-blue-500 to-cyan-500",
    icon: "⬡",
    capabilities: ["reasoning", "writing", "analysis", "code", "math", "summarization"],
    model: "gpt-4o",
    provider: "openai" as const,
  },
  omen: {
    id: "omen" as const,
    name: "Omen",
    tagline: "Investigative Reasoning Engine",
    description: "Deep investigative reasoning for complex research, pattern recognition, and strategic analysis.",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-pink-500",
    icon: "◈",
    capabilities: ["investigation", "research", "pattern-recognition", "strategic-analysis", "deduction"],
    model: "claude-sonnet-4-6",
    provider: "anthropic" as const,
  },
  forge: {
    id: "forge" as const,
    name: "Forge",
    tagline: "Engineering & Code Intelligence",
    description: "Purpose-built for software engineering, architecture design, and technical problem solving.",
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-500",
    icon: "⬟",
    capabilities: ["code-generation", "debugging", "architecture", "review", "testing"],
    model: "gpt-4o",
    provider: "openai" as const,
  },
  atlas: {
    id: "atlas" as const,
    name: "Atlas",
    tagline: "Knowledge & Memory System",
    description: "Long-term memory, knowledge graph construction, and semantic retrieval across your data.",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-500",
    icon: "◎",
    capabilities: ["memory", "knowledge-graph", "retrieval", "indexing", "summarization"],
    model: "gpt-4o",
    provider: "openai" as const,
  },
} as const;

export const NAV_LINKS = [
  { label: "Modules", href: "/modules" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];
