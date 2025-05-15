"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AlertCircle, HelpCircle, Info } from "lucide-react";
import WordleGame from "@/components/wordle/wordle-game";
import DifficultySelector from "@/components/wordle/difficulty-selector";

// Difficulty levels
export type Difficulty = "easy" | "medium" | "hard";

export interface DifficultySettings {
  attempts: number;
  wordLength: number;
  label: string;
  description: string;
}

// Move this to a separate file to avoid Next.js page export error
const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: {
    attempts: 6,
    wordLength: 5,
    label: "Leicht",
    description: "Einfache Wörter, 6 Versuche",
  },
  medium: {
    attempts: 5,
    wordLength: 5,
    label: "Mittel",
    description: "Mittelschwere Wörter, 5 Versuche",
  },
  hard: {
    attempts: 4,
    wordLength: 6,
    label: "Schwer",
    description: "Schwierige Wörter, 4 Versuche",
  },
};

export default function WordlePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameKey, setGameKey] = useState(0);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [gameRef, gameInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setGameKey((prev) => prev + 1); // Reset game when difficulty changes
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Deutsches Wordle</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Errate das versteckte deutsche Wort. Du hast eine begrenzte Anzahl von
          Versuchen, abhängig von der gewählten Schwierigkeit.
        </p>
      </motion.div>

      <motion.div
        ref={gameRef}
        initial={{ opacity: 0, y: 20 }}
        animate={gameInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-xl shadow-md p-6 mb-8"
      >
        {showInstructions && (
          <div className="mb-6 p-4 bg-muted rounded-lg flex items-start">
            <Info className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-2">Spielanleitung</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Errate das versteckte Wort in der vorgegebenen Anzahl von Versuchen.</li>
                <li>Jeder Versuch muss ein gültiges Wort sein.</li>
                <li>Nach jedem Versuch ändert sich die Farbe der Kacheln:</li>
                <li className="list-none ml-4 mt-2">
                  <div className="flex items-center">
                    <div className="cell cell-correct w-8 h-8 mr-2">A</div>
                    <span>Der Buchstabe ist im Wort und an der richtigen Stelle.</span>
                  </div>
                </li>
                <li className="list-none ml-4 mt-2">
                  <div className="flex items-center">
                    <div className="cell cell-present w-8 h-8 mr-2">B</div>
                    <span>Der Buchstabe ist im Wort, aber an der falschen Stelle.</span>
                  </div>
                </li>
                <li className="list-none ml-4 mt-2">
                  <div className="flex items-center">
                    <div className="cell cell-absent w-8 h-8 mr-2">C</div>
                    <span>Der Buchstabe ist nicht im Wort.</span>
                  </div>
                </li>
              </ul>
              <button 
                onClick={() => setShowInstructions(false)}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Verstanden
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Schwierigkeitsgrad</h2>
          <DifficultySelector 
            difficulty={difficulty} 
            onDifficultyChange={handleDifficultyChange} 
            difficultySettings={difficultySettings}
          />
        </div>

        <WordleGame 
          key={gameKey}
          difficulty={difficulty} 
          settings={difficultySettings[difficulty]} 
        />
      </motion.div>
    </div>
  );
}