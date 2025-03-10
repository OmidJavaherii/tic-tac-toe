export type GameMode = "twoPlayer" | "singlePlayer";
export type Difficulty = "easy" | "hard";

export interface GameState {
  gameMode: GameMode;
  difficulty: Difficulty;
} 