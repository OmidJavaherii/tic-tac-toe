import React from "react";
import Board from "./Board";
import SingleGame from "./SingleGame";

export default function Game({ gameMode }) {
    return (
        <>
            {gameMode === "twoPlayer" ? <Board /> : <SingleGame />}
        </>
    );
}