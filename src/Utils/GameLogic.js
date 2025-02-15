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

export function getBestMoveHard(board) {
    const bestMove = minimax(board, "O").index;
    return bestMove;
}

function minimax(board, player) {
    const emptySquares = board.map((square, index) => (square === null ? index : null)).filter((index) => index !== null);

    if (checkWinner(board) === "X") return { score: -10 };
    if (checkWinner(board) === "O") return { score: 10 };
    if (emptySquares.length === 0) return { score: 0 };

    let moves = [];

    for (let i of emptySquares) {
        let move = {};
        move.index = i;
        board[i] = player;

        if (player === "O") {
            move.score = minimax(board, "X").score;
        } else {
            move.score = minimax(board, "O").score;
        }

        board[i] = null;
        moves.push(move);
    }

    let bestMove;
    if (player === "O") {
        let maxScore = -Infinity;
        for (let move of moves) {
            if (move.score > maxScore) {
                maxScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let minScore = Infinity;
        for (let move of moves) {
            if (move.score < minScore) {
                minScore = move.score;
                bestMove = move;
            }
        }
    }
    return bestMove;
}