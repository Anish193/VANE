"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Database,
  Wrench,
  Lock,
  Layers,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description:
      "Multiple specialized AI assistants working in concert — each with distinct expertise, collaborating seamlessly to solve complex problems.",
    accent: "#3B82F6",
  },
  {
    icon: Database,
    title: "Long-Term Memory",
    description:
      "Persistent contextual memory that learns, retains, and recalls. VANE remembers what matters so you never have to repeat yourself.",
    accent: "#8B5CF6",
  },
  {
    icon: Wrench,
    title: "Tool Integration",
    description:
      "Native support for local tools, APIs, MCP servers, web search, and automation workflows. One interface for everything.",
    accent: "#10B981",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "User-controlled memory and a local-first architecture. Your data stays yours — no cloud surveillance, no hidden telemetry.",
    accent: "#F59E0B",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Every capability evolves independently. Add, remove, or upgrade components without disrupting the system.",
    accent: "#EC4899",
  },
  {
    icon: Globe,
    title: "Cross Platform",
    description:
      "Desktop and Web today. Mobile on the horizon. VANE follows you wherever your thinking takes you.",
    accent: "#06B6D4",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-6 rounded-2xl border border-white/5 bg-[#0D1117] hover:border-white/10 transition-all duration-300 hover:bg-[#111827]"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${feature.accent}08 0%, transparent 60%)`,
        }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${feature.accent}15`, border: `1px solid ${feature.accent}25` }}
      >
        <Icon className="w-5 h-5" style={{ color: feature.accent }} />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-4">
            Core Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Intelligence, Unified
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything an AI system should be — built from the ground up with purpose.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
