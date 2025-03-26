interface StorageGameState {
    board: (string | null)[];
    isXNext: boolean;
    history: { 
        board: (string | null)[];
        position?: string;
        player?: string;
    }[];
    step: number;
    redoStack: { 
        board: (string | null)[];
        position?: string;
        player?: string;
    }[];
}

export function saveToStorage(state: StorageGameState): void {
    localStorage.setItem("tic-tac-toe", JSON.stringify(state));
}

export function loadFromStorage(): StorageGameState | null {
    const data = localStorage.getItem("tic-tac-toe");
    return data ? JSON.parse(data) : null;
}

export function clearStorage(): void {
    localStorage.removeItem("tic-tac-toe");
}
