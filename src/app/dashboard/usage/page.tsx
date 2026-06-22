"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Cpu, Activity } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { AGENTS } from "@/lib/constants";
import type { AgentId } from "@/types";

const mockUsage = [
  { day: "Mon", requests: 4 },
  { day: "Tue", requests: 12 },
  { day: "Wed", requests: 8 },
  { day: "Thu", requests: 19 },
  { day: "Fri", requests: 6 },
  { day: "Sat", requests: 2 },
  { day: "Sun", requests: 0 },
];
const maxReq = Math.max(...mockUsage.map((d) => d.requests));

const iconBoxStyle: Record<string, string> = {
  blue:   "w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center",
  purple: "w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center",
  green:  "w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center",
  amber:  "w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center",
};
const iconTextStyle: Record<string, string> = {
  blue: "w-3.5 h-3.5 text-blue-400", purple: "w-3.5 h-3.5 text-purple-400",
  green: "w-3.5 h-3.5 text-emerald-400", amber: "w-3.5 h-3.5 text-amber-400",
};

const agentBadgeColor: Record<AgentId, "green" | "gray"> = {
  helix: "green", omen: "green", forge: "gray", atlas: "gray",
};

const usageByAgent: Record<AgentId, number> = { helix: 51, omen: 0, forge: 0, atlas: 0 };

export default function UsagePage() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Usage Analytics</h1>
        <p className="text-white/40 text-sm">Monitor your API consumption and activity.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Requests", value: "51", sub: "/ 100 this month", icon: Activity, color: "blue" },
          { label: "Tokens", value: "12.4K", sub: "/ 50K this month", icon: TrendingUp, color: "purple" },
          { label: "Avg latency", value: "420ms", sub: "last 7 days", icon: BarChart3, color: "green" },
          { label: "Active modules", value: "1", sub: "of 4 available", icon: Cpu, color: "amber" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <Card key={label} glass>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40">{label}</span>
              <div className={iconBoxStyle[color]}>
                <Icon className={iconTextStyle[color]} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
            <div className="text-xs text-white/30">{sub}</div>
          </Card>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card glass>
          <h2 className="text-sm font-semibold text-white mb-6">Requests — last 7 days</h2>
          <div className="flex items-end gap-3 h-32">
            {mockUsage.map(({ day, requests }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: maxReq > 0 ? `${(requests / maxReq) * 100}%` : "4px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full bg-blue-500/60 hover:bg-blue-500 rounded-t-md transition-colors cursor-pointer min-h-[4px]"
                  />
                </div>
                <span className="text-[10px] text-white/30">{day}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Usage by Module</h2>
        <div className="flex flex-col gap-3">
          {Object.values(AGENTS).map((agent) => {
            const used = usageByAgent[agent.id as AgentId];
            const max = 100;
            const pct = (used / max) * 100;
            const isActive = agent.id === "helix" || agent.id === "omen";
            return (
              <Card key={agent.id} glass className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{agent.name}</span>
                      <Badge color={agentBadgeColor[agent.id as AgentId]} dot>
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <span className="text-xs text-white/40">{used} / {max} req</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`h-full bg-gradient-to-r ${agent.gradient} rounded-full`}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
