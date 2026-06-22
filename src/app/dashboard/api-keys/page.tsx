"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Key, Plus, Trash2, Copy, Check, Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  status: "active" | "revoked";
  permissions: string[];
  lastUsedAt?: string;
  createdAt: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);

  const fetchKeys = useCallback(async () => {
    const token = localStorage.getItem("vane_access");
    if (!token) return;
    const res = await fetch("/api/v1/api-keys", { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) setKeys(data.data);
  }, []);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  async function createKey() {
    if (!newKeyName.trim()) return;
    setLoading(true);
    const token = localStorage.getItem("vane_access");
    const res = await fetch("/api/v1/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: newKeyName }),
    });
    const data = await res.json();
    if (data.success) {
      setNewKey(data.data.key);
      setShowNewKey(true);
      setCreating(false);
      setNewKeyName("");
      fetchKeys();
    }
    setLoading(false);
  }

  async function revokeKey(id: string) {
    const token = localStorage.getItem("vane_access");
    await fetch(`/api/v1/api-keys/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    fetchKeys();
  }

  return (
    <div className="flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">API Keys</h1>
          <p className="text-white/40 text-sm">Manage access keys for integrating VANE into your applications.</p>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="w-3.5 h-3.5" /> New key
        </Button>
      </motion.div>

      {newKey && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-green-500/20 bg-green-500/5">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-400 mb-1">API key created — save it now!</p>
                <p className="text-xs text-white/50 mb-3">This key will not be shown again.</p>
                <div className="flex items-center gap-2 bg-black/30 rounded-xl px-4 py-2.5 font-mono text-sm text-white">
                  <span className="flex-1 truncate">{showNewKey ? newKey : "•".repeat(40)}</span>
                  <button onClick={() => setShowNewKey(!showNewKey)} className="text-white/40 hover:text-white transition-colors shrink-0">
                    {showNewKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <CopyButton text={newKey} />
                </div>
              </div>
              <button onClick={() => setNewKey(null)} className="text-white/30 hover:text-white text-xl leading-none">×</button>
            </div>
          </Card>
        </motion.div>
      )}

      {creating && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <Card glass>
            <h3 className="text-sm font-semibold text-white mb-4">Create new API key</h3>
            <div className="flex gap-3">
              <Input
                placeholder="e.g. Production, My App, Testing"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && createKey()}
              />
              <Button onClick={createKey} loading={loading}>Create</Button>
              <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="flex flex-col gap-3">
        {keys.length === 0 ? (
          <Card glass className="text-center py-12">
            <Key className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No API keys yet. Create one to get started.</p>
          </Card>
        ) : (
          keys.map((key, i) => (
            <motion.div key={key.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card glass className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white">{key.name}</span>
                    <Badge color={key.status === "active" ? "green" : "red"} dot>{key.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-xs text-white/40 font-mono">{key.keyPrefix}••••••••••••••••</code>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/30">Created {new Date(key.createdAt).toLocaleDateString()}</span>
                    {key.lastUsedAt && (
                      <>
                        <span className="text-xs text-white/20">·</span>
                        <span className="text-xs text-white/30">Last used {new Date(key.lastUsedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {key.status === "active" && (
                    <button
                      onClick={() => revokeKey(key.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
