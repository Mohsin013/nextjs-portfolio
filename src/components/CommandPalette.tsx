"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

type CommandItem = {
  id: string;
  label: string;
  category: string;
  icon: string;
  action: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (id: string) => {
      if (pathname !== "/") {
        router.push(`/#${id}`, { transitionTypes: ["nav-back"] });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    },
    [pathname, router],
  );

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path, { transitionTypes: ["nav-forward"] });
      setOpen(false);
    },
    [router],
  );

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-home", label: "Go to Home", category: "Navigation", icon: "⌂", action: () => scrollToSection("hero"), keywords: "top start hero" },
    { id: "nav-skills", label: "Go to Skills", category: "Navigation", icon: "◆", action: () => scrollToSection("capabilities"), keywords: "capabilities tech stack" },
    { id: "nav-career", label: "Go to Career", category: "Navigation", icon: "◈", action: () => scrollToSection("experience"), keywords: "experience work timeline jobs" },
    { id: "nav-casestudy", label: "Go to Case Study", category: "Navigation", icon: "◉", action: () => scrollToSection("case-study"), keywords: "deep dive feel you best" },
    { id: "nav-projects", label: "Go to Projects", category: "Navigation", icon: "◎", action: () => scrollToSection("projects"), keywords: "signature exhibits work portfolio" },
    { id: "nav-philosophy", label: "Go to Philosophy", category: "Navigation", icon: "◐", action: () => scrollToSection("philosophy"), keywords: "ethos principles core kernel" },
    { id: "nav-contact", label: "Go to Contact", category: "Navigation", icon: "◑", action: () => scrollToSection("contact"), keywords: "email phone reach out hire" },

    // Pages
    { id: "page-blog", label: "Open Blog", category: "Pages", icon: "✦", action: () => navigateTo("/blog"), keywords: "articles writing posts" },
    { id: "page-labs", label: "Open Labs", category: "Pages", icon: "◎", action: () => navigateTo("/labs"), keywords: "experiments playground tools games" },

    // Labs - Tools
    { id: "lab-gradient", label: "Gradient Builder", category: "Labs", icon: "▧", action: () => navigateTo("/labs"), keywords: "css gradient tool colors" },
    { id: "lab-shadow", label: "Box Shadow Generator", category: "Labs", icon: "▨", action: () => navigateTo("/labs"), keywords: "css shadow tool" },
    { id: "lab-json", label: "JSON Formatter", category: "Labs", icon: "{ }", action: () => navigateTo("/labs"), keywords: "format prettify validate json" },
    { id: "lab-regex", label: "Regex Tester", category: "Labs", icon: ".*", action: () => navigateTo("/labs"), keywords: "regular expression pattern match" },
    { id: "lab-jwt", label: "JWT Decoder", category: "Labs", icon: "🔑", action: () => navigateTo("/labs"), keywords: "token decode jwt auth" },
    { id: "lab-password", label: "Password Generator", category: "Labs", icon: "🔒", action: () => navigateTo("/labs"), keywords: "secure random password" },
    { id: "lab-color", label: "Color Palette Generator", category: "Labs", icon: "🎨", action: () => navigateTo("/labs"), keywords: "colors palette design" },
    { id: "lab-sql", label: "SQL Formatter", category: "Labs", icon: "⊞", action: () => navigateTo("/labs"), keywords: "sql query format prettify" },
    { id: "lab-epoch", label: "Epoch Converter", category: "Labs", icon: "⏱", action: () => navigateTo("/labs"), keywords: "timestamp unix time convert" },
    { id: "lab-cron", label: "Cron Builder", category: "Labs", icon: "⏰", action: () => navigateTo("/labs"), keywords: "cron schedule job timer" },

    // Labs - Games
    { id: "lab-typing", label: "Typing Test", category: "Games", icon: "⌨", action: () => navigateTo("/labs"), keywords: "wpm speed type game" },
    { id: "lab-snake", label: "Snake Game", category: "Games", icon: "🐍", action: () => navigateTo("/labs"), keywords: "snake classic game play" },
    { id: "lab-2048", label: "2048", category: "Games", icon: "⊞", action: () => navigateTo("/labs"), keywords: "2048 number puzzle game" },
    { id: "lab-memory", label: "Memory Game", category: "Games", icon: "🧠", action: () => navigateTo("/labs"), keywords: "memory cards match game" },
    { id: "lab-flappy", label: "Flappy Dev", category: "Games", icon: "🐦", action: () => navigateTo("/labs"), keywords: "flappy bird game fly" },

    // Labs - Visualizations
    { id: "lab-sorting", label: "Sorting Visualizer", category: "Visualizations", icon: "▥", action: () => navigateTo("/labs"), keywords: "algorithm sort bubble merge quick" },
    { id: "lab-pathfinding", label: "Pathfinding Visualizer", category: "Visualizations", icon: "◧", action: () => navigateTo("/labs"), keywords: "dijkstra bfs dfs a-star maze" },
    { id: "lab-gameoflife", label: "Game of Life", category: "Visualizations", icon: "◫", action: () => navigateTo("/labs"), keywords: "conway cellular automata" },

    // Actions
    { id: "action-email", label: "Send Email", category: "Actions", icon: "✉", action: () => { window.location.href = "mailto:mohsiniqbal826635@gmail.com"; setOpen(false); }, keywords: "mail contact message" },
    { id: "action-github", label: "Open GitHub", category: "Actions", icon: "⟁", action: () => { window.open("https://github.com/mohsin013", "_blank"); setOpen(false); }, keywords: "github code repositories" },
    { id: "action-linkedin", label: "Open LinkedIn", category: "Actions", icon: "◈", action: () => { window.open("https://www.linkedin.com/in/mohsin-iqbal-424336237/", "_blank"); setOpen(false); }, keywords: "linkedin profile social network" },
    { id: "action-top", label: "Scroll to Top", category: "Actions", icon: "↑", action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }, keywords: "top scroll up beginning" },
  ];

  const filtered = query.trim()
    ? commands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.category.toLowerCase().includes(q) ||
          (cmd.keywords && cmd.keywords.toLowerCase().includes(q))
        );
      })
    : commands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setActiveIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
      }
    }
  };

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="relative w-[calc(100%-2rem)] max-w-[560px] animate-palette-in">
        <div className="glass-heavy rounded-2xl border border-white/15 overflow-hidden shadow-2xl shadow-black/50">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40 flex-shrink-0">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyNav}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white text-sm font-mono outline-none placeholder:text-white/30"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-white/30 border border-white/10 rounded-md bg-white/[0.03]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-white/30 font-mono">No results found</p>
                <p className="text-xs text-white/20 font-mono mt-1">Try a different search term</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    {category}
                  </div>
                  {items.map((cmd) => {
                    const idx = flatIndex++;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        data-active={isActive}
                        onClick={() => cmd.action()}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-100 ${
                          isActive
                            ? "bg-accent-blue/10 text-white"
                            : "text-white/60 hover:text-white/80"
                        }`}
                      >
                        <span className={`w-7 h-7 flex items-center justify-center rounded-md text-xs flex-shrink-0 ${
                          isActive ? "bg-accent-blue/20 text-accent-blue" : "bg-white/[0.04] text-white/40"
                        }`}>
                          {cmd.icon}
                        </span>
                        <span className="text-sm font-mono truncate">{cmd.label}</span>
                        {isActive && (
                          <span className="ml-auto text-[10px] font-mono text-white/20 flex-shrink-0">↵</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/25">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-[9px]">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-[9px]">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-[9px]">esc</kbd>
                close
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/15">{filtered.length} commands</span>
          </div>
        </div>
      </div>
    </div>
  );
}
