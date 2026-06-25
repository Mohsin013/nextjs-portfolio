import type { Metadata } from "next";
import { ViewTransition } from "react";
import BlogPage from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "Blog — Engineering Insights & AI Architecture",
  description: "Technical articles on AI systems, multi-agent orchestration, distributed architecture, and modern software engineering by Mohsin Iqbal.",
  keywords: [
    "AI Blog",
    "Software Engineering Blog",
    "Multi-Agent Systems",
    "Distributed Architecture",
    "Technical Writing",
    "Mohsin Iqbal Blog",
    "NorthPeak Technologies",
  ],
  openGraph: {
    title: "Blog — Engineering Insights & AI Architecture | Mohsin Iqbal",
    description: "Technical articles on AI systems, multi-agent orchestration, distributed architecture, and modern software engineering.",
    url: "https://mohsiniqbal.dev/blog",
  },
  alternates: {
    canonical: "https://mohsiniqbal.dev/blog",
  },
};

export default function Blog() {
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
      <BlogPage />
    </ViewTransition>
  );
}
