"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techStack = [
  { name: "Electron", category: "Desktop" },
  { name: "React", category: "UI" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind", category: "Styling" },
  { name: "Node.js", category: "Runtime" },
  { name: "Gemini", category: "AI Model" },
  { name: "Claude", category: "AI Model" },
  { name: "OpenAI", category: "AI Model" },
  { name: "Local AI", category: "AI Model" },
  { name: "MCP", category: "Protocol" },
];

const categoryColors: Record<string, string> = {
  Desktop: "#3B82F6",
  UI: "#60A5FA",
  Language: "#818CF8",
  Styling: "#A78BFA",
  Runtime: "#10B981",
  "AI Model": "#8B5CF6",
  Protocol: "#F59E0B",
};

export default function Technology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="technology" className="py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-4">
            Built On
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Best-in-Class Stack
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Powered by modern technologies and the world&apos;s leading AI models.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techStack.map((tech, i) => {
            const color = categoryColors[tech.category] || "#6B7280";
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-5 rounded-2xl border border-white/5 bg-[#0D1117] hover:border-white/10 transition-all duration-300 flex flex-col items-center gap-3 text-center hover:bg-[#111827]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all duration-300"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                    color,
                  }}
                >
                  {tech.name.slice(0, 2)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{tech.name}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{tech.category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
