import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANE AI — One Intelligence. Infinite Possibilities.",
  description: "VANE is the AI Operating Platform. Voice-Activated Evidence Network connects intelligent assistants into one unified system capable of reasoning, automation, investigation, coding, memory, and creativity.",
  keywords: ["AI", "artificial intelligence", "AI assistant", "VANE", "Helix", "Omen", "multi-agent", "AI operating system"],
  openGraph: {
    title: "VANE AI — One Intelligence. Infinite Possibilities.",
    description: "The AI Operating Platform. Built for thinking.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
