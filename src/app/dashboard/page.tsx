"use client";

import { motion } from "framer-motion";
import { MessageSquare, Key, BarChart3, ArrowRight, TrendingUp, Cpu, Activity } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { AGENTS } from "@/lib/constants";
import type { AgentId } from "@/types";

const statIconBox: Record<string, string> = {
  blue:   "w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center",
  purple: "w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center",
  green:  "w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center",
  amber:  "w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center",
};
const statIconText: Record<string, string> = {
  blue: "w-3.5 h-3.5 text-blue-400", purple: "w-3.5 h-3.5 text-purple-400",
  green: "w-3.5 h-3.5 text-emerald-400", amber: "w-3.5 h-3.5 text-amber-400",
};
const statBar: Record<string, string> = {
  blue: "h-full bg-blue-500 rounded-full", purple: "h-full bg-purple-500 rounded-full",
  green: "h-full bg-emerald-500 rounded-full", amber: "h-full bg-amber-500 rounded-full",
};

const agentBadgeColor: Record<AgentId, "blue" | "purple" | "green" | "amber"> = {
  helix: "blue", omen: "purple", forge: "green", atlas: "amber",
};

const stats = [
  { label: "Requests this month", value: "0", max: "100", icon: Activity, color: "blue" },
  { label: "Tokens used", value: "0", max: "50000", icon: TrendingUp, color: "purple" },
  { label: "Active API keys", value: "0", max: null, icon: Key, color: "green" },
  { label: "Conversations", value: "0", max: null, icon: MessageSquare, color: "amber" },
];

const quickActions = [
  { label: "Start a conversation", href: "/chat", icon: MessageSquare, desc: "Chat with Helix or Omen" },
  { label: "Create API key", href: "/dashboard/api-keys", icon: Key, desc: "Integrate VANE into your app" },
  { label: "View usage analytics", href: "/dashboard/usage", icon: BarChart3, desc: "Monitor your consumption" },
];

const fade = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: i * 0.08 },
});

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div {...fade(0)}>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Welcome to VANE — your AI operating platform.</p>
      </motion.div>

      <motion.div {...fade(1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, max, icon: Icon, color }) => (
          <Card key={label} glass className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40 font-medium">{label}</span>
              <div className={statIconBox[color]}>
                <Icon className={statIconText[color]} />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{value}</span>
              {max && <span className="text-white/30 text-sm ml-1">/ {Number(max).toLocaleString()}</span>}
            </div>
            {max && (
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={statBar[color]} style={{ width: `${(Number(value) / Number(max)) * 100}%` }} />
              </div>
            )}
          </Card>
        ))}
      </motion.div>

      <motion.div {...fade(2)}>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map(({ label, href, icon: Icon, desc }) => (
            <Link key={href} href={href}>
              <Card hover glass className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                  </div>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div {...fade(3)}>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">AI Modules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(AGENTS).map((agent) => (
            <Link key={agent.id} href={`/chat?agent=${agent.id}`}>
              <Card hover glass className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white">{agent.name}</span>
                    <Badge color={agentBadgeColor[agent.id as AgentId]} dot>
                      {agent.id === "helix" || agent.id === "omen" ? "Available" : "Soon"}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/40 truncate">{agent.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
