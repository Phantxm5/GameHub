"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { Gamepad2, Plus } from "lucide-react";

export default function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [gamesRef, gamesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [comingSoonRef, comingSoonInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <Gamepad2 className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          MiniGames Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          A collection of fun and challenging minigames to test your skills and
          enjoy your free time.
        </p>
        <Link
          href="/games/wordle"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium text-lg transition-all"
        >
          Play Now
        </Link>
      </motion.section>

      <motion.section
        ref={gamesRef}
        initial={{ opacity: 0, y: 50 }}
        animate={gamesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Available Games</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/games/wordle" className="game-card group">
            <div className="aspect-video relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 p-4 max-w-[200px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`cell ${
                        i === 0
                          ? "cell-correct"
                          : i === 1
                          ? "cell-present"
                          : i === 2
                          ? "cell-absent"
                          : "bg-card"
                      }`}
                    >
                      {i === 0 ? "W" : i === 1 ? "O" : i === 2 ? "R" : i === 3 ? "T" : "E"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                German Wordle
              </h3>
              <p className="text-muted-foreground">
                Guess the hidden German word in limited attempts. Test your
                vocabulary and deduction skills!
              </p>
            </div>
            <div className="game-card-badge">New</div>
          </Link>
        </div>
      </motion.section>

      <motion.section
        ref={comingSoonRef}
        initial={{ opacity: 0, y: 50 }}
        animate={comingSoonInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Memory Match",
              description:
                "Test your memory by matching pairs of cards in this classic game.",
              color: "from-green-500 to-teal-600",
              icon: "🧠",
            },
            {
              title: "Number Puzzle",
              description:
                "Slide numbered tiles to arrange them in the correct order.",
              color: "from-yellow-500 to-orange-600",
              icon: "🔢",
            },
            {
              title: "Word Scramble",
              description:
                "Unscramble letters to form words before time runs out.",
              color: "from-red-500 to-pink-600",
              icon: "📝",
            },
          ].map((game, index) => (
            <div key={index} className="game-card opacity-80 hover:opacity-100">
              <div
                className={`aspect-video relative bg-gradient-to-br ${game.color} rounded-t-xl overflow-hidden flex items-center justify-center`}
              >
                <span className="text-5xl">{game.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  {game.title}
                  <Plus className="ml-2 w-4 h-4" />
                </h3>
                <p className="text-muted-foreground">{game.description}</p>
              </div>
              <div className="game-card-badge bg-secondary text-secondary-foreground">
                Soon
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}