import { IconData } from "simple-icons/sdk";

export type GameState = "ready" | "playing" | "gameover";
export type CorrectType = "correct" | "incorrect" | "none";

export type GameData = {
    gameState: GameState;
    score: number;
    attention: number;
    totalAttention: number;
    correct: CorrectType;
    selectedIcon?: IconData;
};
