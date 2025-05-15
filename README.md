# MiniGames Hub

A modern website designed to host small minigames, starting with a German Wordle-type game.

## Features

- German Wordle game with three difficulty levels
- Modern, responsive design
- Placeholder sections for future minigames
- Dark and light mode support

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Game Instructions

### German Wordle

1. Guess the hidden German word in the given number of attempts.
2. Each guess must be a valid word.
3. After each guess, the color of the tiles will change to show how close your guess was to the word.
   - Green: The letter is in the word and in the correct spot.
   - Yellow: The letter is in the word but in the wrong spot.
   - Gray: The letter is not in the word.

## Difficulty Levels

- **Easy**: Simple words, 5 letters, 6 attempts
- **Medium**: Medium difficulty words, 5 letters, 5 attempts
- **Hard**: Difficult words, 6 letters, 4 attempts

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- next-themes for dark/light mode

## License

This project is open source and available under the [MIT License](LICENSE).