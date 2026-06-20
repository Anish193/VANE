"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(59,130,246,0.12) 0%, #05070A 60%)",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/6 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-6 pt-24 pb-12">

        {/* Studio badge */}
        <motion.div {...fade(0.1)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-xs font-semibold mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          A Kinetic Studios Product
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.2)}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.08] mb-6"
        >
          <span className="text-white block">The AI</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #34D399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Operating System
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fade(0.3)}
          className="text-xl sm:text-2xl font-light text-gray-400 mb-5 tracking-wide"
        >
          Built For Thinking.
        </motion.p>

        {/* Description */}
        <motion.p
          {...fade(0.38)}
          className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          VANE connects intelligent assistants into one unified system — capable of reasoning,
          automation, investigation, coding, memory, and creativity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.46)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://discord.gg/Vbt54wzj7B"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] min-w-[220px]"
          >
            <MessageCircle className="w-5 h-5" />
            Join the Community
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#architecture"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-300 hover:text-white border border-white/15 hover:border-white/30 rounded-2xl font-bold text-base transition-all duration-200 hover:bg-white/5 min-w-[220px]"
          >
            View Architecture
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.54)}
          className="flex items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "2+", label: "AI Assistants" },
            { value: "10+", label: "Capabilities" },
            { value: "∞", label: "Possibilities" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">{stat.value}</div>
              <div className="text-xs text-gray-600 font-medium tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-700"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
