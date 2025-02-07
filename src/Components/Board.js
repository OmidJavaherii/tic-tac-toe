import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
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
    redoStack: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "MOVE":
            if (state.board[action.index] || checkWinner(state.board)) return state;

            const newBoard = [...state.board];
            newBoard[action.index] = state.isXNext ? "X" : "O";

            const moveDetail = getMoveDetails(action.index, state.isXNext ? "X" : "O");

            const newHistory = [
                ...state.history,
                { board: [...newBoard], ...moveDetail },
            ];

            const newState = {
                ...state,
                board: [...newBoard],
                isXNext: !state.isXNext,
                history: newHistory,
                step: newHistory.length,
                redoStack: [],
            };
            saveToStorage(newState);
            setQueryParams(newState);
            return newState

        case "UNDO":
            if (state.step === 0) return state;
            const prevStep = state.step - 1;
            const newHistoryUndo = state.history.slice(0, prevStep);
            const prevMove = newHistoryUndo[prevStep - 1] || {};

            const newRedoStack = [state.history[state.step - 1], ...state.redoStack];

            const undoState = {
                ...state,
                step: prevStep,
                board: [...(prevMove.board || Array(9).fill(null))],
                isXNext: prevMove.player !== "X",
                history: newHistoryUndo,
                redoStack: newRedoStack,
            };

            saveToStorage(undoState);
            setQueryParams(undoState);
            return undoState;

        case "REDO":
            if (state.redoStack.length === 0) return state;
            const restoredMove = state.redoStack[0];
            const newRedoStackRedo = state.redoStack.slice(1);
            const newHistoryRedo = [...state.history, restoredMove];

            const redoState = {
                ...state,
                step: state.step + 1,
                board: [...(restoredMove.board || state.board)],
                isXNext: restoredMove.player !== "X",
                history: newHistoryRedo,
                redoStack: newRedoStackRedo,
            };

            saveToStorage(redoState);
            setQueryParams(redoState);
            return redoState;

        case "RESET":
            const resetState = { ...initialState };
            saveToStorage(resetState);
            setQueryParams(resetState);
            return resetState;

        case "JUMP_TO":
            if (action.step < 0 || action.step >= state.history.length) return state;

            const trimmedHistory = state.history.slice(0, action.step + 1);
            const lastMove = trimmedHistory[action.step] || {};
            const isNextX = lastMove.player !== "X";

            const jumpState = {
                ...state,
                step: action.step,
                board: [...(lastMove.board || Array(9).fill(null))],
                isXNext: isNextX,
                history: trimmedHistory,
                redoStack: []
            };
            saveToStorage(jumpState);
            setQueryParams(jumpState);
            return jumpState;

        default:
            return state;
    }
}

export default function Board() {
    const navigate = useNavigate();
    const initialData = getQueryParams();
    const [state, dispatch] = useReducer(reducer, initialState, () => {
        return initialData.board ? initialData : loadFromStorage() || initialState;
    });

    useEffect(() => {
        saveToStorage(state);
        setQueryParams(state);
    }, [state]);

    const winner = checkWinner(state.board);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-gray-800">Tic-Tac-Toe</h1>
            {winner ? (
                <h2 className="text-xl font-semibold text-red-500 mb-3">{winner === "Draw" ? "It's Draw!" : `Winner: ${winner}`}</h2>
            ) : (
                <h2 className="text-xl font-semibold text-blue-500 mb-3">Turn: {state.isXNext ? "❌" : "⭕"}</h2>
            )}
            <div className="grid grid-cols-3 place-items-center gap-2 sm:gap-4 w-[50%] sm:w-[300px]">
                {state.board.map((square, i) => (
                    <Square key={i} value={square} onClick={() => dispatch({ type: "MOVE", index: i })} />
                ))}
            </div>
            <Controls dispatch={dispatch} />
            <button className="btn mt-4 bg-blue-500 hover:bg-blue-900" onClick={() => navigate("/")}>Return to Main Page</button>
            <History history={state.history} jumpTo={(step) => dispatch({ type: "JUMP_TO", step })} />
            <WinnerModal winner={winner} onReset={() => dispatch({ type: "RESET" })} />
        </div>
    );
}
