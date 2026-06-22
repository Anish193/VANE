"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-5.5 rounded-full transition-all duration-200 ${enabled ? "bg-blue-500" : "bg-white/10"}`}
      style={{ height: "22px" }}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${enabled ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({ email: true, product: true, security: true });
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Manage your account and preferences.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-1 bg-white/3 border border-white/5 rounded-xl p-1 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <Card glass>
              <h2 className="text-sm font-semibold text-white mb-5">Account Information</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  U
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-0.5">Profile Photo</p>
                  <p className="text-xs text-white/40 mb-2">JPG, PNG or GIF. Max 2MB.</p>
                  <Button variant="secondary" size="sm">Upload photo</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full name" type="text" placeholder="Your name" defaultValue="" />
                <Input label="Email" type="email" placeholder="you@example.com" defaultValue="" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Plan</h2>
                <Badge color="blue" dot>Free</Badge>
              </div>
              <p className="text-xs text-white/40 mb-4">You&apos;re on the Free plan — 100 requests/month, access to Helix.</p>
              <Button variant="secondary" size="sm">Upgrade to Pro →</Button>
            </Card>
            <Button onClick={save} size="md" className="w-fit">
              {saved ? "Saved!" : <><Save className="w-4 h-4" /> Save changes</>}
            </Button>
          </div>
        )}

        {activeTab === "notifications" && (
          <Card glass>
            <h2 className="text-sm font-semibold text-white mb-5">Notification Preferences</h2>
            <div className="flex flex-col gap-5">
              {[
                { key: "email" as const, label: "Email notifications", desc: "Usage reports, billing updates, and account alerts" },
                { key: "product" as const, label: "Product updates", desc: "New features, modules, and VANE platform announcements" },
                { key: "security" as const, label: "Security alerts", desc: "Sign-in attempts, API key usage, and security events" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">{label}</p>
                    <p className="text-xs text-white/40">{desc}</p>
                  </div>
                  <Toggle enabled={notifications[key]} onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "security" && (
          <div className="flex flex-col gap-4">
            <Card glass>
              <h2 className="text-sm font-semibold text-white mb-5">Change Password</h2>
              <div className="flex flex-col gap-4 max-w-sm">
                <Input label="Current password" type="password" placeholder="••••••••" />
                <Input label="New password" type="password" placeholder="••••••••" />
                <Input label="Confirm new password" type="password" placeholder="••••••••" />
                <Button size="sm" className="w-fit">Update password</Button>
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white mb-0.5">Two-Factor Authentication</h2>
                  <p className="text-xs text-white/40">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="secondary" size="sm">Enable 2FA</Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "appearance" && (
          <Card glass>
            <h2 className="text-sm font-semibold text-white mb-5">Theme</h2>
            <div className="grid grid-cols-3 gap-3">
              {["Dark", "Light", "System"].map((t) => (
                <button
                  key={t}
                  className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                    t === "Dark" ? "border-blue-500/50 bg-blue-500/10 text-white" : "border-white/10 text-white/50 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
