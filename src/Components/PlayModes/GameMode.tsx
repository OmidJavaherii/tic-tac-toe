import React from "react";
import TwoPlayer from "./TwoPlayer";
import SingleGame from "./SingleGame";

interface GameProps {
    gameMode: "twoPlayer" | "singlePlayer";
    difficulty: "easy" | "hard";  // Removed "medium" since SingleGame only accepts easy/hard
}

const Game: React.FC<GameProps> = ({ gameMode, difficulty }) => {
    //   const [difficulty , setDifficulty] = useState("")
    
    return (
        <>
            {gameMode === "twoPlayer" ? <TwoPlayer /> : <SingleGame difficulty={difficulty} />}
        </>
    );
}

export default Game;