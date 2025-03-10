import { Dispatch, SetStateAction } from 'react';
import { BeforeInstallPromptEvent } from '../../types/pwa';

export interface HomeProps {
  setGameMode: Dispatch<SetStateAction<"twoPlayer" | "singlePlayer">>;
  setDifficulty: Dispatch<SetStateAction<"easy" | "hard">>;
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
} 