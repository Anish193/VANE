"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const perks = ["Access to Helix AI assistant", "100 requests/month free", "API key included", "No credit card required"];

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error || "Signup failed"); return; }
      localStorage.setItem("vane_access", data.data.accessToken);
      localStorage.setItem("vane_refresh", data.data.refreshToken);
      window.location.href = "/dashboard";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.08)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center"
      >
        <div className="hidden md:block">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-white font-bold text-lg">VANE</span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-3">Start building with AI</h2>
          <p className="text-white/50 mb-8">Join thousands of developers using VANE to power their AI applications.</p>
          <div className="flex flex-col gap-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm text-white/60">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="md:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-white font-bold text-lg">VANE</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
          </div>

          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-1 hidden md:block">Create your account</h2>
            <p className="text-white/40 text-sm mb-6 hidden md:block">Free forever. No credit card required.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input label="Full name" type="text" placeholder="Alex Johnson" value={form.name} onChange={set("name")} required />
              <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
              <Input label="Password" type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" value={form.password} onChange={set("password")} hint="At least 8 characters with uppercase and number" required />

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>
              )}

              <Button type="submit" loading={loading} fullWidth size="lg" className="mt-1">
                Create free account <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-white/40 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
