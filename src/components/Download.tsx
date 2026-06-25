"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Monitor, Terminal, ArrowRight, Apple } from "lucide-react";

const platforms = [
  {
    icon: Monitor,
    name: "Windows",
    desc: "Windows 10/11 • x64",
    color: "#60A5FA",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1uStxt3lzfC4MgbYnmO9qgoZQ8tEKxAg4",
    note: null,
  },
  {
    icon: Terminal,
    name: "Linux",
    desc: "Ubuntu 20.04+ • Debian, Arch",
    color: "#F59E0B",
    downloadUrl: null,
    note: null,
  },
  {
    icon: Apple,
    name: "macOS",
    desc: "macOS support",
    color: "#6B7280",
    downloadUrl: null,
    note: "The dev is genuinely annoyed at Apple for making this so painful to port. macOS support is on hold.",
  },
];

export default function DownloadSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="download"
      className="py-20 px-6 relative overflow-hidden"
      ref={ref}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Coming Soon
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Available on Every Platform
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            VANE is currently in active development by Kinetic Studios. Join the community to get early access when it launches.
          </p>
        </motion.div>

        {/* Platform cards — all coming soon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {platforms.map((platform, i) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-white/5 bg-[#0D1117] flex flex-col items-center text-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${platform.color}10`,
                    border: `1px solid ${platform.color}20`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: platform.color }} />
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg">{platform.name}</h3>
                  <p className="text-gray-600 text-xs mt-1">{platform.desc}</p>
                </div>

                {platform.note ? (
                  <p className="text-gray-600 text-xs italic leading-relaxed">{platform.note}</p>
                ) : platform.downloadUrl ? (
                  <a
                    href={platform.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold text-center flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4" /> Download .zip
                  </a>
                ) : (
                  <div className="w-full py-2.5 rounded-xl border border-white/5 text-gray-600 text-sm font-semibold text-center">
                    Coming Soon
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-8 text-center"
        >
          <MessageCircle className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-white font-bold text-xl mb-2">Stay in the Loop</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Join the Kinetic Studios Discord to get early access announcements, updates, and connect with the community.
          </p>
          <a
            href="https://discord.gg/Vbt54wzj7B"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            Join Discord
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
