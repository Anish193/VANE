"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import AppNavbar from "@/components/layout/AppNavbar";
import { AGENTS } from "@/lib/constants";

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-[#05070A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
      <AppNavbar />
      <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium mb-6">
            <Zap className="w-3 h-3" /> AI Modules
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Specialized intelligence<br />for every task
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            VANE&apos;s modular AI architecture lets each assistant specialize deeply, while sharing a unified interface and memory layer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(AGENTS).map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/chat?agent=${agent.id}`} className="group block h-full">
                <div className="h-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/8 hover:border-white/15 rounded-3xl p-8 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {agent.icon}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      agent.id === "helix" || agent.id === "omen"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-white/5 text-white/30 border border-white/8"
                    }`}>
                      {agent.id === "helix" || agent.id === "omen" ? "Available" : "Coming soon"}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{agent.name}</h2>
                  <p className="text-sm text-blue-400/80 font-medium mb-3">{agent.tagline}</p>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">{agent.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {agent.capabilities.map((cap) => (
                      <span key={cap} className="px-2.5 py-1 text-xs text-white/40 bg-white/4 border border-white/8 rounded-full">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    {agent.id === "helix" || agent.id === "omen" ? "Open in chat" : "Notify me"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
          <div className="bg-white/[0.02] border border-white/8 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-white mb-2">Building something?</h3>
            <p className="text-sm text-white/40 mb-4">All VANE modules are accessible via API. Get your key and start building in minutes.</p>
            <Link href="/dashboard/api-keys" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium rounded-xl transition-colors">
              Get API access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
