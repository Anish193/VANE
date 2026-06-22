"use client";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({ label, error, hint, leftIcon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/70">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">{leftIcon}</div>
        )}
        <input
          {...props}
          className={`
            w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30
            focus:outline-none focus:ring-2 transition-all duration-200
            ${error ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}
            ${leftIcon ? "pl-10" : ""}
            ${className}
          `}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  );
}
