export function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.every(cell => cell) ? "Draw" : null;
}

export function getMoveDetails(index, player) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { player, row, col };
}

export function getBestMove(board) {
    const emptySquares = board
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);

    if (emptySquares.length === 0) return null;

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}