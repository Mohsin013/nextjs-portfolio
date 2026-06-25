import type { Metadata } from "next";
import { ViewTransition } from "react";
import LabsPage from "@/components/labs/LabsPage";

export const metadata: Metadata = {
  title: "Labs — Interactive Tools, Games & Experiments",
  description: "A playground of interactive developer tools, creative visual experiments, algorithm visualizations, and mini games. Gradient builder, sorting visualizer, 2048, typing test, and more.",
  keywords: [
    "Developer Tools",
    "CSS Generator",
    "Gradient Builder",
    "Sorting Visualizer",
    "Typing Speed Test",
    "Interactive Experiments",
    "Web Games",
    "Pathfinding Visualization",
    "Color Palette Generator",
    "Glassmorphism Generator",
  ],
  openGraph: {
    title: "Labs — Interactive Tools, Games & Experiments | Mohsin Iqbal",
    description: "A playground of 27+ interactive developer tools, creative experiments, algorithm visualizations, and mini games.",
    url: "https://mohsiniqbal.dev/labs",
  },
  alternates: {
    canonical: "https://mohsiniqbal.dev/labs",
  },
};

export default function Labs() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <LabsPage />
    </ViewTransition>
  );
}
