"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Difficulty, DifficultySettings } from "@/app/games/wordle/page";
import { getRandomWord } from "@/lib/wordle-words";

// Cell state types
type CellState = "empty" | "filled" | "correct" | "present" | "absent";

interface WordleGameProps {
  difficulty: Difficulty;
  settings: DifficultySettings;
}

export default function WordleGame({ difficulty, settings }: WordleGameProps) {
  const { attempts, wordLength } = settings;
  
  // Game state
  const [targetWord, setTargetWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(attempts).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [cellStates, setCellStates] = useState<CellState[][]>(
    Array(attempts).fill([]).map(() => Array(wordLength).fill("empty"))
  );
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [message, setMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  
  const boardRef = useRef<HTMLDivElement>(null);

  // Initialize game
  useEffect(() => {
    const word = getRandomWord(difficulty, wordLength);
    setTargetWord(word.toUpperCase());
    
    // Reset game state
    setGuesses(Array(attempts).fill(""));
    setCurrentRow(0);
    setCurrentCol(0);
    setCellStates(
      Array(attempts).fill([]).map(() => Array(wordLength).fill("empty"))
    );
    setGameStatus("playing");
    setMessage(null);
    setShake(false);
  }, [difficulty, attempts, wordLength]);

  // Handle keyboard input
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      // Letter input (A-Z, a-z, German umlauts)
      if (/^[a-zA-ZäöüÄÖÜß]$/.test(e.key)) {
        if (currentCol < wordLength) {
          const newGuesses = [...guesses];
          const currentGuess = newGuesses[currentRow];
          const newGuess = 
            currentGuess.substring(0, currentCol) + 
            e.key.toUpperCase() + 
            currentGuess.substring(currentCol + 1);
          
          newGuesses[currentRow] = newGuess;
          setGuesses(newGuesses);
          
          const newCellStates = [...cellStates];
          newCellStates[currentRow][currentCol] = "filled";
          setCellStates(newCellStates);
          
          setCurrentCol(currentCol + 1);
        }
      }
      // Backspace
      else if (e.key === "Backspace") {
        if (currentCol > 0) {
          const newGuesses = [...guesses];
          const currentGuess = newGuesses[currentRow];
          const newGuess = 
            currentGuess.substring(0, currentCol - 1) + 
            currentGuess.substring(currentCol);
          
          newGuesses[currentRow] = newGuess.padEnd(wordLength, " ").trim();
          setGuesses(newGuesses);
          
          const newCellStates = [...cellStates];
          newCellStates[currentRow][currentCol - 1] = "empty";
          setCellStates(newCellStates);
          
          setCurrentCol(currentCol - 1);
        }
      }
      // Enter
      else if (e.key === "Enter") {
        if (currentCol === wordLength) {
          submitGuess();
        } else {
          showMessage("Nicht genug Buchstaben");
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRow, currentCol, guesses, cellStates, gameStatus, wordLength]);

  // Submit current guess
  const submitGuess = useCallback(() => {
    const currentGuess = guesses[currentRow];
    
    // Check if the guess is valid
    if (currentGuess.length !== wordLength) {
      showMessage("Nicht genug Buchstaben");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // Check the guess against the target word
    const newCellStates = [...cellStates];
    const result = checkGuess(currentGuess, targetWord);
    newCellStates[currentRow] = result;
    setCellStates(newCellStates);

    // Check if the player won
    if (currentGuess === targetWord) {
      setGameStatus("won");
      showMessage("Gewonnen! 🎉");
      return;
    }

    // Move to the next row or end the game
    if (currentRow < attempts - 1) {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    } else {
      setGameStatus("lost");
      showMessage(`Verloren! Das Wort war: ${targetWord}`);
    }
  }, [currentRow, guesses, cellStates, targetWord, attempts, wordLength]);

  // Check guess against target word
  const checkGuess = (guess: string, target: string): CellState[] => {
    const result: CellState[] = Array(wordLength).fill("absent");
    const targetChars = target.split("");
    
    // First pass: check for correct positions
    for (let i = 0; i < wordLength; i++) {
      if (guess[i] === target[i]) {
        result[i] = "correct";
        targetChars[i] = "#"; // Mark as used
      }
    }
    
    // Second pass: check for present but wrong position
    for (let i = 0; i < wordLength; i++) {
      if (result[i] !== "correct") {
        const charIndex = targetChars.indexOf(guess[i]);
        if (charIndex !== -1) {
          result[i] = "present";
          targetChars[charIndex] = "#"; // Mark as used
        }
      }
    }
    
    return result;
  };

  // Show temporary message
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  // Reset the game
  const resetGame = () => {
    const word = getRandomWord(difficulty, wordLength);
    setTargetWord(word.toUpperCase());
    
    setGuesses(Array(attempts).fill(""));
    setCurrentRow(0);
    setCurrentCol(0);
    setCellStates(
      Array(attempts).fill([]).map(() => Array(wordLength).fill("empty"))
    );
    setGameStatus("playing");
    setMessage(null);
  };

  // Handle cell click to focus
  const handleCellClick = (row: number, col: number) => {
    if (row === currentRow && gameStatus === "playing") {
      setCurrentCol(col);
      boardRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 p-3 bg-muted rounded-lg text-center font-medium flex items-center"
        >
          {gameStatus === "lost" ? (
            <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
          ) : null}
          {message}
        </motion.div>
      )}

      <div 
        ref={boardRef}
        className="mb-6 focus:outline-none"
        tabIndex={0}
      >
        <div className="grid gap-2">
          {Array.from({ length: attempts }).map((_, rowIndex) => (
            <motion.div
              key={rowIndex}
              className={`flex gap-2 ${
                rowIndex === currentRow && shake ? "animate-shake" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.1 }}
            >
              {Array.from({ length: wordLength }).map((_, colIndex) => {
                const cellState = cellStates[rowIndex][colIndex];
                const isActive = 
                  rowIndex === currentRow && 
                  colIndex === currentCol && 
                  gameStatus === "playing";
                
                return (
                  <motion.div
                    key={colIndex}
                    className={`cell ${
                      cellState === "correct"
                        ? "cell-correct"
                        : cellState === "present"
                        ? "cell-present"
                        : cellState === "absent"
                        ? "cell-absent"
                        : cellState === "filled"
                        ? "cell-filled"
                        : ""
                    } ${isActive ? "cell-active" : ""}`}
                    initial={false}
                    animate={
                      cellState !== "empty" && cellState !== "filled"
                        ? { 
                            rotateX: [0, 90, 0],
                            transition: { 
                              duration: 0.5,
                              delay: colIndex * 0.1
                            }
                          }
                        : {}
                    }
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  >
                    {guesses[rowIndex][colIndex] || ""}
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {gameStatus !== "playing" && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Neues Spiel
        </motion.button>
      )}
    </div>
  );
}