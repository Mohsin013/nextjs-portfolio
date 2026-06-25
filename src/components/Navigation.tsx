"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "capabilities", label: "SKILLS" },
  { id: "experience", label: "CAREER" },
  { id: "case-study", label: "CASE STUDY" },
  { id: "projects", label: "PROJECTS" },
  { id: "philosophy", label: "ETHOS" },
  { id: "contact", label: "CONTACT" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 200) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* Desktop nav */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] hidden lg:block"
        style={{ viewTransitionName: "site-nav" }}
      >
        <div className="glass-heavy mx-auto mt-4 max-w-4xl rounded-full px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="text-sm font-mono font-bold text-white tracking-wider"
              data-cursor-label="Home"
            >
              MI<span className="text-accent-blue">.</span>
            </button>

            <div className="flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-item relative px-3 py-1.5 text-[10px] font-mono tracking-widest transition-all duration-300 rounded-full ${
                    activeSection === item.id
                      ? "text-white bg-white/10"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  data-cursor-label={item.label}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/blog"
                transitionTypes={["nav-forward"]}
                className="nav-item relative px-3 py-1.5 text-[10px] font-mono tracking-widest transition-all duration-300 rounded-full text-white/40 hover:text-white/70"
                data-cursor-label="Articles"
              >
                BLOG
              </Link>
              <Link
                href="/labs"
                transitionTypes={["nav-forward"]}
                className="nav-item relative px-3 py-1.5 text-[10px] font-mono tracking-widest transition-all duration-300 rounded-full text-accent-blue hover:bg-accent-blue/10"
                data-cursor-label="Experiments"
              >
                LABS
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollTo("hero")}
            className="text-sm font-mono font-bold text-white tracking-wider z-[201]"
          >
            MI<span className="text-accent-blue">.</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-[201] w-11 h-11 flex flex-col items-center justify-center gap-1.5 glass rounded-full active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu with clip-path reveal */}
      <div className={`fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl clip-circle lg:hidden ${menuOpen ? "open" : ""}`}>
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-xl sm:text-2xl font-mono tracking-widest hover:text-white transition-all duration-300 ${
                activeSection === item.id ? "text-white" : "text-white/50"
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <span className="text-accent-blue text-xs sm:text-sm mr-3">0{i + 1}</span>
              {item.label}
            </button>
          ))}

          {/* Extra pages in mobile menu */}
          <div className="flex flex-col items-center gap-4 mt-4 border-t border-white/10 pt-6">
            <Link
              href="/blog"
              transitionTypes={["nav-forward"]}
              className="text-lg sm:text-xl font-mono tracking-widest text-white/50 hover:text-white transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-accent-blue text-xs sm:text-sm mr-3">✦</span>
              BLOG
            </Link>
            <Link
              href="/labs"
              transitionTypes={["nav-forward"]}
              className="text-lg sm:text-xl font-mono tracking-widest text-white/50 hover:text-white transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-accent-blue text-xs sm:text-sm mr-3">◎</span>
              LABS
            </Link>
          </div>

          {/* Mobile menu footer with active section */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-[10px] font-mono text-white/20 tracking-widest">
              CURRENTLY VIEWING: {activeSection.toUpperCase().replace("-", " ")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
