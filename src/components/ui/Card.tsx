import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingMap = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

export default function Card({ children, className = "", glass, hover, padding = "md" }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-300
        ${glass
          ? "bg-white/[0.05] backdrop-blur-xl border-white/10"
          : "bg-[#0F1520] border-white/10"
        }
        ${hover ? "hover:border-white/20 hover:bg-white/[0.08] cursor-pointer" : ""}
        ${paddingMap[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
