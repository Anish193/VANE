"use client";

import { motion } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import AppNavbar from "@/components/layout/AppNavbar";
import { PLANS } from "@/lib/constants";

const planDetails = {
  free: {
    color: "white",
    gradient: "",
    features: ["100 requests/month", "Helix AI assistant", "1 API key", "Standard latency", "Community support"],
    cta: "Get started free",
    ctaHref: "/auth/signup",
    popular: false,
  },
  pro: {
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    features: ["5,000 requests/month", "Helix + Omen AI assistants", "10 API keys", "Priority latency", "Email support", "Usage analytics", "Webhook integrations"],
    cta: "Start Pro trial",
    ctaHref: "/auth/signup",
    popular: true,
  },
  enterprise: {
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    features: ["100,000 requests/month", "All 4 AI modules", "Unlimited API keys", "Dedicated infrastructure", "SLA guarantee", "Slack support", "SSO / SAML", "Custom model fine-tuning", "Audit logs"],
    cta: "Contact sales",
    ctaHref: "mailto:hello@vane.ai",
    popular: false,
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#05070A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
      <AppNavbar />
      <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium mb-6">
            <Zap className="w-3 h-3" /> Simple pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Start free.<br />Scale as you grow.
          </h1>
          <p className="text-white/50 text-lg">No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {(Object.entries(PLANS) as [keyof typeof PLANS, typeof PLANS.free][]).map(([key, plan], i) => {
            const details = planDetails[key];
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative">
                {details.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Most popular
                  </div>
                )}
                <div className={`h-full rounded-3xl p-8 border transition-all duration-300 ${
                  details.popular
                    ? "bg-blue-500/5 border-blue-500/30"
                    : "bg-white/[0.02] border-white/8"
                }`}>
                  <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-white/40 text-sm">/month</span>
                  </div>

                  <Link
                    href={details.ctaHref}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all mb-8 ${
                      details.popular
                        ? "bg-blue-500 hover:bg-blue-400 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    {details.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex flex-col gap-3">
                    {details.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          details.popular ? "bg-blue-500/20 border border-blue-500/30" : "bg-white/5 border border-white/10"
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${details.popular ? "text-blue-400" : "text-white/50"}`} />
                        </div>
                        <span className="text-sm text-white/60">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-16">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { q: "Is there a free trial?", a: "The Free plan is permanent — no trial period. Upgrade only when you need more." },
              { q: "Can I change plans?", a: "Yes, upgrade or downgrade anytime. Billing is prorated automatically." },
              { q: "What payment methods?", a: "We accept all major credit cards via Stripe. Enterprise plans support invoicing." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 text-left">
                <p className="text-sm font-semibold text-white mb-2">{q}</p>
                <p className="text-xs text-white/40 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
