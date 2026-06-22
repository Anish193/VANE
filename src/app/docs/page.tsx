"use client";

import { motion } from "framer-motion";
import { Book, ArrowRight, Code, Key, MessageSquare, Zap, Terminal, Cpu } from "lucide-react";
import Link from "next/link";
import AppNavbar from "@/components/layout/AppNavbar";

const sections = [
  {
    icon: Zap,
    title: "Getting Started",
    desc: "Set up your account, get an API key, and make your first request in under 5 minutes.",
    links: ["Quickstart guide", "Authentication", "Rate limits", "SDKs & libraries"],
  },
  {
    icon: MessageSquare,
    title: "Chat API",
    desc: "Integrate VANE's AI modules into your applications using the REST API or streaming.",
    links: ["POST /v1/agents/chat", "Streaming responses", "Message history", "Context windows"],
  },
  {
    icon: Cpu,
    title: "AI Modules",
    desc: "Deep documentation for each VANE module — capabilities, prompting, and configuration.",
    links: ["Helix reference", "Omen reference", "Model selection", "System prompts"],
  },
  {
    icon: Key,
    title: "API Keys",
    desc: "Manage API keys, set permissions, monitor usage, and rotate credentials securely.",
    links: ["Create API key", "Key permissions", "Usage tracking", "Security best practices"],
  },
  {
    icon: Code,
    title: "Code Examples",
    desc: "Real-world examples in JavaScript, Python, cURL, and more to get you productive fast.",
    links: ["JavaScript SDK", "Python client", "cURL examples", "Next.js integration"],
  },
  {
    icon: Terminal,
    title: "API Reference",
    desc: "Complete reference for all VANE API endpoints, parameters, and response schemas.",
    links: ["Auth endpoints", "Agent endpoints", "User endpoints", "Error codes"],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#05070A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
      <AppNavbar />
      <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium mb-6">
            <Book className="w-3 h-3" /> Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything you need<br />to build with VANE
          </h1>
          <p className="text-white/50 text-lg">Comprehensive guides, API reference, and code examples.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 mb-10 flex items-center gap-4">
          <Code className="w-5 h-5 text-white/30 shrink-0" />
          <code className="text-sm text-white/60 font-mono flex-1">
            <span className="text-blue-400">POST</span> https://api.vane.ai/v1/agents/chat<br />
            <span className="text-white/30">Authorization: Bearer</span> <span className="text-amber-400">vane_••••••••••••</span>
          </code>
          <Link href="/dashboard/api-keys" className="text-xs text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap">
            Get API key →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map(({ icon: Icon, title, desc, links }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
              <div className="h-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-base font-bold text-white mb-2">{title}</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-col gap-1.5">
                  {links.map((link) => (
                    <button key={link} className="flex items-center gap-2 text-xs text-white/50 hover:text-white group/link transition-colors text-left">
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform shrink-0" />
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Full docs coming soon</h3>
          <p className="text-sm text-white/40 mb-4">We&apos;re building comprehensive documentation. In the meantime, explore the API directly or join our Discord.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/dashboard/api-keys" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium rounded-xl transition-colors">
              Get API key
            </Link>
            <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl border border-white/10 transition-colors">
              Join Discord
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
