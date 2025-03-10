import { Dispatch, SetStateAction } from 'react';
import { BeforeInstallPromptEvent } from './pwa';
export interface HomeProps {
  setGameMode: Dispatch<SetStateAction<"twoPlayer" | "singlePlayer">>;
  setDifficulty: Dispatch<SetStateAction<"easy" | "hard">>;
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
} 

export type GameMode = "twoPlayer" | "singlePlayer";
export type Difficulty = "easy" | "hard";