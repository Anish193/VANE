"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  { label: "User", desc: "Voice, text, or automated trigger", color: "#60A5FA", delay: 0 },
  { label: "VANE Core", desc: "Unified orchestration layer", color: "#818CF8", delay: 0.08 },
  { label: "Memory Engine", desc: "Persistent contextual memory store", color: "#A78BFA", delay: 0.16 },
  { label: "Agent Router", desc: "Intelligent routing to the right assistant", color: "#C084FC", delay: 0.24 },
  { label: "Specialized Assistants", desc: "Helix · Omen · Future Agents", color: "#E879F9", delay: 0.32 },
  { label: "Tools & APIs", desc: "MCP servers · web search · automation", color: "#F472B6", delay: 0.4 },
  { label: "Operating System", desc: "Native OS integration layer", color: "#FB7185", delay: 0.48 },
  { label: "Internet", desc: "Real-time web access", color: "#FCA5A5", delay: 0.56 },
];

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="architecture" className="py-20 px-6 relative overflow-hidden" ref={ref}>
      {/* bg glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium mb-4">
            System Design
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            How VANE Thinks
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A layered architecture designed for speed, modularity, and depth.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center gap-0">
          {layers.map((layer, i) => (
            <div key={layer.label} className="flex flex-col items-center w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: layer.delay }}
                className="w-full relative group"
              >
                <div
                  className="relative px-6 py-4 rounded-xl border transition-all duration-300 cursor-default"
                  style={{
                    borderColor: `${layer.color}25`,
                    background: `${layer.color}08`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{layer.label}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{layer.desc}</p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full opacity-60"
                      style={{ background: layer.color }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              {i < layers.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.3, delay: layer.delay + 0.1, ease: "easeOut" }}
                  className="w-px h-6 origin-top"
                  style={{
                    background: `linear-gradient(to bottom, ${layer.color}50, ${layers[i + 1].color}30)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
