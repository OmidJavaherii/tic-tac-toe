import React from "react";
import TwoPlayer from "./TwoPlayer";
import SingleGame from "./SingleGame";

interface GameProps {
    gameMode: "twoPlayer" | "singlePlayer";
    difficulty: "easy" | "hard";
}

const Game: React.FC<GameProps> = ({ gameMode, difficulty }) => {
    
    return (
        <>
            {gameMode === "twoPlayer" ? <TwoPlayer /> : <SingleGame difficulty={difficulty} />}
        </>
    );
}

export default Game;