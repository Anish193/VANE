"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap, RotateCcw, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AGENTS } from "@/lib/constants";
import type { AgentId, Message } from "@/types";
import { randomUUID } from "crypto";

function genId() {
  return Math.random().toString(36).slice(2);
}

function AgentSelector({ selected, onSelect }: { selected: AgentId; onSelect: (id: AgentId) => void }) {
  const [open, setOpen] = useState(false);
  const agent = AGENTS[selected];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all bg-gradient-to-br ${agent.gradient} bg-opacity-10 border-white/10 hover:border-white/20`}
      >
        <span>{agent.icon}</span>
        <span className="text-white">{agent.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-white/50" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 left-0 w-64 bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
          >
            {Object.values(AGENTS).map((a) => (
              <button
                key={a.id}
                onClick={() => { onSelect(a.id as AgentId); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${selected === a.id ? "bg-white/5" : ""}`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                  {a.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{a.name}</p>
                  <p className="text-xs text-white/40">{a.tagline}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatContent() {
  const searchParams = useSearchParams();
  const defaultAgent = (searchParams.get("agent") as AgentId) || "helix";
  const [agentId, setAgentId] = useState<AgentId>(defaultAgent);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function adjustHeight() {
    const t = textareaRef.current;
    if (t) { t.style.height = "auto"; t.style.height = `${Math.min(t.scrollHeight, 200)}px`; }
  }

  async function send() {
    if (!input.trim() || streaming) return;
    const userMsg: Message = { id: genId(), role: "user", content: input.trim(), timestamp: new Date().toISOString() };
    const assistantMsgId = genId();
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setMessages((m) => [...m, { id: assistantMsgId, role: "assistant", content: "", timestamp: new Date().toISOString() }]);

    try {
      const token = localStorage.getItem("vane_access");
      const res = await fetch("/api/v1/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ agentId, messages: [...messages, userMsg] }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const { delta } = JSON.parse(line.slice(6));
            if (delta) setMessages((m) => m.map((msg) => msg.id === assistantMsgId ? { ...msg, content: msg.content + delta } : msg));
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      setMessages((m) => m.map((msg) => msg.id === assistantMsgId ? { ...msg, content: "⚠ Something went wrong. Please check your API keys in settings." } : msg));
    } finally {
      setStreaming(false);
    }
  }

  const agent = AGENTS[agentId];

  return (
    <div className="flex flex-col h-screen bg-[#05070A]">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium text-sm">VANE Chat</span>
        </div>
        <AgentSelector selected={agentId} onSelect={setAgentId} />
        <button onClick={() => setMessages([])} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-16">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4`}>
                {agent.icon}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{agent.name}</h2>
              <p className="text-white/40 text-sm max-w-xs mx-auto">{agent.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {["Explain a concept", "Write some code", "Analyze this data", "Create a plan"].map((s) => (
                  <button key={s} onClick={() => { setInput(s); textareaRef.current?.focus(); }} className="px-3 py-1.5 text-xs text-white/50 bg-white/5 hover:bg-white/10 border border-white/8 rounded-full transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex flex-col gap-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : `bg-gradient-to-br ${agent.gradient} text-white`
                  }`}>
                    {msg.role === "user" ? "U" : agent.icon}
                  </div>
                  <div className={`flex-1 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-500/20 border border-blue-500/20 text-white rounded-tr-sm"
                        : "bg-white/[0.04] border border-white/8 text-white/90 rounded-tl-sm"
                    }`}>
                      {msg.content}
                      {streaming && msg.role === "assistant" && messages[messages.length - 1]?.id === msg.id && (
                        <span className="inline-block w-1 h-4 bg-white/60 rounded animate-pulse ml-0.5" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-white/5 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-blue-500/40 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); adjustHeight(); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={`Message ${agent.name}…`}
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm text-white placeholder:text-white/30 focus:outline-none leading-relaxed"
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || streaming}
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                input.trim() && !streaming ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-white/5 text-white/20"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-white/20 text-center mt-2">Shift+Enter for new line · Enter to send</p>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05070A] flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ChatContent />
    </Suspense>
  );
}
