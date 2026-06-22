import type { ReactNode } from "react";

type Color = "blue" | "purple" | "green" | "amber" | "red" | "gray";

interface BadgeProps {
  children: ReactNode;
  color?: Color;
  dot?: boolean;
  className?: string;
}

const colorStyles: Record<Color, { badge: string; dot: string }> = {
  blue:   { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",     dot: "bg-blue-400" },
  purple: { badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", dot: "bg-purple-400" },
  green:  { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  amber:  { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   dot: "bg-amber-400" },
  red:    { badge: "bg-red-500/10 text-red-400 border-red-500/20",         dot: "bg-red-400" },
  gray:   { badge: "bg-white/5 text-white/50 border-white/10",             dot: "bg-white/40" },
};

export default function Badge({ children, color = "gray", dot, className = "" }: BadgeProps) {
  const { badge, dot: dotColor } = colorStyles[color];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children}
    </span>
  );
}
