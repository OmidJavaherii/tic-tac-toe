import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ setGameMode }) {
    const navigate = useNavigate();

    const startGame = (mode) => {
        setGameMode(mode);
        navigate("/game");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-6">
            <img className='h-32 mb-12' src="./Logo.png" alt="Logo" />
            <button onClick={() => startGame("twoPlayer")} className="btn px-6 py-3 mb-4 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 ">👥 Two Players</button>
            <button onClick={() => startGame("singlePlayer")} className="btn px-6 py-3 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300">🤖 Single Player</button>
        </div>
    );
}