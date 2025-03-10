export interface GameState {
    board: (string | null)[];
    isXNext: boolean;
    history: {
        board: (string | null)[];
        position?: string;
        player?: string;
    }[];
    step: number;
    redoStack?: {
        board: (string | null)[];
        position?: string;
        player?: string;
    }[];
} 