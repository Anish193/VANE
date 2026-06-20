"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Search, Sparkles } from "lucide-react";

const assistants = [
  {
    name: "Helix",
    role: "Primary Assistant",
    description:
      "The core of VANE. Helix excels at general reasoning, strategic planning, coding, and natural conversation. It's the intelligence you reach for first.",
    capabilities: ["General Reasoning", "Strategic Planning", "Code Generation", "Conversations", "Task Orchestration"],
    icon: Code2,
    status: "Available",
    accent: "#3B82F6",
    gradient: "from-blue-600/20 to-purple-600/10",
  },
  {
    name: "Omen",
    role: "Investigation Specialist",
    description:
      "Omen specializes in deep pattern recognition, evidence correlation, and timeline reconstruction. It connects the dots others miss.",
    capabilities: ["Pattern Recognition", "Evidence Correlation", "Timeline Reconstruction", "Context Linking", "Anomaly Detection"],
    icon: Search,
    status: "In Development",
    accent: "#8B5CF6",
    gradient: "from-purple-600/20 to-pink-600/10",
  },
];

export default function Intelligence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="intelligence" className="py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Meet the Intelligence
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Specialized. Collaborative.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Each assistant is purpose-built for its domain, yet unified under one orchestration layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assistants.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative rounded-3xl border border-white/5 bg-[#0D1117] overflow-hidden group"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
                />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${a.accent}20`, border: `1px solid ${a.accent}30` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: a.accent }} />
                        </div>
                        <div>
                          <h3 className="text-white text-2xl font-black tracking-tight">{a.name}</h3>
                          <p className="text-gray-500 text-sm">{a.role}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${a.accent}15`,
                        color: a.accent,
                        border: `1px solid ${a.accent}25`,
                      }}
                    >
                      {a.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{a.description}</p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2">
                    {a.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 border border-white/8 bg-white/3"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 rounded-2xl border border-dashed border-white/8 bg-white/[0.02] p-6 text-center"
        >
          <Sparkles className="w-5 h-5 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-600 text-sm font-medium">More assistants are on the way. The ecosystem grows.</p>
        </motion.div>
      </div>
    </section>
  );
}
