import React, { useEffect, useReducer } from "react";
import Square from "./Square";
import History from "./History";
import Controls from "./Controls";
import { saveToStorage, loadFromStorage } from "../Utils/storage";
import { getQueryParams, setQueryParams } from "../Utils/queryParams";

const initialState = {
    board: Array(9).fill(null),
    isXNext: true,
    history: [],
    step: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "MOVE":
            const newBoard = [...state.board];
            newBoard[action.index] = state.isXNext ? "X" : "O";
            const newHistory = [...state.history.slice(0, state.step), newBoard];
            return {
                board: newBoard,
                isXNext: !state.isXNext,
                history: newHistory,
                step: newHistory.length,
            };

        case "UNDO":
            if (state.step === 0) return state;
            return {
                ...state,
                board: state.history[state.step - 1] || Array(9).fill(null),
                isXNext: state.step % 2 === 0,
                step: state.step - 1,
            };

        case "REDO":
            if (state.step >= state.history.length) return state;
            return {
                ...state,
                board: state.history[state.step] || state.board,
                isXNext: state.step % 2 === 0,
                step: state.step + 1,
            };

        case "RESET":
            return initialState;

        case "JUMP_TO":
            return {
                ...state,
                board: state.history[action.step] || Array(9).fill(null),
                isXNext: action.step % 2 === 0,
                step: action.step,
            };

        default:
            return state;
    }
}

export default function Board() {
    const [state, dispatch] = useReducer(reducer, initialState, (init) => {
        const storedState = loadFromStorage();
        return storedState || init;
    });

    useEffect(() => {
        saveToStorage(state);
        setQueryParams(state);
    }, [state]);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-[90%] sm:w-[300px]">
                {state.board.map((square, i) => (
                    <Square key={i} value={square} onClick={() => dispatch({ type: "MOVE", index: i })} />
                ))}
            </div>
            <Controls dispatch={dispatch} />
            <History history={state.history} jumpTo={(step) => dispatch({ type: "JUMP_TO", step })} />
        </div>
    );
}
