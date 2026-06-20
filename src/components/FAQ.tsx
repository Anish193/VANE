"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is VANE AI?",
    a: "VANE (Voice-Activated Evidence Network) is an AI Operating System that connects multiple specialized AI assistants into one unified platform. Unlike a simple chatbot, VANE can reason, automate, investigate, remember context, and collaborate across tools and workflows.",
  },
  {
    q: "Is VANE open source?",
    a: "VANE is currently in private beta. We are evaluating an open-source release for specific components. Check our GitHub and Discord for the latest updates.",
  },
  {
    q: "How is memory handled?",
    a: "VANE uses a local-first architecture where your memory and context data stay on your device by default. The memory engine is user-controlled — you can inspect, edit, or delete any stored memory at any time.",
  },
  {
    q: "Can I use my own API keys?",
    a: "Yes. VANE is designed to work with your own API keys for Gemini, Claude, OpenAI, and other supported models. You maintain full control over which providers you use.",
  },
  {
    q: "Does VANE support multiple AI models?",
    a: "Absolutely. VANE is model-agnostic and supports Gemini, Claude, GPT-4, local models (via Ollama or similar), and more. Each assistant can be configured to use different underlying models.",
  },
  {
    q: "Can I run VANE locally without internet?",
    a: "Yes, VANE supports local AI models for fully offline operation. Features like web search and certain APIs require internet, but the core intelligence can function entirely on-device.",
  },
  {
    q: "What is MCP support?",
    a: "MCP (Model Context Protocol) is an open standard that allows AI assistants to interact with external tools and services. VANE has native MCP support, enabling integrations with databases, code tools, and third-party services.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className={`text-sm font-semibold transition-colors ${open ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
          {faq.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-gray-600 transition-transform duration-300 ${open ? "rotate-180 text-blue-400" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="faq" className="py-20 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Got Questions?
          </h2>
          <p className="text-gray-500 text-lg">
            Answers to what people ask most.
          </p>
        </motion.div>

        <div className="bg-[#0D1117] rounded-2xl border border-white/5 px-6">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
