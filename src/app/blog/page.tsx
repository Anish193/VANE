"use client";

import { motion } from "framer-motion";
import { Rss, ArrowRight } from "lucide-react";
import Link from "next/link";
import AppNavbar from "@/components/layout/AppNavbar";
import Badge from "@/components/ui/Badge";

const posts = [
  {
    slug: "introducing-vane",
    title: "Introducing VANE: The AI Operating Platform",
    excerpt: "Today we're excited to announce VANE — a unified AI platform that brings together specialized AI modules under one intelligent interface.",
    date: "June 2026",
    readTime: "5 min read",
    category: "Announcement",
    categoryColor: "blue" as const,
  },
  {
    slug: "omen-investigative-engine",
    title: "Meet Omen: Deep Investigative Reasoning at Scale",
    excerpt: "Omen is purpose-built for complex research, pattern recognition, and deductive reasoning tasks that require more than surface-level analysis.",
    date: "June 2026",
    readTime: "7 min read",
    category: "Product",
    categoryColor: "purple" as const,
  },
  {
    slug: "building-modular-ai",
    title: "Why We Built a Modular AI Architecture",
    excerpt: "A look at the engineering decisions behind VANE's module system — and why we believe specialization beats one-size-fits-all models.",
    date: "May 2026",
    readTime: "9 min read",
    category: "Engineering",
    categoryColor: "green" as const,
  },
  {
    slug: "vane-api-preview",
    title: "VANE API Preview: Build AI-Powered Apps in Minutes",
    excerpt: "Our REST API makes it simple to integrate VANE's AI modules into any application. Here's everything you need to know to get started.",
    date: "May 2026",
    readTime: "4 min read",
    category: "Developer",
    categoryColor: "amber" as const,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#05070A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
      <AppNavbar />
      <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium mb-6">
            <Rss className="w-3 h-3" /> Blog
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Updates from VANE</h1>
          <p className="text-white/50">Product news, engineering deep-dives, and AI insights.</p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge color={post.categoryColor}>{post.category}</Badge>
                      <span className="text-xs text-white/30">{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{post.title}</h2>
                    <p className="text-sm text-white/50 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 text-center">
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8">
            <p className="text-sm text-white/40 mb-3">More articles coming soon. Subscribe to get notified.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input placeholder="you@example.com" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50" />
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
