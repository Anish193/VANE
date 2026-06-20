"use client";

import { Zap, GitBranch, MessageCircle, FileText } from "lucide-react";

const links = {
  "VANE AI": [
    { label: "Features", href: "#features" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "Architecture", href: "#architecture" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Discord", href: "https://discord.gg/Vbt54wzj7B" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "License", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05070A] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base tracking-tight">Kinetic Studios</span>
                <span className="text-blue-400 text-[10px] font-medium tracking-widest uppercase">VANE AI</span>
              </div>
            </div>
            <p className="text-gray-600 text-xs font-medium tracking-widest uppercase mt-3 mb-2">
              A Kinetic Studios Product
            </p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              Voice-Activated Evidence Network. One Intelligence. Infinite Possibilities.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/8 bg-white/3 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/15 transition-all"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/Vbt54wzj7B"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-indigo-500/20 bg-indigo-500/5 flex items-center justify-center text-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/8 bg-white/3 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/15 transition-all"
                aria-label="Documentation"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-600 hover:text-gray-300 text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} Kinetic Studios. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            VANE AI — Built with precision. Powered by intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
