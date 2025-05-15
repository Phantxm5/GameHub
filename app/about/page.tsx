import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Code, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "About | MiniGames Hub",
  description: "Learn about the MiniGames Hub project",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">About MiniGames Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern website designed to host small minigames, starting with a German Wordle-type game.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Book className="mr-2 h-6 w-6 text-primary" />
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>German Wordle game with three difficulty levels</li>
          <li>Modern, responsive design</li>
          <li>Placeholder sections for future minigames</li>
          <li>Dark and light mode support</li>
        </ul>
      </div>

      <div className="bg-card rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Code className="mr-2 h-6 w-6 text-primary" />
          Technologies Used
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Next.js 14</li>
          <li>React 18</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Framer Motion for animations</li>
          <li>next-themes for dark/light mode</li>
        </ul>
      </div>

      <div className="bg-card rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Game Instructions</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">German Wordle</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Guess the hidden German word in the given number of attempts.</li>
            <li>Each guess must be a valid word.</li>
            <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
            <li className="list-none ml-8 mt-2">
              <div className="flex items-center">
                <div className="cell cell-correct w-8 h-8 mr-2">A</div>
                <span>The letter is in the word and in the correct spot.</span>
              </div>
            </li>
            <li className="list-none ml-8 mt-2">
              <div className="flex items-center">
                <div className="cell cell-present w-8 h-8 mr-2">B</div>
                <span>The letter is in the word but in the wrong spot.</span>
              </div>
            </li>
            <li className="list-none ml-8 mt-2">
              <div className="flex items-center">
                <div className="cell cell-absent w-8 h-8 mr-2">C</div>
                <span>The letter is not in the word.</span>
              </div>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2">Difficulty Levels</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Easy</strong>: Simple words, 5 letters, 6 attempts</li>
            <li><strong>Medium</strong>: Medium difficulty words, 5 letters, 5 attempts</li>
            <li><strong>Hard</strong>: Difficult words, 6 letters, 4 attempts</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          This project is open source and available under the MIT License.
        </p>
        <div className="mt-4">
          <Link 
            href="/games/wordle"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium mx-2"
          >
            Play Wordle
          </Link>
        </div>
      </div>
    </div>
  );
}