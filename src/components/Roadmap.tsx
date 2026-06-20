"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    desc: "Core infrastructure, architecture design, and base system setup.",
    status: "complete",
  },
  {
    phase: "Phase 2",
    title: "Helix",
    desc: "Primary assistant — reasoning, planning, coding, and conversational intelligence.",
    status: "complete",
  },
  {
    phase: "Phase 3",
    title: "Memory",
    desc: "Persistent contextual memory engine and knowledge graph.",
    status: "active",
  },
  {
    phase: "Phase 4",
    title: "Omen",
    desc: "Investigation specialist — pattern recognition and evidence correlation.",
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Automation",
    desc: "Workflow automation, scheduled tasks, and cross-app orchestration.",
    status: "upcoming",
  },
  {
    phase: "Phase 6",
    title: "Developer Platform",
    desc: "Plugin SDK, API access, and third-party integrations.",
    status: "upcoming",
  },
  {
    phase: "Phase 7",
    title: "Public Release",
    desc: "Full public launch with complete documentation and community support.",
    status: "upcoming",
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roadmap" className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium mb-4">
            Development Roadmap
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            The Path Forward
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Deliberate milestones toward a complete AI operating system.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent" />

          <div className="flex flex-col gap-0">
            {phases.map((p, i) => {
              const isComplete = p.status === "complete";
              const isActive = p.status === "active";
              const StatusIcon = isComplete ? CheckCircle2 : isActive ? Clock : Circle;
              const iconColor = isComplete ? "#10B981" : isActive ? "#3B82F6" : "#374151";

              return (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 pb-8 last:pb-0"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: `${iconColor}15`,
                        border: `1px solid ${iconColor}30`,
                      }}
                    >
                      <StatusIcon className="w-4 h-4" style={{ color: iconColor }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-blue-500/20 bg-blue-500/5"
                        : isComplete
                        ? "border-white/5 bg-white/[0.02]"
                        : "border-white/5 bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-600">{p.phase}</span>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                          Active
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isComplete || isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className={`text-sm ${isComplete || isActive ? "text-gray-500" : "text-gray-700"}`}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
