import React from "react";
import TwoPlayer from "./TwoPlayer";
import SingleGame from "./SingleGame";

export default function Game({ gameMode, difficulty }) {
    //   const [difficulty , setDifficulty] = useState("")
    
    return (
        <>
            {gameMode === "twoPlayer" ? <TwoPlayer /> : <SingleGame difficulty={difficulty} />}
        </>
    );
}