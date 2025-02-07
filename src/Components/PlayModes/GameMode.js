import React from "react";
import TwoPlayer from "./TwoPlayer";
import SingleGame from "./SingleGame";

export default function Game({ gameMode }) {
    return (
        <>
            {gameMode === "twoPlayer" ? <TwoPlayer /> : <SingleGame />}
        </>
    );
}