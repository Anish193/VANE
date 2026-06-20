"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, Search, Mic, Zap, FileText, Brain,
  Image, BookOpen, ClipboardList, Users, Plug, Box, Puzzle,
} from "lucide-react";

const capabilities = [
  { icon: Code2, label: "AI Coding", color: "#3B82F6" },
  { icon: Search, label: "Research", color: "#8B5CF6" },
  { icon: Mic, label: "Voice Control", color: "#10B981" },
  { icon: Zap, label: "Automation", color: "#F59E0B" },
  { icon: FileText, label: "Document Analysis", color: "#EC4899" },
  { icon: Brain, label: "Reasoning", color: "#60A5FA" },
  { icon: Image, label: "Image Understanding", color: "#A78BFA" },
  { icon: BookOpen, label: "Knowledge Memory", color: "#34D399" },
  { icon: ClipboardList, label: "Task Planning", color: "#FBBF24" },
  { icon: Users, label: "Multi-Agent Collaboration", color: "#F87171" },
  { icon: Plug, label: "API Integration", color: "#06B6D4" },
  { icon: Box, label: "MCP Support", color: "#C084FC" },
  { icon: Puzzle, label: "Plugin System", color: "#FB923C" },
];

export default function Capabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="capabilities" className="py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-4">
            What VANE Can Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Full Spectrum Intelligence
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From raw coding to deep research, VANE handles it with context and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const isHovered = hovered === cap.label;
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onMouseEnter={() => setHovered(cap.label)}
                onMouseLeave={() => setHovered(null)}
                className="relative p-4 rounded-xl border border-white/5 bg-[#0D1117] flex flex-col items-center gap-3 cursor-default transition-all duration-300"
                style={{
                  borderColor: isHovered ? `${cap.color}40` : undefined,
                  background: isHovered ? `${cap.color}0A` : undefined,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isHovered ? `${cap.color}20` : `${cap.color}10`,
                    border: `1px solid ${cap.color}20`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: cap.color }} />
                </div>
                <span className="text-xs font-medium text-gray-400 text-center leading-tight">
                  {cap.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
