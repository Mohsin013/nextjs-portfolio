"use client";

import { useState, useEffect } from "react";

const icons = ["⚛", "◆", "△", "○", "□", "◇", "▽", "⬡"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; icon: string; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    const pairs = shuffle([...icons, ...icons]).map((icon, i) => ({ id: i, icon, matched: false }));
    setCards(pairs);
    setFlipped([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleFlip = (id: number) => {
    if (flipped.length >= 2) return;
    if (flipped.includes(id)) return;
    if (cards[id].matched) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          setCards((c) => c.map((card, i) => (i === first || i === second ? { ...card, matched: true } : card)));
          setFlipped([]);
          const allMatched = cards.every((c, i) => c.matched || i === first || i === second);
          if (allMatched) setWon(true);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Memory Card Flip</h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-mono text-white/50">MOVES: {moves}</span>
        <button onClick={initGame} className="text-xs font-mono text-accent-blue hover:text-white transition-colors glass px-3 py-1.5 rounded">
          RESET
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className={`aspect-square rounded-xl text-2xl sm:text-3xl flex items-center justify-center transition-all duration-300 ${
                isFlipped
                  ? card.matched ? "bg-green-500/20 border-green-500/30 border" : "glass-heavy border border-accent-blue/30"
                  : "glass border border-white/5 hover:border-white/20"
              }`}
            >
              {isFlipped ? card.icon : ""}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="mt-6 text-center glass rounded-xl p-6">
          <div className="text-2xl font-bold text-green-400 mb-2">You Won!</div>
          <div className="text-sm font-mono text-white/50">Completed in {moves} moves</div>
        </div>
      )}
    </div>
  );
}
