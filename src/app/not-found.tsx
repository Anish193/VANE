"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center">
        <div className="text-[120px] font-bold text-white/5 leading-none mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-white mb-2 -mt-8">Page not found</h1>
        <p className="text-white/40 text-sm mb-8">This page doesn&apos;t exist or has been moved.</p>
        <div className="flex items-center gap-3 justify-center">
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium rounded-xl transition-colors">
            <Home className="w-4 h-4" /> Go home
          </Link>
          <button onClick={() => history.back()} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl border border-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
