"use client";

import { useState } from "react";
import Link from "next/link";
import LabsNav from "./LabsNav";
import GradientBuilder from "./tools/GradientBuilder";
import BoxShadowGenerator from "./tools/BoxShadowGenerator";
import GlassmorphismGenerator from "./tools/GlassmorphismGenerator";
import ContrastChecker from "./tools/ContrastChecker";
import PasswordGenerator from "./tools/PasswordGenerator";
import JsonFormatter from "./tools/JsonFormatter";
import Base64Converter from "./tools/Base64Converter";
import RegexTester from "./tools/RegexTester";
import ColorPaletteGenerator from "./tools/ColorPaletteGenerator";
import ReadingTimeEstimator from "./tools/ReadingTimeEstimator";
import MarkdownPreview from "./tools/MarkdownPreview";
import LoremGenerator from "./tools/LoremGenerator";
import UnitConverter from "./tools/UnitConverter";
import EpochConverter from "./tools/EpochConverter";
import ParticleCursor from "./creative/ParticleCursor";
import WaveBlob from "./creative/WaveBlob";
import TypographyAnimator from "./creative/TypographyAnimator";
import NoiseGenerator from "./creative/NoiseGenerator";
import GravityBalls from "./creative/GravityBalls";
import MatrixRain from "./creative/MatrixRain";
import StarField from "./creative/StarField";
import TypingTest from "./games/TypingTest";
import ReactionTime from "./games/ReactionTime";
import MemoryGame from "./games/MemoryGame";
import ColorGuessing from "./games/ColorGuessing";
import Snake from "./games/Snake";
import TwentyFortyEight from "./games/TwentyFortyEight";
import WordScramble from "./games/WordScramble";
import RockPaperScissors from "./games/RockPaperScissors";
import FlappyDev from "./games/FlappyDev";
import AimTrainer from "./games/AimTrainer";
import NumberGuess from "./games/NumberGuess";
import SortingVisualizer from "./visualizations/SortingVisualizer";
import PathfindingVisualizer from "./visualizations/PathfindingVisualizer";
import GameOfLife from "./visualizations/GameOfLife";
import JwtDecoder from "./tools/JwtDecoder";
import CronBuilder from "./tools/CronBuilder";
import HttpStatusCodes from "./tools/HttpStatusCodes";
import SqlFormatter from "./tools/SqlFormatter";
import RegexGolf from "./challenges/RegexGolf";
import BinaryDrill from "./challenges/BinaryDrill";
import BigOQuiz from "./challenges/BigOQuiz";
import CssBattle from "./challenges/CssBattle";

type Category = "tools" | "creative" | "games" | "visualizations" | "challenges";

const categories: { id: Category; label: string; icon: string; desc: string }[] = [
  { id: "tools", label: "Dev Tools", icon: "⚡", desc: "CSS generators, formatters, data tools, and utilities" },
  { id: "creative", label: "Experiments", icon: "◎", desc: "Interactive visual experiments" },
  { id: "games", label: "Games", icon: "△", desc: "Mini games to test your skills" },
  { id: "challenges", label: "Challenges", icon: "⬡", desc: "Timed coding puzzles and knowledge tests" },
  { id: "visualizations", label: "Visualizations", icon: "◈", desc: "Algorithm & data visualizations" },
];

const items: Record<Category, { id: string; title: string; desc: string }[]> = {
  tools: [
    { id: "gradient", title: "Gradient Builder", desc: "Multi-stop gradient with live code export" },
    { id: "shadow", title: "Box Shadow Generator", desc: "Visual sliders → copy-paste CSS" },
    { id: "glass", title: "Glassmorphism Generator", desc: "Backdrop-filter + transparency tweaker" },
    { id: "contrast", title: "Contrast Checker", desc: "WCAG pass/fail rating for any color pair" },
    { id: "palette", title: "Color Palette Generator", desc: "Harmonious color schemes on demand" },
    { id: "password", title: "Password Generator", desc: "Strong passwords with copy button" },
    { id: "json", title: "JSON Formatter", desc: "Paste ugly JSON, get it clean" },
    { id: "base64", title: "Base64 Converter", desc: "Text ↔ Base64 encoding" },
    { id: "regex", title: "Regex Tester", desc: "Live pattern matching with highlights" },
    { id: "unit-converter", title: "CSS Unit Converter", desc: "px↔rem, deg↔rad, ms↔s, and more" },
    { id: "epoch", title: "Epoch Converter", desc: "Unix timestamp ↔ human date with live clock" },
    { id: "reading-time", title: "Reading Time", desc: "Estimate reading & speaking time" },
    { id: "markdown", title: "Markdown Preview", desc: "Live markdown → rich text renderer" },
    { id: "lorem", title: "Lorem Generator", desc: "Generate placeholder text on demand" },
    { id: "jwt", title: "JWT Decoder", desc: "Decode header, payload, and check expiry" },
    { id: "cron", title: "Cron Builder", desc: "Build cron expressions with human-readable output" },
    { id: "http-codes", title: "HTTP Status Codes", desc: "Interactive searchable reference" },
    { id: "sql", title: "SQL Formatter", desc: "Format messy SQL queries" },
  ],
  creative: [
    { id: "particles", title: "Particle Playground", desc: "Particles trail your cursor with physics" },
    { id: "wave", title: "Interactive Wave Blob", desc: "Morphing SVG you push with your cursor" },
    { id: "gravity", title: "Physics Sandbox", desc: "Drop balls that collide, bounce, and stack" },
    { id: "matrix", title: "Matrix Rain", desc: "Digital rain with katakana characters" },
    { id: "starfield", title: "Warp Star Field", desc: "Fly through space at warp speed" },
    { id: "typography", title: "Typography Animator", desc: "Type anything, watch it animate" },
    { id: "noise", title: "Noise Texture Generator", desc: "Perlin noise with color + scale controls" },
  ],
  games: [
    { id: "typing", title: "Typing Speed Test", desc: "WPM + accuracy with timer" },
    { id: "reaction", title: "Reaction Time", desc: "Click when color changes — test reflexes" },
    { id: "flappy", title: "Flappy Dev", desc: "Flappy Bird with a dev twist" },
    { id: "aim", title: "Aim Trainer", desc: "30-second precision clicking challenge" },
    { id: "memory", title: "Memory Card Flip", desc: "Classic pairs game, dev-themed" },
    { id: "color-guess", title: "Color Guessing", desc: "Match hex codes to swatches" },
    { id: "snake", title: "Snake", desc: "Classic snake with high-score tracker" },
    { id: "2048", title: "2048", desc: "Tile-sliding number puzzle" },
    { id: "number-guess", title: "Number Guessing", desc: "Guess the number 1-100 with hints" },
    { id: "word-scramble", title: "Word Scramble", desc: "Unscramble dev terminology" },
    { id: "rps", title: "Rock Paper Scissors", desc: "VS AI with win-streak tracker" },
  ],
  challenges: [
    { id: "regex-golf", title: "Regex Golf", desc: "Write shortest regex to match/reject strings" },
    { id: "binary-drill", title: "Binary/Hex Drill", desc: "60-second number conversion speed test" },
    { id: "big-o", title: "Big-O Quiz", desc: "Identify time complexity of code snippets" },
    { id: "css-battle", title: "CSS Battle", desc: "Replicate shapes with pure CSS" },
  ],
  visualizations: [
    { id: "sorting", title: "Sorting Visualizer", desc: "Watch bubble, selection, insertion, quick sort" },
    { id: "pathfinding", title: "Pathfinding (BFS)", desc: "Draw walls, find shortest path" },
    { id: "game-of-life", title: "Game of Life", desc: "Conway's cellular automaton" },
  ],
};

const componentMap: Record<string, React.ComponentType> = {
  gradient: GradientBuilder,
  shadow: BoxShadowGenerator,
  glass: GlassmorphismGenerator,
  contrast: ContrastChecker,
  palette: ColorPaletteGenerator,
  password: PasswordGenerator,
  json: JsonFormatter,
  base64: Base64Converter,
  regex: RegexTester,
  "unit-converter": UnitConverter,
  epoch: EpochConverter,
  "reading-time": ReadingTimeEstimator,
  markdown: MarkdownPreview,
  lorem: LoremGenerator,
  particles: ParticleCursor,
  wave: WaveBlob,
  gravity: GravityBalls,
  matrix: MatrixRain,
  starfield: StarField,
  typography: TypographyAnimator,
  noise: NoiseGenerator,
  typing: TypingTest,
  reaction: ReactionTime,
  flappy: FlappyDev,
  aim: AimTrainer,
  memory: MemoryGame,
  "color-guess": ColorGuessing,
  snake: Snake,
  "2048": TwentyFortyEight,
  "number-guess": NumberGuess,
  "word-scramble": WordScramble,
  rps: RockPaperScissors,
  jwt: JwtDecoder,
  cron: CronBuilder,
  "http-codes": HttpStatusCodes,
  sql: SqlFormatter,
  "regex-golf": RegexGolf,
  "binary-drill": BinaryDrill,
  "big-o": BigOQuiz,
  "css-battle": CssBattle,
  sorting: SortingVisualizer,
  pathfinding: PathfindingVisualizer,
  "game-of-life": GameOfLife,
};

export default function LabsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("tools");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const ActiveComponent = activeItem ? componentMap[activeItem] : null;

  return (
    <div className="min-h-[100dvh] bg-background relative">
      <LabsNav />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-20">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <Link href="/" className="text-xs font-mono text-white/30 hover:text-accent-blue transition-colors mb-4 inline-block">
            ← BACK TO PORTFOLIO
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="shimmer-text">Labs</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-xl">
            Interactive experiments, developer micro-tools, and mini games. A playground for creative engineering.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs font-mono text-white/30">
            <span className="glass px-2 py-1 rounded">{Object.values(items).flat().length} experiments</span>
            <span className="glass px-2 py-1 rounded">{categories.length} categories</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setActiveItem(null); }}
              className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-[10px] sm:text-xs tracking-wider transition-all ${
                activeCategory === cat.id
                  ? "glass-heavy text-white border border-accent-blue/30"
                  : "glass text-white/50 hover:text-white/80 border border-transparent"
              }`}
            >
              <span className="mr-1.5 sm:mr-2">{cat.icon}</span>
              {cat.label}
              <span className="ml-1.5 sm:ml-2 text-white/30">{items[cat.id].length}</span>
            </button>
          ))}
        </div>

        {/* Active tool/experiment view */}
        {activeItem && ActiveComponent ? (
          <div>
            <button
              onClick={() => setActiveItem(null)}
              className="text-xs font-mono text-white/40 hover:text-accent-blue transition-colors mb-6 flex items-center gap-2"
            >
              ← BACK TO {activeCategory.toUpperCase()}
            </button>
            <div className="glass-heavy rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5">
              <ActiveComponent />
            </div>
          </div>
        ) : (
          /* Grid of items */
          <div>
            <p className="text-xs font-mono text-white/30 mb-4">
              {categories.find((c) => c.id === activeCategory)?.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {items[activeCategory].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="glass rounded-xl p-4 sm:p-5 text-left group hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-accent-blue/20 active:scale-[0.98]"
                >
                  <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-accent-blue transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/40 font-mono leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
