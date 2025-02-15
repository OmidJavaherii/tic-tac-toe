import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Square from "../Square";
import History from "../History";
import WinnerModal from "../WinnerModal";
import { saveToStorage, loadFromStorage } from "../../Utils/storage";
import { getQueryParams, setQueryParams } from "../../Utils/queryParams";
import { getMoveDetails, checkWinner, getBestMove, getBestMoveHard } from "../../Utils/GameLogic";

const initialState = {
    board: Array(9).fill(null),
    isXNext: true,
    history: [],
    step: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "MOVE":
            if (state.board[action.index] || checkWinner(state.board)) return state;

            const newBoard = [...state.board];
            newBoard[action.index] = state.isXNext ? "X" : "O";

            const moveDetail = getMoveDetails(action.index, state.isXNext ? "X" : "O");

            const newHistory = [...state.history,
            { board: [...newBoard], ...moveDetail }];

            const newState = {
                ...state,
                board: [...newBoard],
                isXNext: !state.isXNext,
                history: newHistory,
                step: newHistory.length,
            };

            saveToStorage(newState);
            setQueryParams(newState);
            return newState;

        case "RESET":
            const resetState = { ...initialState };
            saveToStorage(resetState);
            setQueryParams(resetState);
            return resetState;

        default:
            return state;
    }
}

export default function SingleGame({ difficulty }) {
    const navigate = useNavigate();
    const initialData = getQueryParams();
    const [isBotMoving, setIsBotMoving] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState, () => {
        return initialData.board ? initialData : loadFromStorage() || initialState;
    });

    const winner = checkWinner(state.board);

    useEffect(() => {
        saveToStorage(state);
        setQueryParams(state);
        if (!state.isXNext && !winner) {
            setIsBotMoving(true);
            setTimeout(() => {
                let bestMove;
                if (difficulty === "easy") {
                    bestMove = getBestMove(state.board);
                } else {
                    bestMove = getBestMoveHard(state.board);
                }
                dispatch({ type: "MOVE", index: bestMove });
                setIsBotMoving(false);
            }, 500);
        }
    }, [state, winner, difficulty]);

    return (
        <div className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-3xl font-bold ">Tic-Tac-Toe</h1>
            {winner ? (
                <h2 className="text-xl font-semibold text-red-500 mb-3">{winner === "Draw" ? "It's Draw!" : `Winner: ${winner}`}</h2>
            ) : (
                <h2 className="text-xl font-semibold text-blue-500 mb-3">Turn: {state.isXNext ? "❌" : "⭕"}</h2>
            )}
            <div className="grid grid-cols-3 place-items-center gap-2 sm:gap-4 w-[50%] sm:w-[300px]">
                {state.board.map((square, i) => (
                    <Square key={i} value={square} onClick={() => !isBotMoving && dispatch({ type: "MOVE", index: i })} />
                ))}
            </div>
            <button className="btn mt-4 bg-red-500 hover:bg-red-600" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
            <button className="btn mt-4" onClick={() => {
                dispatch({ type: "RESET" });
                navigate("/");
            }}>Return to Main Page</button>
            <History history={state.history} jumpTo={(step) => dispatch({ type: "JUMP_TO", step })} />
            <WinnerModal winner={winner} onReset={() => dispatch({ type: "RESET" })} />
        </div>
    );
}