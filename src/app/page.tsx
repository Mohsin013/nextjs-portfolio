import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import CaseStudy from "@/components/CaseStudy";
import SignatureProjects from "@/components/SignatureProjects";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import StatusBar from "@/components/StatusBar";
import BackgroundAmbience from "@/components/BackgroundAmbience";
import BootWrapper from "@/components/BootWrapper";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import GrainOverlay from "@/components/GrainOverlay";
import PaletteSwitcher from "@/components/PaletteSwitcher";

export const metadata: Metadata = {
  title: "Mohsin Iqbal — Founding Engineer & AI Architect",
  description: "Founding Engineer building AI-native products at scale. Specialized in multi-agent systems, distributed architectures, and full-stack development serving 50,000+ users.",
  alternates: {
    canonical: "https://mohsiniqbal.dev",
  },
};

export default function Home() {
  return (
    <BootWrapper>
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <BackgroundAmbience />
      <main className="flex flex-col gap-0">
        <Hero />
        <Capabilities />
        <Experience />
        <CaseStudy />
        <SignatureProjects />
        <Philosophy />
        <Contact />
      </main>
      <StatusBar />
      <PaletteSwitcher />
    </BootWrapper>
  );
}
