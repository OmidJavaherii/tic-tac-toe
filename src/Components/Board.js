import React, { useEffect, useReducer } from "react";
import Square from "./Square";
import History from "./History";
import Controls from "./Controls";
import WinnerModal from "./WinnerModal";
import { saveToStorage, loadFromStorage } from "../Utils/storage";
import { getQueryParams, setQueryParams } from "../Utils/queryParams";
import { checkWinner, getMoveDetails } from "../Utils/GameLogic";

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

            return {
                ...state,
                board: newBoard,
                isXNext: !state.isXNext,
                history: [...state.history.slice(0, state.step), { board: newBoard, ...moveDetail }],
                step: state.step + 1,
            };

        case "UNDO":
            if (state.step === 0) return state;
            const prevStep = state.step - 1;
            return {
                ...state,
                step: prevStep,
                board: state.history[prevStep].board || Array(9).fill(null),
                isXNext: state.history[prevStep].player !== "X",
            };

        case "REDO":
            if (state.step >= state.history.length) return state;
            const nextStep = state.step + 1;
            return {
                ...state,
                step: nextStep,
                board: state.history[nextStep].board || state.board,
                isXNext: state.history[nextStep].player !== "O",
            };

        case "RESET":
            return initialState;

        case "JUMP_TO":
            return {
                ...state,
                step: action.step,
                board: state.history[action.step].board || Array(9).fill(null),
                isXNext: action.step % 2 === 0,
            };

        default:
            return state;
    }
}

export default function Board() {
    const [state, dispatch] = useReducer(reducer, initialState, () => loadFromStorage() || initialState);

    useEffect(() => {
        saveToStorage(state);
        setQueryParams(state);
    }, [state]);

    const winner = checkWinner(state.board);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-gray-800">Tic-Tac-Toe</h1>
            {winner ? (
                <h2 className="text-xl font-semibold text-red-500">{winner === "Draw" ? "It's Draw!" : `Winner: ${winner}`}</h2>
            ) : (
                <h2 className="text-xl font-semibold text-blue-500 m-2">Turn: {state.isXNext ? "❌" : "⭕"}</h2>
            )}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-[90%] sm:w-[300px]">
                {state.board.map((square, i) => (
                    <Square key={i} value={square} onClick={() => dispatch({ type: "MOVE", index: i })} />
                ))}
            </div>
            <Controls dispatch={dispatch} />
            <History history={state.history} jumpTo={(step) => dispatch({ type: "JUMP_TO", step })} />
            <WinnerModal winner={winner} onReset={() => dispatch({ type: "RESET" })} />
        </div>
    );
}
