import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohsiniqbal.dev"),
  title: {
    default: "Mohsin Iqbal — Founding Engineer & AI Architect",
    template: "%s | Mohsin Iqbal",
  },
  description: "Founding Engineer building AI-native products at scale. Specialized in multi-agent systems, distributed architectures, and full-stack development. From production ML pipelines to payment-grade backend systems serving 50,000+ users.",
  keywords: [
    "Mohsin Iqbal",
    "Founding Engineer",
    "AI Architect",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Node.js",
    "TypeScript",
    "Machine Learning",
    "AI Systems",
    "Multi-Agent LLM",
    "AWS",
    "Distributed Systems",
    "NorthPeak Technologies",
    "Portfolio",
  ],
  authors: [{ name: "Mohsin Iqbal", url: "https://mohsiniqbal.dev" }],
  creator: "Mohsin Iqbal",
  publisher: "Mohsin Iqbal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohsiniqbal.dev",
    siteName: "Mohsin Iqbal — Portfolio",
    title: "Mohsin Iqbal — Founding Engineer & AI Architect",
    description: "Building AI-native products at scale. Multi-agent systems, distributed architectures, and full-stack development serving 50,000+ users.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Mohsin Iqbal — Founding Engineer & AI Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohsin Iqbal — Founding Engineer & AI Architect",
    description: "Building AI-native products at scale. Multi-agent systems, distributed architectures, and full-stack development.",
    images: ["/profile.jpg"],
    creator: "@mohsin013",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  alternates: {
    canonical: "https://mohsiniqbal.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohsin Iqbal",
              url: "https://mohsiniqbal.dev",
              image: "https://mohsiniqbal.dev/profile.jpg",
              jobTitle: "Founding Engineer & AI Architect",
              worksFor: [
                {
                  "@type": "Organization",
                  name: "NorthPeak Technologies",
                  url: "https://mohsiniqbal.dev",
                },
                {
                  "@type": "Organization",
                  name: "DevMinds Learning",
                },
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
                "Distributed Systems",
                "Multi-Agent LLM Systems",
                "React",
                "Node.js",
                "TypeScript",
                "AWS",
                "MongoDB",
              ],
              sameAs: [
                "https://www.linkedin.com/in/mohsin-iqbal-424336237/",
                "https://github.com/mohsin013",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Vinayaka Missions Sikkim University",
              },
              award: [
                "Exceptional Achiever Award 2025 — Masai School",
                "Outstanding Performer Award 2024 — Masai School",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
