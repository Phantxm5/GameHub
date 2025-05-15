import { Difficulty } from "@/app/games/wordle/page";

// German 5-letter words (easy and medium difficulty)
const germanWords5 = [
  "APFEL", "BAUM", "BUCH", "DACH", "ERDE", "FEUER", "GABEL", "HAUS", "INSEL", "JACKE",
  "KATZE", "LAMPE", "MAUER", "NACHT", "OBST", "PFERD", "QUARK", "REGEN", "SONNE", "TISCH",
  "UFER", "VOGEL", "WAND", "YACHT", "ZAHN", "ARBEIT", "BLUME", "COMPUTER", "DORF", "EIMER",
  "FENSTER", "GARTEN", "HIMMEL", "IGEL", "JAHR", "KAFFEE", "LIEBE", "MAUS", "NEBEL", "OFEN",
  "PAPIER", "QUELLE", "RUCKSACK", "SCHULE", "TASSE", "UHR", "VATER", "WASSER", "XYLOPHON", "ZUCKER"
];

// German 6-letter words (hard difficulty)
const germanWords6 = [
  "ABEND", "BODEN", "CHAOS", "DAMPF", "EBENE", "FADEN", "GABEL", "HANDEL", "INSEL", "JACKE",
  "KABEL", "LAGER", "MAUER", "NADEL", "ONKEL", "PFANNE", "QUELLE", "REGEN", "SEGEL", "TAFEL",
  "UMZUG", "VOGEL", "WAGEN", "XENON", "YACHT", "ZAUBER", "ABFALL", "BERICHT", "CHEMIE", "DONNER",
  "EINKAUF", "FENSTER", "GARTEN", "HANDEL", "IMPULS", "JOURNAL", "KAMERA", "LEITER", "MUSTER", "NUTZEN",
  "ORDNER", "PARTNER", "QUALITÄT", "RECHNER", "SCHADEN", "TABELLE", "UMFANG", "VERTRAG", "WECHSEL", "ZEITUNG"
];

// Easy words are common, everyday German words
const easyWords = germanWords5.filter((_, index) => index < 25);

// Medium words are less common German words
const mediumWords = germanWords5.filter((_, index) => index >= 25);

// Hard words are longer and more complex German words
const hardWords = germanWords6;

/**
 * Get a random word based on difficulty and word length
 */
export function getRandomWord(difficulty: Difficulty, wordLength: number): string {
  let wordList: string[];
  
  switch (difficulty) {
    case "easy":
      wordList = easyWords;
      break;
    case "medium":
      wordList = mediumWords;
      break;
    case "hard":
      wordList = hardWords;
      break;
    default:
      wordList = easyWords;
  }
  
  // Filter by word length if needed
  const filteredWords = wordList.filter(word => word.length === wordLength);
  
  // If no words match the length, return from the original list
  const words = filteredWords.length > 0 ? filteredWords : wordList;
  
  // Get a random word
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}