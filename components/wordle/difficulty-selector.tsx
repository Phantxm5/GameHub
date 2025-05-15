"use client";

import { motion } from "framer-motion";
import { Difficulty, DifficultySettings } from "@/app/games/wordle/page";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  difficultySettings: Record<Difficulty, DifficultySettings>;
}

export default function DifficultySelector({
  difficulty,
  onDifficultyChange,
  difficultySettings,
}: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(["easy", "medium", "hard"] as Difficulty[]).map((level) => {
        const settings = difficultySettings[level];
        const isActive = difficulty === level;
        
        return (
          <motion.button
            key={level}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              isActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-muted"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDifficultyChange(level)}
          >
            <h3 className="text-lg font-bold mb-1">{settings.label}</h3>
            <p className="text-sm text-muted-foreground">{settings.description}</p>
            
            {isActive && (
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}