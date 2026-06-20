import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Intelligence from "@/components/Intelligence";
import Architecture from "@/components/Architecture";
import Capabilities from "@/components/Capabilities";
import Roadmap from "@/components/Roadmap";
import Technology from "@/components/Technology";
import DownloadSection from "@/components/Download";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#05070A" }}>
      <Navbar />
      <Hero />
      <Features />
      <Intelligence />
      <Architecture />
      <Capabilities />
      <Roadmap />
      <Technology />
      <DownloadSection />
      <FAQ />
      <Footer />
    </main>
  );
}
