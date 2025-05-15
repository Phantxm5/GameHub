import { Difficulty, DifficultySettings } from "@/app/games/wordle/page";

// Difficulty settings moved to a separate file to avoid Next.js page export error
export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
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